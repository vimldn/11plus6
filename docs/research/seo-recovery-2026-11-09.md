# SEO recovery diagnosis — 9 November 2026

## Scope and measurement caveat

Source: connected Windsor.ai Google Search Console for https://www.11plusexampapers.com/. All dates below are complete dates, 2026. Google Search Console can revise recent days. The country totals are grouped by country; the page-level top losses are **all-country** because the connector's combined country/page filter returned inconsistent row totals. Do not label those URL losses UK-specific.

UK: 12–25 October: 195 clicks, 15,149 impressions over 14 days (13.93 clicks and 1,082.07 impressions per day). 26 October–6 November: 55 clicks, 6,270 impressions over 12 days (4.58 clicks and 522.5 impressions per day). Change: -67.1% clicks/day and -51.7% impressions/day.

All countries: 12–25 October: 204 clicks, 17,221 impressions; 26 October–6 November: 73 clicks, 8,476 impressions. Change in impressions/day: 1,230.1 to 706.3.

## Largest global page-level visibility losses, equalised per day

- /blog/how-many-children-pass-the-11-plus-pass-rate — 2,423 to 415 impressions; 173.1 to 34.6/day; average position 6.08 to 9.49.
- /blog/what-score-do-you-need-to-get-into-a-grammar-school — 1,143 to 199; 81.6 to 16.6/day; position 8.94 to 12.43.
- /blog/how-is-the-11-plus-scored-and-marked — 983 to 315; 70.2 to 26.3/day; position 9.66 to 12.94.
- /blog/can-my-child-retake-the-11-plus — 827 to 200; 59.1 to 16.7/day; position 7.16 to 9.41.
- /blog/what-happens-if-my-child-passes-the-11-plus-but-doesnt-get-a-place — 672 to 112; 48 to 9.3/day; position 6.24 to 6.38.
- /blog/how-does-pupil-premium-priority-work-for-grammar-schools — 727 to 159; 51.9 to 13.3/day; position 5.75 to 5.39.

Some pages lost impressions despite stable rankings, compatible with falling search demand, while other pages lost ranking positions as well. The September sitting / October results cycle is a hypothesis requiring year-on-year and query-level evidence, not a proven cause.

## Technical findings

Read app/robots.ts and app/sitemap.ts in main on 9 November. General crawling is allowed; published blog URLs and released lesson URLs are included. No blanket noindex or disallow was found. Today's release log records 285 unique canonicals, recent production checks and five strengthened guides. A successful release or sitemap entry **does not establish Google indexing**; Page Indexing exclusions and URL Inspection are not available through the connected Windsor.ai data.

Homepage currently links to subject, papers and mock-exam hubs but does not explicitly show the high-demand pass-rate, score and scoring guides. This change adds a clear parent question navigation route and secondary links to free practice. It preserves all canonical URLs and editorial distinctions.

## Prioritised checks, without speculative redirects

1. In Google Search Console, export Pages > Not indexed, especially Crawled – currently not indexed, Discovered – currently not indexed, duplicate canonical and soft 404. Verify a representative cohort of new URLs with URL Inspection. Do not assume sitemap submission equals indexing.
2. Get a country=UK + page + query export using native Search Console, since this connector does not reliably reproduce combined UK page totals. Compare the six URLs above between equal weekdays, query by query, including search volume, average position and CTR.
3. Check whether the October exam/results spike is seasonal using 2025 equivalent weeks, if the property's history reaches that far. Do not compare 2026 with a nonexistent historical cohort.
4. Investigate overlapping intent across pass-rate, pass-mark, standardised-score and scoring pages. Keep existing URLs and do not canonicalise/redirect until query overlaps and user-intent distinctions are confirmed.
5. Track /papers, /mock-exams and subject hubs separately: rankings, indexed status, visits to printable downloads, and completed practice sessions. Avoid publishing more near-duplicate explanation articles to compensate for low impressions.
6. Evaluate each release at 7/28/60 days: indexed status, non-brand impressions, clicks, resource usage. Prioritise genuine new practice assets and improvements to existing useful pages over fixed-volume article counts.

## Scope of this patch

Adds a homepage editorial pathway to three existing parent guides and then to /papers and /mock-exams. No article rewrites, title changes, redirects, noindex changes, deletion, or unsupported claims of regained rankings. Build and Vercel preview required before merge.
