/* =========================================================================
   THE ACADEMIC ENGINE

   An institution-neutral model of academic structure and of the people who
   stand in relation to it. Zero dependencies, Node built-ins only, in keeping
   with the rest of this project (EB §24).

   It is built on removals rather than additions. Every assumption listed here
   is one a school-management system normally hard-codes, and every one of them
   is false for some institution this engine must serve:

     · that every institution has faculties, or levels, or terms, or cohorts
     · that a qualification type is a fixed list the software knows
     · that a programme's duration is a number of years
     · that one person is one student
     · that one student is one programme
     · that a student's status is a column you overwrite
     · that "no result yet" and "a result of zero" are the same value
     · that a guardian has one child, or a child has one guardian
     · that "is a minor" is a fact you store rather than a date you compare

   The engine therefore encodes STRUCTURE and INTEGRITY, and leaves VOCABULARY
   to the institution. What a "Bachelor" is, whether levels exist, what a term
   is called and how long a programme runs are institutional data, not
   engine constants.
   ========================================================================= */

/* ---------- helpers ---------- */
const isStr = (v) => typeof v === 'string' && v.length > 0;
const isDate = (v) => isStr(v) && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
const isNullableDate = (v) => v === null || isDate(v);
const isInt = (v) => Number.isInteger(v);
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export class IntegrityError extends Error {
  constructor(msg, entity, id) {
    super(msg);
    this.name = 'IntegrityError';
    this.entity = entity;
    this.id = id;
  }
}

/* =========================================================================
   ENTITY DEFINITIONS

   `optional: true` on a whole entity means an institution may have NONE of
   them — and when it has none, the rows are ABSENT, not present-and-empty.
   A placeholder row for a layer an institution does not use is a lie the
   query layer then has to remember to filter out forever.
   ========================================================================= */

