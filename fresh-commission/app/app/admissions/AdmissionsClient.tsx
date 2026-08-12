"use client";

import { PageShell } from "@/lib/PageShell";

const MAIN_HTML = `
<section class="hero">
  <svg class="plate" viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <path d="M60 560 L60 300 Q60 140 300 90 Q540 140 540 300 L540 560" stroke="#D9BC7B" stroke-width="1.2"/>
    <path d="M120 560 L120 320 Q120 190 300 150 Q480 190 480 320 L480 560" stroke="#D9BC7B" stroke-width="1"/>
    <line x1="60" y1="560" x2="540" y2="560" stroke="#D9BC7B" stroke-width="1.2"/>
  </svg>
  <div class="wrap">
    <span class="eyebrow rv"><span class="type">Admissions</span></span>
    <div class="rule rv rv-draw"></div>
    <h1 class="rv">Read everything, before you tell us anything.</h1>
    <p class="lead rv">Every programme, every pace, every fee band and the placement assessment
      are open to read without an account. You will not meet a signup wall until the moment you
      actually choose to apply — and that moment comes last, not first.</p>
    <div class="ctas rv">
      <a class="btn btn--primary" href="/register/">Apply now — ages 16 and over</a>
      <a class="btn btn--gilt" href="#">See fees by region</a>
    </div>
  </div>
</section>

<section class="section section--ivory">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">The journey</span>
      <h2>Five stages, in order — and what each one is for.</h2>
      <p class="lead section-head__lead">Nothing before stage three asks for a payment or an
        account. A stage is skipped only if it genuinely doesn't apply to you, never to save you
        a click.</p>
    </div>
    <ol class="steps">
      <li class="rv"><span class="steps__n" aria-hidden="true"></span>
        <div><h3>Explore</h3><p>Read the three faculties, the four paces, and the fee bands.
          Everything on this page is here before you have given us anything.</p></div></li>
      <li class="rv"><span class="steps__n" aria-hidden="true"></span>
        <div><h3>Place yourself</h3><p>A free, untimed self-assessment suggests where to start.
          It exists to answer "where would I even start?" — calibration, not a test to pass.</p></div></li>
      <li class="rv"><span class="steps__n" aria-hidden="true"></span>
        <div><h3>Apply</h3><p>One application, in one place, including a request for financial
          aid if you need it. There is never a second process for aid.</p></div></li>
      <li class="rv"><span class="steps__n" aria-hidden="true"></span>
        <div><h3>Decision</h3><p>Every application receives an answer. There is no silent
          rejection — a "not yet" is stated plainly, with the reason.</p></div></li>
      <li class="rv"><span class="steps__n" aria-hidden="true"></span>
        <div><h3>Orientation</h3><p>A short, unhurried orientation to the Study before your
          first live class — so the first real lesson is the first unfamiliar thing you meet.</p></div></li>
    </ol>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">Stage two</span>
      <h2>The placement assessment.</h2>
    </div>
    <div class="placement">
      <div class="rv">
        <p class="lead placement__intro">It exists to answer the one question that
          quietly stops most people from ever applying anywhere: <em>"where would I even start,
          and will I be embarrassed?"</em> An instrument that answers that with a mark has
          failed at its only job — so this one doesn't carry one.</p>
        <p>Six statements about what you can currently do in Arabic, answered honestly, at your
          own pace. The result is a suggested starting level, not a grade, and you can retake it
          as many times as you like as your own sense of where you stand changes.</p>
      </div>
      <div class="placement__card rv">
        <h3><svg class="icon" aria-hidden="true"><use href="#ic-target"/></svg>What to expect</h3>
        <ul class="placement__list">
          <li><svg class="icon"><use href="#ic-check"/></svg>Free, with no account required to begin</li>
          <li><svg class="icon"><use href="#ic-check"/></svg>Untimed and resumable — close the tab, come back later</li>
          <li><svg class="icon"><use href="#ic-check"/></svg>Unlimited retakes, whenever you want one</li>
          <li><svg class="icon"><use href="#ic-check"/></svg>A suggested level, never a score or a grade</li>
        </ul>
        <a class="btn btn--primary placement__cta" href="/register/">Begin the assessment</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--ivory">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">Stage three</span>
      <h2>Applying, honestly.</h2>
    </div>
    <div class="callout rv">
      <span class="callout__k">Institutional status</span>
      <p><strong>Applications are open — for students aged 16 and over.</strong> The College
        remains in its founding phase: no cohort has yet begun studying, and no first-intake
        date is confirmed. What has changed is that the application itself is real. Register
        now and you will hold a genuine place in the queue for the first intake, with a
        confirmation sent to your email the moment you submit.</p>
      <p>Registering asks for: your full name, your email address, a password to protect your
        account, your date of birth, your country of residence, and your preferred pace. Every
        registration is reviewed by admissions, and every applicant receives a real, individual
        answer — never a silent rejection.</p>
      <p><strong>Registration for students under 16</strong> — whom the College does accept
        from age 10 — is <strong>not yet open</strong>. The safeguarding structure the Academic
        &amp; Editorial Bible requires before any minor may be enrolled (a named Safeguarding
        Lead, a vetting standard, and a recording &amp; retention policy, all published) is not
        yet in place. If you enter a date of birth under 16 on the registration form, it will
        tell you this plainly rather than accepting the registration — see the
        <a href="/safeguarding/"> safeguarding policy</a> for exactly what is missing and why we
        will not skip it.</p>
      <div class="ctas" style="margin-top:22px">
        <a class="btn btn--primary" href="/register/">Register — ages 16 and over</a>
      </div>
      <p class="callout__date">Status last reviewed: 12 August 2026</p>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">Pace</span>
      <h2>Four paces. One standard underneath all of them.</h2>
      <p class="lead section-head__lead">The certificate does not record which pace you
        studied at — only the level you reached and the date you reached it.</p>
    </div>
    <div class="pacegrid">
      <div class="pacegrid__card rv">
        <h3>Flexible</h3>
        <p class="pacegrid__hrs">— <span>irregular</span></p>
        <p>For unstable schedules, caregiving, or shift work — study resumes whenever your week
          allows it.</p>
      </div>
      <div class="pacegrid__card rv">
        <h3>Regular</h3>
        <p class="pacegrid__hrs">4–6<span> h / week</span></p>
        <p>The default pace: real, steady progress alongside a full working life.</p>
      </div>
      <div class="pacegrid__card rv">
        <h3>Intensive</h3>
        <p class="pacegrid__hrs">10–14<span> h / week</span></p>
        <p>For a committed learner with genuine spare time to give it each week.</p>
      </div>
      <div class="pacegrid__card rv">
        <h3>Accelerated</h3>
        <p class="pacegrid__hrs">20–25<span> h / week</span></p>
        <p>Near full-time study, for a student able to treat this as their main commitment.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--ivory">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">Who this is for</span>
      <h2>Admission is not narrowed to one kind of student.</h2>
    </div>
    <ul class="whorow rv">
      <li>Adults</li><li>Professionals</li><li>Teachers &amp; trainee teachers</li>
      <li>Converts to Islam</li><li>Families studying in parallel</li><li>Teenagers (16+)</li>
    </ul>
    <p class="progrid__foot rv whorow__foot"><svg class="icon" aria-hidden="true"><use href="#ic-shield"/></svg>
      <span>Enrolment under 16 is not yet open. A safeguarding structure — a named
      Safeguarding Lead, a vetting standard, and a recording policy — must be operative and
      published first, without exception, before that changes. Read the
      <a href="/safeguarding/" style="color:var(--blue-700);font-weight:700;text-decoration:underline"> full safeguarding policy</a>.</span></p>
  </div>
</section>
`;

export default function AdmissionsClient() {
  return <PageShell locale="en" current="admissions" mainHtml={MAIN_HTML} />;
}
