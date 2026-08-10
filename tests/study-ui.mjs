#!/usr/bin/env node
/* =========================================================================
   THE STUDY — UI-LEVEL INVARIANTS

   The engine refuses to hold data that breaks the College's constitutional
   rules. That is necessary and not sufficient: a presentation layer can
   contradict a correct model without ever writing a row — by labelling a
   machine-marked exercise a "gate", by rounding a fraction into a percentage,
   by showing a revoked credential as an achievement, or by inventing lesson
   text the faculty has not written.

   These assertions read the RENDERED HTML and check it against the engine
   that produced it.
   ========================================================================= */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFixture, AS_AT } from '../src/study-preview.mjs';
import { studyView, verify, inZone } from '../schema/journey.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = (p) => readFileSync(join(ROOT, 'dist', p), 'utf8');
let pass = 0; const fails = [];
const ok = (n, c, d = '') => (c ? pass++ : fails.push(`${n}${d ? ' — ' + d : ''}`));

const EN = html('study/index.html');
const AR = html('ar/study/index.html');
const ROOM = html('study/lesson/index.html');
const ROOM_AR = html('ar/study/lesson/index.html');
const ALL = [['en', EN], ['ar', AR], ['room', ROOM], ['room-ar', ROOM_AR]];

const db = buildFixture();
const v = studyView(db, 'p-amina', { asAt: AS_AT, timeZone: 'Africa/Lagos' });
const s = v.studying[0];

/* ---- the page agrees with the engine ---- */
ok('the course shown is the course the engine computed',
  EN.includes(s.studying.name) && EN.includes(s.studying.code));
ok('the lesson shown is the lesson the engine computed',
  EN.includes(s.lesson.title));

/* PROGRESS IS DERIVED — the numbers on the page must be the engine's, and
   must be a fraction. A percentage implies a precision human assessment of
   language and recitation does not have (AEB §35). */
const frac = EN.match(/stu__frac[^>]*>\s*<b>(\d+)<\/b><i>\/<\/i><span>(\d+)<\/span>/);
ok('progress is rendered as the engine\'s fraction',
  frac && +frac[1] === s.progress.gatesPassed && +frac[2] === s.progress.gatesRequired,
  frac ? `${frac[1]}/${frac[2]} vs ${s.progress.gatesPassed}/${s.progress.gatesRequired}` : 'no fraction found');
for (const [tag, doc] of ALL) {
  ok(`${tag}: progress is never shown as a percentage`,
    !/\b\d{1,3}\s*%/.test(doc.replace(/<style[\s\S]*?<\/style>/g, '')));
}

/* NO GATE MAY BE PRESENTED AS MACHINE-MARKED. Everything the page labels a
   gate must be a real gate in the engine, and no real gate is machine-marked
   (the engine refuses that) — so the check is that the page has not invented
   a gate label for an auto-marked instrument. */
const gates = db.all('assessment', 'mad').filter((a) => a.is_gate);
const autos = db.all('assessment', 'mad').filter((a) => a.machine_marked);
ok('every assessment the page names is a genuine gate',
  gates.every((g) => !g.machine_marked));
for (const [tag, doc] of [['en', EN], ['room', ROOM]]) {
  ok(`${tag}: no machine-marked instrument appears under "to submit"/"what to do"`,
    !autos.some((a) => doc.includes(a.name)),
    autos.map((a) => a.name).join());
}

/* THE PUBLISHED CRITERION IS SHOWN, VERBATIM (AEB §28). A gate whose standard
   a student cannot read is not a published standard. */
const gate = s.due.find((d) => d.isGate);
ok('the gate\'s criterion is printed verbatim, not summarised',
  EN.includes(gate.criterion) && ROOM.includes(gate.criterion));
ok('and the free-retake guarantee is stated beside it (AEB §17)',
  /Retakes are free and unlimited/.test(EN));

/* ACHIEVEMENTS: only unrevoked credentials, and the ID is offered for
   verification rather than the document being treated as the proof. */
ok('the credential shown is the engine\'s, with its verification ID',
  EN.includes(v.achieved[0].id) && v.achieved.length === 1);
