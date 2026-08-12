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
    <span class="eyebrow rv"><span class="type">Arabic · Qur'an · Islamic Sciences</span></span>
    <div class="rule rv rv-draw"></div>
    <h1 class="rv">A serious education in Arabic and the Islamic sciences — wherever you are.</h1>
    <p class="ar rv" lang="ar">تعليمٌ جادٌّ في اللغة العربية والعلوم الإسلامية، أينما كنت.</p>
    <p class="lead rv">Al-Madeenah is built for a student studying from a phone, a break room, or a
      borrowed connection — not a campus with a login screen bolted on. Progress is decided by
      demonstrated mastery in front of a qualified teacher, never by the calendar.</p>
    <div class="ctas rv">
      <a class="btn btn--primary" href="/admissions/">Take the placement assessment — free</a>
      <a class="btn btn--gilt" href="/admissions/">Read the academic model</a>
    </div>
    <div class="status rv" id="status">
      <span class="dot" aria-hidden="true"></span>
      <p><strong>This is a founding-phase institution.</strong> No cohort
        has yet started, and nothing is claimed that cannot presently be evidenced.
        <a href="/admissions/">Read the honesty statement →</a></p>
    </div>
  </div>
</section>

<section class="section section--ivory">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">The academic ladder</span>
      <h2>Three faculties. One standard.</h2>
      <p class="lead section-head__lead">Every faculty is assessed against a published mastery
        standard, at a pace the student chooses — never the reverse.</p>
    </div>

    <div class="progrid">
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-book"/></svg></span>
        <h3>Faculty of Arabic Language <span class="ar" lang="ar">كلية اللغة العربية</span></h3>
        <p>Arabic taught as the instrument that opens the tradition — assessed across reading,
          listening, speaking, writing and classical-text comprehension, not conversational
          fluency alone.</p>
        <ul class="progrid__tags"><li>Reading</li><li>Listening</li><li>Speaking</li><li>Writing</li><li>Classical text</li></ul>
      </article>
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-scroll"/></svg></span>
        <h3>Faculty of Qur'an <span class="ar" lang="ar">كلية القرآن</span></h3>
        <p>Nazrah, tajwīd, makhārij and recitation, memorisation measured by <em>retention</em> —
          verified by unannounced re-testing, not pages reached and left behind.</p>
        <ul class="progrid__tags"><li>Tajwīd</li><li>Ḥifẓ</li><li>Murājaʿah</li><li>Recitation assessment</li></ul>
      </article>
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-scale"/></svg></span>
        <h3>Faculty of Islamic Sciences <span class="ar" lang="ar">كلية العلوم الشرعية</span></h3>
        <p>ʿAqīdah, fiqh taught from named texts for one stated madhhab, ḥadīth, sīrah and uṣūl —
          with recognised differences among the schools taught respectfully, never litigated.</p>
        <ul class="progrid__tags"><li>ʿAqīdah</li><li>Fiqh</li><li>Ḥadīth</li><li>Sīrah</li></ul>
      </article>
    </div>
    <p class="progrid__foot rv"><svg class="icon" aria-hidden="true"><use href="#ic-brief"/></svg>
      <span>A separate, deliberately lower-weight <strong>Professional &amp;
      Specialist Programmes</strong> stream — teacher development, professional and corporate
      Arabic, seasonal intensives — sits outside this core ladder, so it is never mistaken for
      three years of core study.</span></p>
  </div>
</section>
`;

export default function HomeClient() {
  return <PageShell locale="en" current="home" mainHtml={MAIN_HTML} />;
}
