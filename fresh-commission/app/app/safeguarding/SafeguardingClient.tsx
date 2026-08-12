"use client";

import { PageShell } from "@/lib/PageShell";
import { LEGAL_CSS } from "@/lib/legal-css";

const MAIN_HTML = `
<section class="section section--ivory">
  <div class="wrap legal">
    <span class="eyebrow rv">Policy</span>
    <h1 class="rv" style="font-size:clamp(2rem,3.4vw,3rem);margin-top:14px">Safeguarding Policy</h1>
    <p class="legal__meta rv">Last reviewed: 12 August 2026</p>

    <article class="rv">
      <div class="callout">
        <span class="callout__k">Current status</span>
        <p><strong>Safeguarding Lead: to be named by the Founder.</strong> This page will be
          updated the moment that appointment is confirmed, and registration for students under
          16 will not open before it is.</p>
      </div>

      <h2>Why this page exists before that appointment does</h2>
      <p>Al-Madeenah International College teaches at a distance, sometimes one-to-one over live
        video, and it accepts students from age 10. An institution in that position takes on a
        safeguarding obligation the moment it opens registration to families — not the moment
        its first child actually enrols. The College's Academic &amp; Editorial Bible (Part II,
        §9) treats safeguarding as <strong>a gate, not a policy document</strong>: a fixed set of
        things that must exist and be published <em>before</em> any student under 16 may
        register, with no exception made for enthusiasm, demand, or convenience.</p>
      <p>Applying that gate, the College has opened registration first for applicants aged 16 and
        over, for whom the risk profile and the applicable structure differ, while registration
        for the 10–15 age range stays closed until the conditions below are met in full.</p>

      <h2>What must exist before under-16 registration opens</h2>
      <ol>
        <li><strong>A named Safeguarding Lead</strong>, independent of the teaching line, with
          clear authority to act on a concern regardless of who it is about.</li>
        <li><strong>A vetting standard</strong> for every adult who will have unsupervised
          contact with a minor — calibrated to the strictest jurisdiction the College actually
          operates in, not the most convenient one.</li>
        <li><strong>A published policy on recording, retaining, and deleting</strong> any live
          session involving a minor, so that both the student's privacy and the ability to
          review a concern are protected.</li>
        <li><strong>A stated reporting channel</strong> — how a student, a parent, or a member of
          staff raises a concern, and what happens to it after they do.</li>
      </ol>
      <p>None of these presently exist in a completed, published form. That is the honest reason
        this page still carries a placeholder rather than a name — not a technical limitation,
        and not an oversight we hope nobody notices.</p>

      <h2>What is already true today</h2>
      <ul>
        <li>Registration for anyone under 16 is declined by the registration system itself, not
          merely discouraged — a date of birth indicating an applicant is under 16 produces a
          plain, visible explanation instead of a silent block or a fake acceptance.</li>
        <li>No data beyond what is needed to explain that decline is retained from a declined
          under-16 registration attempt.</li>
        <li>Registration for applicants aged 16 and over is genuinely open and reviewed
          individually by admissions.</li>
      </ul>

      <h2>What changes once the gate is met</h2>
      <p>When the Safeguarding Lead is named and the vetting, recording, and reporting structure
        above is published, this page will be rewritten to describe it — with a real name, a
        real vetting standard, and a real recording policy, not a restatement of this notice with
        the date changed. At that point, and not before, registration will open for students
        aged 10–15, and it will require a parent or guardian's recorded consent before any such
        registration is accepted.</p>

      <h2>If you have a concern now</h2>
      <p>If you have a safeguarding concern involving this institution before the structure above
        exists — including about the conduct of anyone claiming to represent Al-Madeenah — email
        <a href="mailto:admissions.almadeenah@agentmail.to">admissions.almadeenah@agentmail.to</a>
        directly. It will be treated as priority correspondence and escalated to the Founder,
        since no delegated Safeguarding Lead yet exists to receive it.</p>

      <h2>Related</h2>
      <p>See also our <a href="/privacy/">Privacy Policy</a> for how personal data — including,
        eventually, guardian consent records — is handled, and our <a href="/terms/">Terms of
        Service</a> for the founding-phase status this policy sits alongside.</p>
    </article>
  </div>
</section>
`;

export default function SafeguardingClient() {
  return (
    <PageShell
      locale="en"
      current="other"
      mainHtml={MAIN_HTML}
      extraCss={LEGAL_CSS}
    />
  );
}
