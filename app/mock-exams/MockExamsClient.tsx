'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, BookOpen, CheckCircle, Clock, Play } from 'lucide-react';
import { OnlinePracticeCatalogue } from '@/components/OnlinePracticeCatalogue';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SchoolMockStart } from '@/components/SchoolMockStart';
import { mathsJourneys } from '@/lib/practiceJourneys';
import { PRINTABLE_PRACTICE } from '@/lib/printablePractice';
import { PRACTICE_SESSIONS, mathsPracticeSession, practiceSubjectFromParam, practiceSessionHref, type PracticeMode, type PracticeSubject } from '@/lib/practiceSessionLinks';

const subjects = Object.keys(PRACTICE_SESSIONS) as PracticeSubject[];
const buttonClass = (selected: boolean) => `rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${selected ? 'border-emerald-900 bg-emerald-50 text-emerald-950' : 'border-stone-200 bg-white text-slate-700 hover:border-emerald-700'}`;

function MockExamsPageInner({ initialSubject, initialMathsTopic }: { initialSubject: PracticeSubject; initialMathsTopic: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSchoolMode = searchParams.get('mode') === 'school';
  const [subject, setSubject] = useState<PracticeSubject>(initialSubject);
  const [mathsTopic, setMathsTopic] = useState(initialMathsTopic);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('practice');
  const [englishCount, setEnglishCount] = useState(20);
  const [englishMinutes, setEnglishMinutes] = useState(25);
  const mathsSession = mathsPracticeSession(mathsTopic);
  const session = subject === 'maths' ? mathsSession : PRACTICE_SESSIONS[subject];
  const printable = PRINTABLE_PRACTICE.find(paper => paper.id === subject)!;
  const count = subject === 'english' ? englishCount : session.questions;
  const minutes = subject === 'english' ? englishMinutes : session.minutes;

  const startPractice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(practiceSessionHref(subject, practiceMode, englishCount, englishMinutes, mathsTopic));
  };

  return (
    <>
      <SiteNav ctaLabel="Print practice" ctaHref="/papers" />
      <main id="main-content" className="bg-white">
        <section className="index-masthead px-6 pb-10 pt-14">
          <div className="mx-auto max-w-6xl">
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Free 11+ mock exams and online practice</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">Start an untimed set below, or set a timer. You can review the worked answers afterwards. No account or email needed.</p>
            <ul aria-label="Start a free 11+ practice session" className="mt-6 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {subjects.map(item => (
                <li key={item}>
                  <Link href={practiceSessionHref(item)} className="flex h-full flex-col rounded-xl border border-emerald-900 bg-white p-4 text-emerald-950 hover:bg-emerald-50">
                    <span className="font-bold">Start {PRACTICE_SESSIONS[item].label}</span>
                    <span className="mt-1 text-sm text-slate-600">{PRACTICE_SESSIONS[item].questions} questions</span>
                  </Link>
                </li>
              ))}
            </ul>
            <nav className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-emerald-900" aria-label="More practice options">
              <a href="#configure-practice" className="underline underline-offset-4">Set a timer</a>
              <Link href="/mock-exams?mode=school#configure-practice" className="underline underline-offset-4">Find practice for your school</Link>
              <Link href="/papers" className="underline underline-offset-4">Print papers and answers</Link>
            </nav>
            <p className="mt-4 text-sm text-slate-600">These short sets cover selected skills. They are not full replicas of a school’s entrance exam.</p>
          </div>
        </section>

        <section id="configure-practice" className="mock-workbench scroll-mt-24 bg-stone-50 px-6 py-12" aria-labelledby="configure-title">
          <div className="mx-auto max-w-6xl">
            <p className="brand-eyebrow">Make it your session</p>
            <h2 id="configure-title" className="mt-3 text-3xl font-bold">Choose how to practise.</h2>
            <nav className="my-7 flex flex-wrap gap-3" aria-label="Practice setup">
              <Link href="/mock-exams#configure-practice" aria-current={!isSchoolMode ? 'page' : undefined} className={buttonClass(!isSchoolMode)}>Choose a subject</Link>
              <Link href="/mock-exams?mode=school#configure-practice" aria-current={isSchoolMode ? 'page' : undefined} className={buttonClass(isSchoolMode)}>Plan around a school</Link>
            </nav>

            {isSchoolMode ? <>
              <p className="mb-6 max-w-3xl leading-7 text-slate-600">Use the school’s official sources to check its assessment. The session below draws from our shared practice bank; choosing a school does not make it an official or complete school paper.</p>
              <SchoolMockStart compact />
            </> : <form onSubmit={startPractice} className="grid gap-7 md:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
                <fieldset>
                  <legend className="text-lg font-bold text-slate-900">One subject per session</legend>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Choose the skill area you want to work on now.</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">{subjects.map(value => <button type="button" key={value} aria-pressed={subject === value} className={buttonClass(subject === value)} onClick={() => setSubject(value)}>{PRACTICE_SESSIONS[value].label}</button>)}</div>
                </fieldset>
                {subject === 'maths' && <div className="mt-8">
                  <label htmlFor="maths-practice-topic" className="text-lg font-bold text-slate-900">Mixed maths or one skill?</label>
                  <p id="maths-topic-help" className="mt-2 text-sm leading-6 text-slate-600">Choose 16 mixed questions, or 10 questions on a skill you want to revisit. The timed settings are 20 and 15 minutes respectively.</p>
                  <select id="maths-practice-topic" aria-describedby="maths-topic-help" className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-4 py-3" value={mathsTopic} onChange={event => setMathsTopic(event.target.value)}>
                    <option value="">Mixed maths: eight skills</option>
                    {mathsJourneys.map(journey => <option key={journey.topic} value={journey.topic}>{journey.title}</option>)}
                  </select>
                </div>}
                <fieldset className="mt-8">
                  <legend className="text-lg font-bold text-slate-900">Your pace</legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button type="button" aria-pressed={practiceMode === 'practice'} className={buttonClass(practiceMode === 'practice')} onClick={() => setPracticeMode('practice')}><span className="block font-bold">Untimed practice</span><span className="mt-1 block text-xs leading-5 font-normal">See feedback as you go.</span></button>
                    <button type="button" aria-pressed={practiceMode === 'exam'} className={buttonClass(practiceMode === 'exam')} onClick={() => setPracticeMode('exam')}><span className="block font-bold">Timed session</span><span className="mt-1 block text-xs leading-5 font-normal">Review answers after finishing.</span></button>
                  </div>
                </fieldset>
                {subject === 'english' ? <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="english-question-count" className="text-sm font-semibold text-slate-900">English questions</label><select id="english-question-count" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3" value={englishCount} onChange={event => setEnglishCount(Number(event.target.value))}>{[20, 25, 30].map(value => <option key={value} value={value}>{value} questions</option>)}</select></div>
                  {practiceMode === 'exam' && <div><label htmlFor="english-duration" className="text-sm font-semibold text-slate-900">Practice timer</label><select id="english-duration" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3" value={englishMinutes} onChange={event => setEnglishMinutes(Number(event.target.value))}>{[25, 45, 60].map(value => <option key={value} value={value}>{value} minutes</option>)}</select></div>}
                </div> : <p className="mt-6 text-sm leading-6 text-slate-600">This set uses {session.questions} questions{practiceMode === 'exam' ? ` and our ${session.minutes}-minute practice timer` : ''}. {subject === 'maths' ? 'The selected skill and pace are shown in your session summary.' : 'Choose a topic on the subject hub for more focused practice.'}</p>}
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
                <div aria-live="polite" aria-atomic="true">
                  <p className="brand-eyebrow">Your next session</p>
                  <h3 className="mt-3 text-2xl font-bold">{subject === 'maths' ? mathsSession.title : session.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-emerald-900"><span className="inline-flex items-center gap-2"><BookOpen size={16} aria-hidden="true" />{count} questions</span><span className="inline-flex items-center gap-2"><Clock size={16} aria-hidden="true" />{practiceMode === 'exam' ? `${minutes} minutes` : 'Untimed'}</span></div>
                  <p className="mt-5 leading-7 text-slate-600">{session.scope}</p>
                </div>
                <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white transition-colors hover:bg-emerald-950"><Play size={18} aria-hidden="true" />Start {session.label.toLowerCase()} {practiceMode === 'exam' ? 'session' : 'practice'}</button>
                <p className="mt-4 text-sm leading-6 text-slate-600">No personal details needed. Your results and worked explanations appear in this browser after you finish.</p>
                <Link href={session.guide} className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-900 underline underline-offset-4">Learn the methods first <ArrowRight size={16} aria-hidden="true" /></Link>
                <aside className="mt-6 rounded-xl bg-stone-50 p-5" aria-labelledby="print-instead-title">
                  <h4 id="print-instead-title" className="font-bold text-slate-900">Prefer a printed {session.label.toLowerCase()} set?</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{printable.title}: {printable.count} questions, with a separate worked-answer PDF. {printable.scope}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{subject === 'maths' || subject === 'english' ? 'The printable covers a different mix of skills from this online session.' : 'The printable covers the same four skill areas; some questions may be familiar.'} Start the booklet untimed and use its answer guide to mark your working.</p>
                  <Link href={`/papers#${subject}-printable`} className="mt-3 inline-block text-sm font-semibold text-emerald-900 underline underline-offset-4">See {session.label.toLowerCase()} questions and worked-answer PDFs →</Link>
                </aside>
                <p className="mt-5 border-t border-stone-200 pt-5 text-sm leading-6 text-slate-600">These are our practice settings. A practice percentage is not an official standardised score or a prediction of a school offer.</p>
              </div>
            </form>}
          </div>
        </section>

        <OnlinePracticeCatalogue />

        <section id="review-practice" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14" aria-labelledby="review-practice-title">
          <p className="brand-eyebrow">Make the answers useful</p><h2 id="review-practice-title" className="mt-3 text-3xl font-bold">What happens after a session?</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            <article><CheckCircle size={22} className="text-emerald-900" aria-hidden="true" /><h3 className="mt-4 text-xl font-bold">Review the explanation</h3><p className="mt-3 leading-7 text-slate-600">Look at the question, your answer and the worked solution together. Identify the step that needs more practice.</p></article>
            <article><BookOpen size={22} className="text-emerald-900" aria-hidden="true" /><h3 className="mt-4 text-xl font-bold">Return to the method</h3><p className="mt-3 leading-7 text-slate-600">Use the relevant subject guide or lesson. A careful untimed answer is a useful next step when the method is unfamiliar.</p></article>
            <article><ArrowRight size={22} className="text-emerald-900" aria-hidden="true" /><h3 className="mt-4 text-xl font-bold">Retry a small set</h3><p className="mt-3 leading-7 text-slate-600">Revisit missed questions. Reviewed maths and reasoning routes also offer other questions on supported missed skills; small pools can repeat across attempts.</p></article>
          </div>
          <div className="mt-8 rounded-2xl bg-stone-50 p-6 sm:p-8">
            <h3 className="text-xl font-bold">Match the mistake to one next step</h3>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">For example, if a child adds before multiplying, another timed mixed test will not explain the missing rule. Revisit order of operations, explain one worked example and try an untimed question before checking pacing again.</p>
            <ul className="mt-5 grid gap-5 text-sm leading-6 md:grid-cols-2">
              <li><strong>Calculation order or a missing number:</strong> revisit <Link className="font-semibold text-emerald-900 underline" href="/blog/11-plus-order-of-operations">order of operations</Link> or <Link className="font-semibold text-emerald-900 underline" href="/blog/11-plus-algebra-basics">simple equations</Link>. Write the intermediate step rather than guessing a result.</li>
              <li><strong>A reading answer without support:</strong> use <Link className="font-semibold text-emerald-900 underline" href="/subjects/english/using-evidence#practice">the evidence lesson’s written questions</Link>. Find the words that support your answer before comparing with the model.</li>
              <li><strong>A word or letter rule that stops working:</strong> revisit <Link className="font-semibold text-emerald-900 underline" href="/subjects/verbal-reasoning#verbal-practice">the verbal reasoning worked starters</Link>. Check the relationship against every example, in the same direction.</li>
              <li><strong>A shape turned the wrong way:</strong> use <Link className="font-semibold text-emerald-900 underline" href="/subjects/non-verbal-reasoning#visual-practice">the visual worked examples</Link>. Track one distinctive feature and distinguish a turn from a mirror image.</li>
            </ul>
            <p className="mt-5 leading-7 text-slate-600">Record one skill to revisit and whether the attempt was timed. Small question pools can repeat; a higher score on familiar questions is not a new assessment of readiness. For handwritten working, <Link className="font-semibold text-emerald-900 underline" href="/papers#review-your-paper">print a booklet and use the paper-review routine</Link>.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-emerald-900"><Link className="underline underline-offset-4" href="/blog/how-is-the-11-plus-scored-and-marked">Understand practice and official scores →</Link><Link className="underline underline-offset-4" href="/blog/are-mock-exams-important-for-the-11-plus">Choose a useful mock experience →</Link><Link className="underline underline-offset-4" href="/schools">Check a school’s assessment →</Link></div>
        </section>
        <section id="kent-paper-format" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-12" aria-labelledby="kent-paper-title">
          <h2 id="kent-paper-title" className="text-2xl font-bold">Preparing for Kent in 2027? Rehearse the paper format too.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Quest’s current Kent guidance describes two multiple-choice papers with a separate answer sheet and a writing task. Clicking an answer online does not practise transferring it to the correct row on paper. Use these sessions to develop selected skills, then use the official familiarisation resources to practise following the paper instructions.</p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">With the official sample sheet, try answering a few questions, checking their numbers and correcting a mark cleanly. Follow the organiser’s instructions rather than assuming every answer sheet works the same way. Tests taken in 2027 are for September 2028 entry; exact test days remain unconfirmed here. Sources checked 21 November 2026.</p>
          <div className="mt-4 flex flex-wrap gap-6 font-semibold text-emerald-900"><Link className="underline" href="/papers#official-materials">Find official familiarisation and answer sheets →</Link><a className="underline" href="https://www.questassessments.com/parent-guidance-consortium/the-kent-test">Read Quest’s Kent Test guidance →</a></div>
        </section>
        <section className="chapter-faq">
          <div><p className="brand-eyebrow">Before you start</p><h2>Practice that fits the purpose.</h2></div>
          <div>
            <details><summary>Are these official or full-length school mock exams?</summary><p>No. These are original sessions covering selected skills. A full rehearsal needs the right subjects, stages, timings and answer format for your school. Check its current admissions guidance and official familiarisation before treating any practice paper as a match.</p></details>
            <details><summary>Do I have to enter an email address?</summary><p>No. General and school-context practice start without a sign-up or personal details.</p></details>
            <details><summary>Can we practise without a timer?</summary><p>Yes. Choose untimed practice for feedback as you go. Use the optional timed mode when you want to practise pacing, then review the answers after submitting.</p></details>
            <details><summary>Where can I check the official test format?</summary><p>Use the school or admissions authority’s current guidance for your intended entry year. <a href="https://11plus.gl-assessment.co.uk/pages/free-materials" className="underline">GL Assessment’s familiarisation page</a> explains that local timings and question counts can differ from its sample materials.</p></details>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SubjectAwarePracticePage() {
  const searchParams = useSearchParams();
  const initialSubject = practiceSubjectFromParam(searchParams.get('subject'));
  const initialMathsTopic = mathsPracticeSession(searchParams.get('topic')).topic;
  return <MockExamsPageInner key={`${initialSubject}:${initialMathsTopic}`} initialSubject={initialSubject} initialMathsTopic={initialMathsTopic} />;
}

export default function MockExamsClient() {
  return <Suspense fallback={<div className="min-h-screen bg-white px-6 py-12" role="status">Loading practice options…</div>}><SubjectAwarePracticePage /></Suspense>;
}
