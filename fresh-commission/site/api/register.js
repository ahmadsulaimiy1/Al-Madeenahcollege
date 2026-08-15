// Registration endpoint for the Al-Madeenah static site — a plain Vercel
// serverless function so it can live in the same project (and share the same
// connected database) as the static pages.
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const VALID_PACES = ["Flexible", "Regular", "Intensive", "Accelerated"];
const FOUNDER_NOTIFY_ADDRESS = "ojarptech@gmail.com";
const REGISTRANT_MIN_AGE = 16;

function connectionString() {
  return (
    process.env.DATABASE_URL ||
    process.env.DATABASE_POSTGRES_URL ||
    process.env.POSTGRES_URL ||
    process.env.STORAGE_URL ||
    ""
  );
}

let pool = null;
function getPool(cs) {
  if (!pool) {
    pool = new Pool({
      connectionString: cs,
      ssl: cs.includes("sslmode=disable") ? undefined : { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

let schemaReady = null;
function ensureSchema(cs) {
  if (!schemaReady) {
    schemaReady = getPool(cs)
      .query(
        `CREATE EXTENSION IF NOT EXISTS pgcrypto;
         CREATE TABLE IF NOT EXISTS registrants (
           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
           full_name TEXT NOT NULL,
           email TEXT NOT NULL UNIQUE,
           password_hash TEXT NOT NULL,
           date_of_birth DATE NOT NULL,
           country TEXT NOT NULL,
           preferred_pace TEXT NOT NULL CHECK (preferred_pace IN ('Flexible','Regular','Intensive','Accelerated')),
           created_at TIMESTAMPTZ NOT NULL DEFAULT now()
         );
         CREATE INDEX IF NOT EXISTS registrants_email_idx ON registrants (email);`
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null;
        throw err;
      });
  }
  return schemaReady;
}

async function sendMail(opts) {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) throw new Error("AGENTMAIL_API_KEY is not set — email not sent");
  const res = await fetch(
    "https://api.agentmail.to/v0/inboxes/" +
      encodeURIComponent("admissions.almadeenah@agentmail.to") +
      "/messages/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({ to: opts.to, subject: opts.subject, text: opts.text, html: opts.html }),
    }
  );
  if (!res.ok) throw new Error("AgentMail send failed: " + res.status);
}

function computeAge(dob, at) {
  const now = at || new Date();
  let age = now.getUTCFullYear() - dob.getUTCFullYear();
  const m = now.getUTCMonth() - dob.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < dob.getUTCDate())) age--;
  return age;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const cs = connectionString();
  if (!cs) {
    res.status(503).json({
      error:
        "Registration is not yet fully activated — the database connection has not been configured. Please contact admissions.",
    });
    return;
  }

  const body = req.body || {};
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const dateOfBirth = typeof body.dateOfBirth === "string" ? body.dateOfBirth : "";
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const preferredPace = typeof body.preferredPace === "string" ? body.preferredPace : "";
  const agreeTerms = body.agreeTerms === true;

  const errors = [];
  if (fullName.length < 2) errors.push("Full name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
  if (password.length < 8) errors.push("Password must be at least 8 characters.");
  if (!country) errors.push("Country of residence is required.");
  if (VALID_PACES.indexOf(preferredPace) === -1) errors.push("A valid preferred pace is required.");
  if (!agreeTerms) errors.push("You must agree to the Terms and the Privacy Policy to register.");

  const dob = dateOfBirth ? new Date(dateOfBirth + "T00:00:00Z") : null;
  if (!dob || Number.isNaN(dob.getTime())) errors.push("A valid date of birth is required.");
  if (errors.length > 0) {
    res.status(400).json({ error: errors.join(" ") });
    return;
  }

  const age = computeAge(dob);
  // Safeguarding gate, enforced server-side: under-16 registration stays
  // closed until a named Safeguarding Lead, vetting standard and recording
  // policy are published. Deliberate, published condition — not a bug.
  if (age < REGISTRANT_MIN_AGE) {
    res.status(403).json({
      error:
        "Registration for students under 16 is not open yet. Al-Madeenah accepts students from age 10, but a named Safeguarding Lead, a vetting standard, and a published recording & retention policy must be operative first — none of that exists yet.",
      code: "UNDER_16_NOT_OPEN",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await ensureSchema(cs);
  } catch (err) {
    console.error("Registration schema init error:", err);
    res.status(500).json({ error: "Registration could not be saved due to a server error. Please try again shortly." });
    return;
  }

  let registrantId;
  try {
    const result = await getPool(cs).query(
      `INSERT INTO registrants (full_name, email, password_hash, date_of_birth, country, preferred_pace)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [fullName, email, passwordHash, dateOfBirth, country, preferredPace]
    );
    registrantId = result.rows[0].id;
  } catch (err) {
    if (err && err.code === "23505") {
      res.status(409).json({ error: "An account with this email address already exists." });
      return;
    }
    console.error("Registration DB error:", err);
    res.status(500).json({ error: "Registration could not be saved due to a server error. Please try again shortly." });
    return;
  }

  // Emails are best-effort: the registration is already durably recorded, so
  // an email failure is reported honestly via emailSent:false, never as a
  // failed registration.
  let emailSent = false;
  try {
    await sendMail({
      to: [email],
      subject: "Your registration — Al-Madeenah International College",
      text:
        "Assalamu alaikum " + fullName + ",\n\n" +
        "Thank you for registering with Al-Madeenah International College. Your registration has been received and recorded, and enters review with admissions — every application receives a real, individual answer.\n\n" +
        "The College remains in its founding phase: no cohort has yet begun studying, and this email is not an offer of a place.\n\n" +
        "— Admissions, Al-Madeenah International College",
      html:
        "<p>Assalamu alaikum " + fullName + ",</p>" +
        "<p>Thank you for registering with Al-Madeenah International College. Your registration has been received and recorded, and enters review with admissions — every application receives a real, individual answer.</p>" +
        "<p>The College remains in its founding phase: no cohort has yet begun studying, and this email is not an offer of a place.</p>" +
        "<p>— Admissions, Al-Madeenah International College</p>",
    });
    await sendMail({
      to: [FOUNDER_NOTIFY_ADDRESS],
      subject: "New registration: " + fullName,
      text:
        "A new registration was recorded.\n\nName: " + fullName + "\nEmail: " + email +
        "\nDate of birth: " + dateOfBirth + " (age " + age + ")\nCountry: " + country +
        "\nPreferred pace: " + preferredPace + "\nRegistrant ID: " + registrantId,
      html:
        "<p>A new registration was recorded.</p><p>Name: " + fullName + "<br>Email: " + email +
        "<br>Date of birth: " + dateOfBirth + " (age " + age + ")<br>Country: " + country +
        "<br>Preferred pace: " + preferredPace + "<br>Registrant ID: " + registrantId + "</p>",
    });
    emailSent = true;
  } catch (err) {
    console.error("Registration email error (registration itself succeeded):", err);
  }

  res.status(201).json({ ok: true, id: registrantId, emailSent: emailSent });
};