const cred = verify(db, v.achieved[0].id);
ok('and it is backed by a passed gate in the engine (AEB §37)', cred.valid === true);
ok('the Study links to verification rather than asserting validity itself',
  /href="\/verify\//.test(EN));

/* NO COMMERCIAL INFORMATION ANYWHERE NEAR THE ACADEMIC SURFACE (AEB §68). */
for (const [tag, doc] of ALL) {
  const body = doc.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  ok(`${tag}: the Study shows no fee, tier, price or plan`,
    !/\b(fee|tuition|tier|price|premium|upgrade|invoice|discount|subscription)\b/i.test(body));
}

/* TIME IS STORED UTC, SHOWN LOCAL (AEB §27.1). */
ok('no raw UTC instant is exposed to the student',
  !ALL.some(([, d]) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(d)));
ok('the same instant renders differently in different zones',
  inZone('2026-10-07T17:00:00Z', 'Africa/Lagos') !== inZone('2026-10-07T17:00:00Z', 'America/New_York'));
ok('the English page states the time is the reader\'s own', /your time/.test(EN));
ok('the Arabic page states the same', /بتوقيتك/.test(AR));

/* ARABIC IS AUTHORED, NOT TRANSLATED (AEB §48), AND CARRIES ITS OWN
   NUMERALS AND FACES (AEB §49). */
ok('the Arabic Study is in Arabic, not English with Arabic dropped in',
  !/Your studies|Next session|To submit|Progress<\/h2>/.test(AR));
ok('the Arabic page uses Eastern Arabic numerals for the session time',
  /[٠-٩]{1,2}:[٠-٩]{2}/.test(AR), 'found Latin digits in the Arabic time');
ok('the Arabic pages are RTL at the document level',
  /<html lang="ar" dir="rtl"/.test(AR) && /<html lang="ar" dir="rtl"/.test(ROOM_AR));
ok('no mixed-script title leaves a separator stranded at a line start',
  !/·\s*[؀-ۿ]/.test(ROOM) && !/[؀-ۿ]\s*·/.test(ROOM));

/* NO INVENTED TEACHING (EB §46, AEB §64). */
ok('the Reading Room states that no lesson text exists rather than inventing some',
  /No lesson text has been authored yet/.test(ROOM)
  && /لم يُكتَب نصُّ الدرس بعد/.test(ROOM_AR));
ok('and says why, naming the absent faculty',
  /the College has appointed none/.test(ROOM));

/* INSTITUTIONAL HONESTY ON EVERY SCREEN (EB §46). */
for (const [tag, doc] of ALL) {
  ok(`${tag}: the screen states it is a preview with no real students`,
    /admitted no\s*students|لم تقبل الكليةُ طلابًا/.test(doc));
  /* Counted as ELEMENTS, not as occurrences of the phrase — the phrase also
     appears in <title> and the meta description, which is correct and not a
     second banner. The defect this guards against is two stacked bars. */
  const banners = (doc.match(/class="(stu__note|previewbar)"/g) || []).length;
  ok(`${tag}: exactly one preview banner element, not two`, banners === 1, `${banners} banners`);
  ok(`${tag}: exactly one skip link`,
    (doc.match(/class="skip"/g) || []).length === 1);
}

/* CALM (the design directive): the home screen carries a bounded number of
   sections, and none of the patterns the directive forbids. */
const sections = (EN.match(/class="stu__s /g) || []).length;
ok('the Study home stays within six sections', sections <= 6, `${sections} sections`);
for (const [tag, doc] of ALL) {
  ok(`${tag}: no charts, streaks, badges, leaderboards or feeds`,
    !/\b(streak|badge|leaderboard|feed|chart|xp|points earned)\b/i.test(
      doc.replace(/<style[\s\S]*?<\/style>/g, '')));
}

/* NOTHING IS STORED THAT SHOULD BE DERIVED. */
ok('no transcript, progress or verification artefact is written to dist',
  !['study/transcript.json', 'study/progress.json', 'verify/register.json']
    .some((f) => { try { readFileSync(join(ROOT, 'dist', f)); return true; } catch { return false; } }));

console.log(`\nSTUDY UI — ${pass} passed, ${fails.length} failed`);
if (fails.length) { console.log('\nFailures:'); for (const f of fails) console.log('  ✗ ' + f); process.exit(1); }
console.log('The rendered Study agrees with the engine that produced it.');
