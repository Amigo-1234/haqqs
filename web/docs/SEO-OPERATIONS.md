# HAQSLAM SEO and discovery operations

## Scope and production baseline

Repository: Amigo-1234/haqqs. App: web/. Existing V2 production baseline was
4e4a8f981978121865683c5a7deaaddadcf00d00, deployed from
claude/haqslam-mosque-audit-u7hihw as dpl_DiBtVcBjEzpURqDZk2MWAJm9owZz.
main was the old static release d82a354c673f8e779c12046811aa31b1598e8558.
The SEO release builds on V2; main is advanced by fast-forward only after checks.

Canonical origin is https://haqqs.vercel.app (the owner's specified live site).
Custom-domain aliases are not used as canonicals until the owner confirms a
primary-domain migration. All public pages have individual title, description,
canonical, Open Graph and Twitter metadata. Page/entity JSON-LD is server rendered.
Do not add unverified founding dates, biography, social profiles or coordinates.
The school is styled Markazul Ginaa in society source materials. The owner's
“Markaz il Ginna” spelling is included on its public relationship page for
search discovery; the verified formal name remains unchanged.
The separate school's app, database, auth, and hosting are outside this release.

## Publishing pages and content

- /sitemap.xml is Next.js's sitemap.ts metadata route, /robots.txt is robots.ts.
- Public navigation in src/content/navigation.ts feeds the sitemap automatically.
  To publish a new standalone public page, add it to fullNav along with its route
  and pageMetadata/PageSeo calls. This is the explicit publication registry;
  do not enumerate arbitrary filesystem routes (private routes must stay private).
- Adding an annualEvents entry publishes its page through generateStaticParams
  and includes it in the sitemap automatically at the next deployment. Adding a
  published book does the same. Unavailable books are noindex and omitted.
- Event gallery image URLs are included in the image sitemap. Image captions
  describe scenes without inventing guests' identities.
- No made-up lastModified dates: event occurrence dates are not content updates.
- Legacy .html aliases redirect permanently (308) to their V2 page. Redirects,
  fragments, unavailable scans, API endpoints and private routes are not listed.
- Unknown event/book URLs return 404. There are no private routes or backend APIs
  in the Next.js app. Retired account routes redirect home. Robots is not an
  authorization mechanism; any future staff/admin route must authenticate on the
  server and authorize every data operation before returning private data.
- Prayer metadata describes daily calculated Lagos start times; no Iqamah or
  Jumu‘ah timetable is asserted. Full founder biography is pending.

## Google Search Console

The signed-in owner's account was accessible on 2026-10-14. A URL-prefix property
for https://haqqs.vercel.app/ was prepared. The actual Google-issued public HTML
verification value is recorded in src/content/search-console.ts and rendered by
Next's metadata verification field in the server HTML head. It is not a secret.
GOOGLE_SITE_VERIFICATION optionally supplies an additional owner token without
removing the first. Keep the token after verification; Google rechecks it.

Completed on 2026-10-14: ownership verification succeeded, sitemap processed with
17 discovered pages. URL inspections found eight priority pages not indexed,
unknown to Google. Manual indexing was rejected by the daily quota; the homepage
live smartphone test confirmed crawling, fetch and indexing eligibility.

For future verification: in Search Console choose the HAQSLAM
URL-prefix property, HTML tag method, then Verify after the release is live.
After successful verification, open Sitemaps and submit sitemap.xml. Inspect the
homepage, /founder and /events/maolid-2026 to see Google's current indexing status.
Do not claim a verified property, successful submission or indexing without
checking the corresponding Google result. Sitemap submission does not guarantee
indexing or ranking. A future domain property for haqslam.com.ng needs DNS
verification and owner authorization; it is not included here.

Official guide: https://support.google.com/webmasters/answer/9008080?hl=en

## Google Maps investigation (2026-10-14)

Public web searches for HAQSLAM and Haqiqat-s-Salam, plus live Maps searches for
“HAQSLAM Lagos” and “Haqiqat-s-Salam Society of Nigeria Ijaye Ojokoro”, did not
identify a matching mosque listing. Maps returned unrelated institutions.
This is **not proof of absence**: a listing may use a different name or pin.
No profile was created or claimed. Do not create a duplicate.

