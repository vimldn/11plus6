// Analytics is optional. Never pass answers, scores, names, email or free text here.
export const ANALYTICS_ID = 'G-828TTSWVN8';
export const CONSENT_KEY = '11plus-analytics-consent-v1';
export type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  'ga-disable-G-828TTSWVN8'?: boolean;
};

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return choice?.value === 'granted' && Number.isFinite(choice.expiresAt) && choice.expiresAt > Date.now();
  } catch { return false; }
}

const eventFields = {
  page_view: ['page_location', 'page_referrer', 'page_title'],
  practice_selected: ['subject', 'practice_mode', 'source_path'],
  practice_start: ['subject', 'practice_mode', 'question_count'],
  practice_complete: ['subject', 'practice_mode', 'question_count'],
  paper_download: ['resource_id', 'source_path'],
  learning_navigation: ['target_path', 'source_path'],
  lesson_answer_reveal: ['lesson_slug', 'subject', 'question_number'],
  tutor_enquiry: ['source_path'],
  resource_request: ['source_path'],
} as const;

export function trackEvent(event: keyof typeof eventFields, fields: Record<string, string | number> = {}) {
  if (!hasAnalyticsConsent()) return;
  const analytics = window as AnalyticsWindow;
  if (analytics['ga-disable-G-828TTSWVN8']) return;
  const allowed: readonly string[] = eventFields[event];
  const safeFields = Object.fromEntries(Object.entries(fields).filter(([key, value]) => allowed.includes(key) && (typeof value === 'number' || value.length <= 300)));
  analytics.gtag?.('event', event, safeFields);
}

export function openPrivacySettings() {
  window.dispatchEvent(new Event('11plus-privacy-settings'));
}
