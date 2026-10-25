import type { Question } from '../types';
import { isQuestionQuarantined } from '../data/questionQuarantine';
import { applyLegacyReview } from '../data/legacyReview';
import { applyMathsRepair } from '../data/mathsRepairs';
import { applyMathsOrderingReview } from '../data/mathsOrderingReview';
export function savedQuestionsNeedUpdate(questions:Question[]):boolean {
 const content=(q:Question)=>JSON.stringify([q.text,q.options,q.correctAnswer,q.explanation,q.marking || null]);
 return questions.some(q=>{
  if(isQuestionQuarantined(q.id))return true;
  const current=/^(eng|vr|nvr)-(mc|tf|fitb|ord)-/.test(q.id) ? applyLegacyReview(q) : q.id.startsWith('math-ord-') ? applyMathsOrderingReview(q) : q.id.startsWith('math-') ? applyMathsRepair(q) : q;
  return content(current)!==content(q);
 });
}
