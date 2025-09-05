/*
Node script that creates a Supabase Auth user using the service_role key
and then inserts the created user's id into the `admins` table.

Usage (locally):

SUPABASE_URL=https://<your-project>.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key> \
node scripts/create-admin.js "Full Name" email@example.com "P@ssw0rd!"

Warning: keep your service role key secret. Run this locally, do NOT commit the key.
*/

const fetch = require('node-fetch');
const { URL } = require('url');

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.error('Usage: node scripts/create-admin.js "Full Name" email@example.com "Password"');
    process.exit(1);
  }

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars');
    process.exit(1);
  }

  // 1) Create user via the Admin API
  const createResp = await fetch(new URL('/auth/v1/admin/users', SUPABASE_URL).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    }),
  });

  const createData = await createResp.json();
  if (!createResp.ok) {
    console.error('Failed to create user', createData);
    process.exit(1);
  }

  const userId = createData.id;
  console.log('User created with id:', userId);

  // 2) Insert into admins table using SQL REST or direct SQL via REST
  // We'll use the REST (PostgREST) endpoint: /rest/v1/admins
  const insertResp = await fetch(new URL('/rest/v1/admins', SUPABASE_URL).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ user_id: userId }),
  });

  const insertData = await insertResp.json();
  if (!insertResp.ok) {
    console.error('Failed to insert admin row', insertData);
    process.exit(1);
  }

  console.log('Admin row inserted:', insertData);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
