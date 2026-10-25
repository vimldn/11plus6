
export enum Subject {
  Maths = 'Maths',
  English = 'English',
  VerbalReasoning = 'Verbal Reasoning',
  NonVerbalReasoning = 'Non-Verbal Reasoning'
}

export enum SchoolType {
  Grammar = 'Grammar School',
  Private = 'Private School',
  State = 'State School'
}

export type QuizMode = 'exam' | 'practice';
// Note: the app uses "short-answer" (free text) in several places (school blueprints,
// generators, test tooling). Keep it in the union so TS matches runtime behavior.
export type QuizType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-in-the-blank'
  | 'ordering'
  | 'short-answer';
export type Theme = 'default' | 'ocean' | 'jungle' | 'sunset' | 'midnight';

export interface NumericRubric {
  kind: 'numeric';
  form?: 'any' | 'fraction' | 'decimal';
  simplest?: boolean;
  unitAliases?: string[];
  unitOptional?: boolean;
}

export interface OrderingRubric {
  kind: 'ordering';
  acceptedOrders: string[];
}
export type AnswerRubric = NumericRubric | OrderingRubric;

export type VisualPoint = [number, number];
export type VisualTransform = 'identity' | 'cw90' | 'ccw90' | 'half' | 'vertical' | 'horizontal';
export interface VisualFigure { points: VisualPoint[]; dot: VisualPoint; }
export interface VisualPattern {
  kind: 'sequence' | 'matrix';
  cells: (VisualFigure | null)[];
  columns: 3 | 5;
}
export interface VisualQuestion {
  pattern?: VisualPattern;
  start: VisualFigure; options: Record<string, VisualFigure>;
  guide: 'centre' | 'vertical' | 'horizontal';
  operation: Exclude<VisualTransform, 'identity'>; motif: number;
}

export interface Question {
  visual?: VisualQuestion;
  marking?: AnswerRubric;
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;

  // Optional metadata used by the expanded question banks / generators
  difficulty?: number;
  sourceId?: string;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  completed: boolean;
  loading: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  answersHistory: Record<string, string>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: 'star' | 'medal' | 'zap' | 'trophy' | 'brain' | 'rocket';
  color: string;
  unlocked: boolean;
}

export interface SubjectProgress {
  totalQuestions: number;
  correctAnswers: number;
}

export interface UserStats {
  targetSchool: SchoolType | null;
  stars: number;
  streak: number;
  completedQuizzes: number;
  totalTimePlayed: number;
  badges: Badge[];
  progress: Record<string, SubjectProgress>;
}

export interface QuizResult {
  provenance?: string;
  quizType?: QuizType;
  score: number;
  total: number;
  timeTaken: number;
  subject: Subject;
  pointsEarned: number;
  questions: Question[];
  userAnswers: Record<string, string>;
  mode: QuizMode;
}

export type Screen = 'onboarding' | 'dashboard' | 'topic-select' | 'quiz' | 'tutor' | 'progress' | 'leaderboard' | 'results' | 'review';
