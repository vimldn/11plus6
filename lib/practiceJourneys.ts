import type { FreshTopic } from '../data/freshMaths';

export const mathsJourneys: { topic: FreshTopic; title: string; guide?: string; lesson?: string }[] = [
  { topic: 'arithmetic', title: 'Order of operations', guide: '/blog/11-plus-order-of-operations' },
  { topic: 'fractions', title: 'Fractions of amounts', guide: '/subjects/maths/fractions-of-amounts', lesson: 'fractions-of-amounts' },
  { topic: 'percentages', title: 'Percentages of amounts', guide: '/subjects/maths/percentages-of-amounts', lesson: 'percentages-of-amounts' },
  { topic: 'algebra', title: 'Simple equations', guide: '/blog/11-plus-algebra-basics' },
  { topic: 'word-problems', title: 'Multi-step sharing', guide: '/blog/11-plus-multi-step-word-problems' },
  { topic: 'money', title: 'Money and change' },
  { topic: 'geometry', title: 'Rectangle area', guide: '/blog/11-plus-area-perimeter' },
  { topic: 'data', title: 'Mean averages', guide: '/blog/11-plus-averages' },
];
export const englishJourney = [
  { slug: 'comprehension-retrieval', title: 'Find the stated facts' },
  { slug: 'comprehension-inference', title: 'Read between the lines' },
  { slug: 'using-evidence', title: 'Support an answer with evidence' },
];
export function topicPracticeHref(topic: FreshTopic, mode: 'practice' | 'exam' = 'practice') {
  return `/quiz?paper=maths-generated&topic=${topic}&mode=${mode}`;
}
