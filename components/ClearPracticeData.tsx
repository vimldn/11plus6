'use client';
import { useState } from 'react';

export default function ClearPracticeData() {
  const [message, setMessage] = useState('');
  function clear() {
    try {
      ['11plus-active-practice-v1', '11plus-attempts-v1', '11plus-lead'].forEach(key => localStorage.removeItem(key));
      setMessage('Saved practice and any old locally saved contact details have been removed from this browser.');
    } catch { setMessage('This browser blocked access to saved data. You can clear this site’s data in your browser settings.'); }
  }
  return <div className="mt-4"><button type="button" onClick={clear} className="rounded-lg border border-emerald-900 px-4 py-2 font-semibold">Clear saved practice on this browser</button><p role="status" className="mt-3 text-sm">{message}</p></div>;
}
