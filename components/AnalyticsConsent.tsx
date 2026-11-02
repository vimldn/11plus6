'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { ANALYTICS_ID, CONSENT_KEY, trackEvent, type AnalyticsWindow } from '@/lib/analytics';

type Choice = 'granted' | 'denied' | null;

function removeAnalyticsCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!name.startsWith('_ga') && name !== '_gid' && !name.startsWith('_gat')) continue;
    for (const domain of ['', window.location.hostname, '.11plusexampapers.com']) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}; SameSite=Lax`;
    }
  }
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>(null);
  const [showSettings, setShowSettings] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      if (saved && ['granted', 'denied'].includes(saved.value) && Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now()) setChoice(saved.value);
      else { localStorage.removeItem(CONSENT_KEY); setShowSettings(true); removeAnalyticsCookies(); }
    } catch { setShowSettings(true); }
    const open = () => setShowSettings(true);
    window.addEventListener('11plus-privacy-settings', open);
    return () => window.removeEventListener('11plus-privacy-settings', open);
  }, []);

  useEffect(() => {
    const analytics = window as AnalyticsWindow;
    analytics['ga-disable-G-828TTSWVN8'] = choice !== 'granted';
    if (choice !== 'granted') return;
    if (!initialized.current) {
      analytics.dataLayer = analytics.dataLayer || [];
      analytics.gtag = function () { analytics.dataLayer?.push(arguments); };
      analytics.gtag('set', { page_location: window.location.origin + pathname, page_referrer: document.referrer.split(/[?#]/)[0] });
      analytics.gtag('js', new Date());
      analytics.gtag('config', ANALYTICS_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: 60 * 60 * 24 * 180,
        cookie_update: false,
      });
      initialized.current = true;
    }
    if (lastPage.current !== pathname) {
      let referrer = '';
      try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch {}
      analytics.gtag?.('set', { page_location: window.location.origin + pathname, page_referrer: referrer });
      trackEvent('page_view', { page_location: window.location.origin + pathname, page_referrer: referrer, page_title: document.title });
      lastPage.current = pathname;
    }
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== 'granted') return;
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith('/papers/') && url.pathname.endsWith('.pdf')) {
        trackEvent('paper_download', { resource_id: url.pathname.split('/').pop() || '', source_path: pathname });
      } else if (url.pathname === '/quiz') {
        const paper = url.searchParams.get('paper');
        const subject = paper === 'visual-reviewed' ? 'nonverbal' : paper === 'verbal-reviewed' ? 'verbal' : url.searchParams.get('subject') || 'maths';
        trackEvent('practice_selected', { subject: ['maths', 'english', 'verbal', 'verbal-reasoning', 'nonverbal', 'non-verbal-reasoning'].includes(subject) ? subject : 'other', practice_mode: url.searchParams.get('mode') === 'practice' ? 'practice' : 'exam', source_path: pathname });
      } else if (url.pathname.startsWith('/subjects/')) {
        trackEvent('learning_navigation', { target_path: url.pathname, source_path: pathname });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [choice, pathname]);

  function choose(value: Exclude<Choice, null>) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, expiresAt: Date.now() + 180 * 86400000 })); } catch {}
    if (value === 'denied') {
      (window as AnalyticsWindow)['ga-disable-G-828TTSWVN8'] = true;
      removeAnalyticsCookies();
      lastPage.current = '';
    }
    setChoice(value);
    setShowSettings(false);
  }

  return <>
    {choice === 'granted' && <Script id="optional-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`} strategy="afterInteractive" />}
    {showSettings && <section aria-label="Privacy choices" className="fixed bottom-3 left-3 right-3 z-[110] mx-auto max-w-3xl rounded-2xl border border-emerald-900/20 bg-[#fffdf5] p-5 text-emerald-950 shadow-xl sm:bottom-5 sm:p-6">
      <h2 className="text-lg font-bold">Your privacy choices</h2>
      <p className="mt-2 text-sm leading-6">Practice works without analytics. With your permission, Google Analytics helps us understand which resources get used. We don’t send your answers, scores or contact details. Parents and carers can change this choice any time. <Link className="underline" href="/privacy">Privacy policy</Link></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="rounded-lg border border-emerald-900 px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => choose('denied')}>Essential only</button>
        <button type="button" className="rounded-lg border border-emerald-900 px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => choose('granted')}>Allow analytics</button>
      </div>
    </section>}
  </>;
}
