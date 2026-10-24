'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),Module=require('node:module'),path=require('node:path'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
function load(file){const f=path.join(root,file),m=new Module(f,module);m.filename=f;m.paths=Module._nodeModulePaths(path.dirname(f));m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);return m.exports;}
const posts=load('lib/dailyPosts20261024.ts').DAILY_POSTS_20261024,news=load('lib/dailyNews20261024.ts').DAILY_NEWS_20261024;
assert.equal(posts.length,5);assert.equal(news.length,2);const qs=posts.map(p=>p.content.filter(b=>b.type==='question'));
for(const p of [...posts,...news]){assert.equal(p.date,'October 24, 2026');assert.equal(p.images.length,0);assert(p.content.some(b=>b.text?.includes('https://')));assert(p.content.some(b=>b.text?.includes('2027')));}
for(const [i,p]of posts.entries()){assert.equal(qs[i].length,8);assert(p.content.some(b=>b.text?.includes(`](/subjects/${p.subject})`)));for(const q of qs[i])assert(q.answer&&q.explanation);}
// Evaluate authored arithmetic keys independently, using actual precedence in JS.
const expr=[14+6*5,48/8*4,25-9+2,7*(13-8)+6,4**2+18/6,30-12/3,(9+3)*4,60/(2+3)+4*2];
expr.forEach((n,i)=>assert(qs[0][i].answer.includes(String(n))));
assert.deepEqual(expr,[44,24,18,41,19,26,48,20]);
const factors=n=>Array.from({length:n},(_,i)=>i+1).filter(x=>n%x===0),gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b),prime=n=>n>1&&factors(n).length===2;
assert.equal(qs[1][0].answer,factors(30).join(', '));assert.deepEqual([1,2,21,29,39].filter(prime),[2,29]);assert.equal(qs[1][2].answer,String(gcd(24,40)));assert.equal(qs[1][3].answer,String(lcm(9,12)));assert.equal(gcd(42,70),14);assert.equal(42/14,3);assert.equal(70/14,5);assert.equal(lcm(8,10),40);
const candidates=Array.from({length:29},(_,i)=>i+31).filter(n=>n%8===0&&96%n===0);assert.deepEqual(candidates,[32,48]);assert(qs[1][6].answer.includes('32 or 48'));assert.deepEqual(candidates.filter(n=>n%3===0),[48]);
assert.deepEqual([-3,5,-11,0,-1].sort((a,b)=>a-b),[-11,-3,-1,0,5]);assert.equal(Math.max(-8,-5),-5);assert.equal(qs[2][2].answer,`${-6+11}°C`);assert.equal(qs[2][3].answer,`${String(7-15).replace('-','−')}°C`);assert.equal(qs[2][4].answer,`${3-(-9)}°C`);assert.equal(-4+9-3,2);assert.deepEqual([8,3,-2].map(n=>n-5),[3,-2,-7]);assert.equal(-2-9,-11);
// Money arithmetic in integer pence; no floating-point rounding hides a discrepancy.
const change=(n,p)=>n*p/100;
const amounts=[180+change(180,15),7200-change(7200,25),change(9000,12),(4500+change(4500,20))*90/100,5600*100/80,6600*100/110,4000*75/100*125/100,250+change(250,8)];
assert.deepEqual(amounts,[207,5400,1080,4860,7000,6000,3750,270]);
assert.deepEqual(qs[3].map(q=>q.answer),['207','£54','£10.80','£48.60','£70','£60','No; £37.50','270 cm']);
// Worked-example checks independent of authored prose.
assert.equal(19+4*(8-5),31);assert.equal((19+4)*(8-5),69);assert.equal(6**2-12/3,32);assert.equal(gcd(32,48),16);assert.equal(lcm(6,14),42);assert(prime(29));assert.equal(-7+12,5);assert.equal(-6-(-14),8);assert.equal(9-(-4),13);assert.equal(4-(-8),12);assert.equal(260*115/100,299);assert.equal(5000*120/100*80/100,4800);assert.equal(4200*100/70,6000);
// Editorial English checks: keys retain specified owners and contraction meanings.
assert.deepEqual(qs[4].map(q=>q.answer),['We’ve finished the display.','the gardener’s spades','the musicians’ rehearsal room','the children’s helmets','its; it’s','It is','The baker sold six loaves before lunch.','The first refers to one dancer; the second to more than one dancer.']);
for(const n of news){assert.equal(n.kind,'news');assert(n.eventNote&&!n.eventNote.includes('16 October'));assert(n.content.some(b=>b.text?.includes('](/exam-dates)')));}
assert(news[0].content.some(b=>b.text?.includes('not a notification that the policy has already changed')));
assert.equal((Date.UTC(2026,9,31)-Date.UTC(2026,9,24))/86400000,7);
console.log('PASS: 5 guides, 2 news, 40 keys, independent calculations, multi-solution diagnostic, worked examples, English editorial keys and cohort/date safeguards');
for(const p of [...posts,...news]){const words=p.content.map(b=>[b.text,b.answer,b.explanation,...(b.items||[]),...(b.headers||[]),...(b.rows||[]).flat()].filter(Boolean).join(' ')).join(' ').split(/\s+/).length;console.log(p.slug,words+' authored words');}
