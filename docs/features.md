# Features

## Mini App Pages

The Mini App presents the TotalBody studio in a Telegram-native flow:

- hero section with studio positioning;
- training directions and service cards;
- prices and subscription options;
- FAQ and useful information;
- gallery and video blocks;
- location blocks for studio addresses;
- CTA buttons that lead to the Telegram bot or demo booking placeholders.

## Bot Onboarding

The bot starts with `/start`, greets the client and stores a basic Telegram profile record:

- Telegram user ID;
- username;
- first name;
- last name;
- first interaction date.

In the public version, storage can run on local SQLite demo mode. Deployment can use PostgreSQL through `DATABASE_URL`.

## Booking Flow

The public repository keeps the booking flow structure but replaces live operational links with placeholders. In a private deployment, the CTA links can point to the studio's real booking workflow, CRM widget or Telegram bot entry point.

## User Profile

The bot stores user profile data needed for future communication and broadcasts. Real client records and databases are not included in this repository.

## Admin Broadcasts

Admin commands are protected by `ADMIN_IDS`:

- `/broadcast` explains the broadcast command;
- `/sendall text` sends a message to stored users;
- photo broadcasts are supported when the command message includes a photo.
