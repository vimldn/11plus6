import Link from 'next/link';
import { visualPool } from '@/data/visualPractice';
import { VisualAnswer, VisualStem, VisualWorked } from '@/components/VisualDiagram';

const printables = [
  { id: 'maths', title: 'Maths foundations', count: 20, scope: 'Order of operations, factors and multiples, negative numbers and percentage change.', format: 'Written answers with working space', hub: '/subjects/maths', practice: '/quiz?paper=maths-generated&mode=practice', sample: 'Work out 14 + 6 × 5.', answer: '44', explanation: 'Multiply 6 × 5 = 30, then add 14. Adding first would give 100, which changes the order of operations.' },
  { id: 'english', title: 'English punctuation', count: 16, scope: 'Apostrophes, possession, contractions and direct-speech punctuation.', format: 'Written answers and an original passage', hub: '/subjects/english', practice: '/blog/11-plus-direct-speech-punctuation', sample: 'Rewrite “We have finished the display” using a contraction.', answer: 'We’ve finished the display.', explanation: 'We’ve contracts we have. The apostrophe marks the omitted letters in have.' },
  { id: 'verbal', title: 'Verbal reasoning starter', count: 12, scope: 'Letter codes, word analogies, classifications and constant-step letter or number sequences.', format: 'Four-option questions with working space', hub: '/subjects/verbal-reasoning', practice: '/quiz?paper=verbal-reviewed&mode=practice', sample: 'Cat is to kitten as dog is to ___?', answer: 'Puppy.', explanation: 'A kitten is a baby cat; a puppy is a baby dog. Keep the relationship in the same direction.' },
  { id: 'nonverbal', title: 'Non-verbal reasoning starter', count: 8, scope: 'Rotations, reflections, constant-turn sequences and transformation matrices: two questions on each skill.', format: 'Original diagrams and four visual options', hub: '/subjects/non-verbal-reasoning', practice: '/quiz?paper=visual-reviewed&mode=practice', sample: '', answer: '', explanation: '' },
];

const paperMethods: Record<string, { label: string; href: string }[]> = {
  maths: [
    { label: 'Order of operations', href: '/blog/11-plus-order-of-operations' },
    { label: 'Factors, multiples and primes', href: '/blog/11-plus-factors-multiples-primes' },
    { label: 'Negative numbers', href: '/blog/11-plus-negative-numbers' },
    { label: 'Percentage change', href: '/blog/11-plus-percentage-increase-decrease' },
  ],
  english: [
    { label: 'Apostrophes: possession and contractions', href: '/blog/11-plus-apostrophes' },
    { label: 'Direct-speech punctuation', href: '/blog/11-plus-direct-speech-punctuation' },
  ],
  verbal: [{ label: 'Codes, analogies, classifications and sequences', href: '/subjects/verbal-reasoning#verbal-practice' }],
  nonverbal: [{ label: 'Rotations, reflections, sequences and matrices', href: '/subjects/non-verbal-reasoning#visual-practice' }],
};

const visualExample = visualPool('rotations')[0];

