#!/usr/bin/env python3
"""Pull only the needed unicode-range block from each Google Fonts CSS file,
download the woff2, and emit a single self-hosted fonts.css plus a base64
variant for inlining into self-contained exploration pages."""
import re, urllib.request, base64, pathlib

HERE = pathlib.Path(__file__).parent
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

JOBS = [
    # (css file, keep-subset-comment, output basename prefix)
    ("fraunces.css", "latin", "fraunces"),
    ("fraunces-italic.css", "latin", "fraunces-italic"),
    ("manrope.css", "latin", "manrope"),
    ("elmessiri.css", "arabic", "elmessiri"),
    ("markazi.css", "arabic", "markazi"),
]

def parse_blocks(css_text):
    # Each block: optional "/* subset */" comment, then @font-face { ... }
    blocks = []
    for m in re.finditer(r"(?:/\*\s*([\w-]+)\s*\*/\s*)?(@font-face\s*\{[^}]*\})", css_text):
        subset = m.group(1) or "unknown"
        blocks.append((subset, m.group(2)))
    return blocks

face_rules = []
for cssfile, keep_subset, prefix in JOBS:
    text = (HERE / cssfile).read_text()
    blocks = parse_blocks(text)
    kept = [b for s, b in blocks if s == keep_subset]
    print(cssfile, "-> total", len(blocks), "kept", len(kept), "for subset", keep_subset)
    for i, block in enumerate(kept):
        weight_m = re.search(r"font-weight:\s*([\d\s]+);", block)
        style_m = re.search(r"font-style:\s*(\w+);", block)
        url_m = re.search(r"url\(([^)]+)\)\s*format\('woff2'\)", block)
        family_m = re.search(r"font-family:\s*'([^']+)';", block)
        if not url_m:
            continue
        weight = weight_m.group(1).strip().split()[-1] if weight_m else "400"
        style = style_m.group(1) if style_m else "normal"
        family = family_m.group(1)
        fname = f"{prefix}-{weight}{'i' if style=='italic' else ''}.woff2"
        fpath = HERE / fname
        if not fpath.exists():
            urllib.request.urlretrieve(url_m.group(1), fpath)
        size = fpath.stat().st_size
        print(" ", fname, f"{size/1024:.1f}KB")
        face_rules.append({
            "family": family, "weight": weight, "style": style, "fname": fname,
        })

# ---- write a plain fonts.css (relative file references, for the real site) ----
lines = []
for r in face_rules:
    lines.append(f"""@font-face {{
  font-family: '{r['family']}';
  font-style: {r['style']};
  font-weight: {r['weight']};
  font-display: swap;
  src: url('{r['fname']}') format('woff2');
}}""")
(HERE / "fonts.css").write_text("\n".join(lines) + "\n")
print("wrote fonts.css with", len(face_rules), "faces")

# ---- write a base64-inlined version, for self-contained exploration pages ----
b64_lines = []
for r in face_rules:
    data = base64.b64encode((HERE / r["fname"]).read_bytes()).decode("ascii")
    b64_lines.append(f"""@font-face {{
  font-family: '{r['family']}';
  font-style: {r['style']};
  font-weight: {r['weight']};
  font-display: swap;
  src: url('data:font/woff2;base64,{data}') format('woff2');
}}""")
(HERE / "fonts.inline.css").write_text("\n".join(b64_lines) + "\n")
total_kb = (HERE / "fonts.inline.css").stat().st_size / 1024
print("wrote fonts.inline.css,", f"{total_kb:.0f}KB")
