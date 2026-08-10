/* =========================================================================
   THE STUDY — الدراسة

   The student's environment, GENERATED FROM THE ENGINE rather than written by
   hand. Every figure on the page is produced by studyView() over a real
   Engine instance, so the interface cannot drift from the model it claims to
   present — and a rule the engine enforces cannot be quietly contradicted by
   presentation.

   INSTITUTIONAL HONESTY. Al-Madeenah has admitted no students (EB §46). The
   student below does not exist and the pages say so, in the first thing a
   reader sees, on every screen. What is real is the STRUCTURE: the fixture is
   built through the same insert-time invariants as production data would be,
   so anything the engine would refuse could not appear here either.
   ========================================================================= */
import { Engine } from '../schema/engine.mjs';
import { studyView, inZone } from '../schema/journey.mjs';

/* A fixed instant, so the build is deterministic and the page does not shift
   under the reader between deploys. */
export const AS_AT = '2026-10-05';
const ZONE = 'Africa/Lagos';

export function buildFixture() {
  const db = new Engine();
  const I = (e, r) => db.insert(e, r);

  I('institution', { id: 'mad', name: 'Al-Madeenah International College for Arabic & Islamic Studies', locale: 'en' });
  I('qualification_type', { id: 'q-mastery', institution_id: 'mad', name: 'Certificate of Mastery', framework_ref: null, regulated: false });
  I('level_scheme', { id: 'ls', institution_id: 'mad', name: 'Arabic ladder' });
  I('level', { id: 'l100', institution_id: 'mad', level_scheme_id: 'ls', name: 'Level 100', ordinal: 1 });
  I('level', { id: 'l200', institution_id: 'mad', level_scheme_id: 'ls', name: 'Level 200', ordinal: 2 });
  I('level', { id: 'l300', institution_id: 'mad', level_scheme_id: 'ls', name: 'Level 300', ordinal: 3 });
  I('grade_scheme', { id: 'gs', institution_id: 'mad', name: 'Mastery bands' });
  I('grade', { id: 'g-itqan', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Itqān', ordinal: 4, is_pass: true });
  I('grade', { id: 'g-jayyid', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Jayyid', ordinal: 3, is_pass: true });
  I('grade', { id: 'g-lam', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Lam yablugh', ordinal: 1, is_pass: false });

  I('programme', { id: 'p100', institution_id: 'mad', name: 'Arabic Foundation', academic_unit_id: null, qualification_type_id: 'q-mastery', level_id: 'l100', duration_value: null, duration_unit: null, volume_value: 200, volume_unit: 'NLH' });
  I('programme', { id: 'p200', institution_id: 'mad', name: 'Arabic Intermediate', academic_unit_id: null, qualification_type_id: 'q-mastery', level_id: 'l200', duration_value: null, duration_unit: null, volume_value: 300, volume_unit: 'NLH' });
  I('programme', { id: 'p300', institution_id: 'mad', name: 'Arabic Advanced', academic_unit_id: null, qualification_type_id: 'q-mastery', level_id: 'l300', duration_value: null, duration_unit: null, volume_value: 450, volume_unit: 'NLH' });

  I('course', { id: 'c-qira1', institution_id: 'mad', code: 'ARB-100-01', name: 'Qirāʾah I', programme_id: 'p100', level_id: 'l100', volume_value: 50, volume_unit: 'NLH' });
  I('course', { id: 'c-qira2', institution_id: 'mad', code: 'ARB-200-01', name: 'Qirāʾah II', programme_id: 'p200', level_id: 'l200', volume_value: 60, volume_unit: 'NLH' });
  I('course', { id: 'c-nahw2', institution_id: 'mad', code: 'ARB-200-03', name: 'Naḥw II', programme_id: 'p200', level_id: 'l200', volume_value: 70, volume_unit: 'NLH' });

  I('lesson', { id: 'l-1', institution_id: 'mad', course_id: 'c-nahw2', ordinal: 1, title: 'The nominal sentence' });
  I('lesson', { id: 'l-2', institution_id: 'mad', course_id: 'c-nahw2', ordinal: 2, title: 'Subject and predicate' });
  I('lesson', { id: 'l-3', institution_id: 'mad', course_id: 'c-nahw2', ordinal: 3, title: 'The verbal sentence' });

  I('assessment', { id: 'a-qira1-gate', institution_id: 'mad', course_id: 'c-qira1', name: 'Qirāʾah I oral gate', kind: 'oral examination', is_gate: true, machine_marked: false, criterion: 'Reads a fully vowelled passage aloud with sustained accuracy.' });
  I('assessment', { id: 'a-qira2-gate', institution_id: 'mad', course_id: 'c-qira2', name: 'Qirāʾah II oral gate', kind: 'oral examination', is_gate: true, machine_marked: false, criterion: 'Reads unvowelled prose aloud with sustained accuracy and correct pausing.' });
  I('assessment', { id: 'a-nahw2-drill', institution_id: 'mad', course_id: 'c-nahw2', name: 'Iʿrāb practice set', kind: 'exercise', is_gate: false, machine_marked: true, criterion: null });
  I('assessment', { id: 'a-nahw2-gate', institution_id: 'mad', course_id: 'c-nahw2', name: 'Naḥw II oral gate', kind: 'oral examination', is_gate: true, machine_marked: false, criterion: 'Performs iʿrāb aloud on an unseen nominal sentence, naming each ʿāmil.' });

  I('credential_type', { id: 'ct-mastery-100', institution_id: 'mad', name: 'Certificate of Mastery · Arabic Level 100', limitations: 'This is not an ijāzah and confers no chain of transmission. It is not a degree and is not degree-equivalent.', asserts_mastery: true });

  I('person', { id: 'p-yusra', institution_id: 'mad', date_of_birth: '1990-07-19', dedupe_key: null });
  I('person_name', { id: 'n-yusra', institution_id: 'mad', person_id: 'p-yusra', full_name: 'Yusra Hassan', script: 'latin', valid_from: '2026-01-01', valid_to: null });
  I('relationship', { id: 'r-yusra', institution_id: 'mad', person_id: 'p-yusra', role: 'teacher', valid_from: '2026-01-01', valid_to: null });

  I('person', { id: 'p-amina', institution_id: 'mad', date_of_birth: '1998-04-02', dedupe_key: null });
  I('person_name', { id: 'n-amina', institution_id: 'mad', person_id: 'p-amina', full_name: 'Amina Yusuf', script: 'latin', valid_from: '2026-01-05', valid_to: null });
  I('relationship', { id: 'r-std', institution_id: 'mad', person_id: 'p-amina', role: 'student', valid_from: '2026-02-01', valid_to: null });

  /* Level 100 — completed, credentialled. */
  I('enrolment', { id: 'e-100', institution_id: 'mad', relationship_id: 'r-std', programme_id: 'p100', cohort_id: null, started_on: '2026-02-01', ended_on: '2026-09-01', outcome_grade_id: 'g-itqan' });
  I('enrolment_status', { id: 'es-1', institution_id: 'mad', enrolment_id: 'e-100', status: 'active', effective_from: '2026-02-01', reason: null });
  I('enrolment_status', { id: 'es-2', institution_id: 'mad', enrolment_id: 'e-100', status: 'completed', effective_from: '2026-09-01', reason: null });
  I('record_entry', { id: 'rec-q1', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-qira1', assessment_id: 'a-qira1-gate', attempt: 1, grade_id: 'g-itqan', assessed_on: '2026-08-20', assessor_person_id: 'p-yusra', volume_value: 50, volume_unit: 'NLH' });
  I('credential', { id: 'AMC-2026-000148', institution_id: 'mad', enrolment_id: 'e-100', credential_type_id: 'ct-mastery-100', issued_name: 'Amina Yusuf', issued_on: '2026-09-05', revoked_on: null, revoked_reason: null });

  /* Level 200 — in progress. One gate of two passed. */
  I('enrolment', { id: 'e-200', institution_id: 'mad', relationship_id: 'r-std', programme_id: 'p200', cohort_id: null, started_on: '2026-09-15', ended_on: null, outcome_grade_id: null });
  I('enrolment_status', { id: 'es-3', institution_id: 'mad', enrolment_id: 'e-200', status: 'active', effective_from: '2026-09-15', reason: null });
  I('record_entry', { id: 'rec-q2', institution_id: 'mad', enrolment_id: 'e-200', course_id: 'c-qira2', assessment_id: 'a-qira2-gate', attempt: 1, grade_id: 'g-jayyid', assessed_on: '2026-10-01', assessor_person_id: 'p-yusra', volume_value: 60, volume_unit: 'NLH' });

  I('session', { id: 'sess-1', institution_id: 'mad', course_id: 'c-nahw2', class_group_id: null, starts_at_utc: '2026-10-07T17:00:00Z', minutes: 60, teacher_person_id: 'p-yusra' });
  I('session', { id: 'sess-2', institution_id: 'mad', course_id: 'c-nahw2', class_group_id: null, starts_at_utc: '2026-10-14T17:00:00Z', minutes: 60, teacher_person_id: 'p-yusra' });

  return db;
}

/* ---------- bilingual labels ----------
   The engine holds no translations, deliberately: an i18n layer inside an
   academic model is speculative complexity, and the institution's own rule is
   that Arabic is AUTHORED, not translated (AEB §48). So the Arabic strings
   live here, in the presentation layer, written as Arabic rather than derived
   from the English. */
const AR = {
  'Arabic Foundation': 'العربية التمهيدية',
  'Arabic Intermediate': 'العربية المتوسّطة',
  'Arabic Advanced': 'العربية المتقدّمة',
  'Qirāʾah I': 'القراءة (١)',
  'Qirāʾah II': 'القراءة (٢)',
  'Naḥw II': 'النحو (٢)',
  'Level 200': 'المستوى ٢٠٠',
  'Level 300': 'المستوى ٣٠٠',
  'Naḥw II oral gate': 'اختبار النحو (٢) الشفويّ',
  'Iʿrāb practice set': 'تدريبات الإعراب',
  'Certificate of Mastery · Arabic Level 100': 'شهادة الإتقان · المستوى ١٠٠',
  'The nominal sentence': 'الجملة الاسمية',
  'Subject and predicate': 'المبتدأ والخبر',
  'The verbal sentence': 'الجملة الفعلية',
  'Performs iʿrāb aloud on an unseen nominal sentence, naming each ʿāmil.':
    'يُعرِب جملةً اسميةً غيرَ مرئيةٍ من قبلُ إعرابًا شفويًّا، مُسمّيًا كلَّ عاملٍ فيها.',
  'Amina Yusuf': 'آمنة يوسف',
};
const t = (s, lang) => (lang === 'ar' ? (AR[s] ?? s) : s);
const num = (n, lang) => (lang === 'ar'
  ? String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]) : String(n));

const COPY = {
  en: {
    salam: 'Assalāmu ʿalaykum', studying: 'Your studies', now: 'What to do now',
    next: 'Next session', submit: 'To submit', progress: 'Progress',
    achieved: 'Achieved', comes: 'What comes next', continue: 'Continue',
    gates: (a, b) => `${a} of ${b} gates`, verify: 'Verify', open: 'Open the lesson',
    criterion: 'Published criterion', lesson: 'Lesson',
    where: 'Where you are', learning: 'What you are learning',
    todo: 'What to do', happens: 'What happens next',
    back: 'Back to the Study', signout: 'Sign out', alt: 'العربية',
    preview: '<strong>Design preview</strong> — not a live account. The College has admitted no students. Every figure below is generated by the academic engine from illustrative data.',
    noContent: 'No lesson text has been authored yet.',
    noContentWhy: 'Lesson content is written by the teaching faculty, and the College has appointed none. This screen shows the structure the Reading Room provides; it does not stand in for the teaching.',
    yourTime: 'your time', minutes: 'minutes', gateNote: 'Assessed live by a member of faculty. Retakes are free and unlimited.',
    room: 'Reading Room',
  },
  ar: {
    salam: 'السلام عليكم', studying: 'دراستك', now: 'ما تفعله الآن',
    next: 'الحصّة القادمة', submit: 'ما يُسلَّم', progress: 'التقدّم',
    achieved: 'ما أُنجِز', comes: 'ما يأتي بعد', continue: 'متابعة',
    gates: (a, b) => `${a} من ${b} من البوّابات`, verify: 'تحقّق', open: 'افتح الدرس',
    criterion: 'المعيار المنشور', lesson: 'الدرس',
    where: 'أين أنت', learning: 'ما تتعلّمه',
    todo: 'ما تفعله', happens: 'ما يحدث بعد',
    back: 'العودة إلى الدراسة', signout: 'خروج', alt: 'English',
    preview: '<strong>معاينة تصميمية</strong> — ليست حسابًا حقيقيًّا. لم تقبل الكليةُ طلابًا بعد، وكلُّ ما يظهر أدناه يولّده المحرّك الأكاديميُّ من بياناتٍ توضيحية. والمحتوى العربيُّ بانتظار مراجعة متحدّثٍ أصلي.',
    noContent: 'لم يُكتَب نصُّ الدرس بعد.',
    noContentWhy: 'يكتب نصوصَ الدروس أعضاءُ هيئة التدريس، ولم تعيّن الكليةُ أحدًا بعد. وهذه الشاشةُ تعرض البنيةَ التي توفّرها قاعةُ المطالعة، ولا تقوم مقامَ التعليم.',
    yourTime: 'بتوقيتك', minutes: 'دقيقة', gateNote: 'يُقيَّم مباشرةً على يد عضوٍ من هيئة التدريس. والإعادةُ مجّانيةٌ بلا حدّ.',
    room: 'قاعة المطالعة',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- chrome ---------- */
function shell(lang, inner, { room = false } = {}) {
  const c = COPY[lang];
  const alt = lang === 'ar' ? '/study/' : '/ar/study/';
  return `<div class="stu">
<a class="skip" href="#main">${lang === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
<header class="stu__rail">
  <a class="stu__mark" href="${lang === 'ar' ? '/ar/study/' : '/study/'}">
    <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="1.25" opacity=".5"/>
      <path d="M36.6 12h6.8l-.9 56h-5z" fill="currentColor"/>
      <path d="M28 68h24" stroke="currentColor" stroke-width="1.25" opacity=".5"/>
      <path d="M58 63l5 5-5 5-5-5z" fill="currentColor"/>
    </svg>
    <span><span class="stu__ar" lang="ar" dir="rtl">الدراسة</span><span class="stu__en">${room ? esc(c.room) : 'The Study'}</span></span>
  </a>
  <nav class="stu__acts" aria-label="${lang === 'ar' ? 'أدوات' : 'Account'}">
    <a href="${alt}" hreflang="${lang === 'ar' ? 'en' : 'ar'}" ${lang === 'ar' ? '' : 'lang="ar" dir="rtl"'}>${esc(c.alt)}</a>
    <a href="${lang === 'ar' ? '/ar/signin/' : '/signin/'}">${esc(c.signout)}</a>
  </nav>
</header>
<p class="stu__note">${c.preview}</p>
<main id="main" class="stu__main">
${inner}
</main>
</div>`;
}

const section = (label, body, extra = '') =>
  `<section class="stu__s ${extra}"><h2 class="stu__k">${esc(label)}</h2>${body}</section>`;

/* ---------- the Study home ---------- */
export function renderStudyHome(lang) {
  const db = buildFixture();
  const c = COPY[lang];
  const v = studyView(db, 'p-amina', { asAt: AS_AT, timeZone: ZONE, /* -u-nu-arab forces Arabic-Indic digits: plain 'ar' resolves to Latin
       numerals in ICU, which left the page mixing ٦٠ with 18:00 (AEB §49). */
    locale: lang === 'ar' ? 'ar-u-nu-arab' : 'en-GB' });
  const s = v.studying[0];
  const gate = s.due.find((d) => d.isGate);

  const out = [];
  /* The greeting IS the page's heading. Every page needs exactly one h1, and on
     a personal working surface the honest h1 is the person it belongs to. */
  out.push(`<h1 class="stu__hi">${esc(c.salam)},<br><b>${esc(t(v.greetingName, lang))}</b></h1>`);

  /* 1 · What am I studying — and 2 · what to do now, joined, because for a
     student mid-lesson they are one thought and two cards would be two. */
  out.push(section(c.studying, `
    <p class="stu__prog">${esc(t(s.programme, lang))}</p>
    <p class="stu__course">${esc(t(s.studying.name, lang))} <span class="stu__code">${esc(s.studying.code)}</span></p>
    ${s.lesson ? `<p class="stu__lesson"><span class="stu__n">${esc(c.lesson)} ${num(s.lesson.ordinal, lang)}</span>
      ${esc(t(s.lesson.title, lang))}</p>` : ''}
    <p class="stu__go"><a class="btn btn--primary" href="${lang === 'ar' ? '/ar/study/lesson/' : '/study/lesson/'}">${esc(c.continue)}</a></p>`));

  /* 3 · Next academic event */
  if (v.nextClass) {
    out.push(section(c.next, `
      <p class="stu__when">${esc(v.nextClass.at)} <span class="stu__tz">${esc(c.yourTime)}</span></p>
      <p class="stu__meta">${esc(t(v.nextClass.course, lang))} · ${num(v.nextClass.minutes, lang)} ${esc(c.minutes)}</p>`));
  }

  /* 4 · To submit — the gate carries its published criterion (AEB §28) */
  if (gate) {
    out.push(section(c.submit, `
      <p class="stu__due">${esc(t(gate.name, lang))}</p>
      <p class="stu__crit"><span class="stu__critk">${esc(c.criterion)}</span>${esc(t(gate.criterion, lang))}</p>
      <p class="stu__meta">${esc(c.gateNote)}</p>`));
  }

  /* 5 · Progress — a fraction, computed. Never a percentage, never a chart. */
  out.push(section(c.progress, `
    <p class="stu__frac"><b>${num(s.progress.gatesPassed, lang)}</b><i>/</i><span>${num(s.progress.gatesRequired, lang)}</span></p>
    <p class="stu__meta">${esc(c.gates(num(s.progress.gatesPassed, lang), num(s.progress.gatesRequired, lang)))}</p>`));

  /* 6 · Achieved */
  if (v.achieved.length) {
    out.push(section(c.achieved, v.achieved.map((a) => `
      <p class="stu__cred">${esc(t(a.type, lang))}
        <a class="stu__verify" href="${lang === 'ar' ? '/ar/verify/' : '/verify/'}">${esc(c.verify)} · ${esc(a.id)}</a></p>`).join('')));
  }

  /* 7 · What comes next */
  if (v.next) {
    out.push(section(c.comes, `<p class="stu__nextlvl">${esc(t(v.next.programme, lang))}
      <span class="stu__code">${esc(t(v.next.level, lang))}</span></p>`));
  }

  return shell(lang, out.join('\n'));
}

/* ---------- the Reading Room ---------- */
export function renderReadingRoom(lang) {
  const db = buildFixture();
  const c = COPY[lang];
  const v = studyView(db, 'p-amina', { asAt: AS_AT, timeZone: ZONE, /* -u-nu-arab forces Arabic-Indic digits: plain 'ar' resolves to Latin
       numerals in ICU, which left the page mixing ٦٠ with 18:00 (AEB §49). */
    locale: lang === 'ar' ? 'ar-u-nu-arab' : 'en-GB' });
  const s = v.studying[0];
  const lessons = db.all('lesson', 'mad')
    .filter((l) => l.course_id === 'c-nahw2').sort((a, b) => a.ordinal - b.ordinal);
  const here = lessons[0];
  const after = lessons[1] ?? null;
  const gate = s.due.find((d) => d.isGate);

  const out = [];
  /* WHERE AM I */
  out.push(`<nav class="stu__crumb" aria-label="${esc(c.where)}">
    <a href="${lang === 'ar' ? '/ar/study/' : '/study/'}">${esc(t(s.programme, lang))}</a>
    <span aria-hidden="true">›</span><span>${esc(t(s.studying.name, lang))}</span>
    <span aria-hidden="true">›</span><b>${esc(c.lesson)} ${num(here.ordinal, lang)}</b></nav>`);

  /* WHAT AM I LEARNING */
  out.push(`<h1 class="stu__title">${esc(t(here.title, lang))}</h1>`);

  /* The empty state, stated rather than filled with invented teaching. The
     College has appointed no faculty (EB §46) and AEB §64 forbids publishing
     Qur'anic, ḥadīth or fiqh content without a qualified scholar. Inventing a
     lesson to make this screen look complete would break both. */
  out.push(`<div class="stu__empty">
    <p class="stu__emptyk">${esc(c.noContent)}</p>
    <p>${esc(c.noContentWhy)}</p></div>`);

  /* WHAT DO I DO */
  if (gate) {
    out.push(section(c.todo, `
      <p class="stu__due">${esc(t(gate.name, lang))}</p>
      <p class="stu__crit"><span class="stu__critk">${esc(c.criterion)}</span>${esc(t(gate.criterion, lang))}</p>
      <p class="stu__meta">${esc(c.gateNote)}</p>`));
  }

  /* WHAT HAPPENS NEXT */
  out.push(section(c.happens, after
    ? `<p class="stu__lesson"><span class="stu__n">${esc(c.lesson)} ${num(after.ordinal, lang)}</span>${esc(t(after.title, lang))}</p>`
    : `<p class="stu__meta">—</p>`));

  out.push(`<p class="stu__back"><a href="${lang === 'ar' ? '/ar/study/' : '/study/'}">← ${esc(c.back)}</a></p>`);
  return shell(lang, out.join('\n'), { room: true });
}
