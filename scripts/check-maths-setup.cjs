const assert = require('node:assert/strict');
const { load } = require('./load-ts.cjs');
const { mathsPracticeSession, practiceSessionHref, PRACTICE_SESSIONS } = load('lib/practiceSessionLinks.ts');
const { freshTopics, createFreshMaths } = load('data/freshMaths.ts');
for (const topic of freshTopics) {
  const config = mathsPracticeSession(topic);
  const actual = createFreshMaths(() => 0.4, [topic], 10);
  assert.equal(config.questions, actual.length);
  assert.equal(config.questions, 10);
  assert.equal(config.minutes, 15);
  for (const mode of ['practice', 'exam']) {
    const url = new URL(practiceSessionHref('maths', mode, 20, 25, topic), 'https://example.com');
    assert.equal(url.searchParams.get('topic'), topic);
    assert.equal(url.searchParams.get('mode'), mode);
    assert.equal(url.searchParams.get('paper'), 'maths-generated');
  }
}
for (const invalid of [null, '', 'constructor', '__proto__', 'fractions&mode=exam', 'unsupported']) {
  const config = mathsPracticeSession(invalid);
  assert.equal(config.questions, createFreshMaths(() => 0.4).length);
  assert.equal(config.minutes, 20);
  assert.equal(config.topic, '');
  assert.equal(practiceSessionHref('maths','practice',20,25,invalid), '/quiz?paper=maths-generated&mode=practice');
}
assert.equal(practiceSessionHref('english','exam',30,60,'algebra'), '/quiz?subject=english&quizType=multiple-choice&mode=exam&count=30&duration=60');
assert.equal(practiceSessionHref('verbal','practice',20,25,'algebra'), '/quiz?paper=verbal-reviewed&mode=practice');
assert.equal(practiceSessionHref('nonverbal','exam',20,25,'algebra'), '/quiz?paper=visual-reviewed&mode=exam');
assert.equal(PRACTICE_SESSIONS.maths.questions,16);
console.log('PASS eight supported topic routes, generated counts, timed/untimed modes, invalid input fallbacks and other subjects.');
