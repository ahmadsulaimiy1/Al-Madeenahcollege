import { Pool } from "pg";

// Lazy singleton pool. Only ever constructed when DATABASE_URL is present —
// callers must check process.env.DATABASE_URL themselves before importing
// this in a code path that runs (see app/api/register/route.ts), since
// registration must fail loudly and honestly when it isn't configured
// rather than attempting a connection that was never going to work.
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Most managed Postgres providers (Neon, Supabase, RDS, Vercel
      // Postgres) require TLS and present a certificate that Node's default
      // trust store may not chain to; reject only truly invalid handshakes.
      ssl: process.env.DATABASE_URL?.includes("sslmode=disable")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Applies schema.sql idempotently against a fresh database on first use, so
// standing up a new Postgres instance (e.g. a brand-new Neon database) needs
// no manual SQL step — the very first request that touches the DB creates
// what it needs. Safe to call on every cold start: CREATE ... IF NOT EXISTS.
let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE EXTENSION IF NOT EXISTS pgcrypto;
         CREATE TABLE IF NOT EXISTS registrants (
           id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
           full_name        TEXT NOT NULL,
           email            TEXT NOT NULL UNIQUE,
           password_hash    TEXT NOT NULL,
           date_of_birth    DATE NOT NULL,
           country          TEXT NOT NULL,
           preferred_pace   TEXT NOT NULL CHECK (preferred_pace IN ('Flexible', 'Regular', 'Intensive', 'Accelerated')),
           created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
         );
         CREATE INDEX IF NOT EXISTS registrants_email_idx ON registrants (email);
         CREATE INDEX IF NOT EXISTS registrants_created_at_idx ON registrants (created_at);`
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null; // allow retry on the next request rather than sticking on a transient failure
        throw err;
      });
  }
  return schemaReady;
}
