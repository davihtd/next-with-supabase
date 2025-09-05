This folder contains helper scripts to manage admins for the app.

1) Create the `admins` table
   - Open Supabase SQL editor and run `scripts/init-admins.sql`.

2) Create an admin user and insert into `admins`
   - Run locally with your service role key (do NOT commit it):

```bash
SUPABASE_URL=https://<your-project>.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key> \
node scripts/create-admin.js "Full Name" email@example.com "P@ssw0rd!"
```

Security notes
- The service role key can bypass RLS and should never be exposed in the browser or committed to source.
- Run these scripts only from a trusted environment (your machine).
