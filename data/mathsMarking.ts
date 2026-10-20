import type { NumericRubric } from '../types';
// Explicitly reviewed scalar FITB questions only. Never infer a rubric from an AI key.
const flexible = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,24,25,26,27,28,29,30,31,35,37,41,42,43,46,47,48,49,52,53,55,56,58,59,60,68,71,76,77,78,82,83,84,85,86,87,90];
const rules: Record<number, NumericRubric> = Object.fromEntries(flexible.map(id => [id, {kind:'numeric', form:'any'}]));
for (const id of [20,22,51]) rules[id] = {kind:'numeric',form:'fraction'};
for (const id of [50,57]) rules[id] = {kind:'numeric',form:'decimal'};
for (const id of [32,36,45,63]) rules[id] = {kind:'numeric',unitAliases:['£'],unitOptional:true};
for (const id of [33,34,39,40]) rules[id] = {kind:'numeric',unitAliases:['%'],unitOptional:true};
rules[62] = {kind:'numeric',unitAliases:['g','gram','grams'],unitOptional:true};
rules[64] = {kind:'numeric',unitAliases:['km','kilometre','kilometres'],unitOptional:true};
rules[67] = {kind:'numeric',unitAliases:['ml','millilitre','millilitres'],unitOptional:true};
rules[72] = {kind:'numeric',unitAliases:['g','gram','grams'],unitOptional:true};
export function mathsMarkingFor(id: string): NumericRubric | undefined {
  const match = /^math-fitb-(\d+)$/.exec(id);
  return match ? rules[Number(match[1])] : undefined;
}
