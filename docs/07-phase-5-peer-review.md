# Phase 5 — Adversarial Peer Review

**Version 1.0 · 2 August 2026**
Review of `docs/05-information-architecture.md` v1.0.

**24 findings. 1 critical, 9 high, 11 medium, 3 low.**
**Twelve fixed in this commit. Twelve registered with an owning phase.**

The critical finding is a **direct contradiction between two ratified documents of my own
authorship**. It could not have surfaced before Phase 5, because it only becomes visible
when the credential register meets a public information architecture.

---

## 🔴 Critical

### RG-1 · Regulatory — the permanent register and the right to erasure cannot both be absolute

**The contradiction.**

- `IS §24` (ratified): *"The register is permanent… retained indefinitely, is never
  purged."* — because a graduate may present a certificate in forty years and the register
  must answer.
- `IA §4`: the verification utility is public, unauthenticated, and permanent.
- **UK/EU GDPR Article 17 and Nigeria's NDPA 2023 both grant data subjects a right to
  erasure.** A graduate's name, award, and date are personal data, published indefinitely,
  without their ongoing consent.

**Both positions are correct in isolation and they cannot both be absolute.** A register a
graduate can delete themselves from is not a credential register. A permanent public
publication of a named individual with no erasure path is not lawful in two of our named
markets.

**Resolution — separate the record from its publication.**

| | Decision |
|---|---|
| **Lawful basis** | The register is not consent-based. It rests on **legitimate interest / public task** — credential integrity, fraud prevention, and the interest of third parties relying on it. Consent-based publication would be the wrong basis: a credential a person can retract on request is not evidence of anything |
| **The record is permanent** | Retained indefinitely. Erasure of the *record* would defraud every future party relying on it, and would let a person with a revoked credential erase the revocation — the worst possible outcome |
| **The publication is not** | A holder may request that public lookup be **suppressed**. The record persists; the public endpoint returns *"This credential exists but its holder has requested private verification. Contact the Registry."* Verification remains possible through a named human, with the holder's involvement |
| **Data minimisation** | The public endpoint shows the **minimum** for verification (`IS §24.3`). Not the maximum permitted |
| **Revoked credentials are never suppressible** | Suppression is a privacy right, not an escape route. A revoked credential stays publicly visible as revoked |
| **Documented** | A published Legitimate Interests Assessment and a retention justification, reviewed by counsel, before the first credential is issued |

**This is the correct answer, not a compromise.** It preserves the integrity property that
made the register the credential, and it gives a real erasure pathway that is
proportionate. **Requires counsel to confirm**, alongside C-1.

**Owner:** Phase 9, with C-1. **Blocking:** before the first certificate is issued.
**Fix applied** to `IA §4` and `IS §24`.

---

## 🟠 High

### AZ-1 · Cybersecurity — no designed transition when a minor becomes an adult *(FIXED)*

`IA §10` grants `guardian_of` access. For a minor, that is automatic and appropriate. For
an adult student, `EB §28` requires the student's consent. **No transition is designed for
the moment a student turns 18** — so a guardian's access would silently persist beyond the
point at which it became unlawful, in every jurisdiction we operate in.

**Fix applied.** `guardian_of` carries an expiry at the student's 18th birthday. Thirty days
before, both parties are notified. On the day, access **converts to suspended, not
continued**; it resumes only if the now-adult student affirmatively grants it. Silence
means no access. Diarised in the data layer, not left to an administrator.

### AZ-2 · Cybersecurity — "aggregate" sponsor data is individual data in small cohorts *(FIXED)*

`IA §10` gives sponsors "aggregate progress for that cohort." **In a cohort of three, the
aggregate is the individual.** A sponsor learning that "one of three students failed a
gate" has learned something about a specific person, and small sponsored cohorts are the
normal case, not the edge case.

**Fix applied.** Aggregates suppress below a **minimum cohort size of 10**; below it the
sponsor sees enrolment counts and financial position only, never progress. Individual
progress requires the student's explicit, revocable consent — and sponsorship is never
conditional on granting it, which would make the consent meaningless.

### RG-2 · Regulatory — publishing faculty credentials is publishing personal data *(FIXED)*

`EB §31` makes named faculty with published chains our single strongest trust instrument.
`IA §7` puts them on a public page. **Nowhere is the lawful basis for publishing named
individuals' credentials, qualifications, and scholarly chains addressed** — and a
scholarly chain is arguably more revealing than a CV.

**Fix applied.** Faculty publication is **contractual and consented**, agreed at
appointment, with the scope stated in writing and the profile reviewable by the member
before publication. On departure the profile is removed but **awards they assessed remain
attributed** — assessment attribution is a record, not a profile, and a transcript naming a
departed assessor must stay valid.

### IB-1 · Institutional integrity — the write boundary to the register is unspecified *(FIXED)*

`IA §4` makes the verification register a separate utility. `IA §13` puts "the credential
register" inside the Console's Registry. **Two documents, two homes, and no specified
boundary — for the one dataset whose integrity the entire certification model rests on.**

**Fix applied.** The boundary is now explicit: **the Console *proposes*; the register
*records*.** Writes are append-only, two-person authorised, cryptographically signed at
issue, and never editable after the fact. A correction is a **new entry superseding the
prior one**, with both visible. The Console has no delete capability against the register,
by construction rather than by permission.

### CL-1 · Localisation — the academic calendar assumes Ramaḍān sits still *(FIXED)*

A genuine hundred-year finding. The Hijri year is ~11 days shorter than the Gregorian, so
**Ramaḍān migrates through the entire Gregorian year roughly every 33 years.** An academic
calendar structured around Gregorian terms with "the Ramaḍān break" in a fixed position
will be correct for a few years and then progressively wrong — and by year 20 it will fall
in the middle of a different term every year.

