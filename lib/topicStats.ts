import type { QuizResult } from '../types';
import { isAnswerCorrect } from './answerMarking';

interface TopicStat {
  topic: string;
  correct: number;
  total: number;
  pct: number;
}

export function buildTopicStats(result: QuizResult): TopicStat[] {
  const map: Record<string, { correct: number; total: number }> = {};

  for (const q of result.questions) {
    const topic = q.topic || 'General';
    if (!map[topic]) map[topic] = { correct: 0, total: 0 };
    map[topic].total += 1;

    const userAnswer = result.userAnswers[q.id];
    if (
      isAnswerCorrect(userAnswer, q.correctAnswer, result.quizType, q.marking)
    ) {
      map[topic].correct += 1;
    }
  }

  return Object.entries(map)
    .map(([topic, { correct, total }]) => ({
      topic,
      correct,
      total,
      pct: Math.round((correct / total) * 100),
    }))
    .sort((a, b) => b.pct - a.pct);
}

