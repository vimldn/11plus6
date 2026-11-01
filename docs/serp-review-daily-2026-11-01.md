# Pre-writing brief — 1 November 2026

Research completed before article drafting. Base main a107e39cf4139e957b6b3d3c86b297ff7e8e3f28; open PRs empty. Reviewed programme, PR3 audit record, artwork rules, daily 31 October release and queue. Earlier English retrieval/inference/evidence and FDP/multi-step/algebra priorities are published. Legacy queue remains 73 published/26 pending; separate repairs task disabled, not assumed running or duplicated.

## Inventory and linking gate

Fresh live sitemap parsed: 241 URLs, retained in `docs/releases/url-inventory-2026-11-01.txt`; URL set, not a complete link graph. Inspected `app/sitemap.ts`, published BlogPost and lesson data and subject hub rendering. No equivalent dedicated article for the five selections. Existing relative-clauses page mentions pronouns but serves clause structure, not personal-pronoun form/reference. Existing commas page covers punctuation, not the adverb/adverbial distinction. Existing decimal arithmetic and multi-step problems do not teach the whole-number column multiplication method. Subject hubs derive their guide links from published posts' subject fields, so adding these records updates reciprocal hub listings in the same release.

| Topic / intended slug | Intent | Exact parent canonical | Nearest coverage and relevant siblings |
|---|---|---|---|
| 11-plus-long-multiplication | Learn and practise written whole-number multiplication | https://www.11plusexampapers.com/subjects/maths | /blog/11-plus-long-division-remainders; /blog/11-plus-multi-step-word-problems; /blog/11-plus-decimal-arithmetic |
| 11-plus-roman-numerals | Convert/read numerals and solve small original problems | https://www.11plusexampapers.com/subjects/maths | /blog/11-plus-rounding-estimation; /blog/11-plus-number-sequences |
| 11-plus-pronouns | Select personal/possessive forms and clarify reference | https://www.11plusexampapers.com/subjects/english | /blog/11-plus-relative-clauses; /blog/11-plus-subject-verb-agreement |
| 11-plus-adverbs-adverbials | Identify word class versus sentence function | https://www.11plusexampapers.com/subjects/english | /blog/11-plus-commas; /blog/11-plus-sentence-structure |
| 11-plus-hyphens-dashes | Distinguish word joining from parenthesis punctuation | https://www.11plusexampapers.com/subjects/english | /blog/11-plus-colons-semicolons; /blog/11-plus-commas |

Each spoke links back to its parent and /papers, plus useful siblings. Validate exact sibling paths against the build before release. No new thin hub or session URL. Timeless titles/URLs; explicit preparation for exams taken in 2027, no school-specific syllabus/provider/date claim.

## Live UK-intent SERP review

Used live search with UK/11-plus/KS2 query wording. Results are an observed search sample, not an exact Google UK ranking report; no numerical rank or invented word counts. Read the pages below, not only snippets. Useful observed depth runs from compact illustrated instructions and short exercises to full multi-section guides with quizzes. We will cover the learning task fully without matching a mechanical word target.

