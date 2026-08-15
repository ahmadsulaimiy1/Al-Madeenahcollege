"use client";

import { PageShell } from "@/lib/PageShell";
import { LEGAL_CSS } from "@/lib/shared";

const MAIN_HTML = `
<section class="section section--ivory">
  <div class="wrap legal">
    <span class="eyebrow rv">Policy</span>
    <h1 class="rv" style="font-size:clamp(2rem,3.4vw,3rem);margin-top:14px">Privacy Policy</h1>
    <p class="legal__meta rv">Last reviewed: 12 August 2026</p>

    <article class="rv">
      <h2>Who this concerns</h2>
      <p>This policy covers personal data collected by Al-Madeenah International College
        ("the College", "we", "us") through this website — currently the registration form at
        <a href="/register/">/register</a> — and, once operative, the Study environment students
        use to attend classes and track progress. It applies to prospective and enrolled
        students and, for students under 18, their parents or guardians.</p>

      <h2>What we collect</h2>
      <p>When you register, we collect: your full name, email address, a password (which we
        hash — see below, we never see or store it in readable form), date of birth, country of
        residence, and your preferred study pace. Your date of birth is used specifically to
        apply the safeguarding age gate described in our <a href="/safeguarding/">safeguarding
        policy</a> — registration for anyone under 16 is declined rather than accepted, and
        nothing else about that submission is retained beyond what is needed to explain the
        decline to you.</p>
      <p>If and when registration opens for students aged 10–15, we will also collect a parent
        or guardian's name, contact details, and recorded consent before any such registration
        is accepted — this policy will be updated in the same place, in advance, when that
        happens.</p>
      <p>We do not currently run analytics, advertising trackers, or non-essential cookies on
        this site. If that changes, this section will say so plainly, with what was added and
        why.</p>

      <h2>Why we collect it</h2>
      <ul>
        <li>To process and review your registration or application.</li>
        <li>To verify age eligibility against the safeguarding gate described above.</li>
        <li>To contact you about the status of your application and, once you are a student,
          about your studies.</li>
        <li>To maintain the account and password that let you sign in to the Study.</li>
        <li>To meet legal, regulatory, or safeguarding obligations that apply to the College.</li>
      </ul>
      <p>We do not use your data to build an advertising profile, and we do not sell it. There is
        currently no marketing mailing list separate from the admissions and study
        correspondence described above.</p>

      <h2>How your password is handled</h2>
      <p>Your password is hashed with bcrypt on our server the moment you submit the
        registration form, before it is ever written to a database. The plaintext password is
        never stored, never logged, and never visible to anyone at the College, including
        administrators. If you forget your password, we cannot look it up — the process is to
        reset it, not retrieve it.</p>

      <h2>Where your data is stored</h2>
      <p>Registration data is stored in a Postgres database operated on the College's behalf by
        its infrastructure provider, access to which is restricted to the individuals who
        administer this system. We do not currently operate our own physical servers; our
        infrastructure and email providers process data on our instructions under their own
        security commitments.</p>

      <h2>Who we share it with</h2>
      <p><strong>Nobody. No third parties</strong> — we do not sell, rent, or share your personal
        data with advertisers, data brokers, or any other outside organisation, under any
        circumstances, except where we are legally required to disclose it (for example, in
        response to a valid court order), or where sharing is necessary to protect the safety of
        a child under our safeguarding obligations. If we are ever compelled to disclose your
        data, and we are legally permitted to tell you, we will.</p>

      <h2>How long we keep it</h2>
      <p>We retain registration and account data for as long as your application is active or
        you remain a student, and for a reasonable period afterward to handle any follow-up
        questions, appeals, or legal obligations. If your registration is declined, unsuccessful,
        or you ask us to delete your data, we remove it within 30 days unless we are required to
        keep a minimal record (for example, of an under-16 registration attempt, for
        safeguarding audit purposes) for longer.</p>

      <h2>Your rights</h2>
      <p>You may ask us, at any time, to: tell you what data we hold about you; correct
        inaccurate data; delete your data (subject to the retention exceptions above); or export
        a copy of your data in a portable format. To do any of these, email
        <a href="mailto:admissions.almadeenah@agentmail.to">admissions.almadeenah@agentmail.to</a>
        from the email address on your registration. We will respond, and act, within a
        reasonable time — we aim for 30 days.</p>

      <h2>Children's privacy</h2>
      <p>Registration is currently open only to applicants aged 16 and over. We do not knowingly
        collect personal data from anyone under 16 through the registration form; the form
        itself is designed to decline, rather than silently accept, a date of birth indicating
        an applicant is under 16. See our <a href="/safeguarding/">safeguarding policy</a> for
        the structure that must exist before that changes.</p>

      <h2>Changes to this policy</h2>
      <p>If this policy changes, the "Last reviewed" date at the top of this page will change
        with it. We will not make a material change that expands how we use existing data
        without saying so clearly here first.</p>

      <h2>Contact</h2>
      <p>Questions about this policy, or about your data specifically, go to
        <a href="mailto:admissions.almadeenah@agentmail.to">admissions.almadeenah@agentmail.to</a>.</p>
    </article>
  </div>
</section>
`;

export default function PrivacyClient() {
  return (
    <PageShell
      locale="en"
      current="other"
      mainHtml={MAIN_HTML}
      extraCss={LEGAL_CSS}
    />
  );
}
