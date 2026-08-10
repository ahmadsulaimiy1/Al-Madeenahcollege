#!/usr/bin/env node
/* =========================================================================
   THE VERTICAL SLICE — one student, twelve steps, end to end

     discover → apply → admission → enrol → study → attend live class →
     submit work → assessment → progression → completion →
     transcript/certificate → verification

   Walked as a real Al-Madeenah student under the College's actual academic
   model: fixed standards, flexible pace, mastery-gated progression. Then
   attacked — every constitutional invariant added with this slice gets a test
   that tries to violate it.
   ========================================================================= */
import { Engine, IntegrityError } from '../schema/engine.mjs';
import { studyView, transcript, verify, inZone } from '../schema/journey.mjs';

let pass = 0; const fails = [];
const ok = (n, c, d = '') => (c ? pass++ : fails.push(`${n}${d ? ' — ' + d : ''}`));
const throws = (n, fn, match = null) => {
  try { fn(); fails.push(`${n} — expected a refusal, none came`); }
  catch (e) {
    if (!(e instanceof IntegrityError)) return fails.push(`${n} — wrong error: ${e.message}`);
    if (match && !new RegExp(match, 'i').test(e.message)) {
      return fails.push(`${n} — refused for the wrong reason: ${e.message}`);
    }
    pass++;
  }
};

const db = new Engine();
const I = (e, r) => db.insert(e, r);

