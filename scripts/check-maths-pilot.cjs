const assert = require('node:assert/strict');
const {load} = require('./load-ts.cjs');
const {mathsMC} = load('data/questionBanks/maths.mc.ts');
const {mathsPilotGroups, createMathsPilot, mathsPilotId} = load('data/mathsPilot.ts');
const {numericAnswersEqual, parseNumeric} = load('lib/numericAnswer.ts');
const {isAnswerCorrect} = load('lib/answerMarking.ts');
const {mathsMarkingFor} = load('data/mathsMarking.ts');
const {isQuestionQuarantined} = load('data/questionQuarantine.ts');
// Independent calculations from each selected stem, not values copied from answer keys.
const checks = {
1:456+789,2:1002-347,3:34*25,4:693/9,5:19*19,6:1728/12,7:504*7,8:10000-3746,9:125*8,10:3600/15,11:847+364,12:5000-1387,13:48*12,14:952/8,15:2345+4678,
16:'14/15',17:'7/12',19:(3/4)/(3/8),20:'2/3',21:1.75+2.5,22:45/60,24:96/8*5,25:(7/3)*3,26:1,27:200/5*4,28:3.5-1.75,29:Math.max(.7,.75,2/3,.8),30:81/9*5,
31:200*15/100,32:80*(100-35)/100,33:36/144*100,34:(65-50)/50*100,35:400*7.5/100,36:32/0.8,37:80/8,39:45/180*100,40:(12000-9000)/12000*100,41:160*35/100,42:4000*105/100,43:400*15/100*15/100,45:48/1.2,
46:(345+267)/100,47:(730-485)/100,48:6*7/100,49:48/6,50:Math.round(6.748*100)/100,51:125/1000,
61:'£45 and £75',62:320/4,63:35/5*8,64:3*50000/100000,65:'140 and 40',67:500/(3+2)*3,68:28/(3+4)*3,70:'3:4',71:40/(2+3+5)*2,72:300/4*6,73:'£60 and £140',234:20/5*3,
76:(22-7)/3,77:(17+3)/5,78:4*5-2*3,79:'6x + 15',82:14/2-3,83:4**2-2,84:(2+5)/(4-3),85:2+9*3,86:(9+3)/(6-2),87:(10+4)/2,88:'n²',90:(12-2*3)/3,
91:2*(9+4),92:10*6/2,93:22/7*7**2,94:8*5,95:(36/4)**2,96:22/7*14,97:(6+10)/2*4,98:84/12,99:5*12/2,103:Math.sqrt(144)*4,104:15*8,106:5*4*3,
108:40*30*20/1000,110:192/(8*6),111:10*5*4,112:Math.cbrt(27),151:180/3,152:15*40/60,153:210/70,154:'2 h 30 min',158:20-3*4.75,159:3.5*1000,160:2.5*100,161:2.25*1000,
126:'1,2,3,4,6,9,12,18,36',127:24,128:12,129:59,130:'2² × 3 × 5',131:4**3,132:Math.sqrt(169),133:2**5,134:64,135:2+3+5+7+11,136:24,137:'2³ × 3²',138:4,139:24,140:3**4,196:-8+3,200:6-(-4),
165:(4+7+9+5+10)/5,166:5,167:4,168:23-15,169:(60+72+68+80+75+65)/6,170:(14+15)/2,171:5*12-(10+14+11+13),175:65/100,
};
// Independent supporting checks for symbolic, factor, sequence and fraction results.
assert.equal(3*3+5*1,14); assert.equal(6*4,24); assert.equal(5*4-6*1,14); // 14/24 = 7/12
assert.equal(3*2,6); assert.equal(3*5,15); // expansion
assert.deepEqual([1,2,3,4].map(n=>n*n),[1,4,9,16]);
assert.deepEqual(Array.from({length:36},(_,i)=>i+1).filter(n=>36%n===0),[1,2,3,4,6,9,12,18,36]);
const prime=n=>n>=2&&!Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).some(d=>n%d===0);
assert.equal(prime(59),true); assert.deepEqual([51,57,63].map(prime),[false,false,false]);
assert.deepEqual(Array.from({length:19},(_,i)=>i+21).filter(prime),[23,29,31,37]);
assert.equal(2**2*3*5,60); assert.equal(2**3*3**2,72); assert.equal(8**2,4**3);
assert.equal([8,12].every(n=>24%n===0),true);assert.equal([6,8,12].every(n=>24%n===0),true);
assert.equal(120/8*3,45);assert.equal(120/8*5,75);assert.equal(180/9*7,140);assert.equal(180/9*2,40);
assert.equal(200/10*3,60);assert.equal(200/10*7,140);assert.equal(36/12,3);assert.equal(48/12,4);
assert.equal((12*60+15)-(9*60+45),150);
const ids=mathsPilotGroups.flatMap(g=>g.ids);
assert.equal(ids.length,120);assert.equal(new Set(ids).size,120);assert.equal(Object.keys(checks).length,120);
const any={kind:'numeric',unitAliases:['£','%','cm²','cm','g','km','ml','h'],unitOptional:true};
for(const id of ids){
 const q=mathsMC.find(q=>q.id===mathsPilotId(id));assert(q);assert(!isQuestionQuarantined(q.id));assert(q.explanation.trim());
 const value=String(checks[id]);
 assert(numericAnswersEqual(value,q.correctAnswer,any)||value===q.correctAnswer,`${q.id}: independently calculated ${value} vs ${q.correctAnswer}`);
 assert.equal(q.options.filter(o=>o===q.correctAnswer).length,1,q.id);
 // Scalar alternatives must not include another equivalent correct answer.
 if(parseNumeric(value)) assert.equal(q.options.filter(o=>numericAnswersEqual(value,o,any)).length,1,q.id);
}
for(let seed=1;seed<=100;seed++){
 let n=seed;const random=()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);
 const qs=createMathsPilot(random);assert.equal(qs.length,30);assert.equal(new Set(qs.map(q=>q.id)).size,30);
 for(const g of mathsPilotGroups)assert.equal(qs.filter(q=>g.ids.map(mathsPilotId).includes(q.id)).length,g.count);
}
const numeric={kind:'numeric'};
for(const [a,b] of [['4670','4,670'],['4.25','4 1/4'],['17/4','4 1/4'],['2/4','.5'],['-1 1/2','-1.5'],['−5','-5']])assert(numericAnswersEqual(a,b,numeric),a);
for(const a of ['1/0','NaN','Infinity','0.5 please','not 0.5','0,5','1e-1','2+2','0.50000000000000001','1/2/3','1/2 cm','1.2.3',''])assert(!numericAnswersEqual(a,'.5',numeric),a);
assert(!numericAnswersEqual('0.333333333333','1/3',numeric));
assert(!numericAnswersEqual('0.125','1/8',{kind:'numeric',form:'fraction'}));
assert(numericAnswersEqual('2/16','1/8',{kind:'numeric',form:'fraction'}));
assert(!numericAnswersEqual('2/16','1/8',{kind:'numeric',form:'fraction',simplest:true}));
assert(!numericAnswersEqual('27/4','6.75',{kind:'numeric',form:'decimal'}));
assert(numericAnswersEqual('52.00','£52',{kind:'numeric',unitAliases:['£'],unitOptional:true}));
assert(!numericAnswersEqual('$52','£52',{kind:'numeric',unitAliases:['£'],unitOptional:true}));
assert(!numericAnswersEqual('1500m','1.5 km',{kind:'numeric',unitAliases:['km'],unitOptional:true}));
assert(!numericAnswersEqual('1.5','1.5 km',{kind:'numeric',unitAliases:['km']}));
assert(!numericAnswersEqual('25','25 cm²',{kind:'numeric',unitAliases:['cm²']}));
assert(!numericAnswersEqual('25 cm','25 cm²',{kind:'numeric',unitAliases:['cm²']}));
assert(!numericAnswersEqual('0.25','25%',{kind:'numeric',unitAliases:['%'],unitOptional:true}));
assert(!isAnswerCorrect('2/4','1/2','multiple-choice',numeric));
assert(!isAnswerCorrect('0.5','1/2','fill-in-the-blank')); // no opt-in
assert(isAnswerCorrect('4.25','4 1/4','fill-in-the-blank',mathsMarkingFor('math-fitb-021')));
assert(!mathsMarkingFor('eng-fitb-021'));
console.log('PASS: 120 independently checked pilot keys; 100 balanced 30-question samples; numeric/format/unit regression checks.');

