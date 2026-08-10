#!/usr/bin/env node
/* =========================================================================
   THE NINE-INSTITUTION ACCEPTANCE SUITE

   The claim under test is that the academic engine is genuinely
   institution-neutral rather than a Nigerian school schema with the labels
   filed off. A claim of generality is worthless unless something tries to
   break it, so nine institutions with deliberately incompatible shapes are
   built in one store, and the suite asserts that each one's shape is DIFFERENT
   — that unused layers are absent rather than present-and-empty.

   It then stresses the people model against eighteen scenarios that a
   "one person = one student" schema cannot survive.
   ========================================================================= */
import { Engine, IntegrityError, ENTITY_NAMES, OPTIONAL_ENTITIES } from '../schema/engine.mjs';

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') =>
  (cond ? pass++ : fails.push(`${name}${detail ? ' — ' + detail : ''}`));
const throws = (name, fn, match = null) => {
  try { fn(); fails.push(`${name} — expected a refusal, none came`); }
  catch (e) {
    if (!(e instanceof IntegrityError)) return fails.push(`${name} — wrong error: ${e.message}`);
    if (match && !new RegExp(match, 'i').test(e.message)) {
      return fails.push(`${name} — refused for the wrong reason: ${e.message}`);
    }
    pass++;
  }
};

const db = new Engine();
let seq = 0;
const uid = (p) => `${p}-${++seq}`;

/* ---------- builders ---------- */
const inst = (id, name, locale) => db.insert('institution', { id, name, locale });
const qual = (i, id, name, framework_ref, regulated) =>
  db.insert('qualification_type', { id, institution_id: i, name, framework_ref, regulated });
const scheme = (i, id, name) => db.insert('level_scheme', { id, institution_id: i, name });
const lvl = (i, id, s, name, ordinal) =>
  db.insert('level', { id, institution_id: i, level_scheme_id: s, name, ordinal });
const gscheme = (i, id, name) => db.insert('grade_scheme', { id, institution_id: i, name });
const grade = (i, id, s, name, ordinal, is_pass) =>
  db.insert('grade', { id, institution_id: i, grade_scheme_id: s, name, ordinal, is_pass });
const unit = (i, id, name, parent_id = null) =>
  db.insert('academic_unit', { id, institution_id: i, name, parent_id });
const prog = (i, id, name, o = {}) => db.insert('programme', {
  id, institution_id: i, name,
  academic_unit_id: o.unit ?? null, qualification_type_id: o.qual ?? null,
  level_id: o.level ?? null,
  duration_value: o.dv ?? null, duration_unit: o.du ?? null,
  volume_value: o.vv ?? null, volume_unit: o.vu ?? null,
});
const course = (i, id, code, name, o = {}) => db.insert('course', {
  id, institution_id: i, code, name,
  programme_id: o.prog ?? null, level_id: o.level ?? null,
  volume_value: o.vv ?? null, volume_unit: o.vu ?? null,
});
const period = (i, id, name, starts_on, ends_on) =>
  db.insert('academic_period', { id, institution_id: i, name, starts_on, ends_on });
const cohort = (i, id, name, o = {}) => db.insert('cohort', {
  id, institution_id: i, name, programme_id: o.prog ?? null, academic_period_id: o.period ?? null,
});
const group = (i, id, name, o = {}) => db.insert('class_group', {
  id, institution_id: i, name, cohort_id: o.cohort ?? null, course_id: o.course ?? null,
});
const person = (i, id, dob = null, dedupe = null) =>
  db.insert('person', { id, institution_id: i, date_of_birth: dob, dedupe_key: dedupe });
const name = (i, id, p, full_name, script, from, to = null) =>
  db.insert('person_name', { id, institution_id: i, person_id: p, full_name, script, valid_from: from, valid_to: to });
const rel = (i, id, p, role, from, to = null) =>
  db.insert('relationship', { id, institution_id: i, person_id: p, role, valid_from: from, valid_to: to });
const guard = (i, id, g, d, kind, from, to = null) =>
  db.insert('guardianship', { id, institution_id: i, guardian_person_id: g, dependant_person_id: d, kind, valid_from: from, valid_to: to });
const enrol = (i, id, r, started_on, o = {}) => db.insert('enrolment', {
  id, institution_id: i, relationship_id: r, programme_id: o.prog ?? null,
  cohort_id: o.cohort ?? null, started_on, ended_on: o.ended ?? null,
  outcome_grade_id: o.outcome ?? null,
});
const status = (i, id, e, s, effective_from, reason = null) =>
  db.insert('enrolment_status', { id, institution_id: i, enrolment_id: e, status: s, effective_from, reason });
