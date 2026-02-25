'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Handles deep-link forwarding for /?start=mock&... URLs.
 * Extracted from app/page.tsx so the homepage can remain a server component.
 * Place this at: components/DeepLinkForwarder.tsx
 */
export function DeepLinkForwarder() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const start = params.get('start');

    if (start === 'mock' || start === 'onboarding') {
      const forward = new URLSearchParams();
      ['schoolId', 'schoolType', 'subject', 'count', 'duration', 'mode', 'quizType', 'topic', 'difficulty'].forEach((k) => {
        const v = params.get(k);
        if (v) forward.set(k, v);
      });
      const qs = forward.toString();
      router.replace(`/quiz${qs ? `?${qs}` : ''}`);
    }
  }, [router]);

  return null;
}
