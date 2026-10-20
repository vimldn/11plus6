# Fresh maths release — 20 October 2026

Scope: existing quiz route and maths hub; original on-demand template practice plus stronger generated multiple-choice validation. No new editorial pages, no school-specific claims, no quarantined questions reinstated.

- `/quiz?paper=maths-generated&mode=practice`: 15 questions, five per topic; immediate answer feedback and explanations through existing practice controls.
- `/quiz?paper=maths-generated`: same composition, 20-minute author-set timed practice. Answers remain concealed until completion through existing exam behaviour.
- 2,899 finite supported variations: 1,600 order-of-operations, 748 fractions of amounts, 551 percentages of amounts. Fresh samples can overlap across attempts. This is focused practice, not a full exam specification.
- Shared generated MC validation now rejects equivalent parseable numeric options (for example 1/2 and 0.5). This is structural protection, not factual verification of AI output; unit conversion and arbitrary textual equivalents remain outside scope.
- Independent stem-based recalculation for every variation, all two-step explanation equalities checked, unique numerical options and 100 balanced sample runs: passed.
- Existing paper-quality, maths-pilot, topic-statistics and release-gate scripts: passed.
- React review: new generation runs only on quiz load/attempt, not render; stable primitive dependency added; ordinary accessible links; no new API, package, authentication or secrets.

Source inventory: `bank-inventory-2026-10-20.json`. 2,778 stored format entries, 2,654 available after existing quarantine, including 900 multiple-choice entries before quarantine. These are not 2,778 independent questions or a completed accuracy audit. Existing generation loads nine school blueprint summaries; no source-PDF extraction/traceability manifest was located. Library search found one relevant uploaded paper by filename but did not establish the original uploads' completeness or connection to the live bank. Do not claim ingestion is repaired.

Remaining: reconcile original uploads and provenance; wider independent semantic audit; school-specific blueprint verification; honest fallback provenance; print/save workflow. No paid model requests used for these checks.

Deployment and live verification evidence will be recorded on the associated pull request after the exact tested files are uploaded and checks pass.