const entry = (i, id, e, c, attempt, o = {}) => db.insert('record_entry', {
  id, institution_id: i, enrolment_id: e, course_id: c,
  assessment_id: o.assessment ?? null, attempt,
  grade_id: o.grade ?? null, assessed_on: o.on ?? null,
  assessor_person_id: o.by ?? null,
  volume_value: o.vv ?? null, volume_unit: o.vu ?? null,
});

/* =========================================================================
   NINE INSTITUTIONS
   ========================================================================= */

/* 1 — AL-MADEENAH. Fully distance, mastery-gated. No terms, no cohorts, no
   class groups, no faculties: progression is by demonstrated mastery, so a
   calendar layer would be a fiction (AEB §19). */
inst('mad', 'Al-Madeenah International College', 'en');
qual('mad', 'mad-q-mastery', 'Certificate of Mastery', null, false);
scheme('mad', 'mad-ls', 'Arabic ladder');
lvl('mad', 'mad-l100', 'mad-ls', 'Level 100 · التمهيدي', 1);
lvl('mad', 'mad-l200', 'mad-ls', 'Level 200 · المتوسّط', 2);
gscheme('mad', 'mad-gs', 'Mastery bands');
grade('mad', 'mad-g-itqan', 'mad-gs', 'Itqān', 4, true);
grade('mad', 'mad-g-jayyid', 'mad-gs', 'Jayyid', 3, true);
grade('mad', 'mad-g-maqbul', 'mad-gs', 'Maqbūl', 2, true);
grade('mad', 'mad-g-lam', 'mad-gs', 'Lam yablugh', 1, false);
prog('mad', 'mad-p-ar100', 'Arabic Foundation', { qual: 'mad-q-mastery', level: 'mad-l100', vv: 200, vu: 'NLH' });
prog('mad', 'mad-p-ar200', 'Arabic Intermediate', { qual: 'mad-q-mastery', level: 'mad-l200', vv: 300, vu: 'NLH' });
course('mad', 'mad-c-nahw1', 'ARB-100-03', 'Naḥw I', { prog: 'mad-p-ar100', vv: 40, vu: 'NLH' });
course('mad', 'mad-c-qira1', 'ARB-100-01', 'Qirāʾah I', { prog: 'mad-p-ar100', vv: 50, vu: 'NLH' });

/* 2 — NIGERIAN SECONDARY SCHOOL. Terms, class groups, guardians, minors. */
inst('ngs', 'Zaria Model Secondary School', 'en');
qual('ngs', 'ngs-q-ssce', 'Senior School Certificate', 'NBAIS', true);
scheme('ngs', 'ngs-ls', 'School classes');
lvl('ngs', 'ngs-jss1', 'ngs-ls', 'JSS 1', 1);
lvl('ngs', 'ngs-ss3', 'ngs-ls', 'SS 3', 6);
gscheme('ngs', 'ngs-gs', 'WAEC-style');
grade('ngs', 'ngs-a1', 'ngs-gs', 'A1', 9, true);
grade('ngs', 'ngs-f9', 'ngs-gs', 'F9', 1, false);
prog('ngs', 'ngs-p-senior', 'Senior Secondary', { qual: 'ngs-q-ssce', level: 'ngs-ss3', dv: 3, du: 'years' });
course('ngs', 'ngs-c-math', 'MTH', 'Mathematics', { prog: 'ngs-p-senior' });
period('ngs', 'ngs-t1', 'First Term 2026/27', '2026-09-14', '2026-12-18');
cohort('ngs', 'ngs-co-2026', 'SS3 2026 intake', { prog: 'ngs-p-senior', period: 'ngs-t1' });
group('ngs', 'ngs-g-ss3a', 'SS3-A', { cohort: 'ngs-co-2026', course: 'ngs-c-math' });

/* 3 — US UNIVERSITY. Faculties, semesters, credit hours, regulated award. */
inst('usu', 'Riverbend State University', 'en');
qual('usu', 'usu-q-ba', 'Bachelor of Arts', null, true);
scheme('usu', 'usu-ls', 'Class standing');
lvl('usu', 'usu-l-fresh', 'usu-ls', 'Freshman', 1);
lvl('usu', 'usu-l-senior', 'usu-ls', 'Senior', 4);
gscheme('usu', 'usu-gs', 'Letter grades');
grade('usu', 'usu-a', 'usu-gs', 'A', 12, true);
grade('usu', 'usu-f', 'usu-gs', 'F', 0, false);
unit('usu', 'usu-u-arts', 'College of Arts & Sciences');
unit('usu', 'usu-u-ling', 'Department of Linguistics', 'usu-u-arts');
prog('usu', 'usu-p-ling', 'BA Linguistics', { unit: 'usu-u-ling', qual: 'usu-q-ba', level: 'usu-l-senior', dv: 4, du: 'years', vv: 120, vu: 'credit hours' });
course('usu', 'usu-c-ling101', 'LING 101', 'Intro to Linguistics', { prog: 'usu-p-ling', vv: 3, vu: 'credit hours' });
period('usu', 'usu-fa26', 'Fall 2026', '2026-08-24', '2026-12-11');
cohort('usu', 'usu-co-26', 'Class of 2030', { prog: 'usu-p-ling', period: 'usu-fa26' });

