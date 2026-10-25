'use client';
import { VisualStem, VisualAnswer, VisualWorked } from './VisualDiagram';
import React, {useState,useRef,useEffect} from 'react';
import {createPortal} from 'react-dom';
import {Question} from '../types';

export function PrintPaper({questions, answersAllowed=false, provenance}:{questions:Question[];answersAllowed?:boolean;provenance?:string}) {
  const [kind,setKind]=useState<'questions'|'answers'|null>(null);
  const trigger=useRef<HTMLButtonElement|null>(null);
  const preview=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{if(!kind)return;const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';return ()=>{document.body.style.overflow=oldOverflow;trigger.current?.focus();};},[kind]);
  const open=(value:'questions'|'answers',button:HTMLButtonElement)=>{trigger.current=button;setKind(value);};
  const handleKey=(e:React.KeyboardEvent<HTMLDivElement>)=>{
    if(e.key==='Escape'){setKind(null);return;}
    if(e.key!=='Tab')return;
    const buttons=preview.current?.querySelectorAll<HTMLButtonElement>('button');
    if(!buttons?.length)return;
    const first=buttons[0],last=buttons[buttons.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  };
  return <><div className="my-3 flex flex-wrap gap-3 print:hidden">
    <button className="rounded border px-3 py-2 text-sm" onClick={e=>open('questions',e.currentTarget)}>Printable question paper</button>
    {answersAllowed && <button className="rounded border px-3 py-2 text-sm" onClick={e=>open('answers',e.currentTarget)}>Printable answer sheet</button>}
  </div>{kind && createPortal(<div id="paper-print-root" ref={preview} onKeyDown={handleKey} role="dialog" aria-modal="true" aria-label="Print preview" className="fixed inset-0 z-[100] overflow-auto bg-white p-6 text-slate-900">
    <style>{`@media print {body > *:not(#paper-print-root){display:none!important} #paper-print-root{position:static!important;overflow:visible!important;padding:0!important} .paper-controls{display:none!important} .paper-question{break-inside:avoid;margin-bottom:1.5rem} .paper-visual-question{break-after:page} .paper-visual-question:last-child{break-after:auto} .paper-visual-question .visual-diagram{max-width:85px!important} .paper-visual-question .visual-pattern{max-width:280px!important;gap:6px!important} .paper-visual-question p{font-size:11pt;line-height:1.35} @page{margin:18mm}}`}</style>
    <div className="paper-controls mb-6 flex flex-wrap gap-4"><button autoFocus className="rounded bg-indigo-700 px-4 py-2 text-white" onClick={()=>window.print()}>Print or save as PDF</button><button className="rounded border px-4 py-2" onClick={()=>setKind(null)}>Close print preview</button></div>
    <h1 className="text-2xl font-bold">11 Plus Exam Papers — {kind==='questions'?'Practice questions':'Answers and worked explanations'}</h1>
    <p className="my-3">Original practice, not an official school paper. {questions.length} questions.</p>
    {provenance && <p className="mb-5 text-sm">{provenance}</p>}
    {kind==='questions' && <p className="mb-5">Name: ____________________ Date: ______________</p>}
    <ol className="list-decimal pl-6">{questions.map(q=><li className={`paper-question my-6 pl-2 ${q.visual ? "paper-visual-question" : ""}`} key={q.id}><p className="font-semibold">{q.text}</p>{kind==='questions' && <VisualStem question={q} />}{kind==='answers'?<><div className="mt-2">Answer: <VisualAnswer question={q} answer={q.correctAnswer} /></div><p className="mt-2">{q.explanation}</p><VisualWorked question={q} /></>:<><ul className={q.visual ? "my-3 grid grid-cols-2 gap-3 sm:grid-cols-4 print:grid-cols-4" : "my-3"}>{q.options.map((option,i)=><li key={i}>{q.visual ? <VisualAnswer question={q} answer={option} /> : <>{String.fromCharCode(65+i)}. {option}</>}</li>)}</ul><p>Answer: ____________________</p><div style={{minHeight:60}} aria-label="Space for working" /></>}</li>)}</ol>
  </div>,document.body)}</>;
}
