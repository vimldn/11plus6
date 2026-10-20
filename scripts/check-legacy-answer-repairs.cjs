const assert=require('node:assert/strict');
const {load}=require('./load-ts.cjs');
const {questionBank,getRandomQuestions}=load('data/questionBank.ts');
const {Subject}=load('types.ts');
const {parseNumeric,numericAnswersEqual}=load('lib/numericAnswer.ts');
const {isAnswerCorrect}=load('lib/answerMarking.ts');
const {isQuestionQuarantined}=load('data/questionQuarantine.ts');
const prime=n=>n>1&&!Array.from({length:n-2},(_,i)=>i+2).some(d=>n%d===0);
const spinner=Array.from({length:8},(_,i)=>i+1).filter(prime).length/8;
const dice=Array.from({length:36},(_,i)=>[Math.floor(i/6)+1,i%6+1]).filter(([a,b])=>a+b===7).length;
const expected={'018':String((2/3)*(3/4)),'080':String(Array.from({length:81},(_,i)=>i+1).find(n=>n*n===81)),'172':'4/12','177':String(spinner),'217':String(spinner),'224':String(2*3/(5*4)),'240':`${dice}/36`,'247':String(spinner)};
const records=[];
for(const [id,value] of Object.entries(expected)){
 for(const [format,prefix] of [['multiple-choice','mc'],['true-false','tf'],['fill-in-the-blank','fitb']]){
  const q=questionBank[Subject.Maths][format].find(q=>q.id===`math-${prefix}-${id}`);assert(q);assert(!isQuestionQuarantined(q.id));
  if(prefix==='tf'){
   const claim=q.text.match(/The answer is (.+)\.$/)[1];
   assert(!numericAnswersEqual(claim,value,{kind:'numeric'}));assert.equal(q.correctAnswer,'False');
  }else{
   assert(numericAnswersEqual(value,q.correctAnswer,{kind:'numeric'}),q.id);
   if(prefix==='fitb')assert(isAnswerCorrect(value,q.correctAnswer,format,q.marking));
   else {for(let i=0;i<q.options.length;i++)for(let j=i+1;j<q.options.length;j++){const a=parseNumeric(q.options[i]),b=parseNumeric(q.options[j]);assert(a&&b);assert(a.n*b.d!==b.n*a.d,`${q.id}: equivalent distractors`);}assert(q.options.includes(q.correctAnswer));}
  }
  records.push({id:q.id,questionSha256:require('crypto').createHash('sha256').update(JSON.stringify(q)).digest('hex')});
 }
}
for(const format of ['multiple-choice','true-false','fill-in-the-blank']) for(const difficulty of ['standard','challenging','exam-ready']){
 const qs=getRandomQuestions('Maths',format,1000,undefined,difficulty);
 const stems=qs.map(q=>q.text.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim());assert.equal(stems.length,new Set(stems).size);
 const duplicates=qs.filter(q=>/math-(mc|tf|fitb)-(177|217|247)$/.test(q.id));assert(duplicates.length<=1);
}
console.log('PASS: 8 repaired families / 24 formats; independently calculated keys, pairwise unique numeric options, equivalent free-entry marking, exact-stem deduplication across difficulties.');
module.exports={records};
