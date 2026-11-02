const assert = require('node:assert/strict');
const { load } = require('./load-ts.cjs');

async function checkLeadDelivery() {
  const { POST } = load('app/api/leads/route.ts');
  const originalFetch = global.fetch;
  const originalError = console.error;
  const logs = [];
  console.error = (...args) => logs.push(JSON.stringify(args));
  let sent = null;
  let calls = 0;
  const request = body => new Request('http://localhost/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    global.fetch = async (_, options) => { calls++; sent = JSON.parse(options.body); return { ok: true, status: 200 }; };
    assert.equal((await POST(request({ email: 'invalid' }))).status, 400);
    assert.equal(calls, 0);
    const valid = { email: 'parent@example.test', parentName: 'Example Parent', notes: 'Example enquiry', source: 'test' };
    assert.equal((await POST(request(valid))).status, 200);
    assert.equal(sent.parentName, valid.parentName);
    assert.equal(sent.notes, valid.notes);
    assert.equal(sent.requestedUpdates, false);
    global.fetch = async () => ({ ok: false, status: 503 });
    assert.equal((await POST(request(valid))).status, 502);
    global.fetch = async () => { throw new Error('Simulated upstream failure'); };
    assert.equal((await POST(request(valid))).status, 502);
    assert(!logs.join('').includes(valid.email));
    assert(!logs.join('').includes(valid.parentName));
    assert.equal((await POST(new Request('http://localhost/api/leads', { method: 'POST', body: '{' }))).status, 400);
    console.log('PASS: enquiry validation, honest delivery failures, preserved parent/notes fields and no contact-data logging. All forwarding was mocked.');
  } finally { global.fetch = originalFetch; console.error = originalError; }
}

function checkConsent() {
  const { CONSENT_KEY, trackEvent } = load('lib/analytics.ts');
  const events = [];
  let data = {};
  global.window = { gtag: (...args) => events.push(args) };
  global.localStorage = { getItem: key => data[key] || null };
  try {
    trackEvent('practice_complete', { subject: 'Maths', question_count: 10 });
    assert.equal(events.length, 0);
    data[CONSENT_KEY] = JSON.stringify({ value: 'granted', expiresAt: Date.now() + 10000 });
    trackEvent('practice_complete', { subject: 'Maths', question_count: 10, email: 'parent@example.test', answer: 'private', score: 8 });
    assert.deepEqual(events[0], ['event', 'practice_complete', { subject: 'Maths', question_count: 10 }]);
    window['ga-disable-G-828TTSWVN8'] = true;
    trackEvent('practice_complete', { subject: 'Maths' });
    assert.equal(events.length, 1);
    window['ga-disable-G-828TTSWVN8'] = false;
    data[CONSENT_KEY] = JSON.stringify({ value: 'granted', expiresAt: Date.now() - 10000 });
    trackEvent('practice_complete', { subject: 'Maths' });
    assert.equal(events.length, 1);
    console.log('PASS: no analytics without valid consent, withdrawal/expiry honoured, and non-allowlisted personal/performance fields discarded.');
  } finally { delete global.window; delete global.localStorage; }
}

checkLeadDelivery().then(checkConsent).catch(error => { console.error(error); process.exitCode = 1; });
