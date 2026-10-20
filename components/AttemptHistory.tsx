'use client';
import React,{useState,useEffect} from 'react';
import {QuizResult} from '../types';
import {readAttempts,saveAttempt,SavedAttempt} from '../lib/attemptHistory';
export function AttemptHistory({result,attemptId,onOpen}:{result:QuizResult|null;attemptId:string;onOpen:(result:QuizResult,id:string)=>void}) {
  const [items,setItems]=useState<SavedAttempt[]>([]),[message,setMessage]=useState(''),[open,setOpen]=useState(false);
  useEffect(()=>{try{setItems(readAttempts(localStorage));}catch{setMessage('Browser storage is unavailable.');}},[]);
  const save=()=>{try{setItems(saveAttempt(localStorage,result!,attemptId));setMessage('Attempt saved on this browser.');}catch{setMessage('Could not save: browser storage is unavailable or full.');}};
  return <section className="my-5 rounded-xl border p-4"><h2 className="font-bold">Your saved practice</h2><p className="my-2 text-sm">Save up to 20 completed attempts on this browser. They are visible to anyone using this browser, do not sync across devices and can be lost if browser data is cleared. Different papers and practice modes are not directly comparable; scores do not predict an exam result.</p><div className="flex flex-wrap gap-3">{result && <button onClick={save} className="rounded border px-3 py-2">Save this attempt</button>}<button className="rounded border px-3 py-2" onClick={()=>setOpen(!open)}>{open?'Hide saved attempts':'Show saved attempts'} ({items.length})</button></div><p role="status" className="mt-2 text-sm">{message}</p>{open && <ul className="mt-3 space-y-2">{items.length===0 && <li>No saved attempts yet.</li>}{items.map(a=><li key={a.id}><button className="text-left text-indigo-700 underline" onClick={()=>onOpen(a.result,a.id)}>{new Date(a.date).toLocaleString('en-GB')} · {a.result.subject} · {a.result.mode} · {a.result.score}/{a.result.total} — view result</button></li>)}</ul>}</section>;
}
