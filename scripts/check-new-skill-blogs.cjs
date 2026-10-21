#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),Module=require('node:module'),path=require('node:path'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
function load(file){const filename=path.join(root,file);const m=new Module(filename,module);m.filename=filename;m.paths=Module._nodeModulePaths(path.dirname(filename));m._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},fileName:filename}).outputText,filename);return m.exports;}
const posts=load('lib/newBlogPosts20261021.ts').OCTOBER_SKILL_POSTS;
assert.equal(posts.length,5);assert.equal(new Set(posts.map(p=>p.slug)).size,5);
const qs=posts.map(p=>p.content.filter(b=>b.type==='question'));
for(const [i,p] of posts.entries()){
 assert.equal(qs[i].length,8);assert.equal(p.date,'October 21, 2026');assert.equal(p.images.length,0);
 assert(p.content.some(b=>b.text?.includes('exams taken in 2027')));
 assert(p.content.some(b=>b.text?.includes(`](/subjects/${p.subject})`)));
 assert(p.content.some(b=>b.text?.includes('https://www.gov.uk/')));
 for(const q of qs[i])assert(q.text&&q.answer&&q.explanation);
}
// Compute the numerical keys independently of the article wording.
const currency=v=>'£'+(v/100).toFixed(2)+'.';
const expectedMoney=2000-(5*175+3*60);assert.equal(qs[1][0].answer,currency(expectedMoney));
assert.equal(qs[1][1].answer,`${360-5*45} cm.`);
const end=13*60+48+57+18;assert.equal(qs[1][2].answer,`${Math.floor(end/60)}:${String(end%60).padStart(2,'0')}.`);
assert.equal(qs[1][3].answer,`${Math.ceil(87/8)} tables, with ${Math.ceil(87/8)*8-87} empty seat.`);
assert.equal(qs[1][4].answer,`${(180-180/3)-(180-180/3)/4} litres.`);
assert.equal(qs[1][5].answer,currency(4800*(1-.25)+350));
assert.equal(qs[1][6].answer,`${Math.ceil((83-29)/8)} weeks.`);
assert.equal(qs[1][7].answer,`${Math.floor((3*18-7)/4)} beads each, with ${(3*18-7)%4} left over.`);
const gcd=(a,b)=>b?gcd(b,a%b):a;const frac=(a,b)=>`${a/gcd(a,b)}/${b/gcd(a,b)}`;
assert.equal(qs[0][0].answer,`${7/20} and ${7/20*100}%.`);
assert.equal(qs[0][1].answer,`${frac(45,1000)} and ${45/1000*100}%.`);
assert.equal(qs[0][2].answer,`${18/100} and ${frac(18,100)}.`);
assert.deepEqual([['3/8',3/8],['0.37',.37],['38%',38/100]].sort((a,b)=>a[1]-b[1]).map(x=>x[0]),qs[0][3].answer.slice(0,-1).split(', '));
assert.equal(qs[0][4].answer,`${frac(12,10)} and ${1.2*100}%.`);
assert.equal(qs[0][5].answer,`3/5 = ${3/5}.`);
assert.equal(.6,.60);assert.equal(qs[0][6].answer,'They are equal.');
assert.equal(qs[0][7].answer,`${Math.round(100/3)}%.`);
const algebra=[3*5+7,26-9,54/6,(29+7)/4,30/3-2,42/3-5,(19-4)/3];
const shown=qs[2].slice(0,7).map(q=>Number(q.answer.match(/(-?\d+(?:\.\d+)?)\.$/)[1]));
assert.deepEqual(shown,algebra);assert.notEqual(4*2+3,7*2);assert.match(qs[2][7].answer,/11 and 14/);
// Check the original passage supports every target, and preserve authored punctuation keys.
const passage=posts[3].content.filter(b=>b.type==='p').map(b=>b.text).join(' ');
for(const word of ['reserved','sharp','dull','beam','sound','delicate','light','Curious'])assert(passage.includes(word));
const punct=[
 'Leah said, “The lantern is in the cupboard.”',
 '“The bridge is safe,” he said.',
 '“Where did you leave the map?” she asked.',
 '“Stop!” shouted Arun.',
 '“If we leave now,” said Mei, “we can catch the bus.”',
 '“The rain has stopped,” said Mei. “We can go outside.”',
 '“I found it.” Priya lifted the notebook.',
 '“Are you ready?” asked Ben.\n“Almost,” replied Imani.'
];assert.deepEqual(qs[4].map(q=>q.answer),punct);
for(const answer of punct){assert.equal((answer.match(/“/g)||[]).length,(answer.match(/”/g)||[]).length);assert(!/[?!]”\s*,/.test(answer));}
console.log('PASS: five distinct articles, 40 complete answer panels, 24 recalculated maths keys, vocabulary source targets and eight punctuation keys. English interpretation also requires the recorded editorial review.');
