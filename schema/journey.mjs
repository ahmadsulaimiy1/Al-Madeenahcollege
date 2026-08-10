/* =========================================================================
   READ MODELS — the elegant surface over the deep engine

   The Founder's design principle, made literal:

     "The database may understand twenty entities. The student should not have
      to understand twenty entities."

   The engine now holds twenty-nine. This file is the only thing the Study,
   the Staff environment and the public register are permitted to read
   through. Its job is to answer seven questions and nothing else:

     What am I studying?   What do I do today?   What is my next class?
     What must I submit?   How am I progressing?   What have I achieved?
     What comes next?

   Three of these are read models rather than tables, and that is a decision
   rather than an omission:

     TRANSCRIPT    derived, never stored. A stored transcript is a second copy
                   of the record that can disagree with the record.
     VERIFICATION  a projection over `credential` that returns the five facts
                   AEB §40 permits and nothing else.
     PROGRESSION   computed from gates passed, because a stored percentage is
                   a number that goes stale silently.
   ========================================================================= */

/* ---------- helpers ---------- */
const byDate = (k) => (a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0);

/* Local rendering of a stored instant. AEB §27.1: every time shown to a
   student is in that student's own zone, always — so the instant is stored in
   UTC and converted at the edge, never the other way round. */
export function inZone(instantUtc, timeZone) {
  const d = new Date(instantUtc);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat('en-GB', {
    timeZone, weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(d);
}

/* =========================================================================
   THE STUDY — one student, seven answers
   ========================================================================= */
export function studyView(db, personId, { asAt, timeZone = 'UTC' } = {}) {
  const today = asAt ?? new Date().toISOString().slice(0, 10);
  const nowUtc = `${today}T00:00:00Z`;

  const person = db.get('person', personId);
  if (!person) return null;
  const inst = person.institution_id;

  /* Only CURRENT student relationships open the Study. A person whose student
     relationship has closed keeps their record and their credentials, and
     stops having a "today". */
  const studentRels = db.relationshipsOf(personId, today).filter((r) => r.role === 'student'
    || r.role === 'doctoral candidate');
  const relIds = new Set(studentRels.map((r) => r.id));

  const enrolments = db.all('enrolment', inst)
    .filter((e) => relIds.has(e.relationship_id))
    .filter((e) => {
      const s = db.statusOf(e.id, today);
      return s !== 'withdrawn' && s !== 'transferred out' && s !== 'lapsed';
    });

  const studying = enrolments.map((e) => {
    const prog = e.programme_id ? db.get('programme', e.programme_id) : null;
    const courses = prog
      ? db.all('course', inst).filter((c) => c.programme_id === prog.id)
      : [];

    /* WHAT AM I STUDYING — the current lesson is the first in the course
       sequence with no completed record behind it. */
    const done = new Set(db.all('record_entry', inst)
      .filter((r) => r.enrolment_id === e.id && r.grade_id !== null)
      .map((r) => r.course_id));
    const currentCourse = courses.find((c) => !done.has(c.id)) ?? null;
    const lessons = currentCourse
      ? db.all('lesson', inst).filter((l) => l.course_id === currentCourse.id)
        .sort((a, b) => a.ordinal - b.ordinal)
      : [];

    /* HOW AM I PROGRESSING — gates passed over gates required. Computed, not
       stored, and expressed as a fraction rather than a percentage so it
       cannot pretend to a precision it does not have. */
    const gates = db.all('assessment', inst)
      .filter((a) => a.is_gate && courses.some((c) => c.id === a.course_id));
    const passedGateIds = new Set(db.all('record_entry', inst)
      .filter((r) => r.enrolment_id === e.id && r.assessment_id !== null && r.grade_id !== null)
      .filter((r) => db.get('grade', r.grade_id).is_pass)
      .map((r) => r.assessment_id));
    const gatesPassed = gates.filter((g) => passedGateIds.has(g.id)).length;

    /* WHAT MUST I SUBMIT — assessments in the current course with no
       submission yet against this enrolment. */
    const submitted = new Set(db.all('submission', inst)
      .filter((s) => s.enrolment_id === e.id).map((s) => s.assessment_id));
    const due = db.all('assessment', inst)
      .filter((a) => currentCourse && a.course_id === currentCourse.id)
      .filter((a) => !submitted.has(a.id))
      .map((a) => ({ id: a.id, name: a.name, isGate: a.is_gate, criterion: a.criterion }));

    return {
      enrolmentId: e.id,
      programme: prog ? prog.name : null,
      status: db.statusOf(e.id, today),
      studying: currentCourse ? { code: currentCourse.code, name: currentCourse.name } : null,
      lesson: lessons.length ? { ordinal: lessons[0].ordinal, title: lessons[0].title } : null,
      due,
      progress: { gatesPassed, gatesRequired: gates.length },
    };
  });

  /* WHAT IS MY NEXT CLASS — the next scheduled session on any live enrolment,
     rendered in the student's own zone. */
  const enrolIds = new Set(enrolments.map((e) => e.id));
  const myGroups = new Set(enrolments.map((e) => e.cohort_id).filter(Boolean));
  const attended = new Set(db.all('session_attendance', inst)
    .filter((a) => enrolIds.has(a.enrolment_id)).map((a) => a.session_id));
  const upcoming = db.all('session', inst)
    .filter((s) => s.starts_at_utc >= nowUtc)
    .filter((s) => {
      if (s.class_group_id) {
        const g = db.get('class_group', s.class_group_id);
        return g && myGroups.has(g.cohort_id);
      }
      /* A course-level session is offered to anyone enrolled on a programme
         that contains that course. */
      const c = s.course_id ? db.get('course', s.course_id) : null;
      return c ? enrolments.some((e) => e.programme_id === c.programme_id) : false;
    })
    .sort(byDate('starts_at_utc'));
  const next = upcoming[0] ?? null;

  /* WHAT HAVE I ACHIEVED — credentials, and only unrevoked ones are an
     achievement. A revoked credential is visible in the register but is not
     something the Study congratulates anyone for. */
  const allEnrolIds = new Set(db.enrolmentsOf(personId).map((e) => e.id));
  const achieved = db.all('credential', inst)
    .filter((c) => allEnrolIds.has(c.enrolment_id) && c.revoked_on === null)
    .map((c) => ({
      id: c.id,
      type: db.get('credential_type', c.credential_type_id).name,
      issuedOn: c.issued_on,
    }));

  return {
    greetingName: db.currentNameOf(personId, today)?.full_name ?? null,
    studying,
    nextClass: next ? {
      at: inZone(next.starts_at_utc, timeZone),
      minutes: next.minutes,
      course: next.course_id ? db.get('course', next.course_id).name : null,
      attended: attended.has(next.id),
    } : null,
    achieved,
    /* WHAT COMES NEXT — the next level up the ladder, if the institution has
       one and the student is not already at the top. */
    next: nextStep(db, enrolments),
  };
}

function nextStep(db, enrolments) {
  for (const e of enrolments) {
    if (!e.programme_id) continue;
    const p = db.get('programme', e.programme_id);
    if (!p || !p.level_id) continue;
    const lvl = db.get('level', p.level_id);
    const higher = db.all('level', p.institution_id)
      .filter((l) => l.level_scheme_id === lvl.level_scheme_id && l.ordinal === lvl.ordinal + 1);
    if (!higher.length) continue;
    const nextProg = db.all('programme', p.institution_id)
      .find((x) => x.level_id === higher[0].id);
    if (nextProg) return { level: higher[0].name, programme: nextProg.name };
  }
  return null;
}

/* =========================================================================
   THE TRANSCRIPT — AEB §39

   "A transcript is not a list of grades; it is a document a stranger must be
   able to evaluate." Derived from the record every time it is asked for, so
   it cannot drift from the record it describes.
   ========================================================================= */
export function transcript(db, enrolmentId) {
  const e = db.get('enrolment', enrolmentId);
  if (!e) return null;
  const inst = db.get('institution', e.institution_id);
  const rel = db.get('relationship', e.relationship_id);
  const prog = e.programme_id ? db.get('programme', e.programme_id) : null;

  const entries = db.all('record_entry', inst.id)
    .filter((r) => r.enrolment_id === enrolmentId)
    .sort((a, b) => (a.course_id < b.course_id ? -1 : a.course_id > b.course_id ? 1
      : a.attempt - b.attempt));

  const courses = entries.map((r) => {
    const c = db.get('course', r.course_id);
    const g = r.grade_id ? db.get('grade', r.grade_id) : null;
    return {
      code: c.code, name: c.name,
      level: c.level_id ? db.get('level', c.level_id).name : null,
      volume: c.volume_value === null ? null : `${c.volume_value} ${c.volume_unit}`,
      attempt: r.attempt,
      /* Unresolved stays unresolved. AEB §5 / doctrine 4. */
      grade: g ? g.name : null,
      assessedOn: r.assessed_on,
    };
  });

  /* AEB §74 — live-session attendance printed as attended/scheduled, never as
     a percentage of logins. */
  const scheduled = db.all('session', inst.id).filter((s) => {
    if (s.class_group_id) {
      const gr = db.get('class_group', s.class_group_id);
      return gr && gr.cohort_id === e.cohort_id;
    }
    const c = s.course_id ? db.get('course', s.course_id) : null;
    return c && prog && c.programme_id === prog.id;
  }).length;
  const attended = db.all('session_attendance', inst.id)
    .filter((a) => a.enrolment_id === enrolmentId).length;

  /* The grade scale is printed ON the transcript. A registrar in Riyadh or
     Toronto cannot look up a scale they have never met (AEB §39). */
  const schemeIds = new Set(entries.filter((r) => r.grade_id)
    .map((r) => db.get('grade', r.grade_id).grade_scheme_id));
  const scale = [...schemeIds].flatMap((sid) => db.all('grade', inst.id)
    .filter((g) => g.grade_scheme_id === sid)
    .sort((a, b) => b.ordinal - a.ordinal)
    .map((g) => ({ name: g.name, isPass: g.is_pass })));

  /* Learning volume is accrued PER COURSE, not per attempt. The first version
     of this summed the course's hours once for every record entry, so a student
     who used AEB §17's free unlimited retakes appeared to have studied for
     three times as long as one who passed first time — the transcript would
     have rewarded failure with hours. Found by the suite, not by reading. */
  const seen = new Set();
  const volumes = [];
  for (const r of entries) {
    if (seen.has(r.course_id)) continue;
    seen.add(r.course_id);
    const c = db.get('course', r.course_id);
    if (c.volume_value !== null) volumes.push([c.volume_value, c.volume_unit]);
  }
  const unit = volumes.length ? volumes[0][1] : null;
  const total = volumes.reduce((n, [v]) => n + v, 0);

  return {
    institution: { name: inst.name },
    /* AEB §11: the record carries the name it was issued under. */
    holder: db.currentNameOf(rel.person_id, e.ended_on ?? undefined)?.full_name ?? null,
    programme: prog ? prog.name : null,
    startedOn: e.started_on,
    endedOn: e.ended_on,
    status: db.statusOf(enrolmentId),
    outcome: e.outcome_grade_id ? db.get('grade', e.outcome_grade_id).name : null,
    courses,
    totalVolume: unit ? `${total} ${unit}` : null,
    liveAttendance: `${attended} / ${scheduled}`,
    gradeScale: scale,
  };
}

/* =========================================================================
   THE PUBLIC REGISTER — AEB §40

   "It takes a credential ID and returns: whether it is valid, what it
   attests, to whom, when issued, and whether it has been revoked. Nothing
   else. It carries no marketing, requires no account, and is free to everyone
   forever."

   Five facts. The projection is deliberately narrow: a verification endpoint
   that returns the whole record is a data-leak with a friendly name.
   ========================================================================= */
export function verify(db, credentialId) {
  const c = db.get('credential', credentialId);
  if (!c) return { found: false };
  const type = db.get('credential_type', c.credential_type_id);
  const inst = db.get('institution', c.institution_id);
  return {
    found: true,
    valid: c.revoked_on === null,
    institution: inst.name,
    attests: type.name,
    limitations: type.limitations,
    holder: c.issued_name,
    issuedOn: c.issued_on,
    revokedOn: c.revoked_on,
    revokedReason: c.revoked_reason,
  };
}
