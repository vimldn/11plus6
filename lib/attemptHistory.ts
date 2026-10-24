import { isVisualQuestion } from './visualValidation';
import { QuizResult, Subject } from '../types';
export const ATTEMPT_KEY='11plus-attempts-v1';
export type SavedAttempt={id:string;date:string;result:QuizResult};
export function readAttempts(storage:Pick<Storage,'getItem'>):SavedAttempt[] {
  try {
    const data=JSON.parse(storage.getItem(ATTEMPT_KEY)||'[]');
    if(!Array.isArray(data))return [];
    return data.filter(a=>typeof a?.id==='string' && typeof a?.date==='string' && Number.isFinite(Date.parse(a.date)) && Object.values(Subject).includes(a.result?.subject) && Array.isArray(a.result?.questions) && a.result.questions.length>0 && a.result.questions.length<=100 && a.result.questions.every((q:any)=>(q?.visual===undefined || isVisualQuestion(q.visual)) && typeof q?.id==='string' && typeof q?.text==='string' && typeof q?.correctAnswer==='string' && typeof q?.explanation==='string' && typeof q?.topic==='string' && Array.isArray(q?.options) && q.options.every((o:any)=>typeof o==='string')) && a.result.userAnswers && typeof a.result.userAnswers==='object' && Object.values(a.result.userAnswers).every(v=>typeof v==='string') && Number.isFinite(a.result.score) && a.result.total===a.result.questions.length && a.result.score>=0 && a.result.score<=a.result.total && Number.isFinite(a.result.timeTaken)).slice(0,20);
  } catch {return [];}
}
export function saveAttempt(storage:Pick<Storage,'getItem'|'setItem'>, result:QuizResult, id:string):SavedAttempt[] {
  const previous=readAttempts(storage);
  const next=[{id,date:new Date().toISOString(),result},...previous.filter(a=>a.id!==id)].slice(0,20);
  storage.setItem(ATTEMPT_KEY,JSON.stringify(next));
  return next;
}