const ENTITIES = {
  /* ---- the tenant ---- */
  institution: {
    fields: {
      id: isStr,
      name: isStr,
      /* Everything below is the institution's own vocabulary. The engine never
         inspects these strings — it only guarantees that references to them
         resolve. */
      locale: isStr,
    },
  },

  /* ---- institution-defined vocabularies ----
     These exist so that "Bachelor", "Semester", "Level 200", "Distinction" and
     "Teacher" are DATA. A platform that hard-codes them has decided that a
     Nigerian bachelor's, an American bachelor's and a Bologna first cycle are
     structurally the same thing. They are not. */
  qualification_type: {
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      /* An institution's own framework reference, e.g. "NQF-7", "EQF-6",
         "Ofqual-3", or null where the institution has no framework. */
      framework_ref: (v) => v === null || isStr(v),
      /* Whether the term is legally regulated in this institution's
         jurisdiction. AEB §37.1 depends on this being explicit. */
      regulated: (v) => typeof v === 'boolean',
    },
    refs: { institution_id: 'institution' },
  },

  level_scheme: {
    optional: true,
    fields: { id: isStr, institution_id: isStr, name: isStr },
    refs: { institution_id: 'institution' },
  },

  level: {
    optional: true,
    fields: {
      id: isStr, institution_id: isStr, level_scheme_id: isStr, name: isStr,
      /* Ordinal position within its scheme. Not a year, not an age, not a
         duration — only an order. */
      ordinal: isInt,
    },
    refs: { institution_id: 'institution', level_scheme_id: 'level_scheme' },
  },

  grade_scheme: {
    fields: { id: isStr, institution_id: isStr, name: isStr },
    refs: { institution_id: 'institution' },
  },

  grade: {
    fields: {
      id: isStr, institution_id: isStr, grade_scheme_id: isStr, name: isStr,
      ordinal: isInt,
      /* Whether this grade constitutes a pass IN THIS SCHEME. Not a number,
         because "pass" is not universally a percentage. */
      is_pass: (v) => typeof v === 'boolean',
    },
    refs: { institution_id: 'institution', grade_scheme_id: 'grade_scheme' },
  },

  /* ---- academic structure ---- */
  academic_unit: {
    optional: true,          /* many institutions have no faculties at all */
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      parent_id: (v) => v === null || isStr(v),   /* self-nesting, any depth */
    },
    refs: { institution_id: 'institution', parent_id: 'academic_unit' },
  },

  programme: {
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      academic_unit_id: (v) => v === null || isStr(v),
      qualification_type_id: (v) => v === null || isStr(v),  /* null: confers none */
      level_id: (v) => v === null || isStr(v),
      /* Duration is INSTITUTION-DEFINED and expressed in its own unit, or null
         where the institution does not express duration at all (mastery-gated
         study has no duration — AEB §19). Never a hard-coded "years" integer. */
      duration_value: (v) => v === null || isNum(v),
      duration_unit: (v) => v === null || isStr(v),
      /* Learning volume, in the institution's own unit: NLH, ECTS, credit
         hours, competency units, or null. */
      volume_value: (v) => v === null || isNum(v),
      volume_unit: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', academic_unit_id: 'academic_unit',
      qualification_type_id: 'qualification_type', level_id: 'level',
    },
  },

  course: {
    optional: true,          /* supervision-only study has no courses */
    fields: {
      id: isStr, institution_id: isStr, code: isStr, name: isStr,
      /* A course may belong to a programme, or stand alone (a short course
         sold on its own). Hence nullable. */
      programme_id: (v) => v === null || isStr(v),
      level_id: (v) => v === null || isStr(v),
      volume_value: (v) => v === null || isNum(v),
      volume_unit: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', programme_id: 'programme', level_id: 'level',
    },
  },

  academic_period: {
    optional: true,          /* rolling intake and mastery-gating have none */
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      starts_on: isDate, ends_on: isDate,
    },
    refs: { institution_id: 'institution' },
  },

  cohort: {
    optional: true,
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      programme_id: (v) => v === null || isStr(v),
      academic_period_id: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', programme_id: 'programme',
      academic_period_id: 'academic_period',
    },
  },

  class_group: {
    optional: true,
    fields: {
      id: isStr, institution_id: isStr, name: isStr,
      cohort_id: (v) => v === null || isStr(v),
      course_id: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', cohort_id: 'cohort', course_id: 'course',
    },
  },

  /* =====================================================================
     PEOPLE

     Person ≠ identity credential ≠ institutional relationship ≠ enrolment ≠
     academic record. Four separations, each preventing a specific corruption:

       person / credential      a passport number is not a human being, and
                                a person may hold several or none
       person / relationship    "student" is a relationship the person holds
                                for a period, not what the person IS
       relationship / enrolment one student relationship may carry several
                                enrolments over time
       enrolment / record       the record belongs to the enrolment that
                                produced it, so a re-enrolment cannot silently
                                inherit or overwrite an earlier attempt
     ===================================================================== */

  person: {
    fields: {
      id: isStr, institution_id: isStr,
      /* Date of birth is stored; "is a minor" is NEVER stored. Minority is a
         comparison against a date, and a stored flag is wrong the day after
         it is written. Nullable because an adult applicant may decline it and
         the institution may have no need for it. */
      date_of_birth: (v) => v === null || isDate(v),
      /* A stable, non-identifying key used to detect a duplicate human being
         before one is created. Never displayed, never a name. */
      dedupe_key: (v) => v === null || isStr(v),
    },
    refs: { institution_id: 'institution' },
  },

  /* Names are temporal. A person who marries, converts, corrects a
     misspelling, or transitions does not become a different person, and their
     historical academic record must keep the name it was issued under while
     the current record shows the current name. */
  person_name: {
    fields: {
      id: isStr, institution_id: isStr, person_id: isStr,
      full_name: isStr,
      script: isStr,                       /* 'latin', 'arabic', … */
      valid_from: isDate,
      valid_to: isNullableDate,            /* null = current */
    },
    refs: { institution_id: 'institution', person_id: 'person' },
  },

  identity_credential: {
    optional: true,
    fields: {
      id: isStr, institution_id: isStr, person_id: isStr,
      kind: isStr,                         /* institution-defined */
      reference: isStr,
      valid_from: isDate,
      valid_to: isNullableDate,
    },
    refs: { institution_id: 'institution', person_id: 'person' },
  },

  /* The central correction. A person holds RELATIONSHIPS to the institution:
     applicant, student, teacher, guardian, alumnus, staff — concurrently and
     historically. Role is an institution-defined string, not an enum, because
     the engine has no business knowing what roles an institution has. */
  relationship: {
    fields: {
      id: isStr, institution_id: isStr, person_id: isStr,
      role: isStr,
      valid_from: isDate,
      valid_to: isNullableDate,            /* null = current */
    },
    refs: { institution_id: 'institution', person_id: 'person' },
  },

  /* Guardianship is many-to-many and temporal: a child may have several
     guardians, a guardian several children, and guardianship may transfer. */
  guardianship: {
    optional: true,
    fields: {
      id: isStr, institution_id: isStr,
      guardian_person_id: isStr,
      dependant_person_id: isStr,
      kind: isStr,                         /* institution-defined */
      valid_from: isDate,
      valid_to: isNullableDate,
    },
    refs: {
      institution_id: 'institution',
      guardian_person_id: 'person', dependant_person_id: 'person',
    },
  },

  /* An enrolment binds a STUDENT RELATIONSHIP to a programme for a period.
     Status is NOT a column on this row — see enrolment_status. */
  enrolment: {
    fields: {
      id: isStr, institution_id: isStr,
      relationship_id: isStr,
      programme_id: (v) => v === null || isStr(v),   /* null: course-only study */
      cohort_id: (v) => v === null || isStr(v),
      started_on: isDate,
      ended_on: isNullableDate,
      /* Outcome is null while unresolved and MUST stay null. Coercing an
         unresolved outcome to a zero, a fail, or an empty string is how an
         academic record quietly acquires a decision nobody made. */
      outcome_grade_id: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', relationship_id: 'relationship',
      programme_id: 'programme', cohort_id: 'cohort', outcome_grade_id: 'grade',
    },
  },

  /* Status is an append-only history. Nothing is ever overwritten, so
     "withdrew, returned, deferred, resumed, completed" survives as a sequence
     rather than collapsing into the last word. */
  enrolment_status: {
    fields: {
      id: isStr, institution_id: isStr, enrolment_id: isStr,
      status: isStr,                       /* institution-defined */
      effective_from: isDate,
      reason: (v) => v === null || isStr(v),
    },
    refs: { institution_id: 'institution', enrolment_id: 'enrolment' },
  },

  /* The academic record belongs to the ENROLMENT, not the person. A student
     who re-enrols starts a new record; the old one stays exactly as it was. */
  record_entry: {
    fields: {
      id: isStr, institution_id: isStr,
      enrolment_id: isStr,
      course_id: isStr,
      attempt: isInt,
      /* null = not yet assessed. Never 0, never "", never "PENDING" masquerading
         as a grade in the grade scheme. */
      grade_id: (v) => v === null || isStr(v),
      assessed_on: isNullableDate,
      assessor_person_id: (v) => v === null || isStr(v),
      volume_value: (v) => v === null || isNum(v),
      volume_unit: (v) => v === null || isStr(v),
    },
    refs: {
      institution_id: 'institution', enrolment_id: 'enrolment',
      course_id: 'course', grade_id: 'grade', assessor_person_id: 'person',
    },
  },
};

