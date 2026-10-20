'use client';

/**
 * /quiz — Branded quiz wrapper page
 *
 * Replaces the redirect to /?start=mock&autostart=1 (which dumped users into
 * the plain app/page.tsx shell with no SiteNav/SiteFooter).
 *
 * Usage: /quiz?subject=maths&count=25&duration=45&schoolType=grammar&quizType=multiple-choice
 */

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { QuizArea } from '@/components/QuizArea';
import { ResultsScreen } from '@/components/ResultsScreen';
import { ReviewScreen } from '@/components/ReviewScreen';
import { Subject, QuizMode, QuizType, QuizResult, SchoolType } from '@/types';

type Screen = 'quiz' | 'results' | 'review';

function mapSubject(s: string | null): Subject {
  if (!s) return Subject.Maths;
  const lower = s.toLowerCase().replace(/_/g, '-');
  if (lower === 'english') return Subject.English;
  // Accept both short form ('verbal') and long URL slug ('verbal-reasoning')
  if (lower === 'verbal' || lower === 'verbal-reasoning') return Subject.VerbalReasoning;
  // Accept both short form ('nonverbal') and long URL slug ('non-verbal-reasoning')
  if (lower === 'nonverbal' || lower === 'non-verbal' || lower === 'non-verbal-reasoning') return Subject.NonVerbalReasoning;
  return Subject.Maths;
}

function mapSchoolType(s: string | null): SchoolType | null {
  if (!s) return null;
  if (s === 'grammar')     return SchoolType.Grammar;
  if (s === 'independent') return SchoolType.Private;
  if (s === 'state')       return SchoolType.State;
  return null;
}

function QuizPageInner() {
  const router     = useRouter();
  const params     = useSearchParams();
  const [screen, setScreen]       = useState<Screen>('quiz');
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [retryKey, setRetryKey]   = useState(0);

  const mathsPilot = params.get('paper') === 'maths-pilot';
  const freshMaths = params.get('paper') === 'maths-generated';
  const fixedMaths = mathsPilot || freshMaths;
  // Parse query params
  const subject      = fixedMaths ? Subject.Maths : mapSubject(params.get('subject'));
  const schoolType   = mapSchoolType(params.get('schoolType'));
  const mode         = (params.get('mode') === 'practice' ? 'practice' : 'exam') as QuizMode;
  const quizType     = (fixedMaths ? 'multiple-choice' : params.get('quizType') || 'multiple-choice') as QuizType;
  const questionCount = freshMaths ? 15 : mathsPilot ? 30 : Math.max(10, Math.min(30, parseInt(params.get('count') || '25', 10)));
  const examDurationMins = freshMaths ? 20 : mathsPilot ? 45 : Math.max(15, Math.min(120, parseInt(params.get('duration') || '45', 10)));
  const schoolId     = fixedMaths ? undefined : params.get('schoolId') || undefined;
  const topic        = params.get('topic')    || undefined;
  const difficulty   = (params.get('difficulty') || 'standard') as 'standard' | 'challenging' | 'exam-ready';

  const handleComplete = (result: QuizResult) => {
    setLastResult(result);
    setScreen('results');
  };

  const handleRetry = () => {
    setRetryKey((k) => k + 1);
    setLastResult(null);
    setScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Branded nav — consistent with rest of site */}
      <SiteNav ctaLabel="Find a tutor" ctaHref="/tutors" />

      {/* Breadcrumb / back link */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-4 pb-0">
        <Link
          href="/mock-exams"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 font-semibold transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Mock Exams
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {freshMaths && <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4"><h1 className="text-xl font-bold">Fresh maths practice</h1><p>15 questions: five each on order of operations, fractions of amounts and percentages of amounts. Each new attempt samples original number variations with calculated answers and worked explanations. Questions may recur across attempts.</p><p className="mt-2">Supports preparation for exams taken in 2027. This is focused skills practice, not a complete or official school paper. In timed mode, 20 minutes is our practice setting.</p><Link className="underline" href="/subjects/maths">Maths lessons and the broader practice pilot</Link></div>}
        {mathsPilot && <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4"><h1 className="text-xl font-bold">Maths practice pilot</h1><p>30 questions drawn from 120 checked questions. Original practice for families preparing for exams taken in 2027; not an official school paper. The 45-minute limit is our practice setting.</p><p className="mt-2">8 number · 8 fractions, decimals and percentages · 3 ratio · 3 algebra · 3 geometry · 3 measures and money · 2 data.</p></div>}
        {screen === 'quiz' && (
          <QuizArea
            key={retryKey}
            mathsPilot={mathsPilot}
            freshMaths={freshMaths}
            subject={subject}
            schoolType={schoolType}
            mode={mode}
            quizType={quizType}
            topic={topic}
            questionCount={questionCount}
            examDurationMins={examDurationMins}
            schoolId={schoolId}
            difficulty={difficulty}
            onComplete={handleComplete}
            onBackToDashboard={() => router.push('/mock-exams')}
          />
        )}

        {screen === 'results' && lastResult && (
          <ResultsScreen
            result={lastResult}
            newBadges={[]}
            onHome={() => router.push('/mock-exams')}
            onRetry={handleRetry}
            onReview={() => setScreen('review')}
          />
        )}

        {screen === 'review' && lastResult && (
          <ReviewScreen
            result={lastResult}
            onBack={() => setScreen('results')}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
      </div>
    }>
      <QuizPageInner />
    </Suspense>
  );
}
