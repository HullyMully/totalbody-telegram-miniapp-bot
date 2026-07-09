# Deployment

This project can be deployed either as a free public demo on Render or as a
classic VDS deployment. Do not commit production secrets.

## Free Render Demo

The repository includes `render.yaml`, which creates:

- `totalbody-mini-app-demo`: a free Render static site serving `tg-mini-app/`.
- `totalbody-bot-demo`: a free Render Python web service running the bot in
  webhook mode.
- `totalbody-demo-db`: a free Render Postgres database for saved Telegram users.

Render provides HTTPS URLs for the static site and web service. Telegram Mini
Apps need an HTTPS URL, so the static site URL is the one to configure in
BotFather and `WEBAPP_URL`.

### Steps

1. Push this repository to GitHub or GitLab.
2. In Render, create a new Blueprint from the repository.
3. During the first Blueprint setup, enter the secret `BOT_TOKEN` value when
   prompted. The public demo config already sets `ADMIN_IDS=5947469995` and
   `WEBAPP_URL=https://totalbody-mini-app-demo.onrender.com?bot=demohmtgbot`.
4. Deploy the Blueprint.
5. Open the static site and copy its actual `https://...onrender.com` URL.
6. If Render assigned a different static URL than
   `https://totalbody-mini-app-demo.onrender.com`, update the bot service
   environment variable `WEBAPP_URL`.
7. Open `https://t.me/demohmtgbot`, send `/start`, and press the `Open Mini App`
   button to launch the Mini App inside Telegram.
8. Optionally, configure a BotFather Mini App short name to get a direct link
   like `https://t.me/<bot_username>/<mini_app_short_name>`.
9. Check the health endpoint:
   `https://<bot-service>.onrender.com/healthz`.

### Free-tier notes

This setup is intended for portfolio/demo use only:

- Free Render web services can sleep after idle periods, so the first Telegram
  request after inactivity may have a cold start delay.
- Free Render Postgres is temporary and should not be used for production data.
- The bot runs as a webhook web service because Render's free plan does not
  support free background workers.

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
BOT_MODE=webhook
WEBHOOK_URL=https://your-bot-service.example
WEBHOOK_PATH=/webhook
WEBHOOK_SECRET=optional_custom_secret
```

Do not commit production values.

## Database

Local demo mode can use SQLite. Server deployment should use a managed or self-hosted PostgreSQL database. The bot creates the `tg_users` table if it does not exist.

## Mini App Hosting

Telegram Mini Apps require HTTPS in real usage. The static Mini App can be served through Nginx, Caddy or another web server. Cache headers can be enabled for static assets after verifying updates.

## Bot Runtime Modes

Local development uses polling by default:

```bash
BOT_MODE=polling python bot.py
```

Hosted demo deployments should use webhook mode:

```bash
BOT_MODE=webhook WEBHOOK_URL=https://your-bot-service.example python bot.py
```

On Render, `WEBHOOK_URL` is optional because the app derives it from
`RENDER_EXTERNAL_URL`. `WEBHOOK_SECRET` is also optional: if you leave it empty,
the app derives a stable Telegram-compatible secret from `BOT_TOKEN`. If you set
it yourself, use only `A-Z`, `a-z`, `0-9`, `_` and `-`.

## Operational Links

The public repository uses placeholders for booking and private contact links. Replace them only in a private deployment branch or through a deployment-specific configuration process.
