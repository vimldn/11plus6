const assert = require('node:assert/strict');
const { load } = require('./load-ts.cjs');
const { freshTopics, freshMathsPool, createFreshMaths } = load('data/freshMaths.ts');
const { validateGeneratedQuestions } = load('lib/questionValidation.ts');
let total = 0;
for (const topic of freshTopics) {
  const pool = freshMathsPool(topic);
  validateGeneratedQuestions(pool, pool.length, 'multiple-choice');
  for (const q of pool) {
    let m, expected;
    if ((m = /^Calculate (\d+) \+ (\d+) × (\d+)\.$/.exec(q.text))) {
      // Independent repeated addition instead of production multiplication formula.
      expected = Number(m[1]); for (let i = 0; i < Number(m[3]); i++) expected += Number(m[2]);
    } else if ((m = /^What is (\d+)\/(\d+) of (\d+)\?$/.exec(q.text))) {
      expected = Number(m[3]) * Number(m[1]) / Number(m[2]);
    } else if ((m = /^What is (\d+)% of (\d+)\?$/.exec(q.text))) {
      expected = Number(m[2]) * Number(m[1]) / 100;
    } else throw new Error('Unrecognised stem ' + q.text);
    assert.equal(Number(q.correctAnswer), expected, q.id);
    assert.equal(q.options.filter(x => Number(x) === expected).length, 1, q.id);
    const steps = [...q.explanation.matchAll(/(\d+) ([+×÷]) (\d+) = (\d+)/g)];
    assert.equal(steps.length, 2, q.id);
    for (const [,a,op,b,result] of steps) assert.equal(Number(result), op === '+' ? Number(a)+Number(b) : op === '×' ? Number(a)*Number(b) : Number(a)/Number(b), q.id);
    assert.equal(Number(steps[1][4]), expected, q.id);
    total++;
  }
}
let seed = 1;
const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
for (let run = 0; run < 100; run++) {
  const qs = createFreshMaths(random);
  validateGeneratedQuestions(qs, 15, 'multiple-choice');
  assert.deepEqual(Object.values(qs.reduce((a,q) => ({...a,[q.topic]:(a[q.topic]||0)+1}),{})), [5,5,5]);
}
const base = {id:'test',text:'Test',topic:'Test',correctAnswer:'1/2',explanation:'Test',options:['1/2','0.5','2','3']};
assert.throws(() => validateGeneratedQuestions([base],1,'multiple-choice'), /Equivalent/);
assert.throws(() => validateGeneratedQuestions([{...base,correctAnswer:'1000',options:['1000','1,000','2','3']}],1,'multiple-choice'), /Equivalent/);
assert.doesNotThrow(() => validateGeneratedQuestions([{...base,options:['1/2','0.6','2','3']}],1,'multiple-choice'));
console.log(`PASS: ${total} variants independently calculated, explanation steps checked; 100 balanced sets; equivalent-option rejection.`);
