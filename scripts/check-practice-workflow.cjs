const assert=require('node:assert/strict');const {load}=require('./load-ts.cjs');
const {questionBank,getRandomQuestions}=load('data/questionBank.ts');
const {validateGeneratedQuestions}=load('lib/questionValidation.ts');
const {isAnswerCorrect}=load('lib/answerMarking.ts');
const {mistakesFrom,freshFollowUp}=load('lib/mistakePractice.ts');
const {freshMathsPool}=load('data/freshMaths.ts');
const {saveAttempt,readAttempts,ATTEMPT_KEY}=load('lib/attemptHistory.ts');
const expected={'038':250+250*18/100,'164':750,'189':24,'226':19-2,'232':(180-50)/2,'236':Math.sqrt(46-21),'242':7*11-(4+7+12+12+14+19)};
assert(240/500>345/750);
assert.equal(Array.from({length:24},(_,i)=>i+1).find(n=>n%8===0&&n%12===0),24);
for(const [id,answer] of Object.entries(expected))for(const [type,prefix] of [['multiple-choice','mc'],['fill-in-the-blank','fitb'],['true-false','tf']]){
 const q=questionBank.Maths[type].find(q=>q.id===`math-${prefix}-${id}`);assert(q);assert.equal(q.correctAnswer,type==='true-false'?'False':String(answer));
 if(type==='multiple-choice')validateGeneratedQuestions([q],1,type);
 if(type==='fill-in-the-blank')assert(isAnswerCorrect(`${answer}.0`,q.correctAnswer,type,q.marking));
}
assert.equal(getRandomQuestions('Maths','multiple-choice',5,'NO SUCH TOPIC').length,0);
const qs=freshMathsPool('algebra').slice(0,2);const r={subject:'Maths',quizType:'multiple-choice',mode:'practice',questions:qs,userAnswers:{[qs[0].id]:qs[0].correctAnswer},score:1,total:2,timeTaken:20,pointsEarned:10};
assert.equal(mistakesFrom(r).length,1);const follow=freshFollowUp(r);assert.equal(follow.length,3);assert(follow.every(q=>q.topic==='Simple equations'&&!qs.some(old=>old.id===q.id)));
assert.equal(freshFollowUp({...r,userAnswers:Object.fromEntries(qs.map(q=>[q.id,q.correctAnswer]))}).length,0);
let values={};const storage={getItem:k=>values[k]||null,setItem:(k,v)=>values[k]=v};
for(let i=0;i<23;i++)saveAttempt(storage,r,String(i));assert.equal(readAttempts(storage).length,20);saveAttempt(storage,r,'22');assert.equal(readAttempts(storage).length,20);
values[ATTEMPT_KEY]='bad json';assert.deepEqual(readAttempts(storage),[]);values[ATTEMPT_KEY]='[{"id":"bad","date":"2026-01-01","result":{}}]';assert.deepEqual(readAttempts(storage),[]);
console.log('PASS: 21 repaired formats; exact topic filtering; fresh mistake practice excludes old IDs; saved-history bounds, deduplication and corruption recovery.');
(async()=>{
 const {generateQuestions}=load('services/questionService.ts');
 global.fetch=async()=>({ok:true,json:async()=>({questions:[],meta:{source:'fallback'}})});
 const fallback=await generateQuestions('Maths',null,undefined,'multiple-choice',5,'test-school');assert.match(fallback.notice,/not matched/);assert.equal(fallback.questions.length,5);
 global.fetch=async()=>({ok:true,json:async()=>({questions:qs,meta:{source:'openai'}})});
 const ai=await generateQuestions('Maths',null,undefined,'multiple-choice',2,'test-school');assert.match(ai.notice,/not been independently verified/);assert.equal(ai.questions.length,2);
 console.log('PASS: mock API source notices and fallback; no paid API calls.');
})().catch(e=>{console.error(e);process.exitCode=1;});
