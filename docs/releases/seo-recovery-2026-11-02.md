# SEO recovery implementation — 2 November 2026

Owner instruction: “ok so you have access to that repo - go fix everything please”. Scope is the preceding SEO report/checklist. Branch: `fix/seo-recovery-2026-11-02`. Base: `180a0564a7da91a1423e0e27edb7c177505cf3eb`.

## Release status

**Published and verified.** PR46 merged as `3c9ebb570de28302692fd73a0eb285612b05b485`; Vercel production deployment `dpl_6DK4vrVpY9ra25k4JC3ap5X6VCty` is READY on the main domain. All251 public sitemap URLs passed, all26 repaired article titles/H1s/canonicals/update dates matched, two live answer reveals and a live12-question VR start passed. The original99-article audit queue is now **99 complete, zero pending**. See `docs/releases/seo-production-verification-2026-11-02.json` and `docs/releases/seo-live-content-verification-2026-11-02.json`.

## What changed and why

| Report issue | Implemented correction |
|---|---|
| 26 unrepaired legacy articles | Replaced all 26 bodies using current search-intent research, primary-source checks and original worked material. No new article URLs; original publication dates and covers remain. |
| Oxford, creative-writing and school-day accuracy | Removed obsolete/unfounded admissions claims and invented statistics; supplied current sources, original teaching examples and real named-school routines. |
| Weak paper offer | Four subject sets with immediate question/answer PDFs, accurate counts, scope, previews and clearly separate official sources. Four new PDFs add 12 VR and eight diagram NVR questions with separate worked answers. |
| Misleading mock positioning | One subject per session; displayed count/timer matches the chosen route; shared-skill school context is explicit; no compulsory contact details. |
| Searchable learning paths | All four public hubs lead to relevant lessons, guides, printables and practice. Interactive attempts remain noindex. |
| Generic maths links and weak reasoning connections | Ten maths shortcuts now resolve to specific teaching pages; English shortcuts and VR/NVR guide connections are strengthened. |
| Duplicate privacy/terms and missing canonicals | Real privacy/cookie information, distinct canonicals, optional analytics, withdrawal and clear-saved-practice controls. |
| Duplicated title suffixes | Child metadata no longer repeats the root brand template. Product metadata matches the expanded offer. |
| Heavy blog/papers/quiz | Compact server-rendered directory retains every article link; catalogue stops repeating full teaching libraries; general questions are fetched in small sets with a timed local fallback; optional screens and pilot data are deferred. |
| Incomplete measurement/review | Consent-aware, field-allowlisted practice/download/lesson events; retained first-party GSC baseline; weekly review task restored after release. |
| Trust and usability defects found during repair | Enquiry failures no longer show false success; personal payload logging removed; parent-name/notes fields forwarded; dead enquiry modal wired to the endpoint; accessible wordmark names and muted-text contrast corrected. |

## Evidence

- Content research and manifests: `docs/research/seo-repairs-2026-11-02-a.md`, `docs/research/seo-repairs-2026-11-02-b.md`, `docs/seo-repairs-20261102-a.json`, `docs/seo-repairs-20261102-b.json`.
- Product sources and checks: `docs/research/seo-product-2026-11-02.md`, `docs/releases/seo-product-2026-11-02.md`, `docs/paper-audit/reasoning-printables-2026-11-02.json`.
- Technical decisions: `docs/research/seo-technical-2026-11-02.md`.
- Independent browser/API review: `docs/releases/seo-functional-verification-2026-11-02.md`.
- Search baseline: `docs/seo-recovery-baseline-2026-11-02.json`. October clicks were 334 versus September's 331; the latest two-week drop was concentrated in three results/admissions pages. No algorithmic-penalty or causal-recovery claim is made.

## Completed validation before build