/* 4 — EUROPEAN UNIVERSITY. Bologna cycles, ECTS. */
inst('eur', 'Universiteit Vandenberg', 'nl');
qual('eur', 'eur-q-1c', 'First Cycle Degree', 'EQF-6', true);
scheme('eur', 'eur-ls', 'Bologna cycles');
lvl('eur', 'eur-c1', 'eur-ls', 'First cycle', 1);
gscheme('eur', 'eur-gs', 'Ten-point scale');
grade('eur', 'eur-10', 'eur-gs', '10', 10, true);
grade('eur', 'eur-5', 'eur-gs', '5', 5, false);
unit('eur', 'eur-u-hum', 'Faculteit Geesteswetenschappen');
prog('eur', 'eur-p-arab', 'BA Arabische Taal', { unit: 'eur-u-hum', qual: 'eur-q-1c', level: 'eur-c1', dv: 180, du: 'ECTS', vv: 180, vu: 'ECTS' });
course('eur', 'eur-c-gram', 'ARA-101', 'Arabische Grammatica', { prog: 'eur-p-arab', vv: 5, vu: 'ECTS' });
period('eur', 'eur-s1', 'Semester 1 2026', '2026-09-01', '2027-01-31');

/* 5 — UK FURTHER-EDUCATION COLLEGE. Ofqual levels, units, no faculties. */
inst('ukf', 'Northgate College', 'en');
qual('ukf', 'ukf-q-l3', 'Level 3 Extended Certificate', 'Ofqual-3', true);
scheme('ukf', 'ukf-ls', 'RQF');
lvl('ukf', 'ukf-l3', 'ukf-ls', 'Level 3', 3);
gscheme('ukf', 'ukf-gs', 'BTEC bands');
grade('ukf', 'ukf-d', 'ukf-gs', 'Distinction', 3, true);
grade('ukf', 'ukf-u', 'ukf-gs', 'Unclassified', 0, false);
prog('ukf', 'ukf-p-bus', 'Business Studies', { qual: 'ukf-q-l3', level: 'ukf-l3', vv: 360, vu: 'GLH' });
course('ukf', 'ukf-c-u1', 'BUS-U1', 'Unit 1: Exploring Business', { prog: 'ukf-p-bus', vv: 90, vu: 'GLH' });
period('ukf', 'ukf-y1', 'Academic Year 2026/27', '2026-09-07', '2027-06-25');

/* 6 — VOCATIONAL CENTRE. NO levels, NO periods, NO cohorts: rolling intake,
   competency units assessed when ready. */
inst('voc', 'Lagos Technical Skills Centre', 'en');
qual('voc', 'voc-q-comp', 'Statement of Competency', null, false);
gscheme('voc', 'voc-gs', 'Competency');
grade('voc', 'voc-comp', 'voc-gs', 'Competent', 2, true);
grade('voc', 'voc-nyc', 'voc-gs', 'Not yet competent', 1, false);
prog('voc', 'voc-p-elec', 'Domestic Electrical Installation', { qual: 'voc-q-comp', vv: 12, vu: 'competency units' });
course('voc', 'voc-c-wiring', 'EL-04', 'Ring circuit wiring', { prog: 'voc-p-elec', vv: 1, vu: 'competency units' });

/* 7 — QUR'AN ḤALAQAH. NO qualification, NO levels, NO periods, NO cohorts.
   Study is by portion; a portion is the assessable unit. */
inst('hal', 'Ḥalaqat al-Fajr', 'ar');
gscheme('hal', 'hal-gs', 'درجات الإتقان');
grade('hal', 'hal-mutqan', 'hal-gs', 'متقن', 3, true);
grade('hal', 'hal-yuraja', 'hal-gs', 'يحتاج مراجعة', 1, false);
prog('hal', 'hal-p-hifz', 'حفظ القرآن', {});          /* confers no qualification */
course('hal', 'hal-c-j30', 'J30', 'جزء عمّ', { prog: 'hal-p-hifz' });
course('hal', 'hal-c-j29', 'J29', 'جزء تبارك', { prog: 'hal-p-hifz' });

