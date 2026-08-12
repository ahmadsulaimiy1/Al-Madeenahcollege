import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";
import { sendMail } from "@/lib/agentmail";

export const runtime = "nodejs";

const VALID_PACES = ["Flexible", "Regular", "Intensive", "Accelerated"];
const FOUNDER_NOTIFY_ADDRESS = "ojarptech@gmail.com";
const REGISTRANT_MIN_AGE = 16;

function computeAge(dob: Date, at: Date = new Date()): number {
  let age = at.getFullYear() - dob.getFullYear();
  const m = at.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && at.getDate() < dob.getDate())) age--;
  return age;
}

export async function POST(req: NextRequest) {
  // --- Gate 1: the database must be configured before anything else is
  // attempted. This must fail loudly and honestly — no fake success, no
  // ephemeral store, and no email sent for a "registration" that was never
  // actually recorded anywhere durable.
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error:
          "Registration is not yet fully activated — the database connection has not been configured. Please contact admissions@almadeenah.college.",
      },
      { status: 503 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const dateOfBirth = typeof body.dateOfBirth === "string" ? body.dateOfBirth : "";
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const preferredPace = typeof body.preferredPace === "string" ? body.preferredPace : "";
  const agreeTerms = body.agreeTerms === true;

  // --- Field validation ---
  const errors: string[] = [];
  if (fullName.length < 2) errors.push("Full name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
  if (password.length < 8) errors.push("Password must be at least 8 characters.");
  if (!country) errors.push("Country of residence is required.");
  if (!VALID_PACES.includes(preferredPace)) errors.push("A valid preferred pace is required.");
  if (!agreeTerms) errors.push("You must agree to the Terms and the Privacy Policy to register.");

  const dob = dateOfBirth ? new Date(dateOfBirth + "T00:00:00Z") : null;
  if (!dob || Number.isNaN(dob.getTime())) {
    errors.push("A valid date of birth is required.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const age = computeAge(dob as Date);

  // --- Gate 2: the safeguarding age gate. Enforced server-side regardless
  // of what the client already checked — never trust the client alone for
  // something this consequential.
  if (age < REGISTRANT_MIN_AGE) {
    return NextResponse.json(
      {
        error:
          "Registration for students under 16 is not open yet. Al-Madeenah accepts students from age 10, but the Bible's safeguarding gate requires a named Safeguarding Lead, a vetting standard, and a published recording & retention policy to be operative first — none of that exists yet. This is not a technical limitation; it is a deliberate, published condition. Please see the Safeguarding page for what is missing and check back once it has been resolved.",
        code: "UNDER_16_NOT_OPEN",
      },
      { status: 403 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const pool = getPool();
  let registrantId: string;
  try {
    const result = await pool.query(
      `INSERT INTO registrants (full_name, email, password_hash, date_of_birth, country, preferred_pace)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [fullName, email, passwordHash, dateOfBirth, country, preferredPace]
    );
    registrantId = result.rows[0].id;
  } catch (err: any) {
    if (err?.code === "23505") {
      // unique_violation on email
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }
    console.error("Registration DB error:", err);
    return NextResponse.json(
      { error: "Registration could not be saved due to a server error. Please try again shortly." },
      { status: 500 }
    );
  }

  // --- Emails: best-effort. The registration is already durably recorded,
  // so an email failure must never be reported back as a failed
  // registration — but it must also never be silently claimed to have
  // succeeded when it didn't.
  let emailSent = false;
  try {
    await sendMail({
      to: [email],
      subject: "Your registration — Al-Madeenah International College",
      text: `Assalamu alaikum ${fullName},

Thank you for registering with Al-Madeenah International College.

Your registration has been received and recorded. Here is what happens next, per the admissions journey:

- Your application enters review with admissions.
- Every application receives a real, individual answer — never a silent rejection.
- If accepted, you will receive a short, unhurried orientation to the Study before your first live class.

Details on file:
  Name: ${fullName}
  Preferred pace: ${preferredPace}
  Country: ${country}

The College remains in its founding phase — no cohort has yet begun studying, and this email does not constitute an offer of a place. If anything above is incorrect, or if you did not initiate this registration, please reply to this email or contact admissions.almadeenah@agentmail.to.

— Admissions, Al-Madeenah International College`,
      html: `<p>Assalamu alaikum ${escapeHtml(fullName)},</p>
<p>Thank you for registering with Al-Madeenah International College.</p>
<p>Your registration has been received and recorded. Here is what happens next, per the admissions journey:</p>
<ul>
  <li>Your application enters review with admissions.</li>
  <li>Every application receives a real, individual answer — never a silent rejection.</li>
  <li>If accepted, you will receive a short, unhurried orientation to the Study before your first live class.</li>
</ul>
<p><strong>Details on file</strong><br>
Name: ${escapeHtml(fullName)}<br>
Preferred pace: ${escapeHtml(preferredPace)}<br>
Country: ${escapeHtml(country)}</p>
<p>The College remains in its founding phase — no cohort has yet begun studying, and this email does not constitute an offer of a place. If anything above is incorrect, or if you did not initiate this registration, please reply to this email or contact admissions.almadeenah@agentmail.to.</p>
<p>— Admissions, Al-Madeenah International College</p>`,
    });

    await sendMail({
      to: [FOUNDER_NOTIFY_ADDRESS],
      subject: `New registration: ${fullName}`,
      text: `A new registration was recorded.

Name: ${fullName}
Email: ${email}
Date of birth: ${dateOfBirth} (age ${age})
Country: ${country}
Preferred pace: ${preferredPace}
Registrant ID: ${registrantId}
Recorded at: ${new Date().toISOString()}`,
      html: `<p>A new registration was recorded.</p>
<p>Name: ${escapeHtml(fullName)}<br>
Email: ${escapeHtml(email)}<br>
Date of birth: ${escapeHtml(dateOfBirth)} (age ${age})<br>
Country: ${escapeHtml(country)}<br>
Preferred pace: ${escapeHtml(preferredPace)}<br>
Registrant ID: ${escapeHtml(registrantId)}<br>
Recorded at: ${new Date().toISOString()}</p>`,
    });

    emailSent = true;
  } catch (err) {
    console.error("Registration email error (registration itself succeeded):", err);
  }

  return NextResponse.json(
    {
      ok: true,
      id: registrantId,
      emailSent,
    },
    { status: 201 }
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
