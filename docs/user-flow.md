# User Flow

```text
Mini App -> information -> bot -> client data -> booking -> profile
```

1. The user opens the TotalBody Telegram Mini App.
2. The Mini App shows information about the studio, services, directions, prices, FAQ, gallery and addresses.
3. The user chooses a CTA such as booking, trial class or contact.
4. The CTA leads to the Telegram bot or a public demo booking placeholder.
5. The bot receives `/start`, greets the user and stores basic Telegram profile data.
6. The user continues the booking conversation in Telegram.
7. The saved profile can be used for future service communication and admin broadcasts.

The public version does not include real booking records, private CRM data or client databases.