export function PracticeResourceCatalogue() {
  return (
    <section id="printable-papers" className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="printable-title">
      <p className="brand-eyebrow">Print · practise · understand</p>
      <h2 id="printable-title" className="mt-3 text-3xl font-bold text-slate-900">Four free practice sets. Every answer explained.</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Choose a subject and open the question booklet. Keep its separate worked answers aside until you finish. These original starter sets build selected skills for tests taken in 2027; use your school’s official guidance when choosing a full exam rehearsal.</p>
      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-emerald-900" aria-label="Choose a printable subject">
        {printables.map(paper => <a key={paper.id} href={`#${paper.id}-printable`} className="underline underline-offset-4">{paper.title} ↓</a>)}
        <a href="#review-your-paper" className="underline underline-offset-4">Mark and review your paper ↓</a>
      </nav>
      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {printables.map(paper => (
          <article key={paper.id} id={`${paper.id}-printable`} className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">{paper.count} original questions · Free PDF</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">{paper.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{paper.scope}</p>
            <dl className="mt-5 border-y border-stone-200 py-4 text-sm leading-6">
              <div className="flex flex-wrap gap-x-2"><dt className="font-semibold text-slate-900">Format:</dt><dd>{paper.format}</dd></div>
              <div className="mt-1 flex flex-wrap gap-x-2"><dt className="font-semibold text-slate-900">Answers:</dt><dd>Separate booklet with worked explanations</dd></div>
              <div className="mt-1 flex flex-wrap gap-x-2"><dt className="font-semibold text-slate-900">Timing:</dt><dd>Start untimed; no official exam duration</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`/papers/${paper.id}-practice.pdf`} className="rounded-xl bg-emerald-900 px-5 py-3 text-center font-semibold text-white" aria-label={`Questions PDF — ${paper.title}`}>Questions PDF ↓</a>
              <a href={`/papers/${paper.id}-worked-answers.pdf`} className="rounded-xl border border-emerald-900 px-5 py-3 text-center font-semibold text-emerald-900" aria-label={`Worked answers PDF — ${paper.title}`}>Worked answers PDF ↓</a>
            </div>
            <details className="mt-6 rounded-xl bg-stone-50 p-4">
              <summary className="cursor-pointer font-semibold text-emerald-900">Preview one question</summary>
              {paper.id === 'nonverbal' ? <div className="mt-4">
                <p className="leading-7">{visualExample.text}</p>
                <VisualStem question={visualExample} />
                <div className="grid grid-cols-2 gap-3" aria-label="Four answer options">{visualExample.options.map(option => <div key={option}><VisualAnswer question={visualExample} answer={option} /></div>)}</div>
                <details className="mt-4 border-t border-stone-200 pt-4"><summary className="cursor-pointer font-semibold text-emerald-900">Show the worked answer</summary><VisualWorked question={visualExample} /><p className="mt-3 leading-7">{visualExample.explanation}</p></details>
              </div> : <div className="mt-4"><p className="leading-7">{paper.sample}</p><details className="mt-4 border-t border-stone-200 pt-4"><summary className="cursor-pointer font-semibold text-emerald-900">Show the worked answer</summary><p className="mt-3 font-semibold">{paper.answer}</p><p className="mt-2 leading-7">{paper.explanation}</p></details></div>}
            </details>
            <div className="mt-6 border-t border-stone-200 pt-5">
              <h4 className="font-bold text-slate-900">Work on a missed skill</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">Choose the method that matches your mistake, then try the guide’s questions before returning to this booklet.</p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-emerald-900">
                {paperMethods[paper.id].map(method => <li key={method.href}><Link href={method.href} className="underline underline-offset-4">{method.label} →</Link></li>)}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-emerald-900">
              {paper.id !== 'english' && <Link href={paper.practice} className="underline underline-offset-4">Try broader online practice →</Link>}
              <Link href={paper.hub} className="underline underline-offset-4">Learn the methods →</Link>
            </div>
          </article>
        ))}
      </div>
      <section id="review-your-paper" className="mt-10 scroll-mt-24 border-t border-stone-200 pt-8" aria-labelledby="review-paper-title">
        <h3 id="review-paper-title" className="text-2xl font-bold text-slate-900">Turn a marked paper into your next practice session</h3>
        <ol className="mt-5 grid list-decimal gap-6 pl-5 md:grid-cols-3 md:gap-10">
          <li className="pl-1 leading-7 text-slate-600"><strong className="text-slate-900">Mark the working as well as the answer.</strong> Use the answer booklet for the same subject. Circle the first step where your method differs. For punctuation, compare each changed mark, not just whether the sentence looks similar.</li>
          <li className="pl-1 leading-7 text-slate-600"><strong className="text-slate-900">Write a specific correction.</strong> “Multiply before adding” is more useful than “be careful”. Note whether you missed a rule, misread a word or made a calculation slip. Open the matching skill link above.</li>
          <li className="pl-1 leading-7 text-slate-600"><strong className="text-slate-900">Try again without the answer beside you.</strong> Explain the step aloud, then attempt a different question in the linked guide. A remembered answer on the same paper does not show that you can apply the method to a new problem.</li>
        </ol>
        <p className="mt-6 max-w-3xl leading-7 text-slate-600">Keep the paper’s title and the date of the attempt with your notes. These short sets sample different skills and question counts, so compare what your child can explain rather than treating their percentages as equivalent exam scores.</p>
        <Link href="/mock-exams#review-practice" className="mt-4 inline-block font-semibold text-emerald-900 underline underline-offset-4">Choose an online follow-up and review routine →</Link>
      </section>
      <section id="official-materials" className="mt-10 rounded-2xl bg-stone-50 p-6 sm:p-8" aria-labelledby="official-materials-title">
        <h3 id="official-materials-title" className="text-2xl font-bold text-slate-900">Looking for official familiarisation or past papers?</h3>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Familiarisation helps children recognise a test’s format. A past paper comes from a previous real assessment. Our original practice booklets are a different resource. Open the organiser’s own page to check the current materials and the correct entry year.</p>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://11plus.gl-assessment.co.uk/pages/free-materials">GL Assessment: free familiarisation →</a><p className="mt-2 text-sm leading-6 text-slate-600">Official subject packs and parent guidance. Local timings and question counts may differ.</p></li>
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://csse.org.uk/practice-material/">CSSE: released papers and mark schemes →</a><p className="mt-2 text-sm leading-6 text-slate-600">Use the published paper’s entry year. The <a className="underline" href="https://csse.org.uk/examination/">examination page</a> also links current guidance.</p></li>
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test">Kent: current preparation materials →</a><p className="mt-2 text-sm leading-6 text-slate-600">Checked 10 November 2026: Quest takes over tests from 2027; updated familiarisation is still awaited. The council’s displayed September 2026 test dates are not 2027 exam dates.</p></li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-emerald-900"><Link href="/blog/best-11-plus-practice-papers-and-past-papers" className="underline underline-offset-4">Choose the right kind of paper →</Link><Link href="/blog/free-11-plus-resources-and-websites" className="underline underline-offset-4">Compare free resources →</Link><Link href="/mock-exams" className="underline underline-offset-4">Try online practice →</Link></div>
      </section>
    </section>
  );
}
