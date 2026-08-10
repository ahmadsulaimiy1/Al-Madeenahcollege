# The Academic Engine

**10 August 2026 · Cited as `AE §n`**
`schema/engine.mjs` · acceptance suite `tests/engine.mjs`

The model of academic structure, and of the people who stand in relation to it.
Institution-neutral by construction. Zero dependencies, Node built-ins only (`EB §24`).

---

## §1. What it is for

Al-Madeenah needs a student record before it has students (`AEB §63`: a record that begins
the day accreditation is sought is a record that cannot support it). The trap in building
one is that a student-record system written for a single institution silently encodes that
institution's shape as though it were the shape of education.

This engine is therefore built on **removals**. Every assumption below is one such system
normally hard-codes, and every one is false for some institution:

| Assumption | Where it breaks |
|---|---|
| Every institution has faculties | Al-Madeenah has none; nor does a ḥalaqah |
| Every institution has levels | A vocational centre assesses competencies, not levels |
| Every institution has terms | Mastery-gated and rolling-intake study have none |
| Every programme confers a qualification | A corporate workshop confers none |
| A programme's duration is a number of years | ECTS, competency units, days, or *none at all* |
| A qualification type is a fixed list | A Nigerian bachelor's, an American bachelor's and a Bologna first cycle are not the same object |
| One person is one student | A teacher may enrol; a guardian may be staff |
| One student is one programme | Concurrent and successive enrolment are ordinary |
| A student's status is a column you overwrite | It is a history |
| "No result yet" and "a result of zero" are the same | They are not, and conflating them fabricates a decision |
| A guardian has one child | Neither direction is one-to-one, and both change over time |
| "Is a minor" is a fact you store | It is a date you compare, and a stored flag is wrong the next day |

**The engine encodes structure and integrity. It leaves vocabulary to the institution.**

## §2. The two halves

```
institution
 ├─ vocabulary   qualification_type · level_scheme · level · grade_scheme · grade
 ├─ structure    academic_unit* → programme → course*
 │               academic_period* · cohort* · class_group*
 └─ people       person → person_name · identity_credential*
                 person → relationship → enrolment → enrolment_status
                                             └────→ record_entry
                 guardianship*
```
`*` = the institution may have **none**, and when it has none the rows are **absent**.

### §2.1 Absent, not empty

A placeholder row for a layer an institution does not use is a lie that every query
afterwards must remember to filter out. `Engine.shapeOf()` returns only the layers an
institution actually populates, and the acceptance suite asserts that the nine
institutions produce **nine distinct shapes** — from four layers to ten.

### §2.2 Vocabulary is data

`qualification_type` carries the institution's own `framework_ref` (`NQF-7`, `EQF-6`,
`Ofqual-3`, or `null`) and a `regulated` boolean. The engine never inspects the strings.
This is what lets `AEB §37.1` — the prohibition on regulated terms — be a property of the
data rather than a rule someone must remember.

Duration and volume are `value` + `unit` pairs, both nullable **together**: `4 years`,
`180 ECTS`, `12 competency units`, `1,550 NLH`, `5 days`, or nothing at all. A value
without its unit is meaningless and the engine refuses it.

## §3. The people model

> **Person ≠ identity credential ≠ institutional relationship ≠ enrolment ≠ academic record.**

Four separations, each preventing a specific corruption:

| Separation | What it prevents |
|---|---|
| person / credential | A passport number is not a human being. A person may hold several, or none. |
| person / relationship | *Student* is a role held for a period, not what the person **is** |
| relationship / enrolment | One student relationship carries many enrolments over time |
| enrolment / record | A re-enrolment cannot inherit or overwrite an earlier attempt |

**Names are temporal.** A person who marries, converts, corrects a misspelling or
transitions does not become a different person — and their historical record keeps the
name it was issued under while the current record shows the current one.

**Status is append-only.** `statusOf()` computes the current status from the history;
nothing is overwritten, so *active → deferred → active → completed* survives as a sequence
rather than collapsing into its last word. `statusOf(id, asAt)` recovers any past state.

**Minority is computed.** `isMinorOn(person, date)` compares dates and returns `null` when
the date of birth is unknown — because *unknown* is not *adult*.

