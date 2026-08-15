import { Pool } from "pg";
let pool: Pool | null = null;
export function getPool(): Pool {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL?.includes("sslmode=disable") ? undefined : { rejectUnauthorized: false } });
  return pool;
}
let schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool().query(`CREATE EXTENSION IF NOT EXISTS pgcrypto; CREATE TABLE IF NOT EXISTS registrants (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), full_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, date_of_birth DATE NOT NULL, country TEXT NOT NULL, preferred_pace TEXT NOT NULL CHECK (preferred_pace IN ('Flexible','Regular','Intensive','Accelerated')), created_at TIMESTAMPTZ NOT NULL DEFAULT now()); CREATE INDEX IF NOT EXISTS registrants_email_idx ON registrants (email);`).then(() => undefined).catch((err) => { schemaReady = null; throw err; });
  }
  return schemaReady;
}
const AGENTMAIL_BASE = "https://api.agentmail.to/v0";
const SENDING_INBOX = "admissions.almadeenah@agentmail.to";
export class AgentMailError extends Error {}
export async function sendMail(opts: { to: string[]; subject: string; text: string; html: string }): Promise<void> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) throw new AgentMailError("AGENTMAIL_API_KEY is not set");
  const res = await fetch(`${AGENTMAIL_BASE}/inboxes/${encodeURIComponent(SENDING_INBOX)}/messages/send`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify(opts) });
  if (!res.ok) throw new AgentMailError(`AgentMail send failed: ${res.status}`);
}
