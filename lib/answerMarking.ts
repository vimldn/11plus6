import { AnswerRubric, QuizType } from '../types';

import { numericAnswersEqual } from './numericAnswer';

// Deliberately conservative: never accept an answer merely containing the key.
// Numeric equivalence is opt-in through a reviewed question rubric.
export function isAnswerCorrect(answer: string | undefined, expected: string, type?: QuizType, rubric?: AnswerRubric): boolean {
  if (typeof answer !== 'string' || !answer.trim() || !expected.trim()) return false;
  if (type === 'multiple-choice' || type === 'true-false') return answer === expected;
  const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  if (type === 'ordering') {
    const canonical = (value: string) => value.split(',').map(normalise).join(',');
    const allowed = rubric?.kind === 'ordering' ? rubric.acceptedOrders : [expected];
    return allowed.some(value => canonical(answer) === canonical(value));
  }
  if (rubric?.kind === 'numeric' && (type === 'fill-in-the-blank' || type === 'short-answer')) {
    return numericAnswersEqual(answer, expected, rubric);
  }
  return normalise(answer) === normalise(expected);
}