export const ENTITY_NAMES = Object.keys(ENTITIES);
export const OPTIONAL_ENTITIES = ENTITY_NAMES.filter((n) => ENTITIES[n].optional);

/* =========================================================================
   THE STORE
   ========================================================================= */

export class Engine {
  constructor() {
    this.tables = new Map(ENTITY_NAMES.map((n) => [n, new Map()]));
  }

  #table(entity) {
    const t = this.tables.get(entity);
    if (!t) throw new IntegrityError(`unknown entity "${entity}"`, entity);
    return t;
  }

  insert(entity, row) {
    const spec = ENTITIES[entity];
    if (!spec) throw new IntegrityError(`unknown entity "${entity}"`, entity);
    const table = this.#table(entity);

    /* fields present and well-typed */
    for (const [f, check] of Object.entries(spec.fields)) {
      if (!(f in row)) {
        throw new IntegrityError(`${entity}.${f} is missing`, entity, row.id);
      }
      if (!check(row[f])) {
        throw new IntegrityError(
          `${entity}.${f} is invalid: ${JSON.stringify(row[f])}`, entity, row.id);
      }
    }
    for (const f of Object.keys(row)) {
      if (!(f in spec.fields)) {
        throw new IntegrityError(`${entity}.${f} is not a field`, entity, row.id);
      }
    }
    if (table.has(row.id)) {
      throw new IntegrityError(`${entity} id "${row.id}" already exists`, entity, row.id);
    }

    /* references resolve, and NEVER across institutions */
    for (const [f, target] of Object.entries(spec.refs || {})) {
      const v = row[f];
      if (v === null || v === undefined) continue;
      const ref = this.#table(target).get(v);
      if (!ref) {
        throw new IntegrityError(
          `${entity}.${f} → ${target}("${v}") does not exist`, entity, row.id);
      }
      /* Institutional separation. The engine refuses a reference that leaves
         its tenant, so isolation is a property of the model rather than of
         every query someone remembers to scope. */
      if (target !== 'institution' && ref.institution_id !== row.institution_id) {
        throw new IntegrityError(
          `${entity}.${f} crosses institutions: "${row.institution_id}" → "${ref.institution_id}"`,
          entity, row.id);
      }
    }

    this.#invariants(entity, row);
    table.set(row.id, Object.freeze({ ...row }));
    return row;
  }

  /* ---- invariants that no field check can express ---- */
  #invariants(entity, row) {
    const bad = (m) => { throw new IntegrityError(m, entity, row.id); };

    /* Temporal rows: an interval may not end before it begins. */
    if ('valid_from' in row && 'valid_to' in row && row.valid_to !== null
        && row.valid_to < row.valid_from) {
      bad(`${entity} valid_to (${row.valid_to}) precedes valid_from (${row.valid_from})`);
    }
    if (entity === 'academic_period' && row.ends_on < row.starts_on) {
      bad(`academic_period ends_on precedes starts_on`);
    }
    if (entity === 'enrolment' && row.ended_on !== null && row.ended_on < row.started_on) {
      bad(`enrolment ended_on precedes started_on`);
    }

    /* An enrolment must hang off a relationship that was current when it
       began — a person cannot enrol through a relationship they did not hold. */
    if (entity === 'enrolment') {
      const rel = this.tables.get('relationship').get(row.relationship_id);
      if (row.started_on < rel.valid_from) {
        bad(`enrolment starts ${row.started_on}, before its relationship began ${rel.valid_from}`);
      }
      if (rel.valid_to !== null && row.started_on > rel.valid_to) {
        bad(`enrolment starts ${row.started_on}, after its relationship ended ${rel.valid_to}`);
      }
    }

    /* A record entry belongs to an enrolment; it may not predate it. */
    if (entity === 'record_entry' && row.assessed_on !== null) {
      const enr = this.tables.get('enrolment').get(row.enrolment_id);
      if (row.assessed_on < enr.started_on) {
        bad(`record_entry assessed ${row.assessed_on}, before its enrolment began ${enr.started_on}`);
      }
    }

    /* A grade may only be used from the scheme its course's institution
       defined — enforced by the cross-institution rule above — and an
       unassessed entry may not carry an assessment date. */
    if (entity === 'record_entry' && row.grade_id === null && row.assessed_on !== null) {
      bad(`record_entry has an assessment date but no grade; use null for both, ` +
          `or record the grade. An assessed-but-ungraded row is an unresolved ` +
          `decision wearing a resolved one's clothes.`);
    }

    /* Nobody is their own guardian. */
    if (entity === 'guardianship' && row.guardian_person_id === row.dependant_person_id) {
      bad(`guardianship: a person cannot be their own guardian`);
    }

    /* A level belongs to exactly one scheme, and ordinals within a scheme are
       unique — two "Level 200"s in one scheme is a data-entry error that would
       silently break ordering forever. */
    if (entity === 'level') {
      for (const l of this.tables.get('level').values()) {
        if (l.level_scheme_id === row.level_scheme_id && l.ordinal === row.ordinal) {
          bad(`level ordinal ${row.ordinal} already exists in scheme "${row.level_scheme_id}"`);
        }
      }
    }

    /* Duration and volume are pairs: a value without its unit is meaningless,
       and a unit without a value is noise. */
    for (const [v, u] of [['duration_value', 'duration_unit'], ['volume_value', 'volume_unit']]) {
      if (v in row && (row[v] === null) !== (row[u] === null)) {
        bad(`${entity}.${v}/${u} must both be set or both be null`);
      }
    }

    /* An attempt is 1-based; attempt 0 is somebody's off-by-one. */
    if (entity === 'record_entry' && row.attempt < 1) {
      bad(`record_entry.attempt must be 1 or greater`);
    }
  }

  /* ---- reads ---- */
  all(entity, institutionId = null) {
    const rows = [...this.#table(entity).values()];
    return institutionId ? rows.filter((r) => r.institution_id === institutionId) : rows;
  }

  get(entity, id) { return this.#table(entity).get(id) ?? null; }

  /* Every relationship a person holds, optionally as at a date. */
  relationshipsOf(personId, asAt = null) {
    return this.all('relationship')
      .filter((r) => r.person_id === personId)
      .filter((r) => !asAt || (r.valid_from <= asAt && (r.valid_to === null || r.valid_to >= asAt)));
  }

  rolesOf(personId, asAt = null) {
    return [...new Set(this.relationshipsOf(personId, asAt).map((r) => r.role))].sort();
  }

  /* Current status = the latest status by effective_from. The history is never
     mutated, so this is a read, not a stored column. */
  statusOf(enrolmentId, asAt = null) {
    const hist = this.all('enrolment_status')
      .filter((s) => s.enrolment_id === enrolmentId)
      .filter((s) => !asAt || s.effective_from <= asAt)
      .sort((a, b) => (a.effective_from < b.effective_from ? -1
        : a.effective_from > b.effective_from ? 1 : a.id < b.id ? -1 : 1));
    return hist.length ? hist[hist.length - 1].status : null;
  }

  statusHistoryOf(enrolmentId) {
    return this.all('enrolment_status')
      .filter((s) => s.enrolment_id === enrolmentId)
      .sort((a, b) => (a.effective_from < b.effective_from ? -1 : 1));
  }

  enrolmentsOf(personId) {
    const rels = new Set(this.relationshipsOf(personId).map((r) => r.id));
    return this.all('enrolment').filter((e) => rels.has(e.relationship_id));
  }

  /* Minority is COMPUTED, never stored. */
  isMinorOn(personId, date, majorityAge = 18) {
    const p = this.get('person', personId);
    if (!p || p.date_of_birth === null) return null;   /* unknown ≠ adult */
    const dob = new Date(p.date_of_birth), on = new Date(date);
    let age = on.getFullYear() - dob.getFullYear();
    const m = on.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && on.getDate() < dob.getDate())) age--;
    return age < majorityAge;
  }

  currentNameOf(personId, asAt = null) {
    const n = this.all('person_name')
      .filter((x) => x.person_id === personId)
      .filter((x) => !asAt || (x.valid_from <= asAt && (x.valid_to === null || x.valid_to >= asAt)));
    return n.length ? n[n.length - 1] : null;
  }

  guardiansOf(personId, asAt = null) {
    return this.all('guardianship')
      .filter((g) => g.dependant_person_id === personId)
      .filter((g) => !asAt || (g.valid_from <= asAt && (g.valid_to === null || g.valid_to >= asAt)));
  }

  /* Duplicate-person prevention: a check performed BEFORE creating a person,
     never a merge performed afterwards. Merging two humans back together
     after they have both accrued academic records is the hardest recoverable
     mistake in a student system, and usually not recoverable at all. */
  findDuplicate(institutionId, dedupeKey) {
    if (!dedupeKey) return null;
    return this.all('person', institutionId).find((p) => p.dedupe_key === dedupeKey) ?? null;
  }

  /* Which optional layers this institution actually uses. Absent, not empty. */
  shapeOf(institutionId) {
    const shape = {};
    for (const e of ENTITY_NAMES) {
      const n = this.all(e, institutionId).length;
      if (n > 0) shape[e] = n;
    }
    return shape;
  }
}
