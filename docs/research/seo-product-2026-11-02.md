# Product and subject-hub repair — 2 November 2026

Research completed before the substantive copy and catalogue changes below. Owner has authorised correcting the existing site. This work preserves the approved forest-green/ivory illustrated design and the six existing canonical product/subject pages; it does not create competing landing pages or make admissions guarantees.

## Search intent and pages read

Live UK-intent searches: `11 plus free practice papers answers pdf maths English`, `11 plus verbal reasoning free practice questions answers`, `11 plus non verbal reasoning practice questions worked answers`, `free 11 plus online mock test answers`. Official-provider queries were separately checked with the primary-source search engine. Results are format/intent evidence, not an assertion of exact ranking positions or traffic.

| Page read on 2 November | Observation and implication |
|---|---|
| https://owltutors.co.uk/advice/11-plus/exam-papers/ | A practical catalogue puts subject, paper and download next to each other. Families searching for papers need the resource immediately; lengthy general introductions and school-card inventories should not obscure it. Teacher-authorship claims on this competitor are its own; we must not imitate credentials we do not have. |
| https://www.prepstep.co.uk/practice/vr/ | A subject hub links individual named skills to sample questions, methods and practice. Existing generic topic chips that all open the same configurator fail that expectation. Competitor coverage and timing claims are not sources for our exam facts. |
| https://www.11plus.co.uk/non-verbal-reasoning-introduction/ | The first-party teaching page uses diagrams to explain components, movement and repeated changes. Our NVR hub already has owned vector examples; retain these, make its guide discoverable and offer separate printable questions and worked diagrams. No diagrams or questions are copied. |
| https://11plus.gl-assessment.co.uk/pages/free-materials | The provider distinguishes free familiarisation PDFs from purchased practice papers and explicitly says local timings and question counts can differ. Use external source links, not reproduced provider files. Label our content original selected-skill practice and our timer as a practice setting. |
| https://11plus.gl-assessment.co.uk/pages/faqs | The provider directs families to their admissions authority for the actual format. Remove universal question-count/time claims from the maths FAQ and any suggestion that picking a school transforms generic questions into its actual paper. |
| https://csse.org.uk/examination/ and https://csse.org.uk/practice-material/ | The organiser exposes free familiarisation and released past-paper/mark-scheme resources. Link to its current catalogue, distinguish original practice from authentic past papers, and keep the entry year on the source. |
| https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test | On this date, the council says Quest takes over tests from 2027 and updated familiarisation is awaited. Retain this dated context rather than presenting older GL samples as confirmation of the new format. |

## Existing product evidence

- Live crawl of all 251 sitemap URLs on 2 November: all HTTP 200, no `noindex` in sitemap pages, 249 self-canonicals and two missing on the legal pages. No sitemap page was an orphan within the crawl. This does not establish Google indexing or explain a ranking loss.
- Quiz session URLs deliberately return `noindex, follow`. Keep that policy: adding question-bank variations is not the same as creating useful indexable content.
- All ten maths category chips and all English category chips previously linked to `/mock-exams` irrespective of topic. Replace with matching existing published lessons/guides; do not create duplicate articles.
- VR/NVR hubs lacked contextual blog-guide links, despite the existing introductory URLs. Add those and link original practice, printable sets, current official familiarisation and next steps.
- General mock UI allowed multiple subjects but only sent one subject to `/quiz`, prioritising Maths. Correct the selection semantics and display the exact selected session.
- The general form required an email although the site advertises free access without sign-up. Free practice should start without collecting a child's name or a parent's email; tutor enquiries remain a distinct action.
- Existing checked pools support a 30-question maths pilot, 16-question generated maths set, 12-question mixed VR set and 8-question mixed NVR set. Timers are 45, 20, 15 and 12 minutes respectively. These are our software settings, not official specifications.

## Implementation decisions

1. `/papers` remains the resource directory: immediately visible downloadable question and answer booklets, exact question counts and scope, an original sample with a disclosure for the worked answer, online practice alternatives, and official-source links. School research follows the resources and has its own anchor.
2. Reuse the original 20-question maths and 16-question English PDFs. Add a fixed 12-question VR booklet and 8-question vector NVR booklet, each with a separate answer booklet, selected from the already checked banks. Publish deterministic question IDs and validate the existing banks; no new question wording or answer keys are authored.
3. `/mock-exams` gives an immediate choice of actual available sessions and a clearly labelled single-subject configurator. Explain what review and retries do. No implication of a full syllabus, standardised score or verified school-specific replica.
4. Maths/English category links open the corresponding live lesson or guide. VR/NVR links expose their introductory guide, worked examples, reviewed session and printable set. Keep all four subject hubs as the canonical parent of their existing cluster.
5. Remove obsolete, unused question-count claims and unsupported preparation-duration claims from subject UI data. FAQ answers describe current resources and refer school-specific facts to official admissions guidance.

## Review and scope

Authors/reviewers are not invented. The existing answer checks and this implementation review are automated/content checks, not a qualified educator endorsement. Printable questions are a small starter selection, not a new full exam paper. No official content is copied. No redirects, URL deletions or changes to quiz indexability are included. Research and implementation do not establish improved rankings; that requires post-release Search Console and usage data.

Validation: the final release record should include TypeScript/build results, topic destination checks, four PDF render inspections, existing VR/NVR answer-check outcomes and live practice/navigation checks. Root agent owns the integrated build and deployment.
