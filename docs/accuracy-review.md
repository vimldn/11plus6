# Batch 1 accuracy review

Checked 7 October 2026. This is a targeted correction record, not verification of the entire site. Official admissions evidence takes precedence over competing SEO pages.

| Record | Correction | Official evidence |
|---|---|---|
| QE Barnet | English and maths only, two multiple-choice papers in one session, one round. Removed VR/NVR and two-stage labels from the catalogue and paper selector; corrected profile wording. | https://www.qebarnet.co.uk/admissions-information/secondary-transfer-entrance-test-faqs/ |
| QE 2027 dates | Registration closes noon 8 July 2026; entrance test on allocated day 16 or 17 September. Profile's results date is explicitly provisional. | https://www.qebarnet.co.uk/admissions-information/admissions/ |
| Barnet CAF | Corrected 30 October to 31 October 2026 on QE/HBS cards and labelled the date for Barnet residents. Families apply through their home authority. | https://www.barnet.gov.uk/schools-and-education/school-admissions/apply-secondary-school/transferring-secondary-school |
| KEHS | Independent/private classification, English and maths papers. Removed from the Birmingham grammar test group and repaired paper-selector admissions link. | https://kehs.org.uk/admissions/entrance-exams/ and https://kingedwardvifoundation.co.uk/admissions/the-independent-schools/ |
| Trafford | GL for 2027 entry, FSCE from 2028 entry, test moves to late Year 5 from 2029 entry. Removed Loreto from the shared five-school consortium. Current 2027 subject tags reflect mathematical, verbal and non-verbal reasoning. | https://aggs.bright-futures.co.uk/admissions-2028/ |
| Trafford 2027 dates | Registration noon 23 April–noon 19 June 2026; exam 14 September 2026. Replaced estimated dates with confirmed dates. | https://aggs.bright-futures.co.uk/admissions/september-2027-entry/ |
| Birmingham grammar group | GL shared West Midlands test, registration closes 26 June 2026 at 4pm, test 12 September 2026. Removed erroneous autumn registration, November test and December results. | https://kingedwardvifoundation.co.uk/the-test/ |

## Scope and remaining work

- School catalogue, paper-selector data and school detail overrides currently duplicate facts. A later change should centralise them with field-level sources and entry years.
- Trafford subject tags describe 2027 entry. Before opening 2028 resource collections, introduce cohort-specific subjects so FSCE English/maths resources can be selected independently.
- Other school subject lists, profile descriptions, exam-date groups and legacy blog articles have NOT been verified by this batch. In particular, the Reading/Berkshire group combines different admissions routes and needs urgent review; Wilson's profile contains unverified Stage 2 aptitude wording.
- The archived 2026 dates have not been revalidated. No claim of a site-wide fresh review should be displayed.
- These are factual corrections, not new long-form SEO pages; no word-count target applies. SERP/content review records for new lessons are separate.
- This branch is for preview/review; nothing in this record authorises production publishing.

## Verification

- JSON parse of school catalogue succeeded.
- Inspected the changed catalogue and duplicated selector records for the same corrected facts.
- `git diff --check` passed after changes.
- Root implementation agent owns the integrated TypeScript/build check.
