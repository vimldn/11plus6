import Link from 'next/link';
import { visualPool } from '@/data/visualPractice';
import { VisualAnswer, VisualStem, VisualWorked } from '@/components/VisualDiagram';

const printables = [
  { id: 'maths', title: 'Maths foundations', count: 20, scope: 'Order of operations, factors and multiples, negative numbers and percentage change.', format: 'Written answers with working space', hub: '/subjects/maths', practice: '/quiz?paper=maths-generated&mode=practice', sample: 'Work out 14 + 6 × 5.', answer: '44', explanation: 'Multiply 6 × 5 = 30, then add 14. Adding first would give 100, which changes the order of operations.' },
  { id: 'english', title: 'English punctuation', count: 16, scope: 'Apostrophes, possession, contractions and direct-speech punctuation.', format: 'Written answers and an original passage', hub: '/subjects/english', practice: '/subjects/english/comprehension-retrieval#practice', sample: 'Rewrite “We have finished the display” using a contraction.', answer: 'We’ve finished the display.', explanation: 'We’ve contracts we have. The apostrophe marks the omitted letters in have.' },
  { id: 'verbal', title: 'Verbal reasoning starter', count: 12, scope: 'Letter codes, word analogies, classifications and constant-step letter or number sequences.', format: 'Four-option questions with working space', hub: '/subjects/verbal-reasoning', practice: '/quiz?paper=verbal-reviewed&mode=practice', sample: 'Cat is to kitten as dog is to ___?', answer: 'Puppy.', explanation: 'A kitten is a baby cat; a puppy is a baby dog. Keep the relationship in the same direction.' },
  { id: 'nonverbal', title: 'Non-verbal reasoning starter', count: 8, scope: 'Rotations, reflections, constant-turn sequences and transformation matrices: two questions on each skill.', format: 'Original diagrams and four visual options', hub: '/subjects/non-verbal-reasoning', practice: '/quiz?paper=visual-reviewed&mode=practice', sample: '', answer: '', explanation: '' },
];

const visualExample = visualPool('rotations')[0];

export function PracticeResourceCatalogue() {
  return (
    <section id="printable-papers" className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="printable-title">
      <p className="brand-eyebrow">Print · practise · understand</p>
      <h2 id="printable-title" className="mt-3 text-3xl font-bold text-slate-900">Four free practice sets. Every answer explained.</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Choose a subject and open the question booklet. Keep its separate worked answers aside until you finish. These original starter sets build selected skills for tests taken in 2027; use your school’s official guidance when choosing a full exam rehearsal.</p>
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
              <a href={`/papers/${paper.id}-practice.pdf`} className="rounded-xl bg-emerald-900 px-5 py-3 text-center font-semibold text-white" aria-label={`Open ${paper.title} question booklet PDF`}>Questions PDF ↓</a>
              <a href={`/papers/${paper.id}-worked-answers.pdf`} className="rounded-xl border border-emerald-900 px-5 py-3 text-center font-semibold text-emerald-900" aria-label={`Open ${paper.title} worked answers PDF`}>Worked answers PDF ↓</a>
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
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-emerald-900">
              <Link href={paper.practice} className="underline underline-offset-4">Try online practice →</Link>
              <Link href={paper.hub} className="underline underline-offset-4">Learn the methods →</Link>
            </div>
          </article>
        ))}
      </div>
      <section id="official-materials" className="mt-10 rounded-2xl bg-stone-50 p-6 sm:p-8" aria-labelledby="official-materials-title">
        <h3 id="official-materials-title" className="text-2xl font-bold text-slate-900">Looking for official familiarisation or past papers?</h3>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Familiarisation helps children recognise a test’s format. A past paper comes from a previous real assessment. Our original practice booklets are a different resource. Open the organiser’s own page to check the current materials and the correct entry year.</p>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://11plus.gl-assessment.co.uk/pages/free-materials">GL Assessment: free familiarisation →</a><p className="mt-2 text-sm leading-6 text-slate-600">Official subject packs and parent guidance. Local timings and question counts may differ.</p></li>
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://csse.org.uk/practice-material/">CSSE: released papers and mark schemes →</a><p className="mt-2 text-sm leading-6 text-slate-600">Use the published paper’s entry year. The <a className="underline" href="https://csse.org.uk/examination/">examination page</a> also links current guidance.</p></li>
          <li><a className="font-semibold text-emerald-900 underline underline-offset-4" href="https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test">Kent: current preparation materials →</a><p className="mt-2 text-sm leading-6 text-slate-600">Checked 2 November 2026: Quest takes over tests from 2027; updated familiarisation is awaited.</p></li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-emerald-900"><Link href="/blog/best-11-plus-practice-papers-and-past-papers" className="underline underline-offset-4">Choose the right kind of paper →</Link><Link href="/blog/free-11-plus-resources-and-websites" className="underline underline-offset-4">Compare free resources →</Link><Link href="/mock-exams" className="underline underline-offset-4">Try online practice →</Link></div>
      </section>
    </section>
  );
}
