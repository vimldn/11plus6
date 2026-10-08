# Existing-article repairs — 8 October 2026

## Scope and baseline

Owner-authorised daily existing-content audit implementation. Main at selection was `ac763fcaa121e3c14a402fe87a5202881a6f1e4d` (PR3); no open pull requests were present. The 99 existing blog slugs were reconciled against the ten PR3 repairs. Those ten are excluded from this batch; 15 previously unreviewed articles are selected, leaving 74 pending if this release completes.

No new articles, lessons, redirects or deletions. Original URLs and publication dates are retained; revised articles use the genuine modification date 2026-10-08. Search-performance improvements are not measured or promised.

## Research and decisions

All 15 decisions are rewrite/improve at the existing URL. Pre-writing briefs record topic queries, retrieved competing formats/depth, entities, intent, original usefulness, official evidence and limitations:

- `research-2026-10-08-registration.md`: five registration, application and date articles.
- `research-2026-10-08-send.md`: five SEND, access-arrangement and admissions-priority articles.
- `research-2026-10-08-appeals.md`: five appeal, waiting-list and school-choice articles.

The root review independently checked the published future timelines from Gloucestershire County Council, Sir Thomas Rich's School, Buckinghamshire Council and Wirral Council. Gloucestershire's July test is explicitly labelled planned in the general date table; Buckinghamshire's broad window and Wirral's expected month are not converted into invented exact days. Preparation targets tests taken in 2027, commonly September 2028 entry. Previous-cycle policies are labelled as examples.

Repairs remove unsupported success rates, invented case studies and misleading universal rules. The copy separates test registration from the school-place application, diagnosis from an access-arrangement decision, funding eligibility from a school's priority definition, and score review from an independent admission appeal. Related URLs have distinct practical purposes and contextual internal links.

## Validation

- Content integrity: 99 slugs and all original publication-date values retained; the other 84 blog objects are unchanged.
- Internal blog destinations checked for all 15 replacements.
- Existing publication/draft-access gates passed.
- Production build passed (220 generated pages, type/lint checks included). Rendered checks caught timezone-dependent publication-date conversion; the article schema now parses the stored calendar date explicitly in UTC. Fresh production build passed after the fix. All 99 stored dates also retained their intended calendar day in four timezone checks.

- All 15 generated HTML pages passed headline, description/schema, original/modified dates, canonical, indexability and rendered-source-link checks. The 188-URL sitemap contains all 15 correct update dates. Public HTTP checks remain a separate post-deployment gate.

## Release status

Published through [PR4](https://github.com/vimldn/11plus6/pull/4), merge commit `11ac96b44e2c30b4f7ebc34d4e354f1faaeeb664`. Both preview and production Vercel commit checks succeeded. All 15 changed public URLs returned HTTP 200 and passed headline, metadata/schema, canonical, original/modified-date, indexability and source-link rendering checks on 8 October 2026. Sitemap verification passed with 188 URLs and correct modification dates. Exact results: `audit-repair-verification-2026-10-08.json`.

Queue updated only after these live checks: 25 checked/repaired/published (10 prior plus 15 today), 74 pending, 99 total. The daily pass remains active until the remaining existing articles have been reviewed. No queued article was repeated merely to reach 15.

## Work held

- Remaining 74 blog articles require their own research and review; they are not certified by this batch.
- Potential consolidation groups and irreversible removals remain on hold for this site's Search Console/backlink evidence. No substitute site's data is used.
- Individual future school policies, dates not yet published and unrelated school profiles are not certified by these general guides.
- No legal, clinical or educator sign-off is claimed; these are documented editorial/source checks.
