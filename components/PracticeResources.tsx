import Link from 'next/link';

/** Static, useful hub content. All questions are original and already published in our guides. */
export function PracticeResources({ mode = 'papers' }: { mode?: 'papers' | 'mocks' }) {
  const mocks = mode === 'mocks';
  return (
    <section className="mx-auto max-w-6xl px-6 py-12" aria-label={mocks ? 'Start online practice' : 'Free printable practice and answers'}>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Choose your next step</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">{mocks ? 'Start with a focused maths practice set' : 'Free printable 11+ practice papers and worked answers'}</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Original skill practice for families preparing for tests taken in 2027. These resources are not official past papers, full syllabus mocks or a prediction of a school offer. Check your school’s current instructions before rehearsing its test.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {mocks ? <>
          <article className="rounded-2xl border border-slate-200 bg-white p-7">
            <h3 className="text-xl font-bold text-slate-900">30-question maths practice</h3>
            <p className="mt-3 leading-7 text-slate-600">Work through a selected maths set, then use the answer review to understand your mistakes. This direct practice route does not ask for an email.</p>
            <Link href="/quiz?paper=maths-pilot" className="mt-6 inline-block rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white">Start maths practice →</Link>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7">
            <h3 className="text-xl font-bold text-slate-900">Learn a method, then try another example</h3>
            <p className="mt-3 leading-7 text-slate-600">Try 16 parameterised maths questions in practice mode, with feedback as you go. The question settings create variations; they do not reproduce an official exam.</p>
            <Link href="/quiz?paper=maths-generated&mode=practice" className="mt-6 inline-block rounded-xl border border-emerald-900 px-5 py-4 font-bold text-emerald-900">Try maths with feedback →</Link>
          </article>
        </> : <>
          {[
            { subject: 'maths', title: 'Maths foundations', count: '20', scope: 'Order of operations, factors and multiples, negative numbers and percentage change.', lesson: '/subjects/maths' },
            { subject: 'english', title: 'English punctuation', count: '16', scope: 'Apostrophes, possession, contractions and direct-speech punctuation.', lesson: '/subjects/english' },
          ].map(p => <article key={p.subject} className="rounded-2xl border border-slate-200 bg-white p-7">
            <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
            <p className="mt-2 text-sm font-semibold text-emerald-800">{p.count} original questions · Printable PDFs · Free</p>
            <p className="mt-4 leading-7 text-slate-600">{p.scope} Work untimed first, show your method and open the separate answer booklet afterwards.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={`/papers/${p.subject}-practice.pdf`} className="rounded-xl bg-emerald-900 px-5 py-4 text-center font-bold text-white">{p.title} questions ↓</a>
              <a href={`/papers/${p.subject}-worked-answers.pdf`} className="rounded-xl border border-emerald-900 px-5 py-4 text-center font-bold text-emerald-900">{p.title} worked answers ↓</a>
            </div>
            <Link href={p.lesson} className="mt-5 inline-block font-semibold text-emerald-800 underline">Go to the {p.subject === 'maths' ? 'maths' : 'English'} learning hub →</Link>
          </article>)}
        </>}
      </div>
      <div className="mt-7 rounded-2xl bg-stone-50 p-7">
        <h3 className="text-xl font-bold text-slate-900">{mocks ? 'Review the method, then practise again' : 'Official familiarisation or original practice?'}</h3>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{mocks ? 'Keep your raw practice percentage separate from any official standardised score. Review an explanation, identify the skill to revisit, then retry a similar question. Use printable sets when you want more space to show working.' : 'Familiarisation introduces the organiser’s question or answer format. Our booklets teach selected skills. An authentic past paper comes from a previous real assessment: our original practice must not be described as one.'}</p>
        {!mocks && <ul className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <li><a className="font-semibold text-emerald-800 underline" href="https://11plus.gl-assessment.co.uk/pages/free-materials">GL Assessment: official free familiarisation</a></li>
          <li><a className="font-semibold text-emerald-800 underline" href="https://csse.org.uk/examination/">CSSE: official examination and familiarisation resources</a></li>
          <li><a className="font-semibold text-emerald-800 underline" href="https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test">Kent: current preparation and provider updates</a><p className="mt-2 text-slate-600">New Quest familiarisation for tests taken in 2027 is awaited. Previous materials do not confirm the future format.</p></li>
          <li><Link className="font-semibold text-emerald-800 underline" href="/blog/free-11-plus-resources-and-websites">Compare free resources, access and answer support</Link></li>
        </ul>}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-semibold text-emerald-800">
          <Link className="underline" href={mocks ? '/papers' : '/mock-exams'}>{mocks ? 'Get printable papers and worked answers' : 'Try online mock-exam practice'} →</Link>
          <Link className="underline" href="/blog/how-is-the-11-plus-scored-and-marked">Understand practice marks and official scores →</Link>
          <Link className="underline" href="/blog/how-long-is-the-11-plus-exam">Check how test timings differ →</Link>
        </div>
      </div>
    </section>
  );
}
