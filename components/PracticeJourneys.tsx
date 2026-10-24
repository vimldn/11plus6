import Link from 'next/link';
import { mathsJourneys, englishJourney, topicPracticeHref } from '@/lib/practiceJourneys';

export function PracticeJourneys({ subject }: { subject?: 'maths' | 'english' }) {
  return <section id="topic-practice" className="mx-auto max-w-6xl px-6 py-12" aria-label="Choose a learning journey">
    <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Learn · practise · review · retry</p>
    <h2 className="mt-3 text-3xl font-bold">Choose one skill to work on</h2>
    <p className="mt-4 max-w-3xl leading-7 text-slate-600">Original practice for exams taken in 2027. Start with the method, try the questions, then use the explanation to decide what to revisit. These selected skills are not a complete exam syllabus.</p>
    {subject !== 'english' && <>
      <h3 className="mt-8 text-2xl font-bold">Maths: focused sets with worked answers</h3>
      <p className="mt-3 leading-7 text-slate-600">Each route gives 10 questions on one narrow skill. Practice mode explains each answer as you go; the timed option uses our 15-minute practice setting. New attempts vary the numbers, but questions may recur.</p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{mathsJourneys.map(j=><li key={j.topic} className="rounded-2xl border border-slate-200 bg-white p-6">
        <h4 className="text-xl font-bold">{j.title}</h4>
        {j.guide ? <Link href={j.guide} className="mt-4 block font-semibold text-emerald-800 underline">1. Learn the method →</Link> : <p className="mt-4 text-sm leading-6 text-slate-600">Use the worked explanation after each answer to review the method.</p>}
        <Link href={topicPracticeHref(j.topic)} className="mt-4 inline-block rounded-xl bg-emerald-900 px-4 py-3 font-bold text-white">Practise {j.title.toLowerCase()} →</Link>
        <Link href={topicPracticeHref(j.topic,'exam')} className="mt-4 block text-sm font-semibold text-emerald-800 underline">Try 10 questions in 15 minutes →</Link>
      </li>)}</ul>
    </>}
    {subject !== 'maths' && <>
      <h3 className="mt-10 text-2xl font-bold">English: build a supported written answer</h3>
      <p className="mt-3 leading-7 text-slate-600">Three original reading lessons, each with six questions. Write first, compare with the model, then mark what you want to revisit. This is self-review, not automatic marking.</p>
      <ol className="mt-6 grid gap-5 sm:grid-cols-3">{englishJourney.map((j,i)=><li key={j.slug} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm font-bold text-emerald-800">Step {i+1}</p><h4 className="mt-3 text-xl font-bold">{j.title}</h4><Link href={`/subjects/english/${j.slug}#practice`} className="mt-5 inline-block font-semibold text-emerald-800 underline">Read, write and review →</Link></li>)}</ol>
    </>}
  </section>;
}