module.exports={checks};
const fs=require('fs'),crypto=require('crypto');
const record=JSON.parse(fs.readFileSync(require('path').join(__dirname,'../docs/paper-audit/maths-pilot-reviewed-2026-10-20.json'),'utf8'));
assert.equal(record.questions.length,120);
for(const row of record.questions){const q=mathsMC.find(q=>q.id===row.id);assert.equal(crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex'),row.questionSha256,`Re-review changed pilot question ${row.id}`);}
for(const q of mathsMC.map(load('data/mathsRepairs.ts').applyMathsRepair)){
 const key=parseNumeric(q.correctAnswer); if(!key)continue;
 const equivalents=q.options.filter(o=>{const p=parseNumeric(o);return p&&p.n*key.d===key.n*p.d;});
 if(equivalents.length>1)assert(isQuestionQuarantined(q.id),`Multiple equivalent choices: ${q.id}`);
}
// Extra scalar free-text keys outside the MC pilot selection.
const extra={18:'.5',52:'1.44',53:'40',55:'9',56:'2.8',57:'0.085',58:'42',59:'4670',60:'0.35'};
const {mathsFITB}=load('data/questionBanks/maths.fitb.ts');
for(const [id,value] of Object.entries(extra)) {const q=mathsFITB.find(q=>q.id===`math-fitb-${id.padStart(3,'0')}`);assert(isAnswerCorrect(value,q.correctAnswer,'fill-in-the-blank',mathsMarkingFor(q.id)),q.id);}
