import { mathsMC } from './questionBanks/maths.mc';
import { isQuestionQuarantined } from './questionQuarantine';
import type { Question } from '../types';

// Original practice for 2027 preparation, not an official school paper.
// 120 existing items reviewed 20 October 2026; see docs/paper-audit.
export const mathsPilotGroups = [
  { name: 'Number', count: 8, ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,196,200] },
  { name: 'Fractions, decimals and percentages', count: 8, ids: [16,17,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,39,40,41,42,43,45,46,47,48,49,50,51] },
  { name: 'Ratio and proportion', count: 3, ids: [61,62,63,64,65,67,68,70,71,72,73,234] },
  { name: 'Algebra', count: 3, ids: [76,77,78,79,82,83,84,85,86,87,88,90] },
  { name: 'Geometry', count: 3, ids: [91,92,93,94,95,96,97,98,99,103,104,106] },
  { name: 'Measures and money', count: 3, ids: [108,110,111,112,151,152,153,154,158,159,160,161] },
  { name: 'Data', count: 2, ids: [165,166,167,168,169,170,171,175] },
];
export const mathsPilotId = (n: number) => `math-mc-${String(n).padStart(3, '0')}`;
function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
export function createMathsPilot(random: () => number = Math.random): Question[] {
  const index = new Map(mathsMC.map(q => [q.id, q]));
  return shuffle(mathsPilotGroups.flatMap(group => {
    const available = group.ids.map(mathsPilotId).filter(id => !isQuestionQuarantined(id)).map(id => index.get(id)).filter((q): q is Question => Boolean(q));
    if (available.length < group.count) throw new Error(`Reviewed maths pilot unavailable: ${group.name}`);
    return shuffle(available, random).slice(0, group.count);
  }), random);
}
