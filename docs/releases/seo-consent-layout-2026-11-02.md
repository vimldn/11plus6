# Consent banner layout stability — 2 November 2026

A final mobile Lighthouse run on the published catalogue confirmed both accessibility corrections (score100), but observed CLS0.178. The trace attributed the single shift to the fixed privacy-choice section when the local Inter web font finished loading. Two earlier runs had loaded that font before the banner and showed CLS0, so the defect depended on resource timing.

The banner now uses an explicit system sans-serif font. Its controls no longer change metrics when Inter arrives; the site's existing headings, colours and content typography remain as designed. Analytics remains blocked before consent. This is a narrowly scoped correction to a concrete post-release finding, not a change to tracking permission or page content.

The production deployment and final mobile measurement will be checked after this patch. The earlier measurement is retained in the SEO performance record; Lighthouse scores are lab samples, not field Core Web Vitals.
