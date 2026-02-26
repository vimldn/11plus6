import { Subject, Question, QuizType } from '../types';

// Re-export modular banks (optional convenience imports)
export * from './questionBanks';

// ─────────────────────────────────────────────────────────────────────────────
// Thin master index: combines all modular question banks into the shape the app
// already expects (Subject -> QuizType -> Question[])
// ─────────────────────────────────────────────────────────────────────────────

import {
  mathsMC, mathsTF, mathsFITB, mathsOrdering,
  englishMC, englishTF, englishFITB, englishOrdering,
  vrMC, vrTF, vrFITB, vrOrdering,
  nvrMC, nvrTF, nvrFITB, nvrOrdering,
} from './questionBanks';

// Unified question bank (backwards-compatible with existing imports)
export const questionBank: Record<Subject, Partial<Record<QuizType, Question[]>>> = {
  [Subject.Maths]: {
    'multiple-choice': mathsMC,
    'true-false': mathsTF,
    'fill-in-the-blank': mathsFITB,
    ordering: mathsOrdering,
  },
  [Subject.English]: {
    'multiple-choice': englishMC,
    'true-false': englishTF,
    'fill-in-the-blank': englishFITB,
    ordering: englishOrdering,
  },
  [Subject.VerbalReasoning]: {
    'multiple-choice': vrMC,
    'true-false': vrTF,
    'fill-in-the-blank': vrFITB,
    ordering: vrOrdering,
  },
  [Subject.NonVerbalReasoning]: {
    'multiple-choice': nvrMC,
    'true-false': nvrTF,
    'fill-in-the-blank': nvrFITB,
    ordering: nvrOrdering,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Normalizers (tolerant of legacy / user input strings)
// ─────────────────────────────────────────────────────────────────────────────
function normalizeSubject(input: any): Subject {
  const raw = String(input ?? '').trim();
  const asEnum = (Object.values(Subject) as string[]).find((v) => v === raw);
  if (asEnum) return asEnum as Subject;

  const s = raw.toLowerCase();
  if (s.includes('english') || s === 'eng') return Subject.English;
  if ((s.includes('non') && s.includes('verbal')) || s === 'nvr' || s.includes('nonverbal')) return Subject.NonVerbalReasoning;
  if ((s.includes('verbal') && !s.includes('non')) || s === 'vr') return Subject.VerbalReasoning;
  if (s.includes('math') || s.includes('maths') || s === 'm') return Subject.Maths;

  // Default
  return Subject.Maths;
}

function normalizeQuizType(input: any): QuizType {
  const raw = String(input ?? '').trim();
  const lower = raw.toLowerCase();

  const allowed = new Set<QuizType>([
    'multiple-choice',
    'true-false',
    'fill-in-the-blank',
    'ordering',
    'short-answer',
  ]);

  if (allowed.has(raw as QuizType)) return raw as QuizType;
  if (allowed.has(lower as QuizType)) return lower as QuizType;

  // Common aliases
  if (lower === 'mcq' || lower === 'mc' || lower === 'multiplechoice' || lower === 'multiple choice')
    return 'multiple-choice';
  if (lower === 'tf' || lower === 'truefalse' || lower === 'true false')
    return 'true-false';
  if (lower === 'fitb' || lower === 'fillblank' || lower === 'fill in the blank')
    return 'fill-in-the-blank';

  return 'multiple-choice';
}

// ─────────────────────────────────────────────────────────────────────────────
// Public helpers used by the app
// ─────────────────────────────────────────────────────────────────────────────

export function getRandomQuestions(
  subject: Subject | string,
  quizType: QuizType | string,
  count: number = 5,
  topic?: string,
  difficulty: 'standard' | 'challenging' | 'exam-ready' = 'standard'
): Question[] {
  const normalizedSubject = normalizeSubject(subject);
  const normalizedQuizType = normalizeQuizType(quizType);

  const questions = (questionBank?.[normalizedSubject]?.[normalizedQuizType] ?? []) as Question[];

  // Filter by topic if specified
  let filtered = topic
    ? questions.filter((q) => String(q.topic ?? '').toLowerCase().includes(String(topic).toLowerCase()))
    : questions;

  // If not enough questions after filtering, fall back to full set
  if (filtered.length < 1) filtered = questions;

  // Difficulty: split pool into thirds (bank is roughly easy -> hard in authoring order)
  const third = Math.max(1, Math.floor(filtered.length / 3));
  let pool: Question[];

  if (difficulty === 'standard') pool = filtered.slice(0, third * 2); // easier 2/3
  else if (difficulty === 'challenging') pool = filtered.slice(third, third * 3); // middle + hard
  else pool = filtered.slice(third * 2); // hardest 1/3

  if (pool.length < 1) pool = filtered;

  // Sample without replacement
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getTopicsForSubject(subject: Subject | string): string[] {
  const s = normalizeSubject(subject);

  const all = [
    ...(questionBank[s]['multiple-choice'] ?? []),
    ...(questionBank[s]['true-false'] ?? []),
    ...(questionBank[s]['fill-in-the-blank'] ?? []),
    ...(questionBank[s].ordering ?? []),
  ] as Question[];

  const topics = new Set<string>();
  for (const q of all) {
    if (q.topic) topics.add(String(q.topic));
  }
  return Array.from(topics).sort((a, b) => a.localeCompare(b));
}
