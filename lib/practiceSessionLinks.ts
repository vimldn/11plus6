export type PracticeSubject = 'maths' | 'english' | 'verbal' | 'nonverbal';
export type PracticeMode = 'practice' | 'exam';

export const PRACTICE_SESSIONS: Record<PracticeSubject, {
  label: string;
  questions: number;
  minutes: number;
  scope: string;
  guide: string;
}> = {
  maths: { label: 'Maths', questions: 16, minutes: 20, scope: 'Two questions each on order of operations, fractions, percentages, equations, sharing, money, rectangle area and mean averages.', guide: '/subjects/maths' },
  english: { label: 'English', questions: 20, minutes: 25, scope: 'Selected English multiple-choice skills. For written comprehension with model answers, use the English learning hub.', guide: '/subjects/english' },
  verbal: { label: 'Verbal reasoning', questions: 12, minutes: 15, scope: 'Three questions each on letter codes, analogies, classifications and constant-step sequences.', guide: '/subjects/verbal-reasoning' },
  nonverbal: { label: 'Non-verbal reasoning', questions: 8, minutes: 12, scope: 'Two questions each on rotations, reflections, constant-turn sequences and transformation matrices.', guide: '/subjects/non-verbal-reasoning' },
};

/** Fixed reviewed routes retain their actual counts/timers; only the English bank is configurable. */
export function practiceSessionHref(subject: PracticeSubject, mode: PracticeMode = 'practice', englishCount = 20, englishMinutes = 25) {
  if (subject === 'english') {
    const count = [20, 25, 30].includes(englishCount) ? englishCount : 20;
    const duration = [25, 45, 60].includes(englishMinutes) ? englishMinutes : 25;
    return `/quiz?subject=english&quizType=multiple-choice&mode=${mode}&count=${count}&duration=${duration}`;
  }
  const paper = subject === 'maths' ? 'maths-generated' : subject === 'verbal' ? 'verbal-reviewed' : 'visual-reviewed';
  return `/quiz?paper=${paper}&mode=${mode}`;
}
