# Al-Madeenah International College — fresh commission

This directory is a deliberately isolated, independent creative and institutional
commission for Al-Madeenah International College for Arabic & Islamic Studies.

**It shares nothing with the rest of this repository on purpose.** Nothing outside
this directory was read, consulted, or used as a basis for anything inside it. If
you are picking this project back up, treat this directory — not the repository
root — as the starting point, and continue extending it from here rather than
reconciling it with anything else in this repository.

## Contents

- `bible/academic-editorial-bible.md` — the source of the Academic & Editorial
  Bible v1.0: the constitutional document governing identity, academic doctrine,
  curriculum, credentials, student experience, brand and editorial voice,
  financial philosophy, and institutional conduct.
- `bible/strategic-conclusions.md` — a one-page summary of the Bible's decisions,
  without the reasoning.
- `bible/AlMadeenah-College_Academic-Editorial-Bible_v1.0.pdf` and `.docx` —
  professionally typeset exports of the Bible, generated from the same source.
- `bible/build_pdf.py`, `bible/build_docx.mjs` — the scripts that produce the two
  exports from the markdown source, so both can be regenerated after an edit.
- `design-system/design-system.md` — the working design system: typography
  (Fraunces/Manrope/El Messiri/Markazi Text), the Royal Blue/gold/ivory/cream
  palette, grid and spacing, imagery and iconography doctrine, component rules,
  the header/footer information architecture, motion language, and the rule that
  the Study does not borrow the public site's ceremony.
- `design-system/explorations/homepage.html` and `reading-room.html` — two
  high-fidelity, self-contained (fonts inlined) visual explorations built from
  that system: a full homepage direction (five-layer header, hero, programme
  index, mega-footer) and a representative Reading Room lesson screen. Verified
  with no horizontal overflow at seven breakpoints from 320px to 1920px.
  Regenerate after editing a `.template.html` with
  `python3 design-system/assets/fonts/fetch.py` (once, to populate fonts) then
  the splice step documented at the top of each template file.

## Status

Bible: first issue (v1.0), accepted by the Founder as the strategic foundation —
not being reopened for further theoretical refinement. Design system and the first
two high-fidelity explorations: built, responsive-tested, and delivered for
Founder review before the system scales across the rest of the public website,
the Study and Executive. Nine matters requiring the Founder's authority are listed
in the Bible's Appendix A; work not depending on them continues without waiting.