**Duplicate prevention happens before creation**, never as a merge afterwards. Merging two
humans back together after both have accrued academic records is the hardest recoverable
mistake in a student system, and usually not recoverable.

## §4. Integrity the engine enforces

- **Institutional separation is structural.** Any reference that leaves its tenant is
  refused at insert. Isolation is a property of the model, not of every query somebody
  remembers to scope.
- An enrolment may not begin before, or after, the relationship it hangs from.
- A record entry may not predate its enrolment.
- **An assessment date with no grade is refused** — that is an unresolved decision wearing
  a resolved one's clothes.
- No self-guardianship; no duplicate level ordinal within a scheme; no attempt below 1;
  no interval ending before it begins.

## §5. `null` is a value, and it is load-bearing

`record_entry.grade_id === null` means *not yet assessed*. It is never `0`, never `""`,
never a `PENDING` row smuggled into the grade scheme. `enrolment.outcome_grade_id === null`
means the outcome is genuinely unresolved.

Coercing an unresolved outcome into a zero, a fail, or an empty string is how an academic
record quietly acquires a decision nobody made — and it is invisible, because the value
looks like data rather than absence.

## §6. Migration doctrine — expand, migrate, contract

**[New doctrine, written here for the first time.]** Once real institutional data exists,
a schema change is never made in place. Three deploys, never one:

1. **Expand** — add the new shape alongside the old. Both are written; the old is still
   read. Nothing breaks, and the change is reversible at any point.
2. **Migrate** — backfill, then move reads to the new shape. The old is still written, so
   a rollback is still a deploy rather than a restore.
3. **Contract** — only once the new shape has been read in production without incident,
   stop writing the old and remove it.

**No step may be skipped, and steps 1 and 3 may never share a deploy.** A student record
is not a cache: a bad migration does not cost a rebuild, it costs somebody's evidence that
they studied. `AEB §77` requires the register to be reconstructable from a single archive;
that guarantee is worth nothing if a migration can corrupt it in one step.

## §7. The acceptance suite

`tests/engine.mjs` — **89 assertions**. Its purpose is to attack the generality claim
rather than illustrate it.

**Nine institutions in one store**, deliberately incompatible:

| | Institution | Shape |
|---|---|---|
| 1 | Al-Madeenah — distance, mastery-gated | levels; **no** periods, cohorts, class groups, faculties |
| 2 | Nigerian secondary school | terms, cohorts, class groups, guardians, minors |
| 3 | US university | faculties, semesters, credit hours, regulated award |
| 4 | European university | Bologna cycles, ECTS |
| 5 | UK further-education college | Ofqual levels, units; **no** faculties |
| 6 | Vocational centre | competency units; **no** levels, periods or cohorts |
| 7 | Qur'an ḥalaqah | portions as courses; **no** qualification, levels, periods or cohorts |
| 8 | Doctoral institute | milestones as courses; **no** cohorts or class groups |
| 9 | Corporate training | cohorts only; **no** qualification or levels |

The suite asserts all nine produce **distinct structural signatures**. If any two matched,
it would be testing nine copies of one institution.

**Eighteen people scenarios**: applicant→student→alumnus · concurrent programmes ·
withdrawal and re-enrolment · transfer · deferment and return · staff-who-are-students ·
guardian-who-is-staff · multiple guardians · changing guardianship · minor becoming adult ·
name change · duplicate prevention · unresolved outcomes · multiple attempts ·
international students · doctoral supervision · institutional separation.

**Seventeen negative tests** — the engine must *refuse*: cross-institution references,
dangling references, unknown fields, backwards intervals, enrolments outside their
relationship, records predating their enrolment, assessment dates without grades,
self-guardianship, duplicate ordinals, half-stated volumes, attempt 0, malformed dates.
A final assertion confirms **no refused row leaked into the store**.

## §8. The vertical slice

`schema/journey.mjs` · suite `tests/journey.mjs` — **51 assertions**, one student walked
through all twelve steps end to end.

### §8.1 Dependency analysis — three steps needed no entity

