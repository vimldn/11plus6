'use client';

import { visualLabels, isVisualTopic } from '@/data/visualPractice';
import { verbalLabels, isVerbalTopic } from '@/data/verbalPractice';

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
import { AttemptHistory } from '@/components/AttemptHistory';
import { PrintPaper } from '@/components/PrintPaper';
import { mistakesFrom, freshFollowUp, supportedMissedTopics } from '@/lib/mistakePractice';
import { freshTopics, freshTopicLabels, FreshTopic } from '@/data/freshMaths';
import { mathsJourneys } from '@/lib/practiceJourneys';
import { Question } from '@/types';
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

  const [followUp,setFollowUp]=useState<{questions:Question[];result:QuizResult;notice:string}|null>(null);
  const [attemptId,setAttemptId]=useState('');
  const mathsPilot = params.get('paper') === 'maths-pilot';
  const freshMaths = params.get('paper') === 'maths-generated';
  const fixedMaths = mathsPilot || freshMaths;
  const reviewedVisual = params.get('paper') === 'visual-reviewed';
  const visualTopic = isVisualTopic(params.get('topic') || '') ? params.get('topic') as keyof typeof visualLabels : undefined;
  const reviewedVerbal = params.get('paper') === 'verbal-reviewed';
  const verbalTopic = isVerbalTopic(params.get('topic') || '') ? params.get('topic') as keyof typeof verbalLabels : undefined;
  const fixedOriginal = fixedMaths || reviewedVerbal || reviewedVisual;
  const selectedFreshTopic = freshMaths && freshTopics.includes(params.get('topic') as FreshTopic) ? params.get('topic') as FreshTopic : undefined;
  const selectedJourney = mathsJourneys.find(j => j.topic === selectedFreshTopic);
  useEffect(() => { setScreen('quiz'); setLastResult(null); setFollowUp(null); }, [params]);
  // Parse query params
  const subject      = reviewedVisual ? Subject.NonVerbalReasoning : reviewedVerbal ? Subject.VerbalReasoning : fixedMaths ? Subject.Maths : mapSubject(params.get('subject'));
  const schoolType   = mapSchoolType(params.get('schoolType'));
  const mode         = (params.get('mode') === 'practice' ? 'practice' : 'exam') as QuizMode;
  const quizType     = (fixedOriginal ? 'multiple-choice' : params.get('quizType') || 'multiple-choice') as QuizType;
  const questionCount = reviewedVisual ? 8 : reviewedVerbal ? params.get('topic') ? 10 : 12 : freshMaths ? selectedFreshTopic ? 10 : 16 : mathsPilot ? 30 : Math.max(10, Math.min(30, parseInt(params.get('count') || '25', 10)));
  const examDurationMins = reviewedVisual ? 12 : reviewedVerbal ? 15 : freshMaths ? selectedFreshTopic ? 15 : 20 : mathsPilot ? 45 : Math.max(15, Math.min(120, parseInt(params.get('duration') || '45', 10)));
  const schoolId     = fixedOriginal ? undefined : params.get('schoolId') || undefined;
  const topic        = params.get('topic')    || undefined;
  const difficulty   = (params.get('difficulty') || 'standard') as 'standard' | 'challenging' | 'exam-ready';

  const handleComplete = (result: QuizResult) => {
    setAttemptId(String(Date.now())+'-'+Math.random().toString(36).slice(2));
    setLastResult(result);
    setScreen('results');
  };

  const handleRetry = () => {
    setFollowUp(null);
    setRetryKey((k) => k + 1);
    setLastResult(null);
    setScreen('quiz');
  };

  const startFollowUp = (fresh:boolean) => {
    if(!lastResult)return;
    const questions=fresh?freshFollowUp(lastResult):mistakesFrom(lastResult);
    if(!questions.length)return;
    setFollowUp({questions,result:lastResult,notice:fresh?'Fresh questions on supported topics you missed. Other missed topics are not included in this set.':'Repeat the exact questions you missed or left unanswered. This is practice, not a new assessment.'});
    setLastResult(null);setScreen('quiz');setRetryKey(k=>k+1);
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
      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {reviewedVisual && screen !== 'review' && <section className="mb-6 rounded-xl border border-emerald-200 bg-stone-50 p-5"><h1 className="text-2xl font-bold">{visualTopic ? `${visualLabels[visualTopic]}: focused practice` : 'Visual reasoning: four picture skills'}</h1><p className="mt-3 leading-7">{followUp ? 'Follow-up practice on checked visual questions.' : visualTopic ? '8 questions on one skill.' : '8 questions: two each on rotations, reflections, shape sequences and matrices.'} Original four-option practice for tests taken in 2027. {mode==='practice' || followUp ? 'Untimed, with worked visual feedback.' : '12 minutes is our practice setting, not an official test timing.'}</p><div className="mt-4 flex flex-wrap gap-4 font-semibold text-emerald-900"><Link className="underline" href="/subjects/non-verbal-reasoning#visual-practice">Methods and worked examples →</Link><Link className="underline" href="/papers#visual-practice">Other practice and print resources →</Link></div></section>}
        {reviewedVerbal && !followUp && <section className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5"><h1 className="text-2xl font-bold">{verbalTopic ? `${verbalLabels[verbalTopic]}: focused practice` : 'Verbal reasoning: mixed starter practice'}</h1><p className="mt-3 leading-7">{verbalTopic ? '10 questions on one skill.' : '12 questions: three each on letter codes, analogies, classifications and constant-step sequences.'} Original four-option practice for tests taken in 2027, not an official school paper or full syllabus.</p><p className="mt-3">{mode==='practice' ? 'Untimed, with explanations after each answer.' : '15 minutes is our practice setting.'} Review mistakes afterwards. Questions can recur across attempts.</p><Link href="/subjects/verbal-reasoning#verbal-practice" className="mt-4 inline-block font-semibold text-emerald-900 underline">Methods, worked starters and other verbal skills →</Link></section>}
        {freshMaths && !followUp && <section className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5"><h1 className="text-2xl font-bold">{selectedFreshTopic ? `${freshTopicLabels[selectedFreshTopic]}: focused practice` : 'Fresh maths practice'}</h1><p className="mt-3 leading-7">{selectedFreshTopic ? `10 original questions on ${freshTopicLabels[selectedFreshTopic].toLowerCase()}. Read each explanation, review any mistakes and retry a new number variation.` : '16 questions: two each on order of operations, fractions, percentages, equations, multi-step sharing, money, rectangle area and mean averages.'} Questions may recur across attempts.</p><p className="mt-3">For tests taken in 2027. This is selected skill practice, not a full or official school paper. {mode === 'practice' ? 'Untimed, with feedback after each answer.' : `${selectedFreshTopic ? 15 : 20} minutes is our practice setting.`}</p><div className="mt-4 flex flex-wrap gap-4 font-semibold text-emerald-900">{selectedJourney?.guide && <Link className="underline" href={selectedJourney.guide}>Learn the method →</Link>}<Link className="underline" href="/papers#topic-practice">Choose another skill →</Link><Link className="underline" href="/subjects/maths">Maths learning hub →</Link></div></section>}
        {mathsPilot && !followUp && <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4"><h1 className="text-xl font-bold">Maths practice pilot</h1><p>30 questions drawn from 120 checked questions. Original practice for families preparing for exams taken in 2027; not an official school paper. The 45-minute limit is our practice setting.</p><p className="mt-2">8 number · 8 fractions, decimals and percentages · 3 ratio · 3 algebra · 3 geometry · 3 measures and money · 2 data.</p></div>}
        {screen === 'quiz' && (
          <QuizArea
            key={`${params.toString()}-${retryKey}`}
            suppliedQuestions={followUp?.questions}
            suppliedNotice={followUp?.notice}
            mathsPilot={mathsPilot}
            freshMaths={freshMaths}
            reviewedVerbal={reviewedVerbal}
            reviewedVisual={reviewedVisual}
            subject={followUp?.result.subject || subject}
            schoolType={schoolType}
            mode={followUp ? 'practice' : mode}
            quizType={followUp?.result.quizType || quizType}
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
            onReview={() => { setScreen('review'); window.scrollTo({top:0}); }}
            onMistakes={mistakesFrom(lastResult).length ? () => startFollowUp(false) : undefined}
          />
        )}

        {screen === 'results' && lastResult && <section className="results-resources my-8 rounded-xl border p-6 space-y-5"><p>{lastResult.provenance}</p><PrintPaper questions={lastResult.questions} answersAllowed provenance={lastResult.provenance} /><div className="flex flex-wrap gap-3">{supportedMissedTopics(lastResult).length>0 && <button className="rounded bg-indigo-700 px-4 py-2 text-white" onClick={()=>startFollowUp(true)}>Fresh questions on missed topics</button>}</div></section>}
        {screen === 'review' && lastResult && (
          <ReviewScreen
            result={lastResult}
            onBack={() => setScreen('results')}
          />
        )}
        <AttemptHistory result={screen==='quiz'?null:lastResult} attemptId={attemptId} onOpen={(r,id)=>{setLastResult(r);setAttemptId(id);setScreen('results');}} />
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
