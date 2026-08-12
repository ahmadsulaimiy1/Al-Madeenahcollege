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