/* 8 — DOCTORAL RESEARCH INSTITUTE. Supervision only: NO cohorts, NO class
   groups, NO periods. Milestones are the assessable units. */
inst('phd', 'Institute for Advanced Semitic Studies', 'en');
qual('phd', 'phd-q-doc', 'Doctoral Award', 'EQF-8', true);
scheme('phd', 'phd-ls', 'Research stage');
lvl('phd', 'phd-l-doc', 'phd-ls', 'Doctoral', 8);
gscheme('phd', 'phd-gs', 'Examination outcome');
grade('phd', 'phd-pass', 'phd-gs', 'Pass', 3, true);
grade('phd', 'phd-major', 'phd-gs', 'Major corrections', 2, false);
unit('phd', 'phd-u-sem', 'Department of Semitic Philology');
prog('phd', 'phd-p-doc', 'Doctoral Programme', { unit: 'phd-u-sem', qual: 'phd-q-doc', level: 'phd-l-doc', dv: 4, du: 'years' });
course('phd', 'phd-c-upgrade', 'MS-1', 'Upgrade viva', { prog: 'phd-p-doc' });
course('phd', 'phd-c-thesis', 'MS-2', 'Thesis examination', { prog: 'phd-p-doc' });

/* 9 — CORPORATE TRAINING PROVIDER. NO qualification, NO levels, NO periods,
   NO faculties. Cohorts only. */
inst('cor', 'Meridian Corporate Languages', 'en');
gscheme('cor', 'cor-gs', 'Attendance outcome');
grade('cor', 'cor-done', 'cor-gs', 'Completed', 1, true);
prog('cor', 'cor-p-baw', 'Business Arabic Workshop', { dv: 5, du: 'days' });
course('cor', 'cor-c-d1', 'BAW-1', 'Day 1: Meetings', { prog: 'cor-p-baw' });
cohort('cor', 'cor-co-mar', 'March 2027 intake', { prog: 'cor-p-baw' });

/* ---------- the generality assertions ---------- */
const INSTS = ['mad', 'ngs', 'usu', 'eur', 'ukf', 'voc', 'hal', 'phd', 'cor'];
ok('nine institutions exist', db.all('institution').length === 9);

const shapes = Object.fromEntries(INSTS.map((i) => [i, db.shapeOf(i)]));

/* Unused layers are ABSENT, not present-and-empty. */
for (const [i, layers] of [
  ['mad', ['academic_period', 'cohort', 'class_group', 'academic_unit']],
  ['voc', ['level', 'level_scheme', 'academic_period', 'cohort', 'class_group']],
  ['hal', ['level', 'level_scheme', 'academic_period', 'cohort', 'class_group', 'qualification_type']],
  ['phd', ['cohort', 'class_group', 'academic_period']],
  ['cor', ['level', 'level_scheme', 'academic_period', 'academic_unit', 'qualification_type']],
  ['ukf', ['academic_unit', 'cohort', 'class_group']],
]) {
  for (const layer of layers) {
    ok(`${i}: "${layer}" is absent, not empty`, !(layer in shapes[i]),
      `found ${shapes[i][layer]} row(s)`);
  }
}

/* The shapes must genuinely differ — if any two institutions have the same
   set of layers, the suite is not testing generality, it is testing nine
   copies of one institution. */
const sig = (i) => Object.keys(shapes[i]).sort().join(',');
const sigs = INSTS.map(sig);
ok('every institution has a distinct structural shape',
  new Set(sigs).size === INSTS.length,
  `${new Set(sigs).size} distinct shapes across ${INSTS.length} institutions`);

/* Vocabulary is institutional, not engine-defined. */
ok('qualification vocabulary is per-institution',
  new Set(db.all('qualification_type').map((q) => q.name)).size === 7);
ok('an institution may confer no qualification at all',
  db.get('programme', 'hal-p-hifz').qualification_type_id === null);
ok('duration is expressed in the institution\'s own unit, not years',
  new Set(db.all('programme').map((p) => p.duration_unit).filter(Boolean)).size >= 3);
ok('regulated terms are flagged as data, not inferred from the name',
  db.get('qualification_type', 'usu-q-ba').regulated === true
  && db.get('qualification_type', 'mad-q-mastery').regulated === false);

/* =========================================================================
   PEOPLE — eighteen scenarios
   ========================================================================= */

