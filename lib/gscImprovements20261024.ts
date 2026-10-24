import type { BlogPost, BlockType } from './blogPosts';

// Research gate: docs/research/gsc-priority-2026-10-24.md.
// Additions preserve the existing useful coverage and original publication dates.
const additions: Record<string, { title?: string; desc?: string; opening: BlockType[]; closing: BlockType[] }> = {
  'how-many-children-pass-the-11-plus-pass-rate': {
    title: 'What percentage of children pass the 11 Plus?',
    desc: 'There is no single national 11 Plus pass rate. Understand local qualification rates, school offers and how to calculate a meaningful percentage.',
    opening: [{ type: 'callout', variant: 'info', text: 'There is no single national percentage of children who pass the 11 Plus. A local qualification rate counts children meeting that test’s standard; an offer rate counts children offered places. Neither is a personal prediction. Always check the area, test year and group counted.' }],
    closing: [
      { type: 'h2', text: 'Worked example: the same children, two different rates' },
      { type: 'p', text: 'Illustration only, not real admissions data: suppose 2,000 children sit a local test, 700 qualify and 500 of those test-takers later receive a grammar-school offer. The qualification rate is 700 ÷ 2,000 × 100 = 35%. The offer rate among test-takers is 500 ÷ 2,000 × 100 = 25%. Among the 700 qualified children, 500 ÷ 700 × 100 is approximately 71.4%. All three calculations use the same example but answer different questions.' },
      { type: 'p', text: 'An official table may instead count resident pupils, registered applicants, all test-takers or children assessed suitable after a review. Copy the definition alongside the number before comparing years. Do not divide one authority’s offers by another authority’s test entries.' },
      { type: 'question', text: 'If 360 of 900 test-takers qualify, has 40% definitely secured a grammar-school place?', answer: 'No. 40% is the qualification rate in this illustration.', explanation: '360 ÷ 900 × 100 = 40%. You would need separate allocation data and a matching denominator to calculate an offer rate.' },
      { type: 'p', text: 'Next read [how marking and standardisation work](/blog/how-is-the-11-plus-scored-and-marked), [what score a grammar school requires](/blog/what-score-do-you-need-to-get-into-a-grammar-school) and [how long the test can take](/blog/how-long-is-the-11-plus-exam). Choose a useful next activity in our [practice papers hub](/papers).' },
    ],
  },
  'how-long-is-the-11-plus-exam': {
    desc: '11 Plus timings vary by school and test. Compare working time, separately timed sections, instructions and breaks, then plan practice around confirmed guidance.',
    opening: [{ type: 'callout', variant: 'info', text: 'There is no universal 11 Plus exam length. Check both the time allowed to answer questions and the full appointment, including instructions, practice and breaks. A timer on an online practice paper is our practice setting, not evidence of your child’s official test duration.' }],
    closing: [
      { type: 'h2', text: 'A simple timing calculation for practice' },
      { type: 'p', text: 'Illustration: a practice section contains 30 questions and allows 25 minutes of answering time. That is 1,500 seconds ÷ 30 = 50 seconds per question on average. It is a planning reference, not a rule to abandon every longer question after 50 seconds. Question demands differ, and separately timed sections may prevent returning later.' },
      { type: 'question', text: 'A practice session has two 25-minute working sections and a 10-minute break. How long does that take before any instructions or arrival time?', answer: '60 minutes.', explanation: '25 + 25 + 10 = 60. Arrival, instructions, practice and collection would add time if they are separate from these figures. This is an illustration, not a named school’s timetable.' },
      { type: 'p', text: 'For exams taken in 2027, confirm the new cycle’s instructions before rehearsing a full test. Try [online timed practice](/mock-exams), or use the [printable question and answer sets](/papers) untimed first. See [how marks are calculated](/blog/how-is-the-11-plus-scored-and-marked) for why a practice percentage is not an official standardised score.' },
    ],
  },
  'how-does-pupil-premium-priority-work-for-grammar-schools': {
    opening: [{ type: 'callout', variant: 'info', text: 'Pupil premium eligibility can affect grammar-school priority where the school’s published arrangements provide for it. It does not automatically add marks, waive a qualifying standard or guarantee a place. Check the entry year, precise category, evidence requirements and deadline with that admissions authority.' }],
    closing: [
      { type: 'h2', text: 'Two hypothetical policies: why the wording matters' },
      { type: 'p', text: 'School A might give eligible children priority only after its normal qualifying standard is met. School B might publish a separate qualifying route for a defined eligible group. These are illustrations, not descriptions of named schools. The same family could need different evidence and face different conditions at each school. Read the actual policy rather than assuming one school’s arrangement travels with the child.' },
      { type: 'h2', text: 'A message you can adapt for the admissions office' },
      { type: 'p', text: '“My child is preparing for a test taken in 2027, for the relevant school-entry year. Which published admissions policy applies? Please confirm the exact pupil premium or other priority category, whether a qualifying score still applies, what evidence our primary school must supply, the status date used to assess eligibility, and the deadline and route for sending it. How can we confirm that you have recorded it?”' },
      { type: 'p', text: 'Do not send sensitive financial or family documents to a practice website. Use the authority’s stated secure process. Compare [school options](/schools), read [qualifying scores and allocation](/blog/what-score-do-you-need-to-get-into-a-grammar-school), and use [free practice resources](/blog/free-11-plus-resources-and-websites) while checking the correct policy.' },
    ],
  },
  'free-11-plus-resources-and-websites': {
    opening: [{ type: 'callout', variant: 'tip', text: 'Want something to use now? Our [free practice papers and worked answers](/papers) include printable maths foundations and English punctuation sets. They are our original skill practice, not official school papers. Use the official source directory below to check familiarisation for your child’s actual test.' }],
    closing: [
      { type: 'h2', text: 'Turn a free resource into a useful study session' },
      { type: 'ol', items: ['Choose one skill your child needs, rather than downloading every available paper.', 'Try a short set without the answers visible. Record any uncertainty as well as incorrect answers.', 'Open the separate worked answers. Ask your child to explain the first step they would change.', 'Return to the matching lesson, then retry a similar question on another day.', 'Add a timer only when the method is secure; match any full rehearsal to confirmed local instructions.'] },
      { type: 'p', text: 'Start with our [maths learning hub](/subjects/maths) or [English learning hub](/subjects/english). The [mock-exam hub](/mock-exams) offers online practice, while the [papers hub](/papers) separates our printable practice from links to official familiarisation. A high practice score does not predict an admissions offer.' },
      { type: 'p', text: 'Source directory rechecked 24 October 2026. For Kent tests taken in 2027, the council says new Quest familiarisation is awaited; previous materials are not confirmation of the future format. Use the [current official Kent preparation page](https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test) for the replacement when available.' },
    ],
  },
  'how-is-the-11-plus-scored-and-marked': {
    opening: [{ type: 'callout', variant: 'info', text: 'A raw mark counts credit earned under the marking rules. A percentage expresses that mark out of the available total. A standardised score uses the test’s own conversion process; it is not the same as a percentage. School allocation is a further, separate decision.' }],
    closing: [
      { type: 'h2', text: 'Worked example: what a practice percentage can tell you' },
      { type: 'p', text: 'On an equally weighted practice set, 36 correct answers out of 45 gives 36 ÷ 45 × 100 = 80%. If the nine errors cluster around fractions, that is useful learning feedback. It does not establish a standardised score, a national percentile or a grammar-school offer. Different question weights would require the published mark scheme instead of simply counting correct answers.' },
      { type: 'question', text: 'Can 80% on our practice questions be converted to an official score of 121?', answer: 'No. There is no valid universal conversion.', explanation: 'An official conversion depends on that assessment’s scoring and standardisation data. A practice set has different questions and is not the official cohort or score scale.' },
      { type: 'p', text: 'If you searched for an “11 Plus score calculator”, use a percentage calculation only for the practice marks you actually have. For admissions decisions, read [qualifying scores and allocation cut-offs](/blog/what-score-do-you-need-to-get-into-a-grammar-school) and [pass-rate definitions](/blog/how-many-children-pass-the-11-plus-pass-rate). Use [worked-answer practice](/papers) to identify the methods to improve.' },
    ],
  },
  'what-score-do-you-need-to-get-into-a-grammar-school': {
    opening: [{ type: 'callout', variant: 'info', text: 'There is no single score that gets a child into every grammar school. First check the relevant test’s qualifying rules; then check how the school allocates places among eligible applicants. A historic allocation cut-off is not a promised future pass mark.' }],
    closing: [
      { type: 'h2', text: 'Use a two-stage results checklist' },
      { type: 'table', headers: ['Stage', 'Question to answer', 'Evidence to use'], rows: [['Qualification', 'Does this result meet the applicable standard, including any section minimum?', 'The results letter and the relevant test-year guidance'], ['Allocation', 'What priority category applies, and how are places ranked within it?', 'The school-entry year’s determined admissions arrangements'], ['Historic comparison', 'Is the published cut-off for the same category and allocation round?', 'Dated official allocation data, not a generic score table']] },
      { type: 'p', text: 'For example, [Buckinghamshire Council explains](https://www.buckinghamshire.gov.uk/schools-libraries-and-parks/school-admissions-and-appeals/grammar-schools-and-transfer-testing-11/apply-for-a-grammar-school-place/) that, once qualified, a higher test score does not give extra priority there. The school’s admissions rules decide allocation. A school elsewhere may rank eligible applicants by score. Do not transfer one area’s system to another.' },
      { type: 'p', text: 'For a test taken in 2027, check the associated entry year explicitly; September 2027 entry usually concerns a test already taken in 2026. Read [how scoring works](/blog/how-is-the-11-plus-scored-and-marked), [pupil premium priority](/blog/how-does-pupil-premium-priority-work-for-grammar-schools) and [local pass rates](/blog/how-many-children-pass-the-11-plus-pass-rate), then compare the actual [schools](/schools).' },
    ],
  },
};

export function improveSearchPriorityPost(post: BlogPost): BlogPost {
  const change = additions[post.slug];
  if (!change) return post;
  return { ...post, title: change.title ?? post.title, desc: change.desc ?? post.desc,
    updatedAt: '2026-10-24', editorial: true,
    imageUrl: '/brand/book-journey.webp', imageAlt: 'Illustrated books and a path through learning', images: [],
    content: [...change.opening, ...post.content, ...change.closing] };
}
export const SEARCH_PRIORITY_SLUGS = Object.keys(additions);
