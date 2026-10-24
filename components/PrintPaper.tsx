'use client';
import { VisualStem, VisualAnswer, VisualWorked } from './VisualDiagram';
import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {Question} from '../types';

export function PrintPaper({questions, answersAllowed=false, provenance}:{questions:Question[];answersAllowed?:boolean;provenance?:string}) {
  const [kind,setKind]=useState<'questions'|'answers'|null>(null);
  return <><div className="my-3 flex flex-wrap gap-3 print:hidden">
    <button className="rounded border px-3 py-2 text-sm" onClick={()=>setKind('questions')}>Printable question paper</button>
    {answersAllowed && <button className="rounded border px-3 py-2 text-sm" onClick={()=>setKind('answers')}>Printable answer sheet</button>}
  </div>{kind && createPortal(<div id="paper-print-root" onKeyDown={e=>{if(e.key==='Escape')setKind(null);}} role="dialog" aria-modal="true" aria-label="Print preview" className="fixed inset-0 z-[100] overflow-auto bg-white p-6 text-slate-900">
    <style>{`@media print {body > *:not(#paper-print-root){display:none!important} #paper-print-root{position:static!important;overflow:visible!important;padding:0!important} .paper-controls{display:none!important} .paper-question{break-inside:avoid;margin-bottom:1.5rem} @page{margin:18mm}}`}</style>
    <div className="paper-controls mb-6 flex gap-4"><button autoFocus className="rounded bg-indigo-700 px-4 py-2 text-white" onClick={()=>window.print()}>Print or save as PDF</button><button className="rounded border px-4 py-2" onClick={()=>setKind(null)}>Close print preview</button></div>
    <h1 className="text-2xl font-bold">11 Plus Exam Papers — {kind==='questions'?'Practice questions':'Answers and worked explanations'}</h1>
    <p className="my-3">Original practice, not an official school paper. {questions.length} questions.</p>
    {provenance && <p className="mb-5 text-sm">{provenance}</p>}
    {kind==='questions' && <p className="mb-5">Name: ____________________ Date: ______________</p>}
    <ol className="list-decimal pl-6">{questions.map(q=><li className="paper-question my-6 pl-2" key={q.id}><p className="font-semibold">{q.text}</p><VisualStem question={q} />{kind==='answers'?<><div className="mt-2">Answer: <VisualAnswer question={q} answer={q.correctAnswer} /></div><p className="mt-2">{q.explanation}</p><VisualWorked question={q} /></>:<><ul className={q.visual ? "my-3 grid grid-cols-2 gap-3 sm:grid-cols-4 print:grid-cols-4" : "my-3"}>{q.options.map((option,i)=><li key={i}>{q.visual ? <VisualAnswer question={q} answer={option} /> : <>{String.fromCharCode(65+i)}. {option}</>}</li>)}</ul><p>Answer: ____________________</p><div style={{minHeight:60}} aria-label="Space for working" /></>}</li>)}</ol>
  </div>,document.body)}</>;
}