| Step | New entity | Note |
|---|---|---|
| discover | **none** | The public website. A person who has not applied leaves no record, and should not. |
| apply · admission | `application`, `application_status` | Append-only, because `AEB §52` requires that *every application is answered* and an overwritten decision destroys the evidence that an answer was ever given |
| enrol | none | `relationship → enrolment` already carried it |
| study | `lesson` | Four columns. No body, no media, no types — none of which is needed to answer "what am I studying?" |
| attend live class | `session`, `session_attendance` | A row means attended; absence is the absence of a row. No `attended: false`, because a false row and a missing row will eventually disagree |
| submit work | `submission` | |
| assessment | `assessment` | Carries `is_gate` and `machine_marked` |
| **progression** | **NONE** | Ending one enrolment and beginning the next is the transfer pattern the engine suite already exercises |
| completion | none | `enrolment_status` + outcome |
| **transcript** | **NONE** | Derived. A stored transcript is a second copy of the record that can disagree with the record |
| certificate | `credential`, `credential_type` | |
| **verification** | **NONE** | A projection over `credential` |

Nine entities for twelve steps, and the three refusals are the substantive part.

### §8.2 The Bible, enforced rather than remembered

Six constitutional rules are now things the engine physically refuses. A rule the schema
can refuse is a rule that survives the person who wrote it down.

| Rule | Enforcement |
|---|---|
| `AEB §30` an automatically marked instrument may never *constitute* a gate | `assessment` with `is_gate && machine_marked` is refused |
| `AEB §16` a gate is assessed by a qualified human | a graded gate entry with no assessor is refused |
| `AEB §37` a credential attests only what can be evidenced | a mastery-asserting credential on an enrolment that passed no gate is refused — a Certificate of Completion, which claims no mastery, is permitted |
| `AEB §38` a credential states what it does **not** certify | `limitations` travels with the credential *type*, so it cannot be omitted at issue |
| `AEB §40` the register is the credential | `revoked_on`, never deletion — and the engine exposes no delete at all |
| `AEB §68` service tier is invisible at assessment | the engine contains **no** fee, tier, price or payment field, asserted by scanning its own source |

### §8.3 The elegant surface

`studyView()` returns **five keys** over twenty-nine entities, answering the Founder's
seven questions: what am I studying · what do I do today · what is my next class · what
must I submit · how am I progressing · what have I achieved · what comes next.

Progress is a **fraction of gates passed**, computed on read — never a stored percentage,
which goes stale silently. Times are stored as UTC instants and rendered in the student's
own zone (`AEB §27.1`); the suite asserts one instant reads as 18:00 in Lagos and 12:00 in
New York. `verify()` returns exactly the facts `AEB §40` permits and nothing else — a
verification endpoint that returns the whole record is a data leak with a friendly name.

### §8.4 A defect the suite found

The first transcript summed learning volume **per record entry**. Retakes are free and
unlimited (`AEB §17`), so a student who used three attempts appeared to have studied three
times the hours of one who passed first time — **the transcript rewarded failure with
hours.** Volume is now accrued once per course. Found by running it, not by reading it.

## §9. What is deliberately not built

Per the standing instruction against speculative complexity: no cross-institution person
identity, no fee or payment entities, no timetable, no attendance rows, no messaging, no
assessment rubric model. Each is a real requirement eventually; none has a demonstrated
domain requirement **now**, and `AEB §67` removes what cannot answer for itself.

The engine is deep. The product surface stays three doors and a register (`AEB §66`).

---

## §10. Standing doctrines

Ratified by the Founder, 10 August 2026. Permanent.

1. **Person is not Student.** A person may acquire, lose or hold multiple institutional
   relationships without changing identity.
2. **Enrolment is history.** Never model current state in a way that destroys the
   historical academic record.
3. **Institutional isolation is structural.** Never rely on a developer remembering a
   tenant filter.
4. **`null` means unresolved** where the domain requires it. Never silently convert an
   unknown or pending academic decision into a zero, a failure, a default or an invention.
5. **Expand → migrate → contract** is permanent migration doctrine (`§6`).
6. **No speculative complexity.** The smallest architecture that correctly represents the
   demonstrated requirement.

And one added by the Founder as a rule of conduct rather than of schema:

7. **Never claim tests, schemas, commits, repositories, deployments, audits or completed
   work that cannot be verified in the current repository or environment.**

---

*Academic Engine v1.1 — 10 August 2026. Engine 89 · Journey 51.*
