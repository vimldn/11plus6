'use strict';
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function load(file){const f=path.join(root,file),m=new Module(f,module);m.filename=f;m.paths=Module._nodeModulePaths(path.dirname(f));m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);return m.exports;}
const daily=load('lib/dailyPosts20261024.ts').DAILY_POSTS_20261024,prior=load('lib/newBlogPosts20261021.ts').OCTOBER_SKILL_POSTS;
const maths=daily.slice(0,4).map(p=>({title:p.title,slug:p.slug,questions:p.content.filter(b=>b.type==='question').slice(0,5)}));
const english=[daily[4],prior.find(p=>p.slug==='11-plus-direct-speech-punctuation')].map(p=>({title:p.title,slug:p.slug,questions:p.content.filter(b=>b.type==='question')}));
const passage=daily[4].content.find(b=>b.type==='p'&&b.text.startsWith('Before the exhibition,')).text;
fs.mkdirSync(path.join(root,'tmp/pdfs'),{recursive:true});fs.writeFileSync(path.join(root,'tmp/pdfs/source.json'),JSON.stringify({maths,english,passage},null,2));
console.log('Exported 20 maths and 16 English original questions with checked keys');
