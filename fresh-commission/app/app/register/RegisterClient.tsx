"use client";
import { useState } from "react";

const COUNTRIES = ["Nigeria","Ghana","United Kingdom","Saudi Arabia","United Arab Emirates","United States","Canada","Egypt","Pakistan","India","Malaysia","Other"];

export default function RegisterClient() {
  const [error, setError] = useState("");
  const [ageBlocked, setAgeBlocked] = useState(false);
  const [success, setSuccess] = useState<null | { emailSent: boolean }>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(""); setAgeBlocked(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const dob = String(fd.get("dateOfBirth") || "");
    const data = {
      fullName: String(fd.get("fullName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
      dateOfBirth: dob,
      country: String(fd.get("country") || ""),
      preferredPace: String(fd.get("preferredPace") || "Regular"),
      agreeTerms: fd.get("agreeTerms") === "on",
    };
    if (!data.agreeTerms) { setError("You must agree to the Terms and Privacy Policy."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.status === 201 && json.ok) { setSuccess({ emailSent: json.emailSent }); }
      else if (res.status === 403 && json.code === "UNDER_16_NOT_OPEN") { setAgeBlocked(true); }
      else { setError(json.error || `Registration failed (status ${res.status}).`); }
    } catch { setError("A network error occurred. Please try again."); }
    setSubmitting(false);
  }

  if (success) {
    return (
      <main className="wrap" style={{paddingBlock:64}}>
        <div className="card" style={{textAlign:"center"}}>
          <h1>Your registration is recorded.</h1>
          <p style={{color:"var(--ink-soft)",marginTop:16}}>{success.emailSent ? "A confirmation has been sent to your email." : "Your registration is saved. We could not send the confirmation email just now, but admissions has been notified directly."}</p>
          <a className="btn" style={{marginTop:24,display:"inline-flex"}} href="/">Return home</a>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap" style={{paddingBlock:64}}>
      <h1>Begin your application.</h1>
      <p style={{color:"var(--ink-soft)",maxWidth:"60ch",marginTop:12,marginBottom:32}}>Registration is open now for students aged 16 and over.</p>
      <form className="card" onSubmit={onSubmit}>
        {error && <div className="err show">{error}</div>}
        {ageBlocked && <div className="err show">Al-Madeenah accepts students from age 10, but registration under 16 is not open yet — it awaits a named Safeguarding Lead. See the safeguarding policy for details.</div>}
        <div className="field"><label>Full name</label><input name="fullName" required minLength={2} /></div>
        <div className="row2">
          <div className="field"><label>Email</label><input type="email" name="email" required /></div>
          <div className="field"><label>Password</label><input type="password" name="password" required minLength={8} /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Date of birth</label><input type="date" name="dateOfBirth" required /></div>
          <div className="field"><label>Country</label><select name="country" required defaultValue=""><option value="" disabled>Select…</option>{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        </div>
        <div className="field"><label>Preferred pace</label>
          <select name="preferredPace" defaultValue="Regular"><option>Flexible</option><option>Regular</option><option>Intensive</option><option>Accelerated</option></select>
        </div>
        <div className="field" style={{flexDirection:"row",alignItems:"flex-start",gap:10}}>
          <input type="checkbox" name="agreeTerms" id="agreeTerms" style={{marginTop:4}} />
          <label htmlFor="agreeTerms" style={{textTransform:"none",fontWeight:400,fontSize:".9rem"}}>I agree to the Terms of Service and Privacy Policy.</label>
        </div>
        <button className="btn" type="submit" disabled={submitting} style={{width:"100%",justifyContent:"center"}}>{submitting ? "Submitting…" : "Submit registration"}</button>
      </form>
    </main>
  );
}
