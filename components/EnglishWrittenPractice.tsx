'use client';

import { useState } from 'react';
import LessonAnswer from './LessonAnswer';

type Question = { question: string; answer: string; explanation: string };
type Review = 'understood' | 'revisit';

export default function EnglishWrittenPractice({ slug, questions, passage }: { slug: string; questions: Question[]; passage: string[] }) {
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [reviews, setReviews] = useState<Record<number,Review>>({});
  const [revisitOnly, setRevisitOnly] = useState(false);
  const [round, setRound] = useState(0);
  const revisits = questions.map((_,i)=>i).filter(i=>reviews[i] === 'revisit');
  const reviewed = Object.keys(reviews).length;
  const visible = questions.map((q,i)=>({q,i})).filter(({i})=>!revisitOnly || reviews[i] === 'revisit');
  function retryRevisits() {
    setAnswers(previous => Object.fromEntries(Object.entries(previous).filter(([i])=>!revisits.includes(Number(i)))));
    setRound(r=>r+1);setRevisitOnly(true);
  }
  return <div className="space-y-6">
    <p className="leading-7">Write your response before opening the model answer. Equivalent accurate wording can be acceptable. Compare the meaning and evidence with a parent or teacher; this activity does not automatically grade your writing.</p>
    <p className="text-sm text-slate-600">Your writing and review choices stay in this page session and are cleared when you leave or reload. They are not sent to our server or analytics.</p>
    <details className="rounded-xl border border-slate-200 bg-stone-50 p-5"><summary className="cursor-pointer font-bold text-emerald-900">Read the original passage alongside your answers</summary><div className="mt-4 space-y-4 leading-7">{passage.map(p=><p key={p}>{p}</p>)}</div></details>
    <div className="rounded-2xl bg-emerald-50 p-5">
      <p role="status" className="font-semibold">{reviewed} of {questions.length} reviewed · {revisits.length} flagged to revisit</p>
      <p className="mt-2 text-sm text-slate-600">These are your review choices, not a test score or a measure of mastery. Retrying clears the written drafts of flagged questions and closes their model answers.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={()=>setRevisitOnly(v=>!v)} aria-pressed={revisitOnly} className="rounded-lg border border-emerald-800 px-4 py-3 font-semibold text-emerald-900">{revisitOnly ? 'Show all questions' : 'Show flagged questions'}</button>
        <button type="button" disabled={!revisits.length} onClick={retryRevisits} className="rounded-lg bg-emerald-900 px-4 py-3 font-semibold text-white disabled:opacity-40">Retry flagged questions</button>
      </div>
    </div>
    {!visible.length && <p role="status">No questions are flagged. Choose “Show all questions” to continue.</p>}
    <ol className="space-y-6">{visible.map(({q,i})=><li key={i} value={i+1} className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold">{i+1}. {q.question}</h3>
      <label className="mt-4 block text-sm font-semibold" htmlFor={`${slug}-answer-${i}`}>Your answer to question {i+1}</label>
      <textarea id={`${slug}-answer-${i}`} value={answers[i] ?? ''} onChange={e=>setAnswers(a=>({...a,[i]:e.target.value}))} rows={3} maxLength={3000} className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-base leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" />
      <LessonAnswer key={`${i}-${round}`} slug={slug} subject="english" number={i+1}>
        <p className="mt-4 font-semibold">Model answer: {q.answer}</p>
        <p className="mt-3 leading-7">{q.explanation}</p>
        <p className="mt-4 text-sm text-slate-600">Does your answer include the required information and support from the passage?</p>
        <div role="group" aria-label={`Review question ${i+1}`} className="mt-4 flex flex-wrap gap-3">
          <button type="button" aria-pressed={reviews[i]==='understood'} onClick={()=>setReviews(r=>({...r,[i]:'understood'}))} className="rounded-lg border border-emerald-800 px-4 py-3 font-semibold text-emerald-900 aria-pressed:bg-emerald-100">I understand the answer</button>
          <button type="button" aria-pressed={reviews[i]==='revisit'} onClick={()=>setReviews(r=>({...r,[i]:'revisit'}))} className="rounded-lg border border-amber-700 px-4 py-3 font-semibold text-amber-900 aria-pressed:bg-amber-100">Revisit this question</button>
        </div>
      </LessonAnswer>
    </li>)}</ol>
  </div>;
}
