import { NextResponse } from 'next/server';

// Google Apps Script Web App URL — set this in Vercel environment variables
// as APPS_SCRIPT_URL (server-side, no NEXT_PUBLIC_ needed here)
const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwO8YZyJF4yngUnNT0ZZlnt2ZQdLevpQ4mTdgBvQPBjv4LXVHhpZjLkXGJaHo7_KzbN/exec';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      email:        String(body?.email        || '').trim().slice(0, 254),
      parentName:   String(body?.parentName   || '').trim().slice(0, 100),
      childName:    String(body?.childName    || body?.name || '').trim().slice(0, 100),
      targetSchool: String(body?.targetSchool || body?.schoolId || '').trim().slice(0, 160),
      phone:        String(body?.phone        || '').trim().slice(0, 40),
      childYear:    String(body?.childYear    || '').trim().slice(0, 40),
      source:       String(body?.source       || 'api-leads').trim().slice(0, 100),
      notes:        String(body?.notes        || '').trim().slice(0, 2000),
      requestedUpdates: body?.requestedUpdates === true,
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json({ error: 'A valid parent or carer email address is required.' }, { status: 400 });
    }
    // Keep personal details out of runtime logs; report delivery failures honestly.
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) {
        console.error('[lead] Delivery failed', { status: response.status });
        return NextResponse.json({ error: 'Your enquiry could not be delivered. Please try again or email us.' }, { status: 502 });
      }
    } catch {
      console.error('[lead] Delivery unavailable');
      return NextResponse.json({ error: 'Your enquiry could not be delivered. Please try again or email us.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
