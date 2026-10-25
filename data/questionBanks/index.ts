// ─────────────────────────────────────────────────────────────────────────────
// questionBank.ts  —  Master index
// Imports all modular question banks and re-exports a unified Question[] array
// plus per-subject / per-format helpers.
// ─────────────────────────────────────────────────────────────────────────────

// ── MATHS ────────────────────────────────────────────────────────────────────
export { mathsMC }       from './maths.mc';
export { mathsTF }       from './maths.tf';
export { mathsFITB }     from './maths.fitb';
export { mathsOrdering } from './maths.ordering';

// ── ENGLISH ──────────────────────────────────────────────────────────────────
export { englishMC }       from './english.mc';
export { englishTF }       from './english.tf';
export { englishFITB }     from './english.fitb';
export { englishOrdering } from './english.ordering';

// ── VERBAL REASONING ─────────────────────────────────────────────────────────
export { vrMC }       from './vr.mc';
export { vrTF }       from './vr.tf';
export { vrFITB }     from './vr.fitb';
export { vrOrdering } from './vr.ordering';

// ── NON-VERBAL REASONING ─────────────────────────────────────────────────────
export { nvrMC }       from './nvr.mc';
export { nvrTF }       from './nvr.tf';
export { nvrFITB }     from './nvr.fitb';
export { nvrOrdering } from './nvr.ordering';

// ─────────────────────────────────────────────────────────────────────────────
// Lazy imports — only evaluated when called, keeps startup fast
// ─────────────────────────────────────────────────────────────────────────────
import { Question } from '../../types';

// All questions combined
export async function getAllQuestions(): Promise<Question[]> {
  const { questionBank } = await import('../questionBank');
  const { isQuestionQuarantined } = await import('../questionQuarantine');
  return Object.values(questionBank).flatMap(formats=>Object.values(formats).flatMap(qs=>qs || [])).filter(q=>!isQuestionQuarantined(q.id));
}

// ─────────────────────────────────────────────────────────────────────────────
// Synchronous helpers — import the banks you need directly in your component
// ─────────────────────────────────────────────────────────────────────────────

export type SubjectKey = 'maths' | 'english' | 'verbal' | 'nonVerbal';
export type FormatKey  = 'mc' | 'tf' | 'fitb' | 'ordering';

/**
 * Returns a flat array of questions for the given subject + format combination.
 * Import the individual named exports at the top of this file for tree-shaking.
 *
 * Usage:
 *   import { mathsMC, englishTF } from '@/questionBanks';
 */

// ─────────────────────────────────────────────────────────────────────────────
// Question counts (for dashboards / progress tracking)
// ─────────────────────────────────────────────────────────────────────────────
export const QUESTION_COUNTS = {
  maths: {
    mc: 250,
    tf: 250,
    fitb: 250,
    ordering: 50,
    total: 800,
  },
  english: {
    mc: 250,
    tf: 204,
    fitb: 204,
    ordering: 50,
    total: 708,
  },
  verbal: {
    mc: 250,
    tf: 250,
    fitb: 250,
    ordering: 40,
    total: 790,
  },
  nonVerbal: {
    mc: 150,
    tf: 150,
    fitb: 150,
    ordering: 30,
    total: 480,
  },
  grandTotal: 800 + 708 + 790 + 480, // 2,778
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty filter helper
// ─────────────────────────────────────────────────────────────────────────────
export function filterByDifficulty(
  questions: Question[],
  level: 1 | 2 | 3
): Question[] {
  return questions.filter(q => q.difficulty === level);
}

// ─────────────────────────────────────────────────────────────────────────────
// Topic filter helper
// ─────────────────────────────────────────────────────────────────────────────
export function filterByTopic(
  questions: Question[],
  topic: string
): Question[] {
  return questions.filter(q => q.topic === topic);
}

// ─────────────────────────────────────────────────────────────────────────────
// Random sample helper
// ─────────────────────────────────────────────────────────────────────────────
export function sampleQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions];
  for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
  return shuffled.slice(0, Math.max(0, Math.floor(count)));
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock exam builder — builds a mixed paper with weighted subject split
// Default split: Maths 40%, English 25%, VR 20%, NVR 15%
// ─────────────────────────────────────────────────────────────────────────────
export async function buildMockPaper(
  totalQuestions: number = 80,
  format: FormatKey = 'mc',
  weights = { maths: 0.4, english: 0.25, verbal: 0.2, nonVerbal: 0.15 }
): Promise<Question[]> {
  if(!Number.isInteger(totalQuestions) || totalQuestions<1)throw new Error('Question count must be a positive integer');
  const { questionBank } = await import('../questionBank');
  const { isQuestionQuarantined } = await import('../questionQuarantine');
  const subjectLabels={maths:'Maths',english:'English',verbal:'Verbal Reasoning',nonVerbal:'Non-Verbal Reasoning'} as const;
  const formats={mc:'multiple-choice',tf:'true-false',fitb:'fill-in-the-blank',ordering:'ordering'} as const;
  const entries=Object.entries(weights) as [SubjectKey,number][];
  if(entries.some(([key,w])=>!(key in subjectLabels) || !Number.isFinite(w) || w<0))throw new Error('Invalid paper weights');
  const totalWeight=entries.reduce((sum,[,w])=>sum+w,0);
  if(totalWeight<=0)throw new Error('At least one paper weight is required');
  const allocation=entries.map(([key,w],index)=>{const exact=totalQuestions*w/totalWeight;return {key,index,count:Math.floor(exact),fraction:exact-Math.floor(exact)};});
  let remainder=totalQuestions-allocation.reduce((sum,x)=>sum+x.count,0);
  const byRemainder=allocation.slice().sort((a,b)=>b.fraction-a.fraction || a.index-b.index);
  for(let i=0;i<remainder;i++)byRemainder[i].count++;
  const paper:Question[]=[];
  for(const {key,count} of allocation){
    const bank=(questionBank[subjectLabels[key]][formats[format]] || []).filter(q=>!isQuestionQuarantined(q.id));
    if(bank.length<count)throw new Error(`Only ${bank.length} reviewed ${key} questions are available for this format`);
    paper.push(...sampleQuestions(bank,count));
  }
  return sampleQuestions(paper,paper.length);
}
