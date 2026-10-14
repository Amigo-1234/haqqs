# Future HAQSLAM assistant (design only, no chatbot implemented)

## Sources and knowledge boundaries

Use a society-approved knowledge collection with topic, text, source URL/file,
verification status, reviewer, reviewedAt, effective dates and public/private
classification. Initial public sources: src/content/site.ts, founder.ts,
events.ts, activities.ts, library.ts and confirmed future location.ts. Pending
history, full biography, contacts, donation details and demo prayer times must
not be treated as verified. Scanned books need OCR plus Arabic/Yoruba review and
page citations; do not assume image scans are searchable text.

Include history, founder, activities, books, Maolid, Markaz relationship, verified
contacts, confirmed donation methods and location. Markaz's separate student
records, PINs, staff sessions and database never enter the collection. Link to
a confirmed public school URL only after approval. Prayer schedules must come
from a current official timetable, with date and Africa/Lagos timezone; expired
or demo data triggers an “official schedule unavailable” response.

## Request flow

Visitor chat -> rate-limited Next.js server endpoint -> approved-source retrieval
-> model answer constrained to retrieved evidence -> answer with source links.
Keep model credentials on the server. Use structured output with answer,
citations and availability status. Retrieval can begin with curated text search;
introduce a separate vector index when the reviewed collection grows. Only
verified, public, currently applicable entries can be retrieved. A small fresh
structured lookup handles current timetable/events rather than relying on old
embeddings. Changes to knowledge require approval and version history.

When evidence is missing or conflicting, respond “I don't have confirmed
information about that yet” and offer the existing contact link. Never infer
40/41, invent history, announce fake events, request money, change bank details,
or pretend a demo schedule is official. For religious interpretation outside
approved organization material, refer to the society's qualified scholars.

## Controls and evaluation

Treat retrieved text and visitor messages as data, never executable instructions.
Allow read-only retrieval only; no admin actions, accounts, payments, donations
or messages to third parties. Minimize conversation logging, show a privacy
notice and define retention before release. Server-side admin permissions guard
knowledge updates independently of chat and robots.txt. Apply request limits,
input/output bounds and a cost budget; provider selection requires current
pricing review before implementation.

Evaluate correct citation, no-source refusal, address conflicts, unpublished
biography, demo/expired prayer times, multilingual names, book attribution,
separate-school privacy, event date changes and prompt-injection attempts.
Release only after the society reviews the answers and verifies the source set.