- Preserved the homepage’s original branded title; the root title template does not apply to the root page itself. Removed repeated suffixes only on child pages.
- Production `npm run build` passed: 283 routes generated, with compilation, type validation and build tracing completed. TypeScript and whitespace diff checks also passed.
- Built HTML crawl passed for all 251 sitemap URLs: HTTP 200, canonical, description, one H1, no unexpected noindex and no repeated brand suffix. Interactive quizzes remain noindex; an unknown path returns a real 404. Homepage slash variants are equivalent.
- All 26 overlay keys resolve; 159 unique published article URLs remain; original date/slug/artwork fields are preserved.
- Content contributors independently checked 39 original question blocks and additional worked examples, sources, table structures and internal destinations. This is not a claim of human educator review.
- Existing release/draft gates, question quality, practice workflow, active-attempt and scoring checks passed.
- `scripts/check-seo-recovery.cjs` checks consent expiry/withdrawal, field exclusions, enquiry validation and upstream error handling with fully mocked forwarding.
- Independent browser session completed ten calculated fraction answers (10/10), resumed after reload, opened results/review/history, verified VR/NVR counts and the English API, and exercised mocked enquiry success/error states.
- Catalogue browser checks: all four previews, all eight PDF responses and one actual download; school search/filter/highlight and no-contact school-context launch; 24 subject destinations; mobile overflow and error-recovery checks passed. See `docs/releases/seo-product-browser-verification-2026-11-02.md`.
- Four new PDF files: all 22 pages rendered and visually checked after font/layout corrections; independent VR/NVR answer and geometry checks passed.
- Uncompressed HTML changed from 832,527 to 195,568 bytes for `/blog` (76.5% less) and 392,377 to 313,317 for `/papers` (20.1% less). The quiz application page bundle changed from 883,211 to 318,033 bytes (64.0% less); shared/lazy chunks and compressed transfer totals are different measurements.
- Live `/papers` mobile baseline: Lighthouse 12.8.2 with Chromium 134, simulated mobile, fresh profile and default consent state; performance 70, accessibility 96, SEO 100; LCP 4.6 s, TBT 250 ms, CLS 0. This is one lab sample through the workspace network, not field Core Web Vitals. Repeat with the same setup after release.
- Vercel's available 30-minute production runtime-error query returned no error/fatal groups. The wider requested window exceeded retained access; no historic outage conclusion is drawn.

## Limits retained for the final review

Actual Google URL Inspection is unavailable through the connected tools. Windsor Search Analytics/Sitemaps work for this exact property; its deprecated indexed-count field is not proof of indexing. Availability, canonical and sitemap checks must not be labelled indexing verification.

Google Apps Script is outside this repository. Its storage/notification implementation was not inspected and no live test lead was sent. Client and forwarding success/failure behaviour was tested with mocks. Functional browser tests blocked analytics. The pre-release Lighthouse run exercised the old live default tag; any diagnostic traffic is not used as outcome evidence. Consent changes the population measured by Analytics, so use GSC for consistent organic-search trend comparisons.

No irreversible URL culls, unverified redirects, link purchases or new credentials were introduced. Ranking and traffic outcomes require post-release observation.


## Post-release measurement and operation

The same mobile Lighthouse setup measured `/papers` at performance97 (previously70), LCP2.2s (4.6s), TBT30ms (250ms), CLS0. SEO remained100. These are lab samples through the same workspace network, not field Core Web Vitals or evidence of a ranking gain. The retained JSON records the configuration and timestamps.

The post-release check identified two remaining catalogue accessibility details: small school-source links needed darker green text, and PDF accessible names needed to include their visible “Questions PDF” labels. A small follow-up closes these while recording the verified release.

The existing weekly SEO review is enabled for Monday08:00 Europe/London with the correct connected GSC property, dated baseline, landing-page attribution, product outcomes and honest indexing limits. The daily06:00 content/news programme remains enabled with all research, answer, artwork and publication gates; its stale26-article backlog instruction is superseded. The completed finite article-repair task stays paused. Automation enablement/schedule is verified; it is not a claim that a future run has already succeeded.