### Long multiplication
Queries: `11 plus long multiplication worked questions`; `11 plus multiplication carrying zero placeholder long multiplication`.
Read [Nick Dale](https://nickdale.me/2020/05/26/long-multiplication/) — compact image-led sequence and five practice calculations; [PrepStep result](https://www.prepstep.co.uk/practice/maths/longmultiplication) identifies carrying/place value and practice intent (snippet only; not used as factual authority). Entities: factor/product, ones/tens, partial products, regrouping, distributive law, zero placeholder, estimation and inverse check. Opportunity: explain why the tens row is ten times larger, diagnose a specific erroneous row, and connect one calculation to a real quantity. Original examples/answers will be recalculated independently. Do not repeat competitors' unsupported paper weightings.

### Roman numerals
Queries: `11 plus roman numerals questions`; `11 plus Roman numerals subtractive pairs questions`.
Read [11+ Daily](https://11plusdaily.co.uk/practice/11-plus-roman-numerals-questions/) — medium-length focused guide with symbol table, three worked examples, conversion/context/calculation formats. Entities: I/V/X/L/C/D/M; six standard subtraction pairs; descending groups; no decimal place-value zero; years; conversion both ways. Opportunity: explicitly reject arbitrary subtraction such as IL/IC, require round-trip verification, provide original comparison and calculation tasks. Use standard modern school convention and avoid claiming all historical usage follows it.
Primary for both maths topics: [DfE maths programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study), Year 5/6 written multiplication and Year 5 Roman numerals/years. Curriculum is a foundation reference, not a universal 11-plus specification.

### Pronouns
Queries: `11 plus pronouns antecedents adverbs adverbials`; `11 plus pronouns questions antecedents UK`.
Read [Smart Cub Learning](https://smartcublearning.com/11-plus/skills/english/select-pronoun-form/) — extensive skill page, video, ten-question quiz, worked explanation, FAQ; some adjacent subject-verb content is mixed in. [Pass Eleven Plus word classes](https://passelevenplus.co.uk/11-plus-english/word-classes/) provides broader survey. Entities: subject/object, personal/possessive pronoun, determiner, noun phrase, antecedent, agreement and ambiguous reference. Opportunity: separate choosing grammatical form from identifying who a pronoun refers to, explicitly distinguish her/hers and their/theirs, permit legitimate alternative rewrites. Primary: [British Council personal pronouns](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/personal-pronouns) and [possessive pronouns](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/possessives-pronouns). Do not force gender assumptions or treat singular they as incorrect.

### Adverbs and adverbials
Queries: `11 plus adverbs adverbials questions`; `11 plus fronted adverbials adverbs difference`.
Read [Pass Eleven Plus word classes](https://passelevenplus.co.uk/11-plus-english/word-classes/) — broad examples of verbs/adjectives/adverbs; [Pip fronted adverbials](https://pip11plus.com/fronted-adverbials) — long interactive guide, sentence moving, word bank and quiz (page labels itself 16 min; not an independently measured word count). Entities: word class versus function, manner/time/place/frequency, adjective, intensifier, preposition/noun phrase, subordinate clause, fronting and comma. Opportunity: compare one-word and multiword answers, show that -ly alone is not a classification test; avoid ambiguous single-word comma quizzes. Primary: [British Council adverbials](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/how-we-make-adverbials) and [DfE glossary](https://assets.publishing.service.gov.uk/media/5a7c8e4ded915d48c24108e2/English_Glossary.pdf).

### Hyphens and dashes
Queries: `11 plus hyphens dashes punctuation`; `11 plus hyphens dashes questions`.
Read [Go Get Exam Ready English syllabus](https://gogetexamready.com/11plus/syllabus/english) — broad syllabus/practice directory, punctuation subsection and bracket example; search also surfaced a legacy Bond worksheet, not copied. General style-guide results are not reliable evidence of exam prevalence. Entities: hyphen/compound modifier/ambiguity, dash/parenthesis, paired punctuation, complete main clause, alternative brackets/commas. Opportunity: focused contrast and original repairs with an explicit instruction to use a particular mark, so multiple legitimate punctuation choices are not falsely marked wrong. Primary: [DfE English programme](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) and [Appendix 2](https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/335190/English_Appendix_2_-_Vocabulary_grammar_and_punctuation.pdf), which explicitly cover hyphens to avoid ambiguity and dashes for parenthesis. Cambridge/NHS style pages returned403; not represented as read. Keep typography conventions distinct from the grammatical lesson.

## News screening — no qualifying fresh story yet

Searched live `grammar school admissions news November 2026 October 30` (3 days), `11 plus exam news admissions consultation` (7 days), `grammar school 11 plus news admissions consultation November 2026` (7 days), `grammar admissions October 2026 consultation` (3 days), `11 plus November news` and `grammar school 2028 consultation` (7 days). Date-filtered results still included stale items; crawl dates are not event/publication dates.
- AGGS opening19 October, reporting20 October and MP follow-up23 October: outside current seven-day window and opening already covered. No new material development verified.
- Schools Week tutoring investigation body dated3 September despite current header; not fresh.
- [Bexley consultation](https://www.bexleygs.co.uk/page/?pid=361&title=Admissions+Consultation) linked from current admissions page: read and rejected; actually18 December2023–31 January2024 and closed.
- [Skegness official consultation notice](https://www.skegnessgrammar.co.uk/News/Skegness-Grammar-School-2028-29-Admissions-Policy-/): read. Announces9 November–31 December2026 consultation for September2028 entry, but no verified announcement publication date within current window; main-host search says crawled two weeks ago. Hold for dated evidence/material development. Do not say consultation has opened or conflate entry2028 with exam2028.
- Horncastle QEGS starts7 October; Aylesbury20 October; Stratford16 October. Outside window. NI curriculum June and unrelated housing/higher-education stories rejected.
News target remains two; no fabricated replacement. No news drafted or published without a dated primary-backed brief and appropriate hub links/artwork.

Live hub verification: maths and English returned HTTP200 with correct canonicals and27/19 distinct existing blog links respectively before release. No child sitemap index was present.
