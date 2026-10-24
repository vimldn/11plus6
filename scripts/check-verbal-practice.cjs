const assert=require('node:assert/strict');const {load}=require('./load-ts.cjs');
const {verbalPool,verbalTopics,verbalLabels,createVerbalPractice}=load('data/verbalPractice.ts');
const {mistakesFrom,freshFollowUp,supportedMissedTopics}=load('lib/mistakePractice.ts');
const {isQuestionQuarantined}=load('data/questionQuarantine.ts');
const all=verbalTopics.flatMap(verbalPool);assert.equal(all.length,234);assert.equal(new Set(all.map(q=>q.id)).size,234);assert.equal(new Set(all.map(q=>q.text)).size,234);
for(const q of all){assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(x=>x===q.correctAnswer).length,1);assert(q.explanation.length>30);
 if(q.id.startsWith('vrchecked-code-')){const m=/BAG becomes ([A-Z]+)\. What does ([A-Z]+) become/.exec(q.text);assert(m);const delta=(m[1].charCodeAt(0)-'B'.charCodeAt(0)+26)%26;const shift=w=>[...w].map(c=>String.fromCharCode(65+(c.charCodeAt(0)-65+delta)%26)).join('');assert.equal(shift('BAG'),m[1]);assert.equal(q.correctAnswer,shift(m[2]));for(let i=0;i<3;i++)assert(q.explanation.includes(m[2][i]+' → '+q.correctAnswer[i]));}
 if(q.id.startsWith('vrchecked-number-')){const a=q.text.match(/sequence: (.*), \?/)[1].split(', ').map(Number);const gaps=a.slice(1).map((x,i)=>x-a[i]);assert(gaps.every(g=>g===gaps[0]));assert.equal(Number(q.correctAnswer),a[3]+gaps[0]);assert(q.explanation.includes(`${a[3]} + ${gaps[0]} = ${q.correctAnswer}`));}
 if(q.id.startsWith('vrchecked-letter-')){const a=q.text.match(/wrapping: (.*), \?/)[1].split(', ').map(x=>x.charCodeAt(0));const d=a[1]-a[0];assert(a.every((x,i)=>x===a[0]+i*d));assert.equal(q.correctAnswer.charCodeAt(0),a[3]+d);}
}
// Exact semantic keys reviewed against the requested relationships/categories, not string similarity.
const analogy=['puppy','slow','foot','plane','cycling','bird','rocks','selfish','sheep','stars','head','maps'];assert.deepEqual(verbalPool('analogies').map(q=>q.correctAnswer),analogy);
const classification=['spoon','winter','Friday','yellow','kilogram','ladder','robin','buttercup','cotton','pillow','mitten','June'];assert.deepEqual(verbalPool('classifications').map(q=>q.correctAnswer),classification);
for(let i=0;i<100;i++){const mixed=createVerbalPractice();assert.equal(mixed.length,12);for(const t of verbalTopics){assert.equal(mixed.filter(q=>q.topic===verbalLabels[t]).length,3);const qs=createVerbalPractice(t);assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);assert(qs.every(q=>q.topic===verbalLabels[t]));}}
assert.equal(createVerbalPractice('unsupported').length,0);
for(const t of verbalTopics){const qs=createVerbalPractice(t);const r={subject:'Verbal Reasoning',quizType:'multiple-choice',questions:qs,userAnswers:{}};assert.equal(supportedMissedTopics(r).length,1);const follow=freshFollowUp(r);assert.equal(follow.length,Math.min(3,verbalPool(t).length-10));assert(follow.every(q=>q.topic===verbalLabels[t]&&!qs.some(old=>old.id===q.id)));assert.equal(freshFollowUp({...r,userAnswers:Object.fromEntries(qs.map(q=>[q.id,q.correctAnswer]))}).length,0);assert.equal(mistakesFrom(r).length,10);}
for(const n of [55,56,57,59,60,61,63,76,78])for(const format of ['mc','tf','fitb'])assert(isQuestionQuarantined(`vr-${format}-${String(n).padStart(3,'0')}`));
console.log('PASS: 234 original/owned questions, independent120 code and90 sequence keys,24 reviewed semantic keys;400 focused and100 mixed sets; fresh missed-topic exclusions/empty guard;9 defective families quarantined across3 formats');
