// Shared header / mobile drawer / footer markup, parameterised by locale and
// the current page, so every route (ported or new) carries identical,
// consistent chrome — including the real /privacy, /terms and /safeguarding
// links that replace the static design's "#" placeholders.

export type Locale = "en" | "ar";
export type NavKey = "home" | "admissions" | "study" | "other";

const SEAL = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4 L24 44 M10 44 Q10 20 24 12 Q38 20 38 44" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="9" r="2.2" fill="currentColor"/></svg>`;

const T = {
  en: {
    dir: "ltr",
    email: "admissions@almadeenah.college",
    contactNumbers: "Contact numbers by region",
    readingSize: "Reading size",
    signIn: "Sign in",
    tag: "Founding phase · Fully distance-learning",
    beginPlacement: "Begin placement",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    searchAria: "Search the College",
    navInst: "The Institution",
    navAcademics: "Academics",
    navAdmissions: "Admissions",
    navStudy: "The Study",
    navCredentials: "Credentials",
    navNews: "News",
    navContact: "Contact",
    subSignIn: "Sign in to the Study",
    subPlacement: "Placement assessment",
    subVerify: "Verify a credential",
    subBible: "The Academic Bible",
    subContact: "Contact admissions",
    noticesText: "Notices — no active announcements yet",
    noticesLink: "View all →",
    brandWord: "Al-Madeenah",
    brandSmall: "International College",
    brandAr: "كلية المدينة العالمية للدراسات العربية والإسلامية",
    glanceLabel: "The institution, at a glance",
    footTagline:
      "A distance-learning college for Arabic language, Qur'an and the Islamic sciences — fixed standards, flexible pace.",
    footStatus:
      "Founding phase — no cohort has yet begun teaching.",
    copyright: "© Al-Madeenah International College for Arabic & Islamic Studies",
  },
  ar: {
    dir: "rtl",
    email: "admissions@almadeenah.college",
    contactNumbers: "أرقام التواصل حسب المنطقة",
    readingSize: "حجم القراءة",
    signIn: "تسجيل الدخول",
    tag: "مرحلة التأسيس · تعليم عن بُعد بالكامل",
    beginPlacement: "ابدأ التقييم",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    searchAria: "البحث في موقع الكلية",
    navInst: "المؤسسة",
    navAcademics: "البرامج الأكاديمية",
    navAdmissions: "القبول",
    navStudy: "الدراسة",
    navCredentials: "الشهادات",
    navNews: "الأخبار",
    navContact: "التواصل",
    subSignIn: "الدخول إلى الدراسة",
    subPlacement: "تقييم المستوى",
    subVerify: "تحقّق من شهادة",
    subBible: "الميثاق الأكاديمي",
    subContact: "تواصل مع القبول",
    noticesText: "الإعلانات — لا إعلانات فعّالة حاليًا",
    noticesLink: "عرض الكل ←",
    brandWord: "المدينة",
    brandSmall: "INTERNATIONAL COLLEGE",
    brandAr: "",
    glanceLabel: "الكلية في لمحة",
    footTagline:
      "كليةٌ للتعليم عن بُعد في اللغة العربية والقرآن الكريم والعلوم الإسلامية — معيارٌ ثابت، ووتيرة مرنة.",
    footStatus: "مرحلة التأسيس — لم يبدأ أي فوج دراسي التدريس بعد.",
    copyright: "© كلية المدينة العالمية للدراسات العربية والإسلامية",
  },
} as const;

function flip(locale: Locale) {
  return locale === "ar" ? " icon--flip" : "";
}

