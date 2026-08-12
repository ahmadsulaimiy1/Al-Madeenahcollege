"use client";

import { PageShell } from "@/lib/PageShell";
import { LEGAL_CSS } from "@/lib/legal-css";

const MAIN_HTML = `
<section class="section section--ivory">
  <div class="wrap legal">
    <span class="eyebrow rv">Policy</span>
    <h1 class="rv" style="font-size:clamp(2rem,3.4vw,3rem);margin-top:14px">Terms of Service</h1>
    <p class="legal__meta rv">Last reviewed: 12 August 2026</p>

    <article class="rv">
      <h2>What Al-Madeenah currently is</h2>
      <p>Al-Madeenah International College for Arabic &amp; Islamic Studies is a distance-learning
        institution, currently in its <strong>founding phase</strong>. By registering or using
        this website, you accept the following plainly-stated facts about our current status,
        which we will not obscure or overstate:</p>
      <ul>
        <li>No cohort has yet begun studying, and no first-intake date is confirmed.</li>
        <li>The College does not currently hold, and does not claim to hold, university status,
          degree-granting authority, or accreditation from any regulator. We do not use the
          words "university," "degree," "diploma," or "accredited" to describe anything we
          offer until a competent regulator has said we may.</li>
        <li>No credential — certificate, ijāzah, or otherwise — is currently awardable, because
          no course of study has concluded. Registering reserves your place in the admissions
          queue; it is not an offer of a place, and it is not a credential of any kind.</li>
        <li>Where a fact about the College is not yet true, we say so, in the same voice we use
          for everything else. A gap admitted here is not a defect in these Terms — it is the
          policy working as intended.</li>
      </ul>

      <h2>Eligibility and registration</h2>
      <p>Registration is currently open to applicants aged 16 and over. The College accepts
        students from age 10, but registration for anyone under 16 is not open yet — see our
        <a href="/safeguarding/">safeguarding policy</a> for why. If you register, you confirm
        that the information you provide, including your date of birth, is accurate. Providing a
        false date of birth to circumvent the age gate is a serious breach of these Terms and
        may result in your registration being revoked.</p>

      <h2>Your account</h2>
      <p>You are responsible for keeping your password confidential and for all activity under
        your account. Tell us immediately at
        <a href="mailto:admissions.almadeenah@agentmail.to">admissions.almadeenah@agentmail.to</a>
        if you believe your account has been compromised. One account per person — do not
        register on behalf of someone else without their knowledge, except where you are a
        parent or guardian acting for a minor once under-16 registration is open and guardian
        consent has been properly recorded.</p>

      <h2>Acceptable use</h2>
      <p>You agree not to: impersonate another person; use the placement assessment or
        registration form to submit false information; attempt to gain unauthorised access to
        any part of the Study environment or another student's account; harass, threaten, or
        abuse another student, teacher, or staff member; or use the site for any unlawful
        purpose. We may suspend or terminate an account for a clear breach of this section.</p>

      <h2>Fees</h2>
      <p>Registration itself is free. No payment is currently collected at any stage of the
        registration process described on this site. If and when tuition fees, itemised fee
        schedules, or scholarship terms are introduced, they will be published clearly before
        any payment is requested — never assumed or auto-charged.</p>

      <h2>Changes to the service</h2>
      <p>Because the College is in its founding phase, the site, the Study environment, and the
        programmes described on it will change materially as the institution develops. We will
        not silently change what a registration means after the fact; where something material
        changes, we will say so, in the same place the original claim was made.</p>

      <h2>Limitation of liability</h2>
      <p>The site and registration process are provided on an "as is" basis during this founding
        phase. To the extent permitted by law, the College is not liable for indirect or
        consequential loss arising from your use of this site. Nothing in these Terms limits any
        liability that cannot lawfully be limited.</p>

      <h2>Governing law</h2>
      <p>The College's legal registration and jurisdiction of incorporation is a founder-level
        decision not yet finalised and publicly recorded. Until it is, we do not state a
        governing law here rather than assert one we cannot yet substantiate; this section will
        be completed the moment that decision is made and will not be backfilled quietly.</p>

      <h2>Contact</h2>
      <p>Questions about these Terms go to
        <a href="mailto:admissions.almadeenah@agentmail.to">admissions.almadeenah@agentmail.to</a>.</p>
    </article>
  </div>
</section>
`;

export default function TermsClient() {
  return (
    <PageShell
      locale="en"
      current="other"
      mainHtml={MAIN_HTML}
      extraCss={LEGAL_CSS}
    />
  );
}
