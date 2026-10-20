import { QuizType } from '../types';

// Deliberately conservative: never accept an answer merely containing the key.
// Numeric/unit equivalence and open-ended language need explicit question rubrics.
export function isAnswerCorrect(answer: string | undefined, expected: string, type?: QuizType): boolean {
  if (typeof answer !== 'string' || !answer.trim() || !expected.trim()) return false;
  if (type === 'multiple-choice' || type === 'true-false') return answer === expected;
  const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  if (type === 'ordering') {
    return answer.split(',').map(normalise).join(',') === expected.split(',').map(normalise).join(',');
  }
  return normalise(answer) === normalise(expected);
}
