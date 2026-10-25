import { NextResponse } from 'next/server';
import { Subject, QuizType, Question } from '@/types';
import { getRandomQuestions } from '@/data/questionBank';
import { getSchoolById } from '@/lib/schools';
import { loadBlueprint } from '@/lib/blueprints';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';

type ReqBody = {
  schoolId: string;
  subject: Subject | string;
  quizType: QuizType | string;
  count: number;
  difficulty?: Difficulty;
  topic?: string;
};

function normalizeSubject(input: any): Subject {
  const raw = String(input ?? '').trim();
  const asEnum = (Object.values(Subject) as string[]).find((v) => v === raw);
  if (asEnum) return asEnum as Subject;

  const s = raw.toLowerCase();
  if (s.includes('english') || s === 'eng') return Subject.English;
  if (s.includes('non') && s.includes('verbal')) return Subject.NonVerbalReasoning;
  if (s.includes('verbal')) return Subject.VerbalReasoning;
  if (s.includes('math')) return Subject.Maths;
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
    'short-answer'
  ]);
  if (allowed.has(raw as QuizType)) return raw as QuizType;
  if (allowed.has(lower as QuizType)) return lower as QuizType;

  if (lower === 'mcq' || lower === 'multiple choice' || lower === 'multiplechoice') return 'multiple-choice';
  if (lower === 'short answer' || lower === 'free-text' || lower === 'text') return 'short-answer';
  if (lower === 'fill' || lower === 'fill blank' || lower === 'fill blank') return 'fill-in-the-blank';
  if (lower === 'tf' || lower === 'true false' || lower === 'true/false') return 'true-false';
  return 'multiple-choice';
}

function clampInt(value: any, min: number, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : parseInt(String(value || ''), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const schoolId = String(body?.schoolId || '').trim();
  if (!schoolId) return jsonError('schoolId is required', 400);

  const school = getSchoolById(schoolId);
  if (!school) return jsonError('Unknown schoolId', 404);

  const subject = normalizeSubject(body.subject);
  const quizType = normalizeQuizType(body.quizType || 'multiple-choice');
  const difficulty = (body.difficulty || 'standard') as Difficulty;
  const topic = body.topic;

  const count = clampInt(body.count, 5, 30, 25);

  // Live model output has structural validation only, not independent answer verification.
  // Serve the reviewed bank rather than treating unchecked answers as ready for children.
  const blueprint = loadBlueprint(schoolId);
  const questions = getRandomQuestions(subject, quizType, count, topic, difficulty);
  return NextResponse.json({
    questions,
    warning: 'Reviewed general practice only; school-specific simulation is not verified. Unreviewed model outputs are held out.',
    meta: {
      schoolId,schoolName:school.name,blueprintLoaded:Boolean(blueprint),
      sourceMaterial:'reviewed-general-bank',uploadedPapersUsed:false,
      verified2027Specification:false,verifiedSchoolSimulation:false,
      source:'reviewed-bank',unreviewedAIHeld:true,requestedCount:count,returnedCount:questions.length,
    },
  });
}
