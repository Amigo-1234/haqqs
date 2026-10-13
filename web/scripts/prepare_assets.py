"""Prepare optimized web copies of legacy HAQSLAM assets for the V2 site.

Reads from ../haqslam (left untouched) and owner-supplied references, writes
WebP/PNG derivatives into web/public and a page manifest into web/src/content.
Run from the repo root: python3 -I web/scripts/prepare_assets.py <uploads_dir>
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
LEGACY = ROOT / "haqslam"
PUBLIC = ROOT / "web" / "public"
CONTENT = ROOT / "web" / "src" / "content"

# Legacy folder -> V2 slug (see src/content/library.ts for titles).
BOOKS = {
    "haqslam-prayer-book": ("IMAGE3", "haq.png"),
    "kitab-al-adhkar": ("IMAGE1", "night.png"),
    "adiya-shahriyya": ("IMAGE2", "2nd.png"),
    "muassasat-prayer-book": ("IMAGE", "01.png"),
    "laylat-al-qadr": (None, "nig.png"),
}


def save_webp(img: Image.Image, dest: Path, max_w: int, quality: int) -> tuple[int, int]:
    img = img.convert("RGB")
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=quality, method=6)
    return img.width, img.height


def books() -> None:
    manifest = {}
    for slug, (folder, cover) in BOOKS.items():
        out = PUBLIC / "library" / slug
        cw, ch = save_webp(Image.open(LEGACY / cover), out / "cover.webp", 900, 80)
        pages = []
        if folder:
            for i, src in enumerate(sorted((LEGACY / folder).glob("*.png")), start=1):
                w, h = save_webp(Image.open(src), out / "pages" / f"{i:03d}.webp", 1400, 74)
                pages.append({"src": f"/library/{slug}/pages/{i:03d}.webp", "width": w, "height": h})
        manifest[slug] = {
            "cover": {"src": f"/library/{slug}/cover.webp", "width": cw, "height": ch},
            "pages": pages,
        }
        print(slug, len(pages), "pages")
    (CONTENT / "library-pages.json").write_text(json.dumps(manifest, indent=1))


def photos(uploads: Path) -> None:
    # Founder portrait, cropped to the founder only (background attendees excluded).
    p = Image.open(uploads / "ae8f39fd-image.jpg").crop((300, 110, 1250, 2048))
    save_webp(p, PUBLIC / "photos" / "founder-portrait.webp", 1400, 82)
    # Official event flyers, published as event posters.
    save_webp(Image.open(uploads / "cc56aeb1-image.jpg"), PUBLIC / "photos" / "events" / "maolid-2023-flyer.webp", 1600, 82)
    save_webp(Image.open(uploads / "c64a43a1-image.png"), PUBLIC / "photos" / "events" / "maolid-2026-flyer.webp", 1600, 82)


def emblems(uploads: Path) -> None:
    from PIL import ImageDraw, ImageFilter

    def cut(src: Image.Image, box, name: str, scale: int = 4, thresh: int = 30):
        big = src.convert("RGB").crop(box)
        big = big.resize((big.width * scale, big.height * scale), Image.LANCZOS)
        marker = big.copy()
        w, h = marker.size
        for x in range(0, w, 3):
            for y in (0, h - 1):
                ImageDraw.floodfill(marker, (x, y), (255, 0, 255), thresh=thresh)
        for y in range(0, h, 3):
            for x in (0, w - 1):
                ImageDraw.floodfill(marker, (x, y), (255, 0, 255), thresh=thresh)
        mask = Image.new("L", (w, h), 255)
        mp, kp = mask.load(), marker.load()
        for y in range(h):
            for x in range(w):
                if kp[x, y] == (255, 0, 255):
                    mp[x, y] = 0
        mask = mask.filter(ImageFilter.GaussianBlur(1))
        out = big.convert("RGBA")
        out.putalpha(mask)
        out = out.crop(out.getbbox())
        dest = PUBLIC / "brand" / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        out.save(dest)
        print(name, out.size)

    flyer_2023 = Image.open(uploads / "cc56aeb1-image.jpg")
    cut(flyer_2023, (10, 118, 124, 254), "haqslam-emblem-2023-reference.png")
    clip_emblem(PUBLIC / "brand" / "haqslam-emblem-2023-reference.png")
    flyer_2026 = Image.open(uploads / "c64a43a1-image.png")
    cut(flyer_2026, (893, 72, 992, 166), "markaz-ginaa-logo-reference.png")


def clip_emblem(path: Path) -> None:
    """Clip flyer debris by keeping only the emblem's own shapes.

    The result still carries a faint white fringe, so it is designed to sit on
    an ivory plate (see components/brand/Emblem.tsx), never on dark colour.
    """
    from PIL import ImageChops, ImageDraw, ImageFilter

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    d.ellipse((14, 52, 442, 330), fill=255)  # arch crown
    d.rectangle((14, 190, 442, 330), fill=255)  # arch sides
    d.rounded_rectangle((18, 262, 446, 398), 12, fill=255)  # HAQSLAM band
    d.rectangle((22, 392, 440, h), fill=255)  # tagline
    d.ellipse((248, 8, 345, 108), fill=255)  # crescent and star
    m = m.filter(ImageFilter.GaussianBlur(1.5))
    im.putalpha(ImageChops.multiply(im.getchannel("A"), m))
    im.save(path)


if __name__ == "__main__":
    uploads = Path(sys.argv[1])
    books()
    photos(uploads)
    emblems(uploads)
