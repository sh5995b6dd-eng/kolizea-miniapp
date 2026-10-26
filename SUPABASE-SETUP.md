# KOLIZEA GROUP — Supabase setup

This folder contains a starter schema for moving the public task feed away from Appwrite.

## Create project
1. Open https://supabase.com/dashboard and sign in with Google.
2. Create a new project and save the database password somewhere private.
3. Open SQL Editor and run the complete contents of `supabase/schema.sql`.
4. In Project Settings / API (or Connect), copy the **Project URL** and **publishable key**. Do not copy a secret/service_role key into website code.

## Important
The website has not been switched to Supabase yet. The schema is a starter for public read-only tasks only. It deliberately does not allow public clients to add, edit, or delete tasks. Balances, worker accounts, task claims, and payouts require authentication and carefully designed policies/server-side validation; do not make them publicly writable.

Once the project is created, send the Project URL and publishable key here. A publishable key is intended for public clients, but the database still needs correct Row Level Security. Never send a secret/service_role key or database password.