/* S1 · A person is not a student. Applicant → student → alumnus, historically. */
person('mad', 'p-amina', '1998-04-02', 'amina|1998-04-02|NG');
name('mad', uid('n'), 'p-amina', 'Amina Yusuf', 'latin', '2026-01-01');
rel('mad', 'r-amina-app', 'p-amina', 'applicant', '2026-01-05', '2026-02-01');
rel('mad', 'r-amina-std', 'p-amina', 'student', '2026-02-01');
ok('S1 a person holds a role over an interval, not as an identity',
  db.rolesOf('p-amina', '2026-01-10').join() === 'applicant'
  && db.rolesOf('p-amina', '2026-03-01').join() === 'student');
ok('S1 history survives — the applicant relationship still exists',
  db.relationshipsOf('p-amina').length === 2);

/* S2 · Multiple concurrent programmes on ONE student relationship. */
enrol('mad', 'e-amina-ar100', 'r-amina-std', '2026-02-01', { prog: 'mad-p-ar100' });
enrol('mad', 'e-amina-ar200', 'r-amina-std', '2026-06-01', { prog: 'mad-p-ar200' });
ok('S2 one student relationship carries several enrolments',
  db.enrolmentsOf('p-amina').length === 2);

/* S3 · Status is append-only history, never an overwritten column. */
status('mad', uid('s'), 'e-amina-ar100', 'active', '2026-02-01');
status('mad', uid('s'), 'e-amina-ar100', 'deferred', '2026-04-10', 'illness');
status('mad', uid('s'), 'e-amina-ar100', 'active', '2026-07-01', 'returned');
status('mad', uid('s'), 'e-amina-ar100', 'completed', '2026-11-20');
ok('S3 current status is the latest, computed not stored',
  db.statusOf('e-amina-ar100') === 'completed');
ok('S3 status AS AT a past date is recoverable',
  db.statusOf('e-amina-ar100', '2026-05-01') === 'deferred');
ok('S3 the whole history survives',
  db.statusHistoryOf('e-amina-ar100').map((s) => s.status).join(',')
  === 'active,deferred,active,completed');

/* S4 · Withdrawal, then re-enrolment: a NEW enrolment; the old record is
   untouched. This is the corruption that "current student state" causes. */
person('ngs', 'p-tunde', '2009-03-15', 'tunde|2009-03-15|NG');
name('ngs', uid('n'), 'p-tunde', 'Tunde Bello', 'latin', '2024-09-01');
rel('ngs', 'r-tunde-std', 'p-tunde', 'student', '2024-09-01');
enrol('ngs', 'e-tunde-1', 'r-tunde-std', '2024-09-01', { prog: 'ngs-p-senior', ended: '2025-03-04' });
status('ngs', uid('s'), 'e-tunde-1', 'active', '2024-09-01');
status('ngs', uid('s'), 'e-tunde-1', 'withdrawn', '2025-03-04', 'family relocation');
entry('ngs', 'rec-tunde-1', 'e-tunde-1', 'ngs-c-math', 1, { grade: 'ngs-f9', on: '2025-02-01' });
enrol('ngs', 'e-tunde-2', 'r-tunde-std', '2026-09-14', { prog: 'ngs-p-senior' });
status('ngs', uid('s'), 'e-tunde-2', 'active', '2026-09-14');
entry('ngs', 'rec-tunde-2', 'e-tunde-2', 'ngs-c-math', 1, { grade: 'ngs-a1', on: '2026-12-01' });
ok('S4 re-enrolment creates a second enrolment, not a mutation',
  db.enrolmentsOf('p-tunde').length === 2);
ok('S4 the withdrawn enrolment keeps its own status',
  db.statusOf('e-tunde-1') === 'withdrawn' && db.statusOf('e-tunde-2') === 'active');
ok('S4 the first attempt\'s grade is untouched by the second',
  db.get('record_entry', 'rec-tunde-1').grade_id === 'ngs-f9');
ok('S4 the academic record belongs to the enrolment, not the person',
  db.all('record_entry', 'ngs').filter((r) => r.enrolment_id === 'e-tunde-1').length === 1);

