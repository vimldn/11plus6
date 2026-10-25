const assert=require('node:assert/strict');const {load}=require('./load-ts.cjs');
const {readActivePractice,writeActivePractice,clearActivePractice,activeSeconds,scoreAnswers}=load('lib/activePractice.ts');
const {createVisualPractice}=load('data/visualPractice.ts');
let raw=null;const storage={getItem:()=>raw,setItem:(_,s)=>raw=s,removeItem:()=>raw=null};
const questions=createVisualPractice('matrices',()=>.4),now=Date.now(),route='test-route';
const draft={version:1,route,savedAt:now,startedAt:now-60000,seconds:60,questions,index:3,answers:{[questions[0].id]:questions[0].correctAnswer},notice:'Original checked practice'};
assert(writeActivePractice(storage,draft));assert.deepEqual(readActivePractice(storage,route,now),draft);assert.equal(activeSeconds(draft,true,now+90000),150);assert.equal(activeSeconds(draft,false,now+90000),60);assert.equal(readActivePractice(storage,'other-route',now),null);assert.equal(readActivePractice(storage,route,now+8*86400000),null);assert.equal(scoreAnswers(questions,draft.answers),1);
const revised={...draft.answers,[questions[0].id]:questions[0].options.find(x=>x!==questions[0].correctAnswer)};assert.equal(scoreAnswers(questions,revised),0);assert.equal(scoreAnswers(questions,Object.fromEntries(questions.map(q=>[q.id,q.correctAnswer]))),8);
for(const mutate of [d=>d.questions[0].visual.pattern.cells[0].dot=[100,0],d=>d.questions[0].options=['A','A','B','C'],d=>d.index=99,d=>d.answers.noquestion='A',d=>d.startedAt=now+1,d=>d.seconds=-1,d=>d.questions[1].id=d.questions[0].id]){const d=JSON.parse(JSON.stringify(draft));mutate(d);writeActivePractice(storage,d);assert.equal(readActivePractice(storage,route,now),null);}
raw='not-json';assert.equal(readActivePractice(storage,route,now),null);clearActivePractice(storage);assert.equal(raw,null);assert.equal(writeActivePractice({setItem:()=>{throw Error('quota')}},draft),false);
console.log('PASS checked-set save/resume: complete SVG state, route isolation, seven-day expiry, monotonic elapsed exam time, untimed pause, score recalculation after revision, malformed/corrupt/quota handling.');
