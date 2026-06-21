# Deployment

This project can be deployed to a VDS, including Selectel, without committing secrets.

## General Server Setup

1. Create a Linux server and install Python 3.10+.
2. Clone the public repository.
3. Create a virtual environment and install dependencies.
4. Configure environment variables outside Git.
5. Run the bot with a process manager such as `systemd`.
6. Serve `tg-mini-app/` through HTTPS.
7. Set the Mini App URL in BotFather and in `WEBAPP_URL`.

## Environment

Production values should be stored in server environment variables or a private `.env` file:

```bash
BOT_TOKEN=...
ADMIN_IDS=...
WEBAPP_URL=https://your-domain.example
DATABASE_URL=postgresql://user:password@host:5432/database
```

Do not commit production values.

## Database

Local demo mode can use SQLite. Server deployment should use a managed or self-hosted PostgreSQL database. The bot creates the `tg_users` table if it does not exist.

## Mini App Hosting

Telegram Mini Apps require HTTPS in real usage. The static Mini App can be served through Nginx, Caddy or another web server. Cache headers can be enabled for static assets after verifying updates.

## Operational Links

The public repository uses placeholders for booking and private contact links. Replace them only in a private deployment branch or through a deployment-specific configuration process.
