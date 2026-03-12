'use client';

import React, { useState } from 'react';
import { Mail, Phone, User, Users, Loader2 } from 'lucide-react';

export default function TutorEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    childYear: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          childName: form.name,
          phone: form.phone,
          childYear: form.childYear,
          targetSchool: 'General enquiry',
          source: 'tutor-enquiry-index',
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      console.error('[TutorEnquiryForm]', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
          <div className="font-black mb-1">Thanks — we've received your enquiry.</div>
          <div className="text-sm text-emerald-800">
            We'll be in touch using the details you provided.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
          <Users size={20} />
        </div>
        <div>
          <div className="font-black text-slate-900 text-lg">Tutor enquiry</div>
          <div className="text-sm text-slate-500">We'll match you with the right support</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Your name</div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
              placeholder="Parent / guardian"
              required
            />
          </div>
        </label>

        <label className="block">
          <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email</div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
        </label>

        <label className="block">
          <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone (optional)</div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
              placeholder="07..."
            />
          </div>
        </label>

        <label className="block">
          <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child's year (optional)</div>
          <input
            value={form.childYear}
            onChange={(e) => setForm({ ...form, childYear: e.target.value })}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
            placeholder="Year 4 / Year 5"
          />
        </label>

        <label className="block">
          <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Notes (optional)</div>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none min-h-[96px]"
            placeholder="Schools you're targeting, topics to focus on, time until exam…"
          />
        </label>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Sending…</>
          ) : (
            'Send enquiry'
          )}
        </button>

        <div className="text-xs text-slate-500 leading-relaxed">
          This form is for enquiries only. We don't lock resources behind sign-up.
        </div>
      </form>
    </div>
  );
}
