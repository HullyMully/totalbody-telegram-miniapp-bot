import asyncio
import logging
import os
import sqlite3
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable

import asyncpg
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover - optional local convenience
    load_dotenv = None


if load_dotenv:
    load_dotenv()


BOT_TOKEN = os.getenv("BOT_TOKEN", "").strip()
ADMIN_IDS = {
    int(value.strip())
    for value in os.getenv("ADMIN_IDS", "").split(",")
    if value.strip().isdigit()
}
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://example.com").strip()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///demo.db").strip()
WELCOME_PHOTO_URL = os.getenv(
    "WELCOME_PHOTO_URL",
    "https://res.cloudinary.com/dd58ooqcc/image/upload/v1751566051/IMG_4544_s7jw2z.jpg",
).strip()


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class UserRecord:
    user_id: int
    username: str
    first_name: str
    last_name: str
    date: datetime


class SQLiteStorage:
    def __init__(self, database_url: str):
        self.path = self._resolve_path(database_url)

    @staticmethod
    def _resolve_path(database_url: str) -> Path:
        raw_path = database_url.replace("sqlite:///", "", 1)
        return Path(raw_path).expanduser()

    async def connect(self) -> None:
        await asyncio.to_thread(self._init_schema)

    def _init_schema(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(self.path) as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS tg_users (
                    user_id INTEGER PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    last_name TEXT,
                    date TEXT
                )
                """
            )

    async def add_user(self, user: UserRecord) -> bool:
        return await asyncio.to_thread(self._add_user_sync, user)

    def _add_user_sync(self, user: UserRecord) -> bool:
        with sqlite3.connect(self.path) as conn:
            cursor = conn.execute(
                """
                INSERT OR IGNORE INTO tg_users
                (user_id, username, first_name, last_name, date)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    user.user_id,
                    user.username,
                    user.first_name,
                    user.last_name,
                    user.date.isoformat(),
                ),
            )
            return cursor.rowcount == 1

    async def get_all_users(self) -> list[int]:
        return await asyncio.to_thread(self._get_all_users_sync)

    def _get_all_users_sync(self) -> list[int]:
        with sqlite3.connect(self.path) as conn:
            rows = conn.execute("SELECT user_id FROM tg_users").fetchall()
            return [int(row[0]) for row in rows]

    async def close(self) -> None:
        return None


class PostgresStorage:
    def __init__(self, database_url: str):
        self.database_url = database_url
        self.pool: asyncpg.Pool | None = None

    async def connect(self) -> None:
        self.pool = await asyncpg.create_pool(dsn=self.database_url)
        async with self.pool.acquire() as conn:
            await conn.execute(
                """
                CREATE TABLE IF NOT EXISTS tg_users (
                    user_id BIGINT PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    last_name TEXT,
                    date TIMESTAMP
                )
                """
            )

    async def add_user(self, user: UserRecord) -> bool:
        if not self.pool:
            raise RuntimeError("Database pool is not initialized")
        async with self.pool.acquire() as conn:
            result = await conn.execute(
                """
                INSERT INTO tg_users
                (user_id, username, first_name, last_name, date)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id) DO NOTHING
                """,
                user.user_id,
                user.username,
                user.first_name,
                user.last_name,
                user.date,
            )
            return result.endswith("1")

    async def get_all_users(self) -> list[int]:
        if not self.pool:
            raise RuntimeError("Database pool is not initialized")
        async with self.pool.acquire() as conn:
            rows = await conn.fetch("SELECT user_id FROM tg_users")
            return [int(row["user_id"]) for row in rows]

    async def close(self) -> None:
        if self.pool:
            await self.pool.close()


def create_storage(database_url: str) -> SQLiteStorage | PostgresStorage:
    if database_url.startswith("sqlite:///"):
        return SQLiteStorage(database_url)
    if database_url.startswith(("postgres://", "postgresql://")):
        return PostgresStorage(database_url)
    raise ValueError(
        "DATABASE_URL must start with sqlite:///, postgres://, or postgresql://"
    )


def is_admin(user_id: int, admin_ids: Iterable[int]) -> bool:
    return user_id in set(admin_ids)


def register_handlers(dp: Dispatcher, storage: SQLiteStorage | PostgresStorage) -> None:
    @dp.message(Command("start"))
    async def start_handler(message: types.Message) -> None:
        from_user = message.from_user
        if not from_user:
            await message.answer("Не удалось получить профиль Telegram.")
            return

        user = UserRecord(
            user_id=from_user.id,
            username=from_user.username or "",
            first_name=from_user.first_name or "",
            last_name=from_user.last_name or "",
            date=datetime.now(),
        )
        added = await storage.add_user(user)
        welcome_text = (
            "Добро пожаловать в Total Body - студию, где каждая тренировка "
            "создана с заботой о вас.\n\n"
            "У нас вы найдете:\n\n"
            "- комфортные и мягкие тренировки;\n"
            "- квалифицированных тренеров;\n"
            "- удобную запись и напоминания;\n"
            "- теплую атмосферу и поддержку."
        )
        await message.answer_photo(WELCOME_PHOTO_URL, caption=welcome_text)
        await message.answer(f"Вот ссылка на мини-приложение: {WEBAPP_URL}")
        if added:
            logger.info("Added new Telegram user: %s", user.user_id)
        else:
            logger.info("Telegram user already exists: %s", user.user_id)

    @dp.message(Command("broadcast"))
    async def broadcast_handler(message: types.Message) -> None:
        if not message.from_user or not is_admin(message.from_user.id, ADMIN_IDS):
            await message.reply("Нет доступа")
            return
        await message.reply("Для рассылки используй команду /sendall текст_рассылки")

    @dp.message(Command("sendall"))
    async def sendall_handler(message: types.Message) -> None:
        if not message.from_user or not is_admin(message.from_user.id, ADMIN_IDS):
            await message.reply("Нет доступа")
            return
        raw = message.text if message.text else message.caption
        if not raw:
            await message.reply("Используй: /sendall текст_рассылки")
            return

        text = raw[len("/sendall") :].strip()
        users = await storage.get_all_users()
        count = 0
        for uid in users:
            try:
                if message.photo:
                    await message.bot.send_photo(
                        uid,
                        message.photo[-1].file_id,
                        caption=text,
                        parse_mode="HTML",
                    )
                else:
                    await message.bot.send_message(uid, text, parse_mode="HTML")
                count += 1
            except Exception as exc:
                logger.warning("Failed to send broadcast to user %s: %s", uid, exc)
        await message.reply(f"Рассылка завершена. Отправлено: {count}")


async def main() -> None:
    if not BOT_TOKEN:
        raise RuntimeError("BOT_TOKEN is required. Set it in the environment.")
    if not ADMIN_IDS:
        logger.warning("ADMIN_IDS is empty. Admin commands will be unavailable.")

    storage = create_storage(DATABASE_URL)
    await storage.connect()
    bot = Bot(token=BOT_TOKEN)
    dp = Dispatcher()
    register_handlers(dp, storage)
    try:
        await dp.start_polling(bot)
    finally:
        await storage.close()
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(main())
