# Resource format choices — pre-writing brief, 16 November 2026

Intake: main c34da113f7a31bd483e34e269d4b8cac8f867462 (PR68), no open PRs. Read programme, original audit record, PR46 closeout, queue (99 published), Nov2 baseline, Nov10 resource release and Nov15 release. Programme already states the 9Nov ceiling. Former English drafts and requested maths foundation topics are published. No new article selected: zero new blogs, two existing resource improvements, no missed batches or repeat legacy audit.

Fresh live sitemap fetched and XML-parsed before selection: 285 URLs, urlset rather than index. Inventory retained in ../releases/url-inventory-2026-11-16.txt. Inspected app/sitemap.ts, published routes, both live resource pages and their actual links. The sitemap is not the internal-link graph or indexing evidence.

## Demand and intent

Live Windsor exact URL-prefix property https://www.11plusexampapers.com/, Web default, all countries/devices, final-only. Nov10–15 freshness probe returns Nov10–13; exclude Nov14–16. Latest complete 28 days Oct17–Nov13: /papers 1 click, 644 impressions, average position 61.3944; /mock-exams 0 clicks, 161 impressions, position 51.5342. Returned query rows total 673 impressions and zero clicks against 805 page impressions and one click; incomplete visible queries must not replace page totals. Papers queries include English papers (41 impressions), maths papers (36), practice papers (32); mocks has '11 plus mock exams' (41). These support subject/format selection within existing URLs, not a new advice URL. Raw results and equal-period calculations retained in resource-gsc-2026-11-16.json. No causal claim about Nov10 or later repairs; no post-release Nov16 outcome can exist yet.

## Live pre-writing SERP research

Primary and related queries: 'free 11 plus practice papers PDF answers UK'; 'free 11 plus online mock test timed untimed UK'; '11 plus PDF or online practice questions answers difference UK'; '11 plus mock test choose subject timer free UK'. This is live UK-intent search evidence, not a certified Google UK rank export.

Ranking pages opened and read:
- https://www.academy11.co.uk/11-plus-practice-papers — long resource catalogue with free paper cards, counts/timings, online alternatives, subject packs and format FAQs. Depth ranges from short resource descriptions to extensive provider sections. Its online/PDF offer sometimes uses the same paper; our sets differ, so explain that accurately. No exact ranking or word count inferred; no need to match its long catalogue or copy its claims.
- https://www.primarytools.co.uk/11-plus-maths-test-online/ — compact interactive test introduction, explicit count/timer, instructions, result behaviour and a printable alternative. Useful depth is enough to choose/start the right format, rather than another generic preparation essay. Our addition should be a short decision aid and functioning links, not a word target.
- Primary trust source: https://11plus.gl-assessment.co.uk/pages/free-materials — local subject combinations, question counts and timings can differ. Link to provider materials, do not copy/rehost them or label our settings official. Product facts established from lib/practiceSessionLinks.ts, printable catalogue, PDF source bytes and functional checks rather than competitor assertions.

Questions/entities: subject → selected skills → PDF question/answer pair versus online set → count and optional timer → feedback/review → matching lesson. Is this the same set online? Can I change the subject before starting? How do I return to the printable? Distinguish questions from marks, our timer from official duration, practice from an admissions prediction. No new school-specific or dated admissions claim is needed.

## /papers brief

Canonical https://www.11plusexampapers.com/papers. Intent: find and download free questions with worked answers. Improve each existing subject card with a concise comparison of its online alternative, actual default count and scope, and a link that preselects that subject in /mock-exams. Preserve direct starts, PDF links and previews. English online multiple-choice practice is broader than the punctuation PDF; do not imply it marks the child's handwritten answers. Original value is truthful resource selection and a working next step, not expanded generic copy.

## /mock-exams brief

Canonical https://www.11plusexampapers.com/mock-exams. Intent: configure/start a free online practice session. Accept only four supported subject query values, default safely to maths. Subject-aware links must work on direct load and client navigation. Show the selected subject's actual printable title/count/scope and link back to its paper card. Preserve all counts, timers, feedback behaviour, school mode and no-signup access. Parameter variants keep /mock-exams canonical, stay out of sitemap and create no new blog URL.

## Hub/spoke map and duplication

Existing discovery parent https://www.11plusexampapers.com/subjects; exact subject hubs /subjects/maths, /subjects/english, /subjects/verbal-reasoning and /subjects/non-verbal-reasoning already expose papers in main content and mocks in navigation. Both resources link into subject hubs. Retain those links; update both selected resource pages in this release with reciprocal subject-specific format choices. Nearest advice siblings /blog/best-11-plus-practice-papers-and-past-papers and /blog/are-mock-exams-important-for-the-11-plus remain advice, not duplicate resource landing pages. Existing subject links to lessons/practice stay intact. No new hub, slug, Article schema or publication date. Existing illustrations retained; no new cover required for these resource-page changes.

## Gates

Record original answer checks (maths preview 14+6×5=44, contraction we have→we've, cat/kitten→dog/puppy, visual reviewed pool) and exact question counts against PDFs/runtime. Production build, release gates, practice/settings tests, bounded all-added-target/fragment checks, canonical/title/description/single H1/noindex checks, PDFs byte-matched and fresh sitemap unchanged. Verify real browser interaction, desktop/mobile layout if available, GitHub deployment status and Vercel matching production SHA. No URL Inspection exposed; no indexing claim. No Analytics conversion evidence requested or claimed for this run.