/* S5 · Transfer between programmes: close one enrolment, open another. */
person('usu', 'p-chen', '2007-11-30', 'chen|2007-11-30|US');
name('usu', uid('n'), 'p-chen', 'Wei Chen', 'latin', '2026-08-24');
rel('usu', 'r-chen-std', 'p-chen', 'student', '2026-08-24');
prog('usu', 'usu-p-anth', 'BA Anthropology', { unit: 'usu-u-arts', qual: 'usu-q-ba', dv: 4, du: 'years', vv: 120, vu: 'credit hours' });
enrol('usu', 'e-chen-ling', 'r-chen-std', '2026-08-24', { prog: 'usu-p-ling', ended: '2027-05-10' });
status('usu', uid('s'), 'e-chen-ling', 'transferred out', '2027-05-10', 'to Anthropology');
enrol('usu', 'e-chen-anth', 'r-chen-std', '2027-08-23', { prog: 'usu-p-anth' });
ok('S5 a transfer is two enrolments under one relationship',
  db.enrolmentsOf('p-chen').length === 2
  && db.statusOf('e-chen-ling') === 'transferred out');

/* S6 · A person who is BOTH staff and student, concurrently. */
person('mad', 'p-yusra', '1990-07-19', 'yusra|1990-07-19|EG');
name('mad', uid('n'), 'p-yusra', 'Yusra Hassan', 'latin', '2026-01-01');
rel('mad', 'r-yusra-teach', 'p-yusra', 'teacher', '2026-01-01');
rel('mad', 'r-yusra-std', 'p-yusra', 'student', '2026-09-01');
enrol('mad', 'e-yusra', 'r-yusra-std', '2026-09-01', { prog: 'mad-p-ar200' });
ok('S6 one person holds teacher and student simultaneously',
  db.rolesOf('p-yusra', '2026-10-01').join() === 'student,teacher');
ok('S6 the enrolment hangs off the STUDENT relationship, not the person',
  db.get('enrolment', 'e-yusra').relationship_id === 'r-yusra-std');

/* And she assesses somebody else — the same person, a different role. */
entry('mad', 'rec-amina-nahw', 'e-amina-ar100', 'mad-c-nahw1', 1,
  { grade: 'mad-g-jayyid', on: '2026-03-15', by: 'p-yusra' });
ok('S6 a teacher-who-is-a-student can still assess',
  db.get('record_entry', 'rec-amina-nahw').assessor_person_id === 'p-yusra');

/* S7 · Multiple guardians; S8 · guardian who is also staff; S9 · changing
   guardianship over time. */
person('ngs', 'p-mother', '1982-02-11', 'mother|1982-02-11|NG');
person('ngs', 'p-father', '1979-06-05', 'father|1979-06-05|NG');
person('ngs', 'p-aunt', '1985-12-01', 'aunt|1985-12-01|NG');
name('ngs', uid('n'), 'p-mother', 'Halima Bello', 'latin', '2024-09-01');
name('ngs', uid('n'), 'p-father', 'Sani Bello', 'latin', '2024-09-01');
name('ngs', uid('n'), 'p-aunt', 'Zainab Bello', 'latin', '2024-09-01');
rel('ngs', uid('r'), 'p-mother', 'guardian', '2024-09-01');
rel('ngs', uid('r'), 'p-father', 'guardian', '2024-09-01', '2025-03-04');
rel('ngs', uid('r'), 'p-aunt', 'guardian', '2025-03-05');
rel('ngs', uid('r'), 'p-aunt', 'staff', '2023-01-10');       /* guardian AND staff */
guard('ngs', 'g-1', 'p-mother', 'p-tunde', 'mother', '2024-09-01');
guard('ngs', 'g-2', 'p-father', 'p-tunde', 'father', '2024-09-01', '2025-03-04');
guard('ngs', 'g-3', 'p-aunt', 'p-tunde', 'aunt', '2025-03-05');
ok('S7 a child may have several guardians at once',
  db.guardiansOf('p-tunde', '2024-10-01').length === 2);
ok('S8 a guardian may also be staff',
  db.rolesOf('p-aunt', '2025-06-01').join() === 'guardian,staff');
ok('S9 guardianship changes are temporal, and history survives',
  db.guardiansOf('p-tunde', '2025-06-01').map((g) => g.kind).sort().join() === 'aunt,mother'
  && db.all('guardianship', 'ngs').length === 3);

/* S10 · Minority is COMPUTED from a date, never stored. */
ok('S10 a minor is a minor while they are one',
  db.isMinorOn('p-tunde', '2024-09-01') === true);
ok('S10 and the same person is an adult later, with no field to update',
  db.isMinorOn('p-tunde', '2027-06-01') === false);
/* Chen was born 2007-11-30 and is therefore ALREADY 18 when term starts on
   2026-08-24 — the first draft of this assertion expected a minor and the
   engine was right. Checked a year earlier, where the answer is genuinely
   different, so the test proves the computation rather than a constant. */
ok('S10 a known date of birth answers both ways from the same stored field',
  db.isMinorOn('p-chen', '2025-08-24') === true
  && db.isMinorOn('p-chen', '2026-08-24') === false);

