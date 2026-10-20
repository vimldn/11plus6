import { QuizResult, Question } from '../types';
import { isAnswerCorrect } from './answerMarking';
import { createFreshMaths, freshTopics, freshTopicLabels } from '../data/freshMaths';
export function mistakesFrom(result: QuizResult): Question[] {
  return result.questions.filter(q => !isAnswerCorrect(result.userAnswers[q.id],q.correctAnswer,result.quizType,q.marking));
}
export function supportedMissedTopics(result: QuizResult) {
  if (result.subject !== 'Maths') return [];
  const missed = new Set(mistakesFrom(result).map(q=>q.topic));
  return freshTopics.filter(t=>missed.has(freshTopicLabels[t]));
}
export function freshFollowUp(result: QuizResult): Question[] {
  const topics = supportedMissedTopics(result);
  // At most 10 fresh questions, explicitly limited to supported missed topics.
  return createFreshMaths(Math.random,topics,3,result.questions.map(q=>q.id)).slice(0,10);
}