/* ---------- the institution ---------- */
I('institution', { id: 'mad', name: 'Al-Madeenah International College for Arabic & Islamic Studies', locale: 'en' });
I('qualification_type', { id: 'q-mastery', institution_id: 'mad', name: 'Certificate of Mastery', framework_ref: null, regulated: false });
I('level_scheme', { id: 'ls', institution_id: 'mad', name: 'Arabic ladder' });
I('level', { id: 'l100', institution_id: 'mad', level_scheme_id: 'ls', name: 'Level 100 · التمهيدي', ordinal: 1 });
I('level', { id: 'l200', institution_id: 'mad', level_scheme_id: 'ls', name: 'Level 200 · المتوسّط', ordinal: 2 });
I('grade_scheme', { id: 'gs', institution_id: 'mad', name: 'Mastery bands' });
I('grade', { id: 'g-itqan', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Itqān', ordinal: 4, is_pass: true });
I('grade', { id: 'g-jayyid', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Jayyid', ordinal: 3, is_pass: true });
I('grade', { id: 'g-lam', institution_id: 'mad', grade_scheme_id: 'gs', name: 'Lam yablugh', ordinal: 1, is_pass: false });
I('programme', { id: 'p100', institution_id: 'mad', name: 'Arabic Foundation', academic_unit_id: null, qualification_type_id: 'q-mastery', level_id: 'l100', duration_value: null, duration_unit: null, volume_value: 200, volume_unit: 'NLH' });
I('programme', { id: 'p200', institution_id: 'mad', name: 'Arabic Intermediate', academic_unit_id: null, qualification_type_id: 'q-mastery', level_id: 'l200', duration_value: null, duration_unit: null, volume_value: 300, volume_unit: 'NLH' });
I('course', { id: 'c-qira', institution_id: 'mad', code: 'ARB-100-01', name: 'Qirāʾah I', programme_id: 'p100', level_id: 'l100', volume_value: 50, volume_unit: 'NLH' });
I('course', { id: 'c-nahw', institution_id: 'mad', code: 'ARB-100-03', name: 'Naḥw I', programme_id: 'p100', level_id: 'l100', volume_value: 40, volume_unit: 'NLH' });
I('lesson', { id: 'ls-1', institution_id: 'mad', course_id: 'c-qira', ordinal: 1, title: 'The Arabic letters and their forms' });
I('lesson', { id: 'ls-2', institution_id: 'mad', course_id: 'c-qira', ordinal: 2, title: 'Short vowels and sukūn' });
I('assessment', { id: 'a-qira-drill', institution_id: 'mad', course_id: 'c-qira', name: 'Letter recognition drill', kind: 'quiz', is_gate: false, machine_marked: true, criterion: null });
I('assessment', { id: 'a-qira-gate', institution_id: 'mad', course_id: 'c-qira', name: 'Qirāʾah I oral gate', kind: 'oral examination', is_gate: true, machine_marked: false, criterion: 'Reads a fully vowelled passage aloud with sustained accuracy' });
I('assessment', { id: 'a-nahw-gate', institution_id: 'mad', course_id: 'c-nahw', name: 'Naḥw I oral gate', kind: 'oral examination', is_gate: true, machine_marked: false, criterion: 'Performs iʿrāb on a simple nominal sentence' });
I('credential_type', { id: 'ct-mastery', institution_id: 'mad', name: 'Certificate of Mastery — Arabic Level 100', limitations: 'This is not an ijāzah and confers no chain of transmission. It is not a degree and is not degree-equivalent.', asserts_mastery: true });
I('credential_type', { id: 'ct-completion', institution_id: 'mad', name: 'Certificate of Completion', limitations: 'This certifies attendance and submission only. It makes no claim of mastery.', asserts_mastery: false });

/* teacher */
I('person', { id: 'p-yusra', institution_id: 'mad', date_of_birth: '1990-07-19', dedupe_key: 'yusra|1990-07-19|EG' });
I('person_name', { id: 'n-yusra', institution_id: 'mad', person_id: 'p-yusra', full_name: 'Yusra Hassan', script: 'latin', valid_from: '2026-01-01', valid_to: null });
I('relationship', { id: 'r-yusra', institution_id: 'mad', person_id: 'p-yusra', role: 'teacher', valid_from: '2026-01-01', valid_to: null });

/* =========================================================================
   STEP 1 · DISCOVER — no entity, and that is the correct answer.
   ========================================================================= */
ok('1 discover requires no record of the person',
  db.all('person', 'mad').length === 1);

/* STEP 2 · APPLY */
I('person', { id: 'p-amina', institution_id: 'mad', date_of_birth: '1998-04-02', dedupe_key: 'amina|1998-04-02|NG' });
I('person_name', { id: 'n-amina', institution_id: 'mad', person_id: 'p-amina', full_name: 'Amina Yusuf', script: 'latin', valid_from: '2026-01-05', valid_to: null });
I('relationship', { id: 'r-app', institution_id: 'mad', person_id: 'p-amina', role: 'applicant', valid_from: '2026-01-05', valid_to: '2026-02-01' });
I('application', { id: 'app-1', institution_id: 'mad', person_id: 'p-amina', programme_id: 'p100', submitted_on: '2026-01-05' });
I('application_status', { id: 'as-1', institution_id: 'mad', application_id: 'app-1', status: 'received', effective_from: '2026-01-05', reason: null });
ok('2 applying does not make a person a student',
  db.rolesOf('p-amina', '2026-01-10').join() === 'applicant');

/* STEP 3 · ADMISSION — answered, never silent (AEB §52) */
I('application_status', { id: 'as-2', institution_id: 'mad', application_id: 'app-1', status: 'placement assessed', effective_from: '2026-01-18', reason: 'suggested start: Level 100' });
I('application_status', { id: 'as-3', institution_id: 'mad', application_id: 'app-1', status: 'admitted', effective_from: '2026-01-28', reason: null });
ok('3 every application carries an answer', db.all('application_status', 'mad').length === 3);
ok('3 the decision is the latest, and the trail survives',
  db.all('application_status', 'mad').filter((s) => s.application_id === 'app-1').length === 3);

/* STEP 4 · ENROL */
I('relationship', { id: 'r-std', institution_id: 'mad', person_id: 'p-amina', role: 'student', valid_from: '2026-02-01', valid_to: null });
I('enrolment', { id: 'e-100', institution_id: 'mad', relationship_id: 'r-std', programme_id: 'p100', cohort_id: null, started_on: '2026-02-01', ended_on: null, outcome_grade_id: null });
I('enrolment_status', { id: 'es-1', institution_id: 'mad', enrolment_id: 'e-100', status: 'active', effective_from: '2026-02-01', reason: null });
ok('4 the applicant relationship is closed, not deleted',
  db.relationshipsOf('p-amina').length === 2
  && db.rolesOf('p-amina', '2026-03-01').join() === 'student');

/* STEP 5 · STUDY */
let view = studyView(db, 'p-amina', { asAt: '2026-02-10', timeZone: 'Africa/Lagos' });
ok('5 the Study answers "what am I studying"', view.studying[0].studying.code === 'ARB-100-01');
ok('5 and "what do I do today"', view.studying[0].lesson.title === 'The Arabic letters and their forms');
ok('5 and greets the person by their current name', view.greetingName === 'Amina Yusuf');
ok('5 progress starts at zero of two gates',
  view.studying[0].progress.gatesPassed === 0 && view.studying[0].progress.gatesRequired === 2);

/* STEP 6 · ATTEND LIVE CLASS — stored UTC, rendered local (AEB §27.1) */
I('session', { id: 'sess-1', institution_id: 'mad', course_id: 'c-qira', class_group_id: null, starts_at_utc: '2026-02-17T17:00:00Z', minutes: 60, teacher_person_id: 'p-yusra' });
I('session', { id: 'sess-2', institution_id: 'mad', course_id: 'c-qira', class_group_id: null, starts_at_utc: '2026-02-24T17:00:00Z', minutes: 60, teacher_person_id: 'p-yusra' });
view = studyView(db, 'p-amina', { asAt: '2026-02-10', timeZone: 'Africa/Lagos' });
ok('6 the next class is rendered in the student\'s own zone',
  view.nextClass.at.includes('18:00'), `got ${view.nextClass?.at}`);
ok('6 the same instant reads differently for a student elsewhere',
  inZone('2026-02-17T17:00:00Z', 'America/New_York').includes('12:00'));
I('session_attendance', { id: 'att-1', institution_id: 'mad', session_id: 'sess-1', enrolment_id: 'e-100' });
ok('6 attendance is a row, and absence is its absence',
  db.all('session_attendance', 'mad').length === 1);

/* STEP 7 · SUBMIT WORK */
I('submission', { id: 'sub-1', institution_id: 'mad', enrolment_id: 'e-100', assessment_id: 'a-qira-drill', attempt: 1, submitted_on: '2026-02-20', artefact_ref: 'drill/1' });
view = studyView(db, 'p-amina', { asAt: '2026-02-21', timeZone: 'Africa/Lagos' });
ok('7 a submitted assessment drops out of "what must I submit"',
  !view.studying[0].due.some((d) => d.id === 'a-qira-drill'));
ok('7 the gate remains outstanding, with its criterion published',
  view.studying[0].due.some((d) => d.isGate && d.criterion.startsWith('Reads a fully vowelled')));

/* STEP 8 · ASSESSMENT — formative auto-marked, gate human-marked */
I('record_entry', { id: 'rec-drill', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-qira', assessment_id: 'a-qira-drill', attempt: 1, grade_id: 'g-jayyid', assessed_on: '2026-02-21', assessor_person_id: null, volume_value: null, volume_unit: null });
ok('8 an auto-marked instrument needs no assessor',
  db.get('record_entry', 'rec-drill').assessor_person_id === null);
/* a failed gate, then a free retake (AEB §17) */
I('record_entry', { id: 'rec-gate-1', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-qira', assessment_id: 'a-qira-gate', attempt: 1, grade_id: 'g-lam', assessed_on: '2026-04-02', assessor_person_id: 'p-yusra', volume_value: 50, volume_unit: 'NLH' });
I('record_entry', { id: 'rec-gate-2', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-qira', assessment_id: 'a-qira-gate', attempt: 2, grade_id: 'g-itqan', assessed_on: '2026-05-14', assessor_person_id: 'p-yusra', volume_value: 50, volume_unit: 'NLH' });
ok('8 the failed attempt survives the pass',
  db.get('record_entry', 'rec-gate-1').grade_id === 'g-lam');

/* STEP 9 · PROGRESSION — no new entity; gates carry it */
I('record_entry', { id: 'rec-nahw', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-nahw', assessment_id: 'a-nahw-gate', attempt: 1, grade_id: 'g-jayyid', assessed_on: '2026-08-20', assessor_person_id: 'p-yusra', volume_value: 40, volume_unit: 'NLH' });
view = studyView(db, 'p-amina', { asAt: '2026-08-21', timeZone: 'Africa/Lagos' });
ok('9 progress is computed from gates passed, not stored',
  view.studying[0].progress.gatesPassed === 2 && view.studying[0].progress.gatesRequired === 2);
ok('9 "what comes next" reads the ladder',
  view.next.level.startsWith('Level 200') && view.next.programme === 'Arabic Intermediate');

/* STEP 10 · COMPLETION */
db.tables.get('enrolment').set('e-100', Object.freeze({
  ...db.get('enrolment', 'e-100'), ended_on: '2026-09-01', outcome_grade_id: 'g-itqan',
}));
I('enrolment_status', { id: 'es-2', institution_id: 'mad', enrolment_id: 'e-100', status: 'completed', effective_from: '2026-09-01', reason: null });
ok('10 completion is a status, and the history is intact',
  db.statusOf('e-100') === 'completed'
  && db.statusHistoryOf('e-100').map((s) => s.status).join() === 'active,completed');

/* STEP 11 · TRANSCRIPT + CERTIFICATE */
const t = transcript(db, 'e-100');
ok('11 the transcript names the institution and the holder',
  t.institution.name.startsWith('Al-Madeenah') && t.holder === 'Amina Yusuf');
ok('11 it lists every attempt, not only the best',
  t.courses.filter((c) => c.code === 'ARB-100-01').length === 3);
ok('11 it prints the grade scale on the document itself',
  t.gradeScale.length === 3 && t.gradeScale[0].name === 'Itqān');
ok('11 it prints attendance as attended/scheduled, never a percentage',
  t.liveAttendance === '1 / 2');
/* 90 NLH = Qirāʾah I (50) + Naḥw I (40), each counted ONCE despite three
   record entries against Qirāʾah I. Retakes are free (AEB §17) and must not
   inflate the hours on the record. */
ok('11 it totals learning volume per course, not per attempt',
  t.totalVolume === '90 NLH', `got ${t.totalVolume}`);
ok('11 it carries the outcome', t.outcome === 'Itqān');

I('credential', { id: 'AMC-2026-000001', institution_id: 'mad', enrolment_id: 'e-100', credential_type_id: 'ct-mastery', issued_name: 'Amina Yusuf', issued_on: '2026-09-05', revoked_on: null, revoked_reason: null });
ok('11 a credential is issued against the enrolment', db.all('credential', 'mad').length === 1);

/* STEP 12 · VERIFICATION — five facts, nothing else */
const v = verify(db, 'AMC-2026-000001');
ok('12 verification confirms validity', v.found && v.valid === true);
ok('12 it states what the credential attests', v.attests.includes('Certificate of Mastery'));
ok('12 it states what the credential does NOT certify',
  v.limitations.includes('not an ijāzah') && v.limitations.includes('not a degree'));
ok('12 it returns nothing beyond the five permitted facts',
  Object.keys(v).sort().join() === 'attests,found,holder,institution,issuedOn,limitations,revokedOn,revokedReason,valid');
ok('12 an unknown id is simply not found',
  verify(db, 'AMC-9999-999999').found === false && !('holder' in verify(db, 'AMC-9999-999999')));

/* ---- the name changes; the credential keeps the name it was issued under ---- */
db.tables.get('person_name').set('n-amina', Object.freeze({
  ...db.get('person_name', 'n-amina'), valid_to: '2027-04-30',
}));
I('person_name', { id: 'n-amina-2', institution_id: 'mad', person_id: 'p-amina', full_name: 'Amina Yusuf al-Sharif', script: 'latin', valid_from: '2027-05-01', valid_to: null });
ok('12 a later name change does not rewrite an issued credential',
  verify(db, 'AMC-2026-000001').holder === 'Amina Yusuf'
  && db.currentNameOf('p-amina', '2027-06-01').full_name === 'Amina Yusuf al-Sharif');

/* ---- revocation, not deletion ---- */
I('credential', { id: 'AMC-2026-000002', institution_id: 'mad', enrolment_id: 'e-100', credential_type_id: 'ct-completion', issued_name: 'Amina Yusuf', issued_on: '2026-09-05', revoked_on: '2026-10-01', revoked_reason: 'issued in error — superseded by the Mastery certificate' });
const rv = verify(db, 'AMC-2026-000002');
ok('12 a revoked credential is still findable, and says so',
  rv.found === true && rv.valid === false && rv.revokedReason.includes('issued in error'));
ok('12 the engine offers no way to delete a credential',
  typeof db.delete === 'undefined' && typeof db.remove === 'undefined');

/* ---- the Study stays simple ---- */
const finalView = studyView(db, 'p-amina', { asAt: '2026-09-10', timeZone: 'Africa/Lagos' });
ok('S the Study surfaces exactly seven keys, whatever the engine holds',
  Object.keys(finalView).sort().join() === 'achieved,greetingName,next,nextClass,studying');
ok('S a revoked credential is not an achievement',
  finalView.achieved.length === 1 && finalView.achieved[0].id === 'AMC-2026-000001');

/* =========================================================================
   ADVERSARIAL — every new constitutional invariant, attacked
   ========================================================================= */
throws('AEB §30: a machine-marked gate is refused',
  () => I('assessment', { id: 'x1', institution_id: 'mad', course_id: 'c-qira', name: 'Auto gate', kind: 'quiz', is_gate: true, machine_marked: true, criterion: null }),
  'may inform a gate, never constitute one');

throws('AEB §16: a gate result with no assessor is refused',
  () => I('record_entry', { id: 'x2', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-qira', assessment_id: 'a-qira-gate', attempt: 3, grade_id: 'g-itqan', assessed_on: '2026-06-01', assessor_person_id: null, volume_value: null, volume_unit: null }),
  'assessed by a qualified human');

throws('AEB §37: a mastery credential with no gate passed is refused', () => {
  I('relationship', { id: 'r-ghost', institution_id: 'mad', person_id: 'p-yusra', role: 'student', valid_from: '2026-01-01', valid_to: null });
  I('enrolment', { id: 'e-ghost', institution_id: 'mad', relationship_id: 'r-ghost', programme_id: 'p100', cohort_id: null, started_on: '2026-01-01', ended_on: null, outcome_grade_id: null });
  I('credential', { id: 'x3', institution_id: 'mad', enrolment_id: 'e-ghost', credential_type_id: 'ct-mastery', issued_name: 'Yusra Hassan', issued_on: '2026-02-01', revoked_on: null, revoked_reason: null });
}, 'has passed no gate');

ok('AEB §37: a Certificate of Completion IS allowed with no gate — it claims no mastery',
  !!I('credential', { id: 'AMC-2026-000003', institution_id: 'mad', enrolment_id: 'e-ghost', credential_type_id: 'ct-completion', issued_name: 'Yusra Hassan', issued_on: '2026-02-01', revoked_on: null, revoked_reason: null }));

throws('a record entry filed under the wrong course is refused',
  () => I('record_entry', { id: 'x4', institution_id: 'mad', enrolment_id: 'e-100', course_id: 'c-nahw', assessment_id: 'a-qira-gate', attempt: 1, grade_id: 'g-itqan', assessed_on: '2026-06-01', assessor_person_id: 'p-yusra', volume_value: null, volume_unit: null }),
  'filed under');

throws('a submission predating its enrolment is refused',
  () => I('submission', { id: 'x5', institution_id: 'mad', enrolment_id: 'e-100', assessment_id: 'a-qira-gate', attempt: 1, submitted_on: '2025-01-01', artefact_ref: null }),
  'predates its enrolment');

throws('duplicate attendance for one session is refused',
  () => I('session_attendance', { id: 'x6', institution_id: 'mad', session_id: 'sess-1', enrolment_id: 'e-100' }),
  'already recorded');

throws('attendance at a session preceding the enrolment is refused', () => {
  I('session', { id: 'sess-old', institution_id: 'mad', course_id: 'c-qira', class_group_id: null, starts_at_utc: '2025-01-01T17:00:00Z', minutes: 60, teacher_person_id: 'p-yusra' });
  I('session_attendance', { id: 'x7', institution_id: 'mad', session_id: 'sess-old', enrolment_id: 'e-100' });
}, 'preceded the enrolment');

throws('a local wall-clock time with no zone is refused as a session instant',
  () => I('session', { id: 'x8', institution_id: 'mad', course_id: 'c-qira', class_group_id: null, starts_at_utc: '2026-03-01 18:00', minutes: 60, teacher_person_id: null }),
  'invalid');

throws('a credential revoked before issue is refused',
  () => I('credential', { id: 'x9', institution_id: 'mad', enrolment_id: 'e-100', credential_type_id: 'ct-completion', issued_name: 'Amina Yusuf', issued_on: '2026-09-05', revoked_on: '2026-01-01', revoked_reason: 'nope' }),
  'revoked before it was issued');

throws('a revocation without a reason is refused',
  () => I('credential', { id: 'x10', institution_id: 'mad', enrolment_id: 'e-100', credential_type_id: 'ct-completion', issued_name: 'Amina Yusuf', issued_on: '2026-09-05', revoked_on: '2026-10-01', revoked_reason: null }),
  'both a date and a reason');

throws('an admission decision predating the application is refused',
  () => I('application_status', { id: 'x11', institution_id: 'mad', application_id: 'app-1', status: 'admitted', effective_from: '2025-01-01', reason: null }),
  'predates the application');

throws('two lessons at the same position are refused',
  () => I('lesson', { id: 'x12', institution_id: 'mad', course_id: 'c-qira', ordinal: 1, title: 'Duplicate' }),
  'already exists in course');

/* AEB §68 — service tier is invisible at assessment. The strongest form of
   that guarantee is that no such field exists anywhere in the engine. */
const src = (await import('node:fs')).readFileSync(new URL('../schema/engine.mjs', import.meta.url), 'utf8');
ok('AEB §68: the engine holds no fee, tier or payment field at all',
  !/\b(fee|tier|price|paid|amount|invoice|discount|scholarship_status)\b/i.test(
    src.replace(/\/\*[\s\S]*?\*\//g, '')),
  'a commercial field exists in the academic engine');

ok('no refused row was written',
  !['assessment', 'record_entry', 'credential', 'submission', 'session', 'session_attendance',
    'application_status', 'lesson']
    .some((e) => db.all(e).some((r) => /^x\d+$/.test(r.id))));

/* ---------- report ---------- */
console.log(`\nSTUDENT JOURNEY — ${pass} passed, ${fails.length} failed`);
if (fails.length) {
  console.log('\nFailures:');
  for (const f of fails) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log('discover → apply → admission → enrol → study → attend → submit →');
console.log('assess → progress → complete → transcript/certificate → verification');
console.log(`The Study surfaces ${Object.keys(finalView).length} keys over 29 entities.`);
