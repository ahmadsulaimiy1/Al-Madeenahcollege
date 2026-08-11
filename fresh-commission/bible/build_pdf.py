#!/usr/bin/env python3
import markdown, pathlib, re

SRC = pathlib.Path(__file__).parent / "academic-editorial-bible.md"
OUT_HTML = pathlib.Path(__file__).parent / "_bible.html"

text = SRC.read_text(encoding="utf-8")

# Split off the title block (first few lines before the Preface) to render as a
# dedicated title page, and let the rest flow as the body.
lines = text.split("\n")
# Find the "## Preface" marker to split title material from body.
split_idx = next(i for i, l in enumerate(lines) if l.startswith("## Preface"))
title_md = "\n".join(lines[:split_idx])
body_md = "\n".join(lines[split_idx:])

md = markdown.Markdown(extensions=["extra", "tables", "toc", "sane_lists"])
title_html = md.convert(title_md)
md.reset()
body_html = md.convert(body_md)

html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Al-Madeenah International College — Academic &amp; Editorial Bible</title>
<style>
@page {{
  size: A4;
  margin: 26mm 22mm 24mm 22mm;
  @bottom-center {{
    content: counter(page);
    font-family: "Bitstream Charter","FreeSerif",Georgia,serif;
    font-size: 9pt;
    color: #6b6353;
  }}
}}
@page cover {{
  margin: 0;
  @bottom-center {{ content: ""; }}
}}
* {{ box-sizing: border-box; }}
html {{ -weasy-hyphens: auto; }}
body {{
  font-family: "Bitstream Charter","FreeSerif",Georgia,serif;
  font-size: 10.6pt;
  line-height: 1.62;
  color: #1c1a14;
}}
.cover {{
  page: cover;
  break-after: page;
  height: 297mm;
  background: linear-gradient(180deg, #0c1f4d 0%, #14295e 62%, #16306e 100%);
  color: #f4efe0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30mm;
}}
.cover .rule {{ width: 70px; height: 2px; background: #c9a24b; margin: 10mm auto; }}
.cover .kicker {{
  letter-spacing: .28em; text-transform: uppercase; font-size: 10pt; color: #c9a24b;
  font-family: "Liberation Sans","DejaVu Sans",Arial,sans-serif;
}}
.cover h1 {{
  font-size: 27pt; font-weight: 600; line-height: 1.28; margin: 8mm 0 3mm 0;
  max-width: 150mm; color: #f8f4e6;
}}
.cover .ar {{
  font-family: "FreeSerif","Bitstream Charter",serif; font-size: 17pt;
  margin-bottom: 10mm; color: #e7dfc4;
}}
.cover h2 {{
  font-family: "Liberation Sans","DejaVu Sans",Arial,sans-serif; font-weight: 400; font-size: 13pt;
  letter-spacing: .04em; color: #cfd8ee; margin: 0;
}}
.cover .ver {{
  margin-top: 16mm; font-family: "Liberation Sans","DejaVu Sans",Arial,sans-serif; font-size: 9.5pt;
  color: #9fb0d6; max-width: 120mm; line-height: 1.6;
}}
h1, h2, h3, h4 {{ font-family: "Bitstream Charter","FreeSerif",Georgia,serif; color: #101a3c; page-break-after: avoid; }}
h1 {{ font-size: 18pt; border-bottom: 1.5px solid #c9a24b; padding-bottom: 3mm; margin-top: 14mm; }}
h2 {{ font-size: 13.5pt; margin-top: 9mm; color: #16306e; }}
h3 {{ font-size: 11.5pt; margin-top: 6mm; }}
p {{ margin: 0 0 3.2mm 0; text-align: justify; }}
em {{ font-style: italic; }}
strong {{ color: #16306e; }}
blockquote {{
  border-inline-start: 2.5px solid #c9a24b; margin: 4mm 0; padding: 1mm 6mm;
  color: #3a3529; font-style: italic;
}}
table {{ width: 100%; border-collapse: collapse; margin: 5mm 0; font-size: 9.6pt; }}
th, td {{ border: 0.6px solid #cabf9e; padding: 2mm 2.6mm; text-align: left; vertical-align: top; }}
th {{ background: #eee6cd; font-family: "Liberation Sans","DejaVu Sans",Arial,sans-serif; font-weight: 600; color: #101a3c; }}
tr:nth-child(even) td {{ background: #faf7ee; }}
hr {{ border: none; border-top: 0.6px solid #c9a24b; margin: 9mm 0; }}
ul, ol {{ margin: 0 0 3.2mm 0; padding-inline-start: 6mm; }}
li {{ margin-bottom: 1.4mm; }}
.toc {{ break-after: page; }}
.toc ul {{ list-style: none; padding: 0; }}
.toc a {{ text-decoration: none; color: #101a3c; }}
code {{ font-family: "Liberation Mono",monospace; font-size: 9.4pt; background: #f2eedd; padding: 0 1mm; }}
</style>
</head>
<body>

<div class="cover">
  <div class="kicker">Institutional Constitution &middot; v1.0</div>
  <div class="rule"></div>
  <h1>Al-Madeenah International<br>College for Arabic &amp;<br>Islamic Studies</h1>
  <div class="ar">كلية المدينة العالمية للدراسات العربية والإسلامية</div>
  <h2>The Academic &amp; Editorial Bible</h2>
  <div class="ver">Prepared as an independent commission. Governs identity, academic
  doctrine, curriculum, credentials, student experience, brand and editorial voice,
  financial philosophy, and institutional conduct.</div>
</div>

{body_html}

</body>
</html>
"""

OUT_HTML.write_text(html, encoding="utf-8")
print("wrote", OUT_HTML)
