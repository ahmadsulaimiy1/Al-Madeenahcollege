-- Al-Madeenah International College — registrants table
--
-- Apply this to the Postgres database referenced by the DATABASE_URL
-- environment variable before registration can go live. Until DATABASE_URL
-- is set, POST /api/register returns 503 and never attempts to write here.
--
-- Passwords are hashed with bcrypt (via bcryptjs) server-side before this
-- table is ever touched — password_hash never holds a plaintext password.

CREATE TABLE IF NOT EXISTS registrants (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- requires pgcrypto, see below
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL UNIQUE,
  password_hash    TEXT NOT NULL,
  date_of_birth    DATE NOT NULL,
  country          TEXT NOT NULL,
  preferred_pace   TEXT NOT NULL CHECK (preferred_pace IN ('Flexible', 'Regular', 'Intensive', 'Accelerated')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- gen_random_uuid() needs the pgcrypto extension (available on every
-- mainstream managed Postgres — Vercel Postgres / Neon / Supabase / RDS).
-- Run this once, before creating the table above, if it isn't already on:
--
--   CREATE EXTENSION IF NOT EXISTS pgcrypto;
--
-- If pgcrypto cannot be enabled, swap the id column for:
--   id BIGSERIAL PRIMARY KEY

CREATE INDEX IF NOT EXISTS registrants_email_idx ON registrants (email);
CREATE INDEX IF NOT EXISTS registrants_created_at_idx ON registrants (created_at);
