// Diagnostic endpoint: reports whether the database and email key are wired
// up, without exposing any secret values. Used to verify activation.
const { Pool } = require("pg");

let pool = null;

module.exports = async (req, res) => {
  const candidates = ["DATABASE_URL", "DATABASE_POSTGRES_URL", "POSTGRES_URL", "STORAGE_URL"];
  let via = null;
  let cs = "";
  for (const name of candidates) {
    if (process.env[name]) {
      via = name;
      cs = process.env[name];
      break;
    }
  }

  let database = "missing";
  let registrants = null;
  if (cs) {
    try {
      if (!pool) {
        pool = new Pool({
          connectionString: cs,
          ssl: cs.includes("sslmode=disable") ? undefined : { rejectUnauthorized: false },
          max: 1,
        });
      }
      await pool.query("SELECT 1");
      database = "connected";
      try {
        // Row count only — no names, emails, or other personal data ever
        // appear on this diagnostic endpoint.
        const r = await pool.query("SELECT COUNT(*)::int AS n FROM registrants");
        registrants = r.rows[0].n;
      } catch (err) {
        // Table may not exist yet if nobody has registered since this
        // database was connected — that's a normal, expected state.
        registrants = 0;
      }
    } catch (err) {
      console.error("Health DB check failed:", err);
      database = "error";
    }
  }

  res.status(200).json({
    database: database,
    databaseVia: via,
    registrants: registrants,
    email: process.env.AGENTMAIL_API_KEY ? "configured" : "missing",
  });
};
