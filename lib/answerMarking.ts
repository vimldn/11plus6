import { NumericRubric, QuizType } from '../types';

import { numericAnswersEqual } from './numericAnswer';

// Deliberately conservative: never accept an answer merely containing the key.
// Numeric equivalence is opt-in through a reviewed question rubric.
export function isAnswerCorrect(answer: string | undefined, expected: string, type?: QuizType, rubric?: NumericRubric): boolean {
  if (typeof answer !== 'string' || !answer.trim() || !expected.trim()) return false;
  if (type === 'multiple-choice' || type === 'true-false') return answer === expected;
  const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  if (type === 'ordering') {
    return answer.split(',').map(normalise).join(',') === expected.split(',').map(normalise).join(',');
  }
  if (rubric?.kind === 'numeric' && (type === 'fill-in-the-blank' || type === 'short-answer')) {
    return numericAnswersEqual(answer, expected, rubric);
  }
  return normalise(answer) === normalise(expected);
}