export function headerHtml(locale: Locale, current: NavKey, homeHref: string): string {
  const t = T[locale];
  const langSwitch =
    locale === "en"
      ? `<a href="/" aria-current="true">EN</a><a href="/ar/" lang="ar">العربية</a>`
      : `<a href="/ar/" aria-current="true">العربية</a><a href="/" lang="en" class="latin">EN</a>`;
  const arrow = locale === "ar" ? "←" : "→";

  return `
<header class="header">
  <div class="util">
    <div class="wrap">
      <div class="util__left">
        <a href="mailto:${t.email}"><svg class="icon"><use href="#ic-mail"/></svg>${t.email}</a>
        <a href="#"><svg class="icon"><use href="#ic-phone"/></svg>${t.contactNumbers}</a>
      </div>
      <div class="util__right">
        <a href="#" data-read-step><svg class="icon"><use href="#ic-type"/></svg><span>${t.readingSize}</span></a>
        <span aria-hidden="true">·</span>
        <div class="util__lang">${langSwitch}</div>
        <span aria-hidden="true">·</span>
        <a href="/study/"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg><span>${t.signIn}</span></a>
      </div>
    </div>
  </div>

  <div class="identity">
    <div class="wrap">
      <a class="brand" href="${homeHref}">
        <span class="brand__seal">${SEAL}</span>
        <span class="word">${t.brandWord}<small${locale === "ar" ? ' class="latin"' : ""}>${t.brandSmall}</small></span>
      </a>
      <p class="identity__tag"><i></i>${t.tag}<i></i></p>
      <div class="identity__actions">
        <button class="iconbtn" aria-label="${t.searchAria}"><svg class="icon"><use href="#ic-search"/></svg></button>
        <a class="btn btn--gilt btn--sm" href="/admissions/">${t.beginPlacement}</a>
        <button class="navtoggle iconbtn" aria-label="${t.openMenu}" data-drawer-open><svg class="icon"><use href="#ic-menu"/></svg></button>
      </div>
    </div>
  </div>

  <nav class="navgrid" aria-label="Primary">
    <div class="wrap"><div class="navgrid__row">
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-inst"/></svg></span><span>${t.navInst}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-book"/></svg></span><span>${t.navAcademics}</span></a>
      <a href="/admissions/"${current === "admissions" ? ' aria-current="page"' : ""}><span class="navgrid__badge"><svg class="icon"><use href="#ic-doc"/></svg></span><span>${t.navAdmissions}</span></a>
      <a href="/study/"${current === "study" ? ' aria-current="page"' : ""}><span class="navgrid__badge"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg></span><span>${t.navStudy}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-ribbon"/></svg></span><span>${t.navCredentials}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-bell"/></svg></span><span>${t.navNews}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-mail"/></svg></span><span>${t.navContact}</span></a>
    </div></div>
  </nav>

  <div class="subnav">
    <div class="wrap">
      <a href="/study/" class="is-primary"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg>${t.subSignIn}</a>
      <a href="/admissions/"><svg class="icon"><use href="#ic-target"/></svg>${t.subPlacement}</a>
      <a href="#"><svg class="icon"><use href="#ic-check"/></svg>${t.subVerify}</a>
      <a href="#"><svg class="icon"><use href="#ic-book"/></svg>${t.subBible}</a>
      <a href="mailto:${t.email}"><svg class="icon"><use href="#ic-mail"/></svg>${t.subContact}</a>
    </div>
  </div>

  <div class="notices">
    <div class="wrap">
      <div class="notices__l"><svg class="icon"><use href="#ic-bell"/></svg>${t.noticesText}</div>
      <a href="#">${t.noticesLink}</a>
    </div>
  </div>
</header>

<div class="drawer" id="drawer">
  <div class="drawer__top">
    <a class="brand" href="${homeHref}"><span class="brand__seal">${SEAL}</span><span class="word">${t.brandWord}</span></a>
    <button class="drawer__close" aria-label="${t.closeMenu}" data-drawer-close><svg class="icon"><use href="#ic-close"/></svg></button>
  </div>
  <div class="drawer__actions">
    <a href="/study/" class="is-primary">${t.subSignIn}<span>${arrow}</span></a>
    <a href="/admissions/">${t.subPlacement}<span>${arrow}</span></a>
    <a href="#">${t.subVerify}<span>${arrow}</span></a>
  </div>
  <nav class="drawer__grid" aria-label="Primary">
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-inst"/></svg></span>${t.navInst}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-book"/></svg></span>${t.navAcademics}</a>
    <a href="/admissions/"><span class="drawer__badge"><svg class="icon"><use href="#ic-doc"/></svg></span>${t.navAdmissions}</a>
    <a href="/study/"><span class="drawer__badge"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg></span>${t.navStudy}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-ribbon"/></svg></span>${t.navCredentials}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-bell"/></svg></span>${t.navNews}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-mail"/></svg></span>${t.navContact}</a>
  </nav>
  <div class="drawer__util">
    <span>${t.readingSize} · ${locale === "en" ? `<a href="/">EN</a> / <a href="/ar/">العربية</a>` : `<a href="/ar/">العربية</a> / <a href="/">EN</a>`}</span>
    <span>${locale === "en" ? "Founding phase" : "مرحلة التأسيس"}</span>
  </div>
</div>`;
}

