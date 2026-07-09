[🇬🇧 English](README.md) | [🇷🇺 Русский](README.ru.md)

# TotalBody Telegram Mini App и бот

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=111)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-26A5E4?style=flat&logo=telegram&logoColor=white)
![VDS](https://img.shields.io/badge/VDS%20%2F%20Selectel-deployment-345?style=flat)

Telegram Mini App и Telegram bot для студии растяжки TotalBody: информация об услугах, переход к записи, клиентские профили и админские рассылки.

Этот репозиторий является публичной портфолио-версией фриланс-проекта для TotalBody. Секреты, клиентские записи и персональные данные исключены из репозитория.

## О проекте

Проект объединяет Telegram Mini App для знакомства со студией и Telegram bot для дальнейшего общения с клиентом. Mini App показывает информацию о TotalBody, направления тренировок, цены, расписание, галерею, FAQ и контактные блоки. Бот помогает оставить пользователя внутри Telegram: приветствует, сохраняет базовый профиль, поддерживает сценарий записи и даёт администратору простой инструмент рассылок.

## Возможности

- Информационное Telegram Mini App для TotalBody.
- Разделы о студии, направлениях, ценах, галерее, FAQ и адресах.
- Переход из Mini App в Telegram bot по CTA-кнопкам.
- Онбординг пользователя через команду `/start`.
- Сохранение клиентского профиля в локальной demo-базе или PostgreSQL.
- Админские команды для рассылок.
- Безопасные placeholder-ссылки для публичной версии вместо секретов, приватных контактов и внутренних переходов.

## Пользовательский сценарий

1. Клиент открывает Telegram Mini App студии TotalBody.
2. Изучает информацию о студии, направления, цены, FAQ и адреса.
3. Нажимает кнопку записи или перехода в Telegram bot.
4. Бот приветствует клиента и сохраняет базовые данные Telegram-профиля.
5. Клиент продолжает сценарий записи и общения в Telegram.

Подробнее: [docs/user-flow.md](docs/user-flow.md).

## Сценарий администратора

1. Администратор добавляет свой Telegram ID в `ADMIN_IDS`.
2. Бот проверяет доступ перед выполнением админских команд.
3. Команда `/broadcast` показывает подсказку по рассылке.
4. Команда `/sendall текст` отправляет сообщение сохранённым пользователям.

Подробнее: [docs/admin-flow.md](docs/admin-flow.md).

## Стек

- HTML, CSS и JavaScript для Mini App.
- Python и aiogram для Telegram bot.
- Telegram Bot API и Telegram Web Apps API.
- SQLite для локальной demo-базы.
- PostgreSQL-compatible `DATABASE_URL` для серверного запуска.
- VDS / Selectel как типовой вариант деплоя.
- Git для контроля версий.

## Установка

```bash
git clone https://github.com/HullyMully/totalbody-telegram-miniapp-bot.git
cd totalbody-telegram-miniapp-bot
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

После копирования настройте `.env` локально. Файл `.env` не должен попадать в Git.

## Переменные окружения

| Переменная | Назначение |
| --- | --- |
| `BOT_TOKEN` | Токен Telegram bot из BotFather. |
| `ADMIN_IDS` | Telegram ID администраторов через запятую. |
| `WEBAPP_URL` | Публичный URL Mini App; для demo CTA можно добавить `?bot=your_bot_username`. |
| `DATABASE_URL` | `sqlite:///demo.db` для локального demo или PostgreSQL URL для деплоя. |
| `BOT_MODE` | `polling` локально или `webhook` для hosted demo. |
| `WEBHOOK_URL` | Публичный URL сервиса бота для webhook; на Render можно не задавать. |
| `WEBHOOK_PATH` | Путь webhook, по умолчанию `/webhook`. |
| `WEBHOOK_SECRET` | Optional secret token для Telegram webhook; если пусто, выводится из `BOT_TOKEN`. |

## Локальный запуск

Запуск бота:

```bash
python bot.py
```

Запуск статических файлов Mini App:

```bash
python -m http.server 8000 --directory tg-mini-app
```

Для реальной проверки Telegram Mini App нужен HTTPS URL. Его нужно указать в BotFather и в `WEBAPP_URL`.

## Структура проекта

```text
.
├── bot.py
├── render.yaml
├── requirements.txt
├── tg-mini-app/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── screens/
├── docs/
│   ├── setup.md
│   ├── features.md
│   ├── user-flow.md
│   ├── admin-flow.md
│   ├── privacy.md
│   ├── deployment.md
│   └── screenshots/
├── .env.example
├── .gitignore
└── CHANGELOG.md
```

## Roadmap

- Добавить публичный demo mode для ссылок Mini App.
- Добавить тесты для storage adapters бота.
- Описать optional webhook deployment.
- Добавить sanitized sample screenshots для основных сценариев.

## Автор

Проект оформлен как freelance portfolio case: [HullyMully](https://github.com/HullyMully).
