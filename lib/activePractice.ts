import { Question } from '../types';
import { isVisualQuestion } from './visualValidation';
import { isAnswerCorrect } from './answerMarking';
export const ACTIVE_PRACTICE_KEY='11plus-active-practice-v1';
export interface ActivePractice {
  version:1; route:string; savedAt:number; startedAt:number; seconds:number;
  questions:Question[]; index:number; answers:Record<string,string>; notice:string;
}
export function readActivePractice(storage:Pick<Storage,'getItem'>,route:string,now=Date.now()):ActivePractice|null {
  try {
    const d=JSON.parse(storage.getItem(ACTIVE_PRACTICE_KEY)||'null');
    if(!d || d.version!==1 || d.route!==route || !Number.isFinite(d.savedAt) || d.savedAt>now || now-d.savedAt>7*86400000 || !Number.isFinite(d.startedAt) || d.startedAt>d.savedAt || !Number.isInteger(d.seconds) || d.seconds<0 || d.seconds>7*86400 || !Array.isArray(d.questions) || d.questions.length<1 || d.questions.length>30 || !Number.isInteger(d.index) || d.index<0 || d.index>=d.questions.length || typeof d.notice!=='string')return null;
    if(!d.questions.every((q:any)=>q && typeof q.id==='string' && typeof q.text==='string' && typeof q.explanation==='string' && typeof q.topic==='string' && Array.isArray(q.options) && q.options.length===4 && q.options.every((o:any)=>typeof o==='string') && new Set(q.options).size===4 && q.options.includes(q.correctAnswer) && (q.visual===undefined || isVisualQuestion(q.visual))))return null;
    if(new Set(d.questions.map((q:Question)=>q.id)).size!==d.questions.length || !d.answers || typeof d.answers!=='object' || Array.isArray(d.answers) || !Object.entries(d.answers).every(([id,a])=>d.questions.some((q:Question)=>q.id===id && q.options.includes(a as string))))return null;
    return d;
  }catch{return null;}
}
export function activeSeconds(d:ActivePractice,timed:boolean,now=Date.now()) {
  return timed ? Math.max(d.seconds,Math.floor((now-d.startedAt)/1000)) : d.seconds;
}
export function scoreAnswers(questions:Question[],answers:Record<string,string>) {
  return questions.reduce((score,q)=>score+(isAnswerCorrect(answers[q.id],q.correctAnswer,'multiple-choice',q.marking)?1:0),0);
}
export function writeActivePractice(storage:Pick<Storage,'setItem'>,draft:ActivePractice):boolean {
  try{storage.setItem(ACTIVE_PRACTICE_KEY,JSON.stringify(draft));return true;}catch{return false;}
}
export function clearActivePractice(storage:Pick<Storage,'removeItem'>) {try{storage.removeItem(ACTIVE_PRACTICE_KEY);}catch{}}
