# HAQSLAM V2 website

The redesigned website for Haqiqat-s-Salam Society of Nigeria (HAQSLAM).
Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS 4.

The legacy static site in `../haqslam/` is left untouched. This app does not
connect to any database, does not use Firebase, and has no link to Markaz il
Ginna's systems.

## Run it

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/` | All site content, with its sources noted (organisation facts, founder, programme, events, library, gallery, demo prayer times) |
| `src/components/` | Design system (`ui/`), brand (`brand/Emblem.tsx`), page sections, library reader, gallery |
| `src/app/` | Routes: `/`, `/about`, `/founder`, `/prayer-times`, `/activities`, `/library`, `/library/[slug]`, `/gallery`, `/donate`, `/contact`, `/markaz` |
| `public/library/` | Web copies (WebP) of the original book scans. Originals remain in `../haqslam/IMAGE*` |
| `public/photos/`, `public/brand/` | Supplied photographs, flyers and reference logos |
| `scripts/prepare_assets.py` | Regenerates the WebP copies and `src/content/library-pages.json` |
| `docs/CONTENT-STATUS.md` | What is verified, what is awaiting confirmation, and what is missing |

## Common changes

- **Replace the logo:** put the vector file in `public/brand/` and update `EMBLEM_SRC` and its dimensions in `src/components/brand/Emblem.tsx`. The header, footer, icons and About page all use it.
- **Publish real prayer times:** replace the times in `src/content/prayer.ts` and set `PRAYER_TIMES_ARE_DEMO = false`. The demonstration badges disappear automatically.
- **Link to Markazul Ginaa:** set `partners.markaz.url` in `src/content/site.ts`.
- **Add photographs:** add images to `public/photos/` and list them in `src/content/gallery.ts` (with caption, date and alt text).

## Legacy site migration

- `next.config.ts` redirects every old `*.html` URL to its V2 page (307 for now; switch to permanent at launch).
- The old site registered a cache-first service worker at `/service-worker.js`. `public/service-worker.js` replaces it with a version that clears caches, unregisters itself and reloads open tabs. Keep this file in place after launch.

## Deploying

Not deployed yet. Recommended: a **new** Vercel project (or a preview of the existing one) with **Root Directory set to `web`**, so the current production deployment is unaffected until V2 is approved.
