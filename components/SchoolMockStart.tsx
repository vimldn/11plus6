'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Building2, Play, School } from 'lucide-react';
import { SchoolPaperEvidence } from './SchoolPaperEvidence';
import type { PracticeMode } from '@/lib/practiceSessionLinks';

type SchoolCategory = 'grammar' | 'private';
type SchoolSubject = 'maths' | 'english';
type SchoolRow = { id: string; name: string; category: SchoolCategory; availableSubjects?: SchoolSubject[] };

const optionClass = (selected: boolean) => `rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${selected ? 'border-emerald-900 bg-emerald-50 text-emerald-950' : 'border-stone-200 bg-white text-slate-700 hover:border-emerald-700'}`;

export function SchoolMockStart({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [schools, setSchools] = useState<SchoolRow[]>([]);
  const [category, setCategory] = useState<SchoolCategory>('grammar');
  const [selectedId, setSelectedId] = useState('');
  const [subject, setSubject] = useState<SchoolSubject | null>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('practice');
  const [duration, setDuration] = useState(45);
  const [count, setCount] = useState(25);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadSchools() {
      try {
        const response = await fetch('/api/schools', { signal: controller.signal });
        if (!response.ok) throw new Error('School list request failed');
        const data: { schools?: SchoolRow[] } = await response.json();
        if (!Array.isArray(data.schools) || !data.schools.length) throw new Error('School list is empty');
        setSchools(data.schools);
      } catch (cause) {
        if (controller.signal.aborted) return;
        setError('We could not load the school list. You can still start general practice or read the school guides.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadSchools();
    return () => controller.abort();
  }, []);

  const filtered = schools.filter(school => school.category === category);
  const selectedSchool = filtered.find(school => school.id === selectedId) || filtered[0];
  const availableSubjects = selectedSchool?.availableSubjects?.length ? selectedSchool.availableSubjects : ['maths', 'english'];
  const canStart = Boolean(selectedSchool && subject && availableSubjects.includes(subject));

  function selectCategory(value: SchoolCategory) {
    setCategory(value);
    setSelectedId('');
    setSubject(null);
  }

  function start(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canStart || !selectedSchool || !subject) return;
    const params = new URLSearchParams({
      schoolId: selectedSchool.id,
      schoolType: category === 'grammar' ? 'grammar' : 'independent',
      subject,
      quizType: 'multiple-choice',
      count: String(count),
      duration: String(duration),
      mode: practiceMode,
    });
    router.push(`/quiz?${params.toString()}`);
  }

  return (
    <section className={compact ? '' : 'px-6 py-14'} aria-label="School-context practice">
      <div className={compact ? '' : 'mx-auto max-w-6xl'}>
        {!compact && <div className="mb-8"><p className="brand-eyebrow">School preparation</p><h2 className="mt-3 text-3xl font-bold">Choose a school, then practise shared skills.</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Read the official assessment guidance and use our original questions to build selected skills. The practice settings below are independent of the school’s exam.</p></div>}
        {loading && <p role="status" className="mb-5 text-sm text-slate-600">Loading school choices…</p>}
        {error && <div role="alert" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-5"><p className="leading-7">{error}</p><div className="mt-3 flex flex-wrap gap-5 font-semibold text-emerald-900"><Link href="/mock-exams" className="underline">Choose general practice →</Link><Link href="/schools" className="underline">Browse school guides →</Link></div></div>}
        <form onSubmit={start} className="grid gap-7 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
            <fieldset><legend className="text-lg font-bold">Find a school</legend><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" aria-pressed={category === 'grammar'} onClick={() => selectCategory('grammar')} className={optionClass(category === 'grammar')}><School size={18} aria-hidden="true" className="mb-2" />Grammar</button><button type="button" aria-pressed={category === 'private'} onClick={() => selectCategory('private')} className={optionClass(category === 'private')}><Building2 size={18} aria-hidden="true" className="mb-2" />Independent</button></div></fieldset>
            <label htmlFor="practice-school" className="mt-6 block text-sm font-semibold">School guide</label>
            <select id="practice-school" disabled={loading || !filtered.length} value={selectedSchool?.id || ''} onChange={event => { setSelectedId(event.target.value); setSubject(null); }} className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-slate-900">{!filtered.length && <option value="">{loading ? 'Loading schools…' : 'No schools available'}</option>}{filtered.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}</select>
            {selectedSchool && <Link href={`/schools/${selectedSchool.id}`} className="mt-3 inline-block text-sm font-semibold text-emerald-900 underline underline-offset-4">Read the assessment and admissions guide →</Link>}
            <fieldset className="mt-7"><legend className="text-lg font-bold">Choose one practice subject</legend><p className="mt-2 text-sm leading-6 text-slate-600">These are available general skills, not a statement of the school’s complete syllabus.</p><div className="mt-4 grid grid-cols-2 gap-3">{(['maths', 'english'] as const).map(value => <button type="button" key={value} aria-pressed={subject === value} disabled={!availableSubjects.includes(value) || loading} onClick={() => setSubject(value)} className={`${optionClass(subject === value)} disabled:opacity-40`}><BookOpen size={18} aria-hidden="true" className="mb-2" />{value === 'maths' ? 'Maths' : 'English'}<span className="mt-1 block text-xs font-normal">Original multiple-choice practice</span></button>)}</div></fieldset>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
            <fieldset><legend className="text-lg font-bold">Our practice settings</legend><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" aria-pressed={practiceMode === 'practice'} onClick={() => setPracticeMode('practice')} className={optionClass(practiceMode === 'practice')}>Untimed with feedback</button><button type="button" aria-pressed={practiceMode === 'exam'} onClick={() => setPracticeMode('exam')} className={optionClass(practiceMode === 'exam')}>Timed session</button></div></fieldset>
            <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label htmlFor="school-practice-count" className="block text-sm font-semibold">Questions</label><select id="school-practice-count" value={count} onChange={event => setCount(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3">{[10, 15, 20, 25, 30].map(value => <option key={value} value={value}>{value} questions</option>)}</select></div>{practiceMode === 'exam' && <div><label htmlFor="school-practice-timer" className="block text-sm font-semibold">Practice timer</label><select id="school-practice-timer" value={duration} onChange={event => setDuration(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3">{[15, 25, 45, 60, 90].map(value => <option key={value} value={value}>{value} minutes</option>)}</select></div>}</div>
            <p className="mt-6 leading-7 text-slate-600">Review the correct answers and explanations in your browser after finishing. These timings and question counts are choices for this session; they do not reproduce the school’s test.</p>
            <button type="submit" disabled={!canStart} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white hover:bg-emerald-950 disabled:cursor-not-allowed disabled:bg-stone-300"><Play size={18} aria-hidden="true" />Start {subject || 'selected'} practice</button>
            <p className="mt-4 text-sm leading-6 text-slate-600">{!subject ? 'Select a subject to start. ' : ''}No name, email or sign-up required.</p>
            <p className="mt-5 border-t border-stone-200 pt-5 text-sm leading-6 text-slate-600">For a full rehearsal, check the current official subjects, stages and answer format. A raw practice percentage is not an admissions prediction.</p>
          </div>
        </form>
        {selectedSchool && <SchoolPaperEvidence schoolId={selectedSchool.id} />}
      </div>
    </section>
  );
}
