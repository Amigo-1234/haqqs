"""Prepare the Maolid Nabiyy 2026 photo collection (photographs: MC Larios TV).

Deduplicated from 73 supplied files to the highest-resolution copy of each
distinct photograph. Excluded: photographs showing identifiable minors
(Markazul Ginaa student reciters, a young reciter, two group photos with
children). Captions are descriptive only; no one is named.
Run from the repo root: python3 -I web/scripts/prepare_maolid_2026.py <uploads_dir>
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "web" / "public" / "events" / "maolid-2026"
MANIFEST = ROOT / "web" / "src" / "content" / "events" / "maolid-2026-photos.json"

GREET = "Guests greet one another"
SEATED = "Guests seated in the hall"
PINK = "Members in the society’s pink hijabs"
GROUP = "Guests pose for a group photograph"
HIGH = "On the high table"
CAKE = "Cake-cutting at the celebration"
SPEAK = "A speaker addresses the gathering"
AUDIENCE = "Women in the audience"

# (upload id, caption, alt text). The first three are the homepage highlights.
PHOTOS = [
    ("22e1380b", HIGH, "A dignitary in a white robe with gold embroidery and a patterned cap, seated on an ornate gold chair"),
    ("9e8be049", CAKE, "Two elders smiling beside a white and gold cake decorated with gold fans"),
    ("9688644e", SPEAK, "A man in a lilac robe and patterned cap speaking into a microphone"),
    ("7e47910e", PINK, "Women in pink hijabs bearing the HAQSLAM emblem, seated in the audience"),
    ("94a41fb6", "Guests gather beneath the chandelier", "A group of men in embroidered robes and caps standing together under a chandelier"),
    ("c1716402", SPEAK, "A man in a cream robe with gold trim speaking into a microphone"),
    ("9d87a60e", "Members and guests together", "Women in pink hijabs and men in embroidered robes gathered for a group photograph"),
    ("38e45d47", HIGH, "Two dignitaries seated on the high table, one in blue and white, one in white and gold"),
    ("ba219b65", HIGH, "An elder in a white cap and blue and white robe, seated with prayer beads"),
    ("c8ff8dbd", HIGH, "A smiling elder in a green robe and white lace turban"),
    ("d6d8cd17", HIGH, "A dignitary in white and gold seated on an ornate chair"),
    ("e3a5f45e", HIGH, "An elder in a white cap and blue and white robe seated on the high table"),
    ("a1ee510c", "Guests on the high table", "Two men in white robes seated side by side, one holding prayer beads"),
    ("5ccc4be6", CAKE, "Two elders standing behind a decorated cake"),
    ("8d503d0a", CAKE, "Two elders shaking hands over a decorated cake"),
    ("3fb4fa87", CAKE, "Guests gathered around the cake table"),
    ("d3eaf885", CAKE, "Elders cutting a decorated cake together"),
    ("98c7346a", "Around the cake table", "Guests in caps and robes standing around a cake"),
    ("19330a53", GROUP, "A woman in an orange dress and hijab with men in embroidered robes"),
    ("ad2b41ca", GROUP, "Guests in robes and caps with a woman in orange standing together"),
    ("9f314e64", GROUP, "Guests in white, gold and orange standing together on green carpet"),
    ("ea20dd91", GROUP, "Four men in embroidered robes and caps standing together"),
    ("15df1925", GROUP, "Five men in embroidered robes and caps standing together on green carpet"),
    ("d5f39cd6", GREET, "Two men in white and gold robes greeting each other warmly"),
    ("9796c8b5", GREET, "Two men embracing in greeting"),
    ("91356010", GREET, "Two guests in conversation"),
    ("0291dece", "A guest at the celebration", "A man in a white and blue robe and cap, seated"),
    ("9a7209bd", SEATED, "Men in caps and robes seated in the hall"),
    ("e102cb83", SEATED, "Guests seated together in the hall"),
    ("0b15bece", SEATED, "Guests in colourful robes seated in a row"),
    ("a9db4331", SEATED, "Two men in white robes seated, holding prayer beads"),
    ("4010e5bd", SEATED, "Guests seated in the hall"),
    ("1a755103", SEATED, "Guests in white robes seated in the hall"),
    ("b968278b", SEATED, "Two young men seated in the audience"),
    ("5c5d739c", "A guest at the celebration", "A man in a white kaftan seated in the hall"),
    ("dbeef77a", "A guest at the celebration", "A man in an embroidered white kaftan and cap"),
    ("44aa4e32", PINK, "A woman in a pink hijab bearing the HAQSLAM emblem"),
    ("28705d93", PINK, "Women in pink hijabs in the audience"),
    ("e0c8087c", PINK, "Women in pink hijabs seated in rows"),
    ("79ca762c", PINK, "Women in pink and white seated in the audience"),
    ("023778f2", AUDIENCE, "Women in hijabs seated in the audience"),
    ("b75d5542", AUDIENCE, "Two women in the audience, one in a pink hijab"),
    ("565476f7", "A guest addresses the gathering", "A woman in a white cap and pink shawl speaking into a microphone"),
    ("82befe18", "A guest at the microphone", "A man in a white robe and cap holding a microphone"),
]


def main(uploads: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    photos = []
    for i, (pid, caption, alt) in enumerate(PHOTOS, start=1):
        im = Image.open(uploads / f"{pid}-image.jpg").convert("RGB")
        if im.width > 1800:
            im = im.resize((1800, round(im.height * 1800 / im.width)), Image.LANCZOS)
        dest = OUT / f"{i:02d}.webp"
        im.save(dest, "WEBP", quality=80, method=6)
        photos.append({"src": f"/events/maolid-2026/{i:02d}.webp", "width": im.width, "height": im.height, "caption": caption, "alt": alt})
    MANIFEST.write_text(json.dumps(photos, indent=1, ensure_ascii=False))
    print(len(photos), "photos")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