person('mad', 'p-nodob', null, null);
name('mad', uid('n'), 'p-nodob', 'Unstated', 'latin', '2026-01-01');
ok('S10 a missing date of birth returns null, not a default',
  db.isMinorOn('p-nodob', '2026-01-01') === null);

/* S11 · Identity change: names are temporal; the person is permanent. */
name('mad', 'n-amina-2', 'p-amina', 'Amina Yusuf al-Sharif', 'latin', '2027-05-01');
ok('S11 a name change does not create a new person',
  db.all('person_name').filter((n) => n.person_id === 'p-amina').length === 2);
ok('S11 the current name is the current one',
  db.currentNameOf('p-amina', '2027-06-01').full_name === 'Amina Yusuf al-Sharif');
ok('S11 the historical name is still recoverable',
  db.currentNameOf('p-amina', '2026-06-01').full_name === 'Amina Yusuf');

/* S12 · Duplicate-person prevention happens BEFORE creation. */
ok('S12 a duplicate is detected by key, before a second person exists',
  db.findDuplicate('mad', 'amina|1998-04-02|NG')?.id === 'p-amina');
ok('S12 a different institution is not a duplicate',
  db.findDuplicate('ngs', 'amina|1998-04-02|NG') === null);
ok('S12 no key means no false positive',
  db.findDuplicate('mad', null) === null);

/* S13 · An unresolved outcome stays null. */
entry('mad', 'rec-open', 'e-amina-ar200', 'mad-c-qira1', 1, {});
ok('S13 an unassessed entry has a null grade, not a zero',
  db.get('record_entry', 'rec-open').grade_id === null);
ok('S13 and no assessment date',
  db.get('record_entry', 'rec-open').assessed_on === null);
ok('S13 an unresolved enrolment outcome stays null',
  db.get('enrolment', 'e-amina-ar200').outcome_grade_id === null);

/* S14 · Multiple attempts are separate rows; a retake never overwrites. */
entry('mad', 'rec-retake-1', 'e-yusra', 'mad-c-nahw1', 1, { grade: 'mad-g-lam', on: '2026-10-01', by: 'p-amina' });
entry('mad', 'rec-retake-2', 'e-yusra', 'mad-c-nahw1', 2, { grade: 'mad-g-itqan', on: '2026-12-01', by: 'p-amina' });
ok('S14 attempts are separate rows and both survive',
  db.all('record_entry', 'mad').filter((r) => r.enrolment_id === 'e-yusra').length === 2);
ok('S14 the failed attempt is not erased by the pass',
  db.get('record_entry', 'rec-retake-1').grade_id === 'mad-g-lam');

/* S15 · International student — no separate model, just a different person. */
person('mad', 'p-luc', '1995-09-09', 'luc|1995-09-09|FR');
name('mad', uid('n'), 'p-luc', 'Luc Moreau', 'latin', '2026-03-01');
name('mad', uid('n'), 'p-luc', 'لوك مورو', 'arabic', '2026-03-01');
rel('mad', 'r-luc', 'p-luc', 'student', '2026-03-01');
enrol('mad', 'e-luc', 'r-luc', '2026-03-01', { prog: 'mad-p-ar100' });
ok('S15 a person may carry names in several scripts at once',
  db.all('person_name', 'mad').filter((n) => n.person_id === 'p-luc').length === 2);

/* S16 · Alumni: the student relationship closes, an alumnus one opens. */
rel('mad', 'r-amina-alum', 'p-amina', 'alumnus', '2026-11-21');
ok('S16 alumni is a relationship, not a deleted student',
  db.rolesOf('p-amina', '2026-12-01').includes('alumnus')
  && db.relationshipsOf('p-amina').length === 3);
ok('S16 the completed enrolment is still readable after graduation',
  db.statusOf('e-amina-ar100') === 'completed');

/* S17 · Doctoral study: no cohort, no class group, milestones as courses. */
person('phd', 'p-rania', '1992-01-20', 'rania|1992-01-20|JO');
name('phd', uid('n'), 'p-rania', 'Rania Haddad', 'latin', '2026-10-01');
rel('phd', 'r-rania', 'p-rania', 'doctoral candidate', '2026-10-01');
rel('phd', 'r-rania-sup', 'p-rania', 'supervisor', '2030-01-01');   /* later, of others */
enrol('phd', 'e-rania', 'r-rania', '2026-10-01', { prog: 'phd-p-doc' });
entry('phd', 'rec-rania-up', 'e-rania', 'phd-c-upgrade', 1, { grade: 'phd-pass', on: '2027-11-04' });
entry('phd', 'rec-rania-th', 'e-rania', 'phd-c-thesis', 1, {});     /* not yet examined */
ok('S17 doctoral study needs no cohort or class group',
  !('cohort' in shapes.phd) && !('class_group' in shapes.phd));
