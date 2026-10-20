const fs=require('fs'),path=require('path'),Module=require('module');const root=path.resolve(__dirname,'..'),ts=require(root+'/node_modules/typescript');const cache=new Map();function load(rel){let f=path.resolve(root,rel);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f+='/index.ts';if(!fs.existsSync(f)){if(fs.existsSync(f+'.ts'))f+='.ts';else f+='/index.ts'}if(cache.has(f))return cache.get(f).exports;let m=new Module(f);m.paths=Module._nodeModulePaths(path.dirname(f));cache.set(f,m);m.require=r=>r.startsWith('.')?load(path.relative(root,path.resolve(path.dirname(f),r))):require(r);m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);return m.exports;}
const assert=require('node:assert/strict');
const {isAnswerCorrect}=load('lib/answerMarking.ts');
assert.equal(isAnswerCorrect('not kind','kind','fill-in-the-blank'),false);
assert.equal(isAnswerCorrect(' KIND ','kind','fill-in-the-blank'),true);
assert.equal(isAnswerCorrect('','kind','fill-in-the-blank'),false);
assert.equal(isAnswerCorrect(undefined,'True','true-false'),false);
assert.equal(isAnswerCorrect('A, B,C','A,B,C','ordering'),true);
assert.equal(isAnswerCorrect('A,C,B','A,B,C','ordering'),false);
const {validateGeneratedQuestions:validate}=load('lib/questionValidation.ts');
const q={id:'a',text:'2 + 2?',options:['2','3','4','5'],correctAnswer:'4',explanation:'2 + 2 = 4.',topic:'addition'};
assert.equal(validate([q],1,'multiple-choice').length,1);
assert.throws(()=>validate([q],2,'multiple-choice'));
assert.throws(()=>validate([{...q,correctAnswer:'6'}],1,'multiple-choice'));
assert.throws(()=>validate([q,q],2,'multiple-choice'));
assert.throws(()=>validate([{...q,options:['4','4','3','2']}],1,'multiple-choice'));
assert.throws(()=>validate([{...q,explanation:''}],1,'multiple-choice'));
const {getRandomQuestions}=load('data/questionBank.ts');
const {isQuestionQuarantined}=load('data/questionQuarantine.ts');
for(const subject of ['Maths','English','Verbal Reasoning','Non-Verbal Reasoning'])for(const type of ['multiple-choice','true-false','fill-in-the-blank'])for(const difficulty of ['standard','challenging','exam-ready']){
const qs=getRandomQuestions(subject,type,1000,undefined,difficulty);assert(qs.every(q=>!isQuestionQuarantined(q.id)));assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);
}
console.log('PASS: conservative marking, equivalent whitespace/case, ordering, malformed AI rejection, quarantine across all subjects/formats/difficulties.');