Official flyers show 40 Olaniyi Street; the older website shows 41. The owner resolved the street number to 41 on 2026-10-14. The entrance pin and precise mosque coordinates remain unconfirmed. The confirmed address is
published consistently in visible content and schema; no mosque coordinates
are published.
/contact and the homepage clearly label the existing Maps link as the street
area and advise confirming directions. src/content/location.ts contains the confirmed address; mapsUrl remains null. After the society confirms its entrance pin and real Maps link, fill
VerifiedLocation with street address, locality, region, country, mapsUrl and
confirmation provenance. ContactDetails and Mosque JSON-LD then use that source.
An iframe is deferred until the correct pin/listing is confirmed.

### Business Profile preparation

| Field | Prepared value / required evidence |
| --- | --- |
| Public name | Confirm exactly what the mosque's physical sign says; HAQSLAM Mosque is the website label |
| Society name | Haqiqat-s-Salam Society of Nigeria (HAQSLAM), verified official flyers/books |
| Category | Select Mosque if offered; choose the actual activity, no SEO keywords |
| Address | Owner confirmed 41 Olaniyi Street on 2026-10-14, off Bioyin Street, Ike Oluwa Town, Jankara, Ijaye-Ojokoro, Lagos |
| Pin | Confirm entrance/location on site; no guessed latitude/longitude |
| Website | https://haqqs.vercel.app/ |
| Contact | Phone +234 708 893 4875 confirmed by owner; email haqslam1@gmail.com still needs confirmation |
| Hours | Confirm visitor/opening hours; calculated prayer times are not opening hours |
| Photos | Real exterior, sign, entrance, interior and approved organization photos |
| Description draft | HAQSLAM is an Islamic society in Ijaye-Ojokoro, Lagos, devoted to worship, remembrance and learning. Its activities include devotional gatherings, Arabic studies, publications and the Annual Maolid Nabiyy celebration. |
| Authorized manager | A society-approved Google account; never share passwords or verification codes |

Before creating: search Maps at the confirmed entrance, using both the real
signage name and formal society name. If a matching unclaimed profile exists,
choose Claim this business / Manage now. If already managed, request ownership
from its current owner. Otherwise use business.google.com/add, enter confirmed
details and complete whichever verification methods Google offers. The society
may need to provide on-site video showing signage/location and management access.
The separate Markaz school's identity must not be merged into the mosque listing.

Official guides:
- https://support.google.com/business/answer/2911778?hl=en
- https://support.google.com/business/answer/4566671?hl=en
- https://support.google.com/business/answer/7107242?hl=en

## Validation

Run npm run lint, npm run typecheck, npm run build. Check generated sitemap XML,
public URL uniqueness, canonical origin, unavailable-book exclusion, robots
sitemap reference, all page metadata, single h1 and image alt attributes.
Parse every JSON-LD script; check types/property names against Schema.org's
current official vocabulary and all internal entity references. Dates/times
are sourced from flyers; no end times, ticket prices, offers or attendance
figures are invented. Event archives describe past occurrences; schema validity
does not guarantee Google's Event rich results (some venues lack exact address).
Use validator.schema.org and Google's Rich Results Test for independent review.
Test production route responses, reader controls, gallery viewer, contact link
and mobile navigation. Keep validation claims specific to observed evidence.

## Daily prayer calculations

The production app uses adhan 4.4.6 locally, without an external daily fetch.
Configuration: src/content/prayer.ts. Muslim World League (Fajr 18°, Isha 17°),
standard Asr (Maliki/Shafi/Hanbali), library MWL Dhuhr +1 minute, and nearest
minute rounding. Custom offsets initially zero. Labels and method descriptions
follow the configuration. Uses the sourced GeoNames Lagos city reference
6.454066 N / 3.394673 E (2332453); this is not the mosque's pin.

Calendar selection and display use Africa/Lagos regardless of the browser zone.
After Isha, the countdown uses tomorrow's newly calculated Fajr, not today's
time repeated. It refreshes at Lagos midnight; device resume updates the clock.
No demonstration slots, fake Jumu‘ah time, or official Iqamah claims are shown.
The accuracy of the countdown assumes a correct device clock.

References:
- https://github.com/batoulapps/adhan-js/blob/develop/METHODS.md
- https://www.geonames.org/advanced-search.html?country=NG&q=

Donation details remain paused until reconfirmed. The contact phone and
WhatsApp are owner-confirmed; email remains visibly awaiting confirmation.
