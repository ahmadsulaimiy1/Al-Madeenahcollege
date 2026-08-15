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
    } catch (err) {
      console.error("Health DB check failed:", err);
      database = "error";
    }
  }

  res.status(200).json({
    database: database,
    databaseVia: via,
    email: process.env.AGENTMAIL_API_KEY ? "configured" : "missing",
  });
};
