# Search-priority improvement release - 24 October 2026

## Scope
Existing URLs only; no additional daily article batch. Research: ../research/gsc-priority-2026-10-24.md. Base main 6821478e43b6adf0cadf2623887719787798a0bb. Live sitemap inventory: url-inventory-gsc-2026-10-24.txt (204 URLs).

- /papers: original printable question/answer pairs, official-source directory, clearer scope and reciprocal links.
- /subjects/maths and /subjects/english: contextual reciprocal links to printable practice.
- /mock-exams: prominent direct checked maths practice routes; accurate original-practice metadata; remove unsupported provider-format and email-delivery promises.
- /blog/how-many-children-pass-the-11-plus-pass-rate: direct answer, denominator worked example and answer check; clearer search title.
- /blog/how-long-is-the-11-plus-exam: direct answer and independently calculated timing illustrations.
- /blog/how-does-pupil-premium-priority-work-for-grammar-schools: precise opening, hypothetical policy comparison and admissions-office question template.
- /blog/free-11-plus-resources-and-websites: printable resource route, learning loop and current Kent provider/familiarisation caveat.
- /blog/how-is-the-11-plus-scored-and-marked: raw percentage example and limits of score calculators.
- /blog/what-score-do-you-need-to-get-into-a-grammar-school: two-stage qualification/allocation checklist and local-system distinction.

Preserve all six original publication dates, slugs and useful existing body. Genuine update 24 October 2026. Branded original illustration and editorial rendering remove unrelated generic provider footer/interleaved stock images for these six only. No credentials or ranking guarantees added. Existing legacy queue totals are unchanged (73 published / 26 pending); this is an additional GSC-led improvement, not six newly completed legacy audits. No final culls or redirects.

## Printable resources
- /papers/maths-practice.pdf and /papers/maths-worked-answers.pdf: 20 original questions, five each selected from existing order-of-operations, factors/multiples/primes, negative numbers and percentage-change guides.
- /papers/english-practice.pdf and /papers/english-worked-answers.pdf: 16 original questions from existing apostrophes and direct-speech guides; required exhibition passage retained.

All four booklets are five A4 pages, original selected skill practice, not full syllabus mocks or official papers. Separate question/answer assets, writing space, scope and source-guide links. Regenerate: node scripts/export-printable-practice.cjs then Python scripts/build-printable-practice.py (reportlab and DejaVu fonts). PDF assets stay out of the HTML-page sitemap; indexable /papers provides discovery. No claim that a sitemap guarantees indexing.

## Local verification
- Production npm run build passed, including TypeScript and static-page generation.
- check-daily-content-20261024.cjs and check-new-skill-blogs.cjs passed independent arithmetic and English-key regressions.
- check-gsc-improvements.cjs passed original-date/body preservation, independent new examples, internal published targets and PDF magic/size.
- check-release-gates.cjs passed draft/publication/preview protections.
- check-maths-pilot.cjs: 120 independently checked keys and 100 balanced samples passed.
- check-fresh-maths.cjs: 4,114 independently calculated variants and 100 balanced sets passed.
- PDF text verification: all 36 keys and explanations match checked originals; no answer labels in question booklets. All 20 final pages rendered and visually reviewed; no clipped/overlapping text or split answer explanations.
- Local production HTTP: eight changed pages returned 200, correct canonical, one H1, no noindex; four PDF links and direct practice link present; sitemap contained 204 unique published URLs, no preview/quiz/PDF assets.
- React review: semantic sections/headings, descriptive link labels, ordinary PDF anchors, no added client fetch/state/effects, no full question-bank payload in resource component.

## Release state
Prepared for isolated PR and existing Git-to-Vercel deployment. Final PR, check status, merge SHA and public verification outcomes must be recorded in the PR body after deployment; this record alone does not assert publication. No school-profile estate audit or future rankings/traffic effect is claimed.
