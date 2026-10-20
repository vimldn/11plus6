import { applyMathsRepair } from './mathsRepairs';
import { mathsMarkingFor } from './mathsMarking';
import { isQuestionQuarantined } from './questionQuarantine';
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
    'multiple-choice': mathsMC.map(applyMathsRepair),
    'true-false': mathsTF.map(applyMathsRepair),
    'fill-in-the-blank': mathsFITB.map(q => ({...q, marking: mathsMarkingFor(q.id)})).map(applyMathsRepair),
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

  const questions = ((questionBank?.[normalizedSubject]?.[normalizedQuizType] ?? []) as Question[]).filter(q => !isQuestionQuarantined(q.id));

  // Filter by topic if specified
  let filtered = topic
    ? questions.filter((q) => String(q.topic ?? '').toLowerCase().includes(String(topic).toLowerCase()))
    : questions;

  // If not enough questions after filtering, fall back to full set
  if (filtered.length < 1) return [];

  // Use authored difficulty tags where available; never infer difficulty from array order.
  const level = difficulty === 'standard' ? 1 : difficulty === 'challenging' ? 2 : 3;
  const tagged = filtered.filter(q => q.difficulty === level);
  const pool = tagged.length ? tagged : filtered;

  // Keep source records, but do not repeat an identical stem within one paper.
  const seen = new Set<string>();
  const shuffled = pool.filter(q => {
    const key = q.text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
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
