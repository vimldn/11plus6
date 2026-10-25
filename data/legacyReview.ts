import type { Question } from '../types';
import review from './legacyReasoningReview';
import { englishMC } from './questionBanks/english.mc';
import { vrMC } from './questionBanks/vr.mc';
import { nvrMC } from './questionBanks/nvr.mc';

const patches:Record<string,Partial<Question>>={...review.nvrPatches,...review.englishPatches,...review.vrPatches} as Record<string,Partial<Question>>;
const ordering:Record<string,Partial<Question>>={...review.orderingPatches,...review.englishOrderingPatches,...review.vrOrderingPatches} as Record<string,Partial<Question>>;
export const legacyHoldReasons:Record<string,string>={...review.nvrHolds,...review.orderingHolds,...review.englishHolds,...review.englishOrderingHolds,...review.vrHolds,...review.vrOrderingHolds};
export const legacyResolvedFamilies=new Set(Object.keys(patches).map(id=>id.replace('-mc-','-')));
export const legacyResolvedIds=new Set(['eng-fitb-035','eng-fitb-037','eng-fitb-038','eng-fitb-049','eng-fitb-059','eng-fitb-068','eng-fitb-074','eng-fitb-102','eng-fitb-104','eng-fitb-109']);
const sources=new Map([...englishMC,...vrMC,...nvrMC].map(q=>[q.id,{...q,...patches[q.id]}]));
export function applyLegacyReview(q:Question):Question {
  if(q.id.includes('-ord-'))return {...q,...ordering[q.id]};
  const match=/^(eng|vr|nvr)-(mc|tf|fitb)-(\d+)$/.exec(q.id);
  if(!match)return q;
  const source=sources.get(`${match[1]}-mc-${match[3]}`);
  if(!source)return q;
  if(match[2]==='mc')return source;
  if(match[2]==='tf'){
    const truth=Number(match[3])%2===1;
    const proposed=truth?source.correctAnswer:source.options.find(o=>o!==source.correctAnswer)!;
    return {...q,text:`True or false: For the question below, the proposed answer is "${proposed}".\n\n${source.text}\nCandidates: ${source.options.join(' | ')}`,options:['True','False'],correctAnswer:truth?'True':'False',explanation:`${truth?'The proposed answer is correct.':'The proposed answer is not the answer requested.'} The answer is ${source.correctAnswer}. ${source.explanation}`,topic:source.topic,sourceId:source.id};
  }
  // Keep the finite candidate set: an unrestricted grammar/word task cannot be fairly exact-key marked.
  return {...q,text:`${source.text}\nChoose from: ${source.options.join(' | ')}. Type your chosen option exactly as shown.`,options:[],correctAnswer:source.correctAnswer,explanation:source.explanation,topic:source.topic,sourceId:source.id};
}
