'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, School, Play, Timer, ListChecks, Mail, User2, BookOpen } from 'lucide-react';

type SchoolCategory = 'grammar' | 'private';

type SchoolRow = {
  id: string;
  name: string;
  category: SchoolCategory;
  summary?: string | null;
  availableSubjects?: Array<'maths' | 'english'>;
  defaultSubject?: 'maths' | 'english';
  defaults?: {
    mathsOnly: { durationMins: number; questionCount: number };
    englishOnly: { durationMins: number; questionCount: number };
  };
  quizTypes?: {
    maths: 'multiple-choice' | 'fill-in-the-blank';
    english: 'multiple-choice' | 'fill-in-the-blank';
  };
};

interface SchoolMockStartProps {
  /** If true, uses tighter spacing so it can live inside another page. */
  compact?: boolean;
}

export function SchoolMockStart({ compact = false }: SchoolMockStartProps) {
  const router = useRouter();
  const [schools, setSchools] = useState<SchoolRow[]>([]);
  const [category, setCategory] = useState<SchoolCategory>('grammar');
  const [schoolId, setSchoolId] = useState<string>('');
  const [subject, setSubject] = useState<'maths' | 'english' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState(45);
  const [count, setCount] = useState(25);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/schools');
        const data = await res.json();
        if (!mounted) return;
        const list = Array.isArray(data?.schools) ? (data.schools as SchoolRow[]) : [];
        setSchools(list);

        const first = list.find((s) => s.category === category);
        setSchoolId(first?.id || '');
      } catch {
        if (mounted) setError('Unable to load schools right now.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => schools.filter((s) => s.category === category), [schools, category]);
  const selectedSchool = useMemo(() => schools.find((s) => s.id === schoolId) || null, [schools, schoolId]);
  // Use the blueprint's availableSubjects if present, then fall back to the
  // catalog subjects field (filtered to maths/english), then default to both.
  const availableSubjects: Array<'maths' | 'english'> = useMemo(() => {
    if (selectedSchool?.availableSubjects?.length) return selectedSchool.availableSubjects;
    const catalogSubjects: string[] = (selectedSchool as any)?.subjects ?? [];
    const mapped = catalogSubjects
      .map((s: string) => (s === 'maths' ? 'maths' : s === 'english' ? 'english' : null))
      .filter((s): s is 'maths' | 'english' => s !== null);
    return mapped.length ? mapped : (['maths', 'english'] as Array<'maths' | 'english'>);
  }, [selectedSchool]);

  // Keep schoolId valid when category changes.
  useEffect(() => {
    const first = filtered[0];
    setSchoolId((prev) => (prev && filtered.some((s) => s.id === prev) ? prev : (first?.id || '')));
  }, [filtered]);

  // When school changes, reset subject selection so user must actively choose.
  useEffect(() => {
    if (!selectedSchool) return;
    setSubject(null);
    // Load neutral defaults (maths settings as a baseline for duration/count display)
    const d = selectedSchool.defaults;
    if (d) {
      setDuration(d.mathsOnly.durationMins);
      setCount(d.mathsOnly.questionCount);
    }
  }, [schoolId]);

  // When subject is chosen, update duration/count defaults for that subject.
  useEffect(() => {
    if (!subject || !selectedSchool?.defaults) return;
    const s = subject === 'maths' ? selectedSchool.defaults.mathsOnly : selectedSchool.defaults.englishOnly;
    setDuration(s.durationMins);
    setCount(s.questionCount);
  }, [subject]);

  const canStart = !!schoolId && !!subject && name.trim().length > 1 && email.trim().includes('@');

  const start = async () => {
    if (!canStart) return;

    // Store locally so the app can greet the user later.
    try {
      localStorage.setItem('11plus-lead', JSON.stringify({ name, email, schoolId }));
    } catch {
      // ignore
    }

    // Best-effort lead capture.
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, schoolId, subject }),
    }).catch(() => undefined);

    const resolvedSubject = subject ?? 'maths';
    const quizType = resolvedSubject === 'maths'
      ? (selectedSchool?.quizTypes?.maths || 'multiple-choice')
      : (selectedSchool?.quizTypes?.english || 'multiple-choice');

    const params = new URLSearchParams();
    params.set('schoolId', schoolId);
    params.set('schoolType', category === 'grammar' ? 'grammar' : 'independent');
    params.set('subject', resolvedSubject);
    params.set('quizType', quizType);
    params.set('count', String(Math.max(10, Math.min(30, count))));
    params.set('duration', String(Math.max(15, Math.min(120, duration))));
    params.set('mode', 'exam');

    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <section className={compact ? '' : 'px-4 pt-20 pb-16'}>
      <div className={compact ? '' : 'max-w-4xl mx-auto'}>
        {!compact && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest">
              <ListChecks size={14} /> School-specific digital mocks
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pick a school and sit the mock online
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Students never download or print anything. PDFs are used only as server-side source material to learn style and difficulty.
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-4">
              <School className="text-indigo-600" size={18} /> Choose a school
            </div>

            <label className="block text-sm font-bold text-slate-600 mb-1">School type</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setCategory('grammar')}
                className={`rounded-2xl px-4 py-3 border text-left transition ${
                  category === 'grammar' ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <School size={16} /> Grammar
                </div>
                <div className="text-xs text-slate-500 mt-1">Selective entrance style</div>
              </button>
              <button
                type="button"
                onClick={() => setCategory('private')}
                className={`rounded-2xl px-4 py-3 border text-left transition ${
                  category === 'private' ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <Building2 size={16} /> Private
                </div>
                <div className="text-xs text-slate-500 mt-1">Independent school style</div>
              </button>
            </div>

            <label className="block text-sm font-bold text-slate-600 mb-1">School</label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900"
              disabled={loading}
            >
              {filtered.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {error && <div className="mt-3 text-sm text-rose-600 font-semibold">{error}</div>}
            {loading && <div className="mt-3 text-sm text-slate-500">Loading schools…</div>}

            <div className="mt-6">
              <label className="block text-sm font-bold text-slate-600 mb-1">
                Subject <span className="text-rose-500 font-normal text-xs ml-1">{!subject ? '— please select' : ''}</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSubject('maths')}
                  disabled={!availableSubjects.includes('maths')}
                  className={`rounded-2xl px-4 py-3 border-2 text-left transition ${
                    subject === 'maths'
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  } ${!availableSubjects.includes('maths') ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <BookOpen size={16} /> Maths
                  </div>
                  <div className="text-xs text-slate-500 mt-1">School-style maths questions</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSubject('english')}
                  disabled={!availableSubjects.includes('english')}
                  className={`rounded-2xl px-4 py-3 border-2 text-left transition ${
                    subject === 'english'
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  } ${!availableSubjects.includes('english') ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <BookOpen size={16} /> English
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Reading + writing styles</div>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Duration (mins)</label>
                <div className="relative">
                  <Timer size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min={15}
                    max={120}
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value || '45', 10))}
                    className="w-full rounded-2xl border border-slate-200 px-10 py-3 font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Questions</label>
                <div className="relative">
                  <ListChecks size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min={10}
                    max={30}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value || '25', 10))}
                    className="w-full rounded-2xl border border-slate-200 px-10 py-3 font-semibold"
                  />
                </div>
              </div>
            </div>

            {selectedSchool?.summary && (
              <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">
                <div className="font-black text-slate-800 mb-1">This school’s style (blueprint)</div>
                {selectedSchool.summary}
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-4">
              <User2 className="text-indigo-600" size={18} /> Student details
            </div>

            <label className="block text-sm font-bold text-slate-600 mb-1">Name</label>
            <div className="relative mb-4">
              <User2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student name"
                className="w-full rounded-2xl border border-slate-200 px-10 py-3 font-semibold"
              />
            </div>

            <label className="block text-sm font-bold text-slate-600 mb-1">Email</label>
            <div className="relative mb-6">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Parent/guardian email"
                className="w-full rounded-2xl border border-slate-200 px-10 py-3 font-semibold"
              />
            </div>

            <button
              type="button"
              onClick={start}
              disabled={!canStart}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black text-white transition ${
                canStart ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Play size={18} /> Start online mock exam
            </button>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">
              This launches a timed, interactive exam session in your browser. When time is up, the test auto-submits and you get instant results.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
