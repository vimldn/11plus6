import { createVerbalPractice, verbalTopics, verbalLabels } from '../data/verbalPractice';
import { QuizResult, Question } from '../types';
import { isAnswerCorrect } from './answerMarking';
import { createFreshMaths, freshTopics, freshTopicLabels } from '../data/freshMaths';
export function mistakesFrom(result: QuizResult): Question[] {
  return result.questions.filter(q => !isAnswerCorrect(result.userAnswers[q.id],q.correctAnswer,result.quizType,q.marking));
}
export function supportedMissedTopics(result: QuizResult) {
  if (result.subject === 'Verbal Reasoning') { const missed = new Set(mistakesFrom(result).map(q=>q.topic)); return verbalTopics.filter(t=>missed.has(verbalLabels[t])); }
  if (result.subject !== 'Maths') return [];
  const missed = new Set(mistakesFrom(result).map(q=>q.topic));
  return freshTopics.filter(t=>missed.has(freshTopicLabels[t]));
}
export function freshFollowUp(result: QuizResult): Question[] {
  const topics = supportedMissedTopics(result);
  // At most 10 fresh questions, explicitly limited to supported missed topics.
  if (result.subject === 'Verbal Reasoning') return topics.flatMap(t=>createVerbalPractice(t,Math.random,result.questions.map(q=>q.id)).slice(0,3)).slice(0,10);
  return createFreshMaths(Math.random,topics as import('../data/freshMaths').FreshTopic[],3,result.questions.map(q=>q.id)).slice(0,10);
}