ok('S17 an un-examined thesis is null, not a fail',
  db.get('record_entry', 'rec-rania-th').grade_id === null);
ok('S17 a candidate may later become a supervisor',
  db.rolesOf('p-rania', '2030-06-01').includes('supervisor'));

/* S18 · Institutional separation. */
ok('S18 each institution sees only its own people',
  db.all('person', 'mad').every((p) => p.institution_id === 'mad')
  && db.all('person', 'ngs').length === 4);

/* =========================================================================
   NEGATIVE TESTS — the engine must REFUSE
   ========================================================================= */
throws('refuses a reference across institutions',
  () => rel('mad', 'x1', 'p-tunde', 'student', '2026-01-01'), 'crosses institutions');
throws('refuses an enrolment into another institution\'s programme',
  () => enrol('mad', 'x2', 'r-amina-std', '2026-02-01', { prog: 'ngs-p-senior' }), 'crosses institutions');
throws('refuses a dangling reference',
  () => prog('mad', 'x3', 'Ghost', { level: 'no-such-level' }), 'does not exist');
throws('refuses a duplicate id',
  () => person('mad', 'p-amina'), 'already exists');
throws('refuses an unknown field',
  () => db.insert('person', { id: 'x4', institution_id: 'mad', date_of_birth: null, dedupe_key: null, is_student: true }),
  'not a field');
throws('refuses a missing field',
  () => db.insert('person', { id: 'x5', institution_id: 'mad' }), 'missing');
throws('refuses an interval that ends before it starts',
  () => rel('mad', 'x6', 'p-amina', 'student', '2026-05-01', '2026-01-01'), 'precedes');
throws('refuses an enrolment predating its relationship',
  () => enrol('mad', 'x7', 'r-amina-std', '2025-01-01', { prog: 'mad-p-ar100' }), 'before its relationship');
throws('refuses an enrolment after its relationship closed',
  () => enrol('mad', 'x8', 'r-amina-app', '2026-06-01', {}), 'after its relationship');
throws('refuses a record entry predating its enrolment',
  () => entry('mad', 'x9', 'e-amina-ar100', 'mad-c-nahw1', 1, { grade: 'mad-g-jayyid', on: '2025-01-01' }), 'before its enrolment');
throws('refuses an assessment date with no grade',
  () => entry('mad', 'x10', 'e-amina-ar100', 'mad-c-nahw1', 3, { on: '2026-05-01' }), 'unresolved decision');
throws('refuses a self-guardianship',
  () => guard('ngs', 'x11', 'p-tunde', 'p-tunde', 'self', '2024-01-01'), 'own guardian');
throws('refuses a duplicate level ordinal within one scheme',
  () => lvl('mad', 'x12', 'mad-ls', 'Level 100 again', 1), 'already exists in scheme');
throws('refuses a volume value with no unit',
  () => prog('mad', 'x13', 'Half-stated', { vv: 100 }), 'must both be set or both be null');
throws('refuses attempt 0',
  () => entry('mad', 'x14', 'e-amina-ar100', 'mad-c-nahw1', 0, {}), 'must be 1 or greater');
throws('refuses a period ending before it starts',
  () => period('ngs', 'x15', 'Backwards', '2026-12-01', '2026-09-01'), 'precedes');
throws('refuses a malformed date',
  () => rel('mad', 'x16', 'p-amina', 'student', '01/02/2026'), 'invalid');

/* Nothing above may have leaked into the store. */
ok('no refused row was written',
  !ENTITY_NAMES.some((e) => db.all(e).some((r) => /^x\d+$/.test(r.id))));

/* ---------- report ---------- */
console.log(`\nACADEMIC ENGINE — ${pass} passed, ${fails.length} failed`);
if (fails.length) {
  console.log('\nFailures:');
  for (const f of fails) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log(`Nine institutions, ${new Set(sigs).size} distinct structural shapes, `
  + `${ENTITY_NAMES.length} entities (${OPTIONAL_ENTITIES.length} optional).`);
console.log('Shapes:');
for (const i of INSTS) {
  console.log(`  ${i.padEnd(4)} ${Object.keys(shapes[i]).length.toString().padStart(2)} layers · `
    + Object.keys(shapes[i]).filter((k) => OPTIONAL_ENTITIES.includes(k)).join(', ') || '  (core only)');
}
