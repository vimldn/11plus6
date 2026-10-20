import { Question, QuizType } from '../types';

// Structural safety only: this does not prove factual or pedagogical accuracy.
export function validateGeneratedQuestions(questions: Question[], count: number, type: QuizType): Question[] {
  if (questions.length !== count) throw new Error('Wrong question count');
  const ids = new Set<string>();
  const texts = new Set<string>();
  for (const q of questions) {
    if (![q.id, q.text, q.correctAnswer, q.explanation, q.topic].every(x => typeof x === 'string' && x.trim())) throw new Error('Missing question fields');
    const text = q.text.trim().toLowerCase().replace(/\s+/g, ' ');
    if (ids.has(q.id) || texts.has(text)) throw new Error('Duplicate question');
    ids.add(q.id); texts.add(text);
    if (!Array.isArray(q.options) || q.options.some(x => typeof x !== 'string' || !x.trim())) throw new Error('Invalid options');
    const options = q.options.map(x => x.trim().toLowerCase());
    if (new Set(options).size !== options.length) throw new Error('Duplicate options');
    if (type === 'multiple-choice' && (q.options.length !== 4 || !q.options.includes(q.correctAnswer))) throw new Error('Invalid multiple-choice key');
    if (type === 'true-false' && (options.length !== 2 || !options.includes('true') || !options.includes('false') || !q.options.includes(q.correctAnswer))) throw new Error('Invalid true-false key');
    if (type === 'ordering') {
      const answer = q.correctAnswer.split(',').map(x => x.trim().toLowerCase()).sort();
      if (answer.length < 2 || JSON.stringify(answer) !== JSON.stringify([...options].sort())) throw new Error('Invalid ordering key');
    }
  }
  return questions;
}
