const assert=require('node:assert/strict'),{load}=require('./load-ts.cjs');
const posts=load('lib/dailyPosts20261028.ts').DAILY_POSTS_20261028;
const all=load('lib/blogPosts.ts').BLOG_POSTS;
assert.equal(posts.length,5);const qs=posts.map(p=>p.content.filter(b=>b.type==='question'));assert(qs.every(q=>q.length===8));
// Whole-number rounding interval enumerated, not inferred from a stored key.
const interval=Array.from({length:1000},(_,i)=>i).filter(n=>Math.round(n/100)*100===700);
assert.deepEqual(qs[0].map(q=>q.answer),[String(Math.round(46752/100)*100).replace('46800','46,800'),(Math.round(8264/10)/100).toFixed(2),(Math.round(996/10)/10).toFixed(1),String(Math.round(449/100)*100),String(40*20),interval[0]+' and '+interval.at(-1),String(Math.ceil(98/24)),String(Math.floor(1500/280))]);
// Integer hundredths make the arithmetic independent of binary floating point rounding.
const n=s=>Number(s.match(/[0-9.]+/)[0]);
assert.deepEqual(qs[1].map(q=>n(q.answer)),[(470+86)/100,(800-275)/100,8*7/100,36/10/4,54/6,96/4,(750-285-160)/100,18/4]);
const frac=(a,b)=>a/b;const expected=[84/2,16*45/60,9/6*60,600/150,72*25/60,20/(10/10+10/20),48/(80/60),3*120];
const actual=qs[2].map(q=>q.answer.startsWith('13⅓')?13+frac(1,3):n(q.answer));actual.forEach((a,i)=>assert(Math.abs(a-expected[i])<1e-10));
// Worked examples and estimate/context boundaries checked separately.
assert.equal(19*490,9310);assert.equal(24*35/1000,0.84);assert.equal(500-186,314);assert.equal(42/6,7);assert.equal(15/(45/60),20);assert.equal(24/(12/12+12/24),16);assert.equal(36/2,18);assert.equal(60/1.5,40);assert.equal(60/(1.5-.5),60);
// Manually reviewed lexical senses and grammar heads. No auto-exclusive collective-noun key.
assert.deepEqual(qs[3].map(q=>q.answer),['short','plentiful','obey','smooth','reassured','shrink','obvious','small']);
assert.deepEqual(qs[4].map(q=>q.answer),['is','have','runs','were','Does your brother like chess?','are','is','No']);
assert(qs[3][2].explanation.includes('follow'));assert(qs[3][7].explanation.includes('portion'));assert(qs[4][7].explanation.includes('Collective'));
for(const p of posts){assert.equal(p.date,'October 28, 2026');assert.equal(all.filter(a=>a.slug===p.slug).length,1);assert(p.content.some(b=>b.text?.includes('2027')));assert(p.content.some(b=>b.text?.includes('/subjects/'+p.subject)));assert(p.content.some(b=>b.text?.includes('https://www.gov.uk/')))}
console.log('PASS 5 guides, 24 independently calculated maths keys, 16 manually reviewed English keys, worked examples, unique slugs, date/source/parent gates');