**Fix applied.** The academic calendar is **Hijri-anchored for observances and
Gregorian-anchored for terms**, computed rather than hard-coded, with term boundaries that
flex around the computed Ramaḍān and Ḥajj windows. `EB §5.6` already made Ramaḍān an
operating mode; this makes the calendar architecture capable of honouring it indefinitely.

### AC-1 · Accessibility — the placement assessment must be untimed *(FIXED)*

`IA §15` stage 3 makes placement the first real interaction, and `EB §32.2` makes it our
highest-converting trust instrument. Nothing says it is untimed. A timed assessment as the
front door would breach `EB §25.9`, disadvantage students on poor connections (our primary
market), and contradict the "calibration, not a test" framing in the same document.

**Fix applied.** Explicitly untimed, resumable, retakeable without limit, with progress
saved continuously. No score is ever shown as a grade.

### CL-2 · Localisation — the Portal and Console have no stated language position *(FIXED)*

`EB §26.6` requires the dashboard layer bilingual **from day one**, explicitly rejecting the
precedent repository's English-only dashboard. `IA §11` and `IA §13` never mention language.
An omission at IA stage becomes an English-only build at Phase 6.

**Fix applied.** Both are bilingual from day one, full RTL, with the Console included —
because a Nigerian or Gulf registrar working in Arabic is not a lesser case than a student.

### UX-1 · Admissions — an applicant cannot check their own application *(FIXED)*

`IA §5.2` correctly rejects an admissions portal: applying should not require an account.
But `EB §30` requires every application to be answered and `IA §15` stage 4–5 assumes the
applicant can follow progress. **With no account, there is no designed way for an applicant
to see their own status** — which produces exactly the anxious "did it go through?" email
the architecture was meant to prevent.

**Fix applied.** A signed, expiring status link is emailed on submission and re-sendable
from `/admissions`. No account, no password, no portal — and the applicant can check their
status at any hour without contacting anyone.

### MT-1 · Maintenance — the permanent redirect map grows without bound *(FIXED)*

`IA §9` requires redirects never be removed. Correct for link integrity, but after decades
it becomes a large lookup evaluated on every request — the rule's own success becomes a
performance problem.

**Fix applied.** Two tiers: **hot** redirects (last 5 years) in edge configuration, and a
**historical** map served by a single catch-all handler that consults a static index. Both
are permanent; only their execution path differs.

---

## 🟡 Medium

| ID | Panel | Finding | Disposition |
|---|---|---|---|
| **AZ-3** | Cyber | The cross-person read audit log (`IA §12.3`) is itself a sensitive dataset — who read what about whom — with no stated retention or access policy | Registered — Phase 9 |
| **AZ-4** | Cyber | No stated position on whether the verification endpoint logs verifier IPs; a third party checking a credential should not be tracked | Registered — Phase 9 |
| **UX-2** | UX | **Leave of Absence** appears in the journey (`IA §15` stage 8) but in none of the seven surfaces | ✅ **Fixed** — surfaced in Today and Progress |
| **UX-3** | UX | The assessor's queue is granted by relationship but has no home among the seven surfaces | ✅ **Fixed** — lives in Progress, which is the assessment record for every relationship |
| **UX-4** | UX | Scholarship application is "public" but its relationship to the admissions application is undefined — one form or two? | ✅ **Fixed** — one application, with a financial-aid section. Never a second process |
| **UX-5** | Students, Africa | Band policy on **relocation** mid-programme is undefined. A Band D student moving to the UK: price is locked (`EB §38.2.8`), but what of their next enrolment? | ✅ **Fixed** — current enrolment holds its price; the next is assessed at the new band |
| **AC-2** | Accessibility | The Today surface is dynamic; no live-region or focus-management discipline is stated | Registered — Phase 6 |
| **AC-3** | Accessibility | Arabic search normalisation is specified but untested; a native speaker must evaluate real queries | Registered — Phase 6 |
| **RG-3** | Regulatory | `/careers` processes applicant data — no lawful basis or retention schedule stated | Registered — Phase 9, with C-1 |
| **MT-2** | Maintenance | Publications-as-files is right for durability, but non-technical staff must publish at volume. The bus factor on "who deploys" is unaddressed | Registered — Phase 9 |
| **IB-2** | Integrity | `/publications` versioning (`IA §9`) has no stated approval workflow — who authorises superseding a policy? | ✅ **Fixed** — owning authority per `EB §44.1`, recorded on the version |

## 🟢 Low

| ID | Finding | Disposition |
|---|---|---|
| **UX-6** | No 404 or error-state design principles stated in the IA | Registered — Phase 6 |
| **MT-3** | No sitemap/robots policy stated for the verification host (it should be `noindex` — verification is looked up, never browsed) | ✅ **Fixed** |
| **AC-4** | No stated minimum for how long a status link (UX-1) remains valid | ✅ **Fixed** — 90 days, re-sendable indefinitely |

---

## What this review could not do

- **No counsel reviewed RG-1.** The erasure/permanence resolution is reasoned and, I
  believe, correct — but it is a legal position and needs a lawyer in Nigeria and the UK/EU.
- **No user research.** Every friction claim in `IA §16` is reasoned from category
  knowledge, not observed.
- **No native Arabic speaker** evaluated AC-3's search normalisation.
- **No load or scale testing** informed MT-1's redirect tiering.

---

## Phase 5 status

**Complete. Twelve fixes applied, twelve findings owned.**

**One blocking gate:** RG-1's legitimate-interests position must be confirmed by counsel
**before the first certificate is issued** — not before Phase 6, which is design.

**Phase 6 may begin.**

---

*Phase 5 Peer Review v1.0 — 2 August 2026.*
