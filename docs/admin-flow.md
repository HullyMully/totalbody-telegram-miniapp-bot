# Admin Flow

```text
admin access -> client base -> broadcasts -> booking management
```

1. Admin access is configured through the `ADMIN_IDS` environment variable.
2. The bot checks the sender's Telegram user ID before allowing admin commands.
3. User records are stored in the configured database after `/start`.
4. The admin can run `/broadcast` to see the broadcast instruction.
5. The admin can run `/sendall message text` to send an announcement to stored users.
6. Booking management stays in the studio's private operational workflow and is not published in this repository.

## Demo Admin

The Render demo configures Telegram ID `5947469995` as the admin account.

Broadcast flow:

1. Open the demo bot from the Telegram account with ID `5947469995`.
2. Send `/broadcast` to confirm the bot sees you as an admin.
3. Send `/sendall Your message text` to broadcast text to all users saved after `/start`.
4. To broadcast a photo, send a photo with caption `/sendall Your caption text`.

No client names, client phone numbers, booking records or private database dumps are included in the public version.
