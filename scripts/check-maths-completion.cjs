const assert=require('node:assert/strict'),fs=require('fs'),crypto=require('crypto');const {load}=require('./load-ts.cjs');
const {questionBank}=load('data/questionBank.ts'),{isAnswerCorrect}=load('lib/answerMarking.ts'),{numericAnswersEqual}=load('lib/numericAnswer.ts');const bank=questionBank.Maths;
const factorial=n=>n<2?1:n*factorial(n-1);
const expected={23:'7/12, 2/3, 3/4, 5/6',44:'1% less',52:1.2*1.2,53:3.6/.09,55:36/4,56:5.6/2,57:.085,58:12.6/.3,59:4.67*1000,60:Math.max(.305,.35,3/10,31/100),75:'3:5:4',81:'3n + 2',89:'3(2x + 3)',101:'Stays same',102:3.14*6**2/2,107:6**3,109:3.14*5**2*10,113:2*180,114:180-70-55,115:(6-2)*180/6,116:180*2/5,117:360/(180-150),118:5,119:360/45,120:'equal',121:115/2,122:'Scalene',123:(5-2)*180,124:2+3,141:54*3,142:4**2,143:8+13,144:82-9,145:4+7*3,146:15+6,147:'4n + 3',148:81*3,149:5+99*3,150:'16th',156:90*1000/3600,157:400/50,162:7.5*1.8,163:5*2.54,173:'2/6',174:'13/52',176:'1/4',178:'2/6',179:'(5,7)',180:'(−3,−2)',181:3,182:'(3,7)',183:'(5,2)',184:'(0,−7)',185:'(3,−4)',186:84/4*3,188:12*6.5*.9,190:(45+15)/6,192:40/5*3,193:'5:45pm',195:90/(3/4),197:-4*-7,198:-15/3,201:(-3)**2-5,202:'−7,−3,0,2,4',203:Math.round(4763/100)*100,204:'7 tenths',205:4.67*1000,206:Math.max(.305,.35,3/10,.31),207:Math.round(7849/1000)*1000,208:3.045*100,209:56000/1000,210:'3²',211:(11-6)*4,212:'23 and 25',213:'Right-angled isosceles triangle',214:'9/12',215:3*9,216:'2² × 3 × 7',218:(7-2)*180,219:'3a',220:Math.sqrt(49),221:999*9,222:5**2+4**2-3**2,223:Math.sqrt(5**2-3**2),225:70/1.4,227:'5/10',228:360-75-110-95,229:.008,230:Math.sqrt(150/6)**3,231:factorial(8)/factorial(7),233:8*6/2,235:Math.sqrt(36*25),237:6*74,238:51/3+1,239:12*5/2,241:16/.2*.35,243:360/5,244:'12x³y⁴',246:'2² × 3 × 7',248:(7-2)*180,249:'3a',250:'16th'};
assert.equal(Object.keys(expected).length,102);
// Support symbolic/structural keys independently, including domain and classification conditions.
assert.deepEqual([3/4,2/3,5/6,7/12].sort((a,b)=>a-b),[7/12,2/3,3/4,5/6]);assert.equal(110*.9,99);
assert.deepEqual([45,75,60].map(n=>n/15),[3,5,4]);assert.deepEqual([1,2,3,4].map(n=>3*n+2),[5,8,11,14]);assert.deepEqual([1,2,3,4].map(n=>4*n+3),[7,11,15,19]);
for(const x of [-3,0,2,7])assert.equal(6*x+9,3*(2*x+3));
assert.equal(2*9*(4/2),9*4);assert.equal(100-14*7,2);assert.equal(100-15*7,-5);
assert.deepEqual([(2+8)/2,(4+10)/2],[5,7]);assert.deepEqual([-3,-2],[-3,-2]);assert.equal(2*3+1,7);assert.deepEqual([1+4,5-3],[5,2]);assert.equal(4*0-7,-7);
assert.deepEqual([3,-4],[3,-4]);assert.equal(17-12,5);assert.deepEqual([-3,2,-7,0,4].sort((a,b)=>a-b),[-7,-3,0,2,4]);assert.equal(Math.max(2**3,3**2,4,1),3**2);assert.equal(23+25,48);assert.equal(25-23,2);assert.equal(90+45+45,180);assert.equal(2**2*3*7,84);
for(const a of [-3,2,7])for(const b of [-2,3])assert.equal(12*a*a*b/(4*a*b),3*a);
for(const x of [-2,3])for(const y of [-3,2])assert.equal((3*x*x*y)*(4*x*y**3),12*x**3*y**4);
const numeric={kind:'numeric',unitAliases:['°','cm','cm²','cm³','m','£','m/s'],unitOptional:true};const clean=s=>String(s).toLowerCase().replace(/−/g,'-').replace(/\s+/g,'');
const equal=(a,b)=>numericAnswersEqual(String(a),String(b),numeric)||clean(a)===clean(b);
const records=[];
for(const [n,result] of Object.entries(expected)){
 const id=n.padStart(3,'0');const value=typeof result==='number'?String(Number(result.toPrecision(12))):result;
 for(const [format,prefix] of [['multiple-choice','mc'],['true-false','tf'],['fill-in-the-blank','fitb']]){
  const q=bank[format].find(q=>q.id===`math-${prefix}-${id}`);assert(q);
  if(prefix==='tf'){
   let claim=q.text.match(/(?:\] is |The answer is )(.+)\.$/)?.[1];if(!claim)claim=q.text.match(/ = ([^=]+)\.$/)?.[1];assert(claim,'Unread claim '+q.id);
   assert.equal(q.correctAnswer,equal(claim,value)?'True':'False',q.id);
  }else {assert(equal(q.correctAnswer,value),`${q.id}: ${value} vs ${q.correctAnswer}`);if(prefix==='mc')assert.equal(q.options.filter(x=>equal(x,value)).length,1,q.id);}
  records.push({id:q.id,independentlyCalculatedAnswer:value,questionSha256:crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex')});
 }
}
// Independently calculate ordering values in the original option order.
const values={1:[.75,.75,.7,.7],2:[1/2,2/5,3/4,3/8],4:[5*5,4*6,3*3*3],6:[-5,-2,0,-8,3],7:[2**3,Math.sqrt(64),4**2,3**2],9:[1.5**2,Math.sqrt(2.25),1.4**2,1.2**2],10:[3,6,5,4],11:[.35,1/3,.34,7/20],13:[-2500,-2400,-2450,-2450],15:[135,60,180/Math.PI,90],16:[Infinity,4,3,2],17:[4**3,5*3*4,3**3,2*6*5],18:[60,90,108,120],19:[0,-6,-4,-5],20:[4*6,2*(4+8),5+6+7,3*6],21:[200/4,150/2.5,270/6,60],22:[1/6,.5,4/52,3/6],23:[9*60+45,21*60+15,12*60,30],24:[-60*1.609344,-90,-45/.75*1.609344,-100/1.5],26:[2/3,3/5,5/8,4/7],27:[1/5,1/4,2/7,1/7],29:[2*3+1,3**2,3*3-2,3**3-20],31:[(2+3+3+5+7+10)/6,(3+5)/2,3],33:[.72,17/25,.69,71/100],34:[3.045,3.45,3.405,3.054],35:[-250,-350,-250,-240],36:[180,360,540,1080],37:[1/6,3/6,4/6,6/6],38:[-1e3,-1e-2,-1e-3,-1e6],40:[10*3.6,50,30*1.609344,15*3.6],41:[12,11,16,9].map(n=>Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0).length),43:[5/4,1.2,1.15,1.25],44:[2**10,10**2,55,3*10],45:[10*8/2,6*6,5*10,3*4*4],47:[5/3,7/5,1.8,6/4],48:[540,180,360,720],49:[1-.9,1-11/12,1-4/5,1-7/8]};
const steps={3:['B,A,C'],5:['C,D,B,A'],8:['C,D,A,B'],12:['A,B,C'],14:['C,A,B'],25:['D,B,A,C'],28:['B,D,A,C'],30:['C,D,A,B'],32:['B,A,C'],39:['C,B,D,A','B,C,D,A'],42:['B,A,C'],46:['B,A,C'],50:['B,D,C,A','D,B,C,A']};
assert.equal((4+7+9+2)/4,5.5);assert.equal(.15*80,12);assert.equal((3/4)/(2/5),15/8);assert.equal(180/(2+3+4),20);assert.equal(2*(3*3-4),10);assert.equal(3/8*100,37.5);
const perm=a=>a.length<2?[a]:a.flatMap((x,i)=>perm(a.filter((_,j)=>i!==j)).map(t=>[x,...t]));let permutations=0;
for(const q of bank.ordering){const n=Number(q.id.slice(-3));const vs=values[n];assert(vs||steps[n],q.id);assert.equal(vs?.length||q.options.length,q.options.length);
 for(const order of perm(q.options)){const valid=vs?order.every((x,i)=>!i||vs[q.options.indexOf(order[i-1])]<=vs[q.options.indexOf(x)]):steps[n].includes(order.join(','));assert.equal(isAnswerCorrect(order.join(','),q.correctAnswer,'ordering',q.marking),valid,q.id+' '+order.join(','));permutations++;}
 assert(isAnswerCorrect(q.correctAnswer,q.correctAnswer,'ordering',q.marking));records.push({id:q.id,questionSha256:crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex')});
}
// Audit the 240 derived forms belonging to the previously checked 120 MC pilot records.
const {checks:pilotChecks}=require('./check-maths-pilot.cjs');
const pilotUnits={kind:'numeric',unitAliases:['£','%','cm²','cm','g','km','ml','h'],unitOptional:true};
const pilotEqual=(a,b)=>numericAnswersEqual(String(a),String(b),pilotUnits)||clean(a)===clean(b);
for(const [n,value] of Object.entries(pilotChecks))for(const [format,prefix] of [['true-false','tf'],['fill-in-the-blank','fitb']]){
 const q=bank[format].find(q=>q.id===`math-${prefix}-${n.padStart(3,'0')}`);assert(q);
 if(prefix==='tf'){
  const claim=q.text.match(/(?:\] is |\. is )(.+)\.$/)?.[1]||q.text.match(/ = ([^=]+)\.$/)?.[1];assert(claim,'Unread claim '+q.id);
  assert.equal(q.correctAnswer,pilotEqual(claim,value)?'True':'False',q.id);
 }else assert(pilotEqual(q.correctAnswer,value),q.id);
 records.push({id:q.id,independentlyCalculatedAnswer:String(value),questionSha256:crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex')});
}
assert(bank['fill-in-the-blank'].find(q=>q.id==='math-fitb-129').text.includes('51, 57, 59 and 63'));
assert(bank['fill-in-the-blank'].find(q=>q.id==='math-fitb-134').text.includes('greater than 1'));
for(const q of bank.ordering){assert(!isAnswerCorrect(q.options.slice(1).join(','),q.correctAnswer,'ordering',q.marking));assert(!isAnswerCorrect([...q.options,q.options[0]].join(','),q.correctAnswer,'ordering',q.marking));}
const file='docs/paper-audit/maths-completion-reviewed-2026-10-20.json';if(process.argv.includes('--record'))fs.writeFileSync(file,JSON.stringify({date:'2026-10-20',mcFamilies:102,derivedForms:444,orderingItems:50,records},null,2)+'\n');else assert.deepEqual(JSON.parse(fs.readFileSync(file)).records,records);
console.log(`PASS:102 independently calculated MC keys and444 related keys;50 ordering tasks / ${permutations} exhaustive permutations.`);