export function footerHtml(locale: Locale): string {
  const t = T[locale];
  const en = locale === "en";
  const arSpan = t.brandAr
    ? `<span class="ar" lang="ar">${t.brandAr}</span>`
    : `<span class="latin brandblock__en">Al-Madeenah International College</span>`;

  const glance = en
    ? [
        ["#", "ic-scale", "Governance"],
        ["#", "ic-book", "Faculty of Arabic"],
        ["#", "ic-scroll", "Faculty of Qur'an"],
        ["#", "ic-scale", "Islamic Sciences"],
        ["#", "ic-brief", "Professional Programmes"],
        ["/admissions/", "ic-target", "Placement Assessment"],
        ["/admissions/", "ic-doc", "Admissions"],
        ["/register/", "ic-check", "Register (16+)"],
        ["#", "ic-coin", "Fees &amp; Scholarships"],
        ["/study/", "ic-signin", "Sign in to the Study"],
        ["#", "ic-ribbon", "Award Ladder"],
        ["#", "ic-check", "Verify a Credential"],
        ["/safeguarding/", "ic-shield", "Safeguarding"],
        ["/privacy/", "ic-lock", "Privacy &amp; Data"],
        ["/terms/", "ic-doc", "Terms"],
        ["#", "ic-mail", "Contact"],
      ]
    : [
        ["#", "ic-scale", "الحوكمة"],
        ["#", "ic-book", "كلية اللغة العربية"],
        ["#", "ic-scroll", "كلية القرآن"],
        ["#", "ic-scale", "العلوم الشرعية"],
        ["#", "ic-brief", "البرامج المهنية"],
        ["/admissions/", "ic-target", "تقييم المستوى"],
        ["/admissions/", "ic-doc", "القبول"],
        ["/register/", "ic-check", "التسجيل (١٦+)"],
        ["#", "ic-coin", "الرسوم والمنح"],
        ["/study/", "ic-signin", "الدخول إلى الدراسة"],
        ["#", "ic-ribbon", "سلّم الشهادات"],
        ["#", "ic-check", "تحقّق من شهادة"],
        ["/safeguarding/", "ic-shield", "الحماية والسلامة"],
        ["/privacy/", "ic-lock", "الخصوصية والبيانات"],
        ["/terms/", "ic-doc", "الشروط"],
        ["#", "ic-mail", "التواصل"],
      ];

  const glanceHtml = glance
    .map(
      ([href, icon, label]) =>
        `<a href="${href}"><span class="glance__badge"><svg class="icon${
          icon === "ic-signin" ? flip(locale) : ""
        }"><use href="#${icon}"/></svg></span><span>${label}</span></a>`
    )
    .join("\n        ");

  const cols = en
    ? [
        {
          summary: "Institution",
          items: [
            ["#", "About"],
            ["#", "Governance"],
            ["#", "The Academic &amp; Editorial Bible"],
            ["#", "Honesty &amp; status register"],
            ["/safeguarding/", "Safeguarding"],
            ["#", "Teach with us"],
          ],
        },
        {
          summary: "Academics",
          items: [
            ["#", "Faculty of Arabic"],
            ["#", "Faculty of Qur'an"],
            ["#", "Faculty of Islamic Sciences"],
            ["#", "Professional &amp; Specialist Programmes"],
            ["#", "The Itqān method"],
          ],
        },
        {
          summary: "Admissions &amp; Study",
          items: [
            ["/admissions/", "The journey"],
            ["/admissions/", "Placement assessment"],
            ["/register/", "Apply / Register (16+)"],
            ["#", "Fees &amp; scholarships"],
            ["/study/", "Sign in to the Study"],
          ],
        },
        {
          summary: "Credentials &amp; Policies",
          items: [
            ["#", "The award ladder"],
            ["#", "Verify a credential"],
            ["/privacy/", "Privacy notice"],
            ["/terms/", "Terms"],
            ["/safeguarding/", "Safeguarding policy"],
          ],
        },
        {
          summary: "Contact",
          items: [
            ["mailto:admissions.almadeenah@agentmail.to", "Admissions enquiries"],
            ["mailto:admissions.almadeenah@agentmail.to", "General contact"],
            ["#", "Teach with us"],
            ["#", "Press enquiries"],
          ],
        },
      ]
    : [
        {
          summary: "المؤسسة",
          items: [
            ["#", "عن الكلية"],
            ["#", "الحوكمة"],
            ["#", "الميثاق الأكاديمي والتحريري"],
            ["#", "سجل الشفافية والوضع المؤسسي"],
            ["/safeguarding/", "الحماية والسلامة"],
            ["#", "انضمّ كمعلّم"],
          ],
        },
        {
          summary: "البرامج الأكاديمية",
          items: [
            ["#", "كلية اللغة العربية"],
            ["#", "كلية القرآن"],
            ["#", "كلية العلوم الشرعية"],
            ["#", "البرامج المهنية والتخصصية"],
            ["#", "منهج الإتقان"],
          ],
        },
        {
          summary: "القبول والدراسة",
          items: [
            ["/admissions/", "رحلة الطالب"],
            ["/admissions/", "تقييم المستوى"],
            ["/register/", "التقديم / التسجيل (١٦+)"],
            ["#", "الرسوم والمنح"],
            ["/study/", "الدخول إلى الدراسة"],
          ],
        },
        {
          summary: "الشهادات والسياسات",
          items: [
            ["#", "سلّم الشهادات"],
            ["#", "تحقّق من شهادة"],
            ["/privacy/", "سياسة الخصوصية"],
            ["/terms/", "الشروط"],
            ["/safeguarding/", "سياسة الحماية والسلامة"],
          ],
        },
        {
          summary: "التواصل",
          items: [
            ["mailto:admissions.almadeenah@agentmail.to", "استفسارات القبول"],
            ["mailto:admissions.almadeenah@agentmail.to", "تواصل عام"],
            ["#", "انضمّ كمعلّم"],
            ["#", "استفسارات إعلامية"],
          ],
        },
      ];

  const colsHtml = cols
    .map(
      (c) =>
        `<details class="rv" open><summary>${c.summary}</summary><ul>${c.items
          .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
          .join("")}</ul></details>`
    )
    .join("\n      ");

  return `
<footer class="foot">
  <div class="glance">
    <div class="wrap">
      <p class="glance__label">${t.glanceLabel}</p>
      <nav class="glance__grid" aria-label="All destinations">
        ${glanceHtml}
      </nav>
    </div>
  </div>

  <div class="footcols">
    <div class="wrap grid">
      <div class="brandblock rv">
        <span class="brand__seal">${SEAL}</span>
        <span class="word">${t.brandWord}</span>
        ${arSpan}
        <p>${t.footTagline}</p>
      </div>
      ${colsHtml}
    </div>
  </div>

  <div class="wrap">
    <div class="footbar">
      <span><span class="dot"></span>${t.footStatus}</span>
      <span>${t.copyright}</span>
    </div>
  </div>
</footer>`;
}
