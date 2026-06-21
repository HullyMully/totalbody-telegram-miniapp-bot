# Setup

[English README](../README.md) | [Russian README](../README.ru.md)

## Requirements

- Python 3.10 or newer.
- Telegram bot created through BotFather.
- HTTPS URL for real Telegram Mini App testing.
- SQLite for local demo mode or PostgreSQL for deployment.

## Install

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Fill `.env` locally. Do not commit it.

## Environment

```bash
BOT_TOKEN=your_telegram_bot_token_here
ADMIN_IDS=123456789
WEBAPP_URL=https://example.com
DATABASE_URL=sqlite:///demo.db
```

`ADMIN_IDS` accepts a comma-separated list for multiple admins.

## Run Bot

```bash
python bot.py
```

The default `sqlite:///demo.db` creates a local demo database. Database files are ignored by Git.

## Run Mini App Locally

```bash
python -m http.server 8000 --directory tg-mini-app
```

Open `http://localhost:8000` for layout checks. Telegram WebApp methods use a browser fallback outside Telegram.
