'use client';

import type { ReactNode, SyntheticEvent } from 'react';

// Reuse the site's existing GA integration. No child, answer or contact data is sent.
export default function LessonAnswer({ slug, subject, number, children, track = true }: { slug: string; subject: string; number: number; children: ReactNode; track?: boolean }) {
  function recordReveal(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!track || !event.currentTarget.open) return;
    const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
    analytics.gtag?.('event', 'lesson_answer_reveal', { lesson_slug: slug, subject, question_number: number });
  }
  return <details className="mt-4" onToggle={recordReveal}>
    <summary className="cursor-pointer rounded text-sm font-semibold text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">Show answer and explanation for question {number}</summary>
    {children}
  </details>;
}
