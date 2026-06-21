[🇬🇧 English](README.md) | [🇷🇺 Русский](README.ru.md)

# TotalBody Telegram Mini App and Bot

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=111)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-26A5E4?style=flat&logo=telegram&logoColor=white)
![VDS](https://img.shields.io/badge/VDS%20%2F%20Selectel-deployment-345?style=flat)

Telegram Mini App and bot for TotalBody stretching studio: service info, booking flow, client profiles and admin broadcasts.

This repository is a public portfolio version of a freelance project for TotalBody. Secrets, client records and private data are excluded from the repository.

## Overview

The project combines a Telegram Mini App for studio discovery with a Telegram bot that supports onboarding, client data collection, booking handoff, user profile storage and admin broadcasts. The Mini App presents studio information, training directions, prices, schedule entry points, gallery content and social links. The bot keeps the interaction inside Telegram and gives the studio a lightweight communication channel.

## Features

- Informational Telegram Mini App for TotalBody.
- Studio pages with directions, prices, gallery, FAQ and location blocks.
- Transition from Mini App CTAs to the Telegram bot.
- Bot onboarding through `/start`.
- Client profile persistence in a local demo database or PostgreSQL.
- Admin-only broadcast commands.
- Public portfolio-safe placeholders for secrets, booking links and private contact channels.

## User Flow

1. A client opens the TotalBody Telegram Mini App.
2. They review studio information, training directions, pricing and FAQ.
3. CTA buttons send the client to the Telegram bot or demo booking entry point.
4. The bot greets the client and stores basic Telegram profile data.
5. The client can continue the booking conversation in Telegram.

More detail: [docs/user-flow.md](docs/user-flow.md).

## Admin Flow

1. An administrator configures their Telegram ID in `ADMIN_IDS`.
2. The bot checks admin access before allowing broadcast commands.
3. The admin can request broadcast instructions with `/broadcast`.
4. The admin sends `/sendall message text` to reach saved bot users.

More detail: [docs/admin-flow.md](docs/admin-flow.md).

## Tech Stack

- HTML, CSS and JavaScript for the Mini App.
- Python and aiogram for the Telegram bot.
- Telegram Bot API and Telegram Web Apps API.
- SQLite for local demo storage.
- PostgreSQL-compatible `DATABASE_URL` for server deployment.
- VDS / Selectel deployment workflow.
- Git for version control.

## Installation

```bash
git clone https://github.com/HullyMully/totalbody-telegram-miniapp-bot.git
cd totalbody-telegram-miniapp-bot
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` locally and keep it out of Git.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `BOT_TOKEN` | Telegram bot token from BotFather. |
| `ADMIN_IDS` | Comma-separated Telegram user IDs allowed to use admin commands. |
| `WEBAPP_URL` | Public URL of the Mini App. |
| `DATABASE_URL` | `sqlite:///demo.db` for local demo or PostgreSQL URL for deployment. |

## Local Run

Run the bot:

```bash
python bot.py
```

Run the Mini App static files locally:

```bash
python -m http.server 8000 --directory tg-mini-app
```

For real Telegram Mini App testing, expose the Mini App through HTTPS and set that URL in BotFather and `WEBAPP_URL`.

## Deployment Notes

The deployment target can be a small VDS, including Selectel. A typical setup uses Python on the server, environment variables managed outside Git, a process manager such as `systemd`, and an HTTPS endpoint for the Mini App. See [docs/deployment.md](docs/deployment.md).

## Screenshots

Approved portfolio screenshots are stored in [screens](screens). Screenshot publishing notes are in [docs/screenshots/README.md](docs/screenshots/README.md).

## Privacy

The public repository excludes `.env`, bot tokens, API keys, private admin identifiers, real databases, logs, client records, private uploads and live internal links. See [docs/privacy.md](docs/privacy.md).

## Project Structure

```text
.
├── bot.py
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

- Add a public demo mode for Mini App links.
- Add tests for bot storage adapters.
- Document optional webhook deployment.
- Add sanitized sample screenshots for every main flow.

## Author

Created as a freelance portfolio case by [HullyMully](https://github.com/HullyMully).
