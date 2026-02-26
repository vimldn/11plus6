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
import type { Question } from '../types';

// All questions combined
export async function getAllQuestions(): Promise<Question[]> {
  const [
    { mathsMC }, { mathsTF }, { mathsFITB }, { mathsOrdering },
    { englishMC }, { englishTF }, { englishFITB }, { englishOrdering },
    { vrMC }, { vrTF }, { vrFITB }, { vrOrdering },
    { nvrMC }, { nvrTF }, { nvrFITB }, { nvrOrdering },
  ] = await Promise.all([
    import('./maths.mc'),    import('./maths.tf'),    import('./maths.fitb'),    import('./maths.ordering'),
    import('./english.mc'),  import('./english.tf'),  import('./english.fitb'),  import('./english.ordering'),
    import('./vr.mc'),       import('./vr.tf'),       import('./vr.fitb'),       import('./vr.ordering'),
    import('./nvr.mc'),      import('./nvr.tf'),      import('./nvr.fitb'),      import('./nvr.ordering'),
  ]);
  return [
    ...mathsMC, ...mathsTF, ...mathsFITB, ...mathsOrdering,
    ...englishMC, ...englishTF, ...englishFITB, ...englishOrdering,
    ...vrMC, ...vrTF, ...vrFITB, ...vrOrdering,
    ...nvrMC, ...nvrTF, ...nvrFITB, ...nvrOrdering,
  ];
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
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
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
  const [
    { mathsMC }, { mathsTF }, { mathsFITB }, { mathsOrdering },
    { englishMC }, { englishTF }, { englishFITB }, { englishOrdering },
    { vrMC }, { vrTF }, { vrFITB }, { vrOrdering },
    { nvrMC }, { nvrTF }, { nvrFITB }, { nvrOrdering },
  ] = await Promise.all([
    import('./maths.mc'),    import('./maths.tf'),    import('./maths.fitb'),    import('./maths.ordering'),
    import('./english.mc'),  import('./english.tf'),  import('./english.fitb'),  import('./english.ordering'),
    import('./vr.mc'),       import('./vr.tf'),       import('./vr.fitb'),       import('./vr.ordering'),
    import('./nvr.mc'),      import('./nvr.tf'),       import('./nvr.fitb'),      import('./nvr.ordering'),
  ]);

  const bankMap = {
    maths:     { mc: mathsMC,    tf: mathsTF,    fitb: mathsFITB,    ordering: mathsOrdering },
    english:   { mc: englishMC,  tf: englishTF,  fitb: englishFITB,  ordering: englishOrdering },
    verbal:    { mc: vrMC,       tf: vrTF,       fitb: vrFITB,       ordering: vrOrdering },
    nonVerbal: { mc: nvrMC,      tf: nvrTF,      fitb: nvrFITB,      ordering: nvrOrdering },
  };

  const paper: Question[] = [];

  for (const [subject, weight] of Object.entries(weights) as [SubjectKey, number][]) {
    const count = Math.round(totalQuestions * weight);
    const bank  = bankMap[subject][format] ?? bankMap[subject].mc;
    paper.push(...sampleQuestions(bank, count));
  }

  // Shuffle final paper
  return paper.sort(() => Math.random() - 0.5);
}
