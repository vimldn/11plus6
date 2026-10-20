const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {load}=require('./load-ts.cjs');
const {questionBank}=load('data/questionBank.ts');const {Subject}=load('types.ts');
const {numericAnswersEqual}=load('lib/numericAnswer.ts');const {isAnswerCorrect}=load('lib/answerMarking.ts');
const calculations={'054':Math.max(.7,.07,7/10,70/100),'066':4*6/8,'069':240/8*5,'074':3*8/4,'100':(6+2)*(4+2),'105':6*4+3*2,'125':45/60*360,'155':80*1.5+100*1.5,'187':(8-3-2)/8,'191':54/3*2,'194':1600/400*52,'199':4-(-9),'245':360/60};
const records=[];
for(const [id,value] of Object.entries(calculations))for(const [format,prefix] of [['multiple-choice','mc'],['true-false','tf'],['fill-in-the-blank','fitb']]){
 const q=questionBank[Subject.Maths][format].find(q=>q.id===`math-${prefix}-${id}`);assert(q);
 if(prefix==='tf'){const claim=q.text.match(/The answer is (.+)\.$/)[1];assert(!numericAnswersEqual(claim,String(value),{kind:'numeric'}));assert.equal(q.correctAnswer,'False');}
 else{
  assert(numericAnswersEqual(q.correctAnswer,String(value),{kind:'numeric'}),q.id);
  if(prefix==='mc'){assert(q.options.includes(q.correctAnswer));for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)assert(!numericAnswersEqual(q.options[a],q.options[b],{kind:'numeric'}),q.id);}
  else{assert(isAnswerCorrect(String(value),q.correctAnswer,format,q.marking));for(const unit of q.marking?.unitAliases||[])assert(isAnswerCorrect(`${value} ${unit}`,q.correctAnswer,format,q.marking),`${q.id}:${unit}`);assert(!isAnswerCorrect(String(value+1),q.correctAnswer,format,q.marking));}
 }
 records.push({id:q.id,independentlyCalculatedAnswer:String(value),questionSha256:crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex')});
}
const get=id=>questionBank[Subject.Maths]['fill-in-the-blank'].find(q=>q.id===`math-fitb-${id}`);
for(const id of ['054','100','105','191','194','199']){const q=get(id);assert(!isAnswerCorrect(q.correctAnswer+' bananas',q.correctAnswer,'fill-in-the-blank',q.marking));}
assert(!isAnswerCorrect('7/10',get('054').correctAnswer,'fill-in-the-blank',get('054').marking));
assert(!isAnswerCorrect('-13',get('199').correctAnswer,'fill-in-the-blank',get('199').marking));
assert(!isAnswerCorrect('30 cm',get('105').correctAnswer,'fill-in-the-blank',get('105').marking));
assert(!isAnswerCorrect('90',get('125').correctAnswer,'fill-in-the-blank',get('125').marking));
const recordPath='docs/paper-audit/wording-reviewed-2026-10-20.json';
if(process.argv.includes('--record'))fs.writeFileSync(recordPath,JSON.stringify({date:'2026-10-20',scope:'13 wording repairs, 39 formats; not the complete legacy bank',questions:records},null,2)+'\n');
else assert.deepEqual(JSON.parse(fs.readFileSync(recordPath)).questions,records,'Changed reviewed question requires independent re-review');
console.log('PASS: 13 independent calculations, 39 repaired forms, numeric unit aliases, decimal restriction, sign and dimension rejection, review fingerprints.');
