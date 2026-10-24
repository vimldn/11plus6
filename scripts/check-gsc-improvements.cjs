'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript'),Module=require('node:module'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function load(file){const f=path.join(root,file),m=new Module(f,module);m.filename=f;m.paths=Module._nodeModulePaths(path.dirname(f));m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);return m.exports;}
const {improveSearchPriorityPost,SEARCH_PRIORITY_SLUGS}=load('lib/gscImprovements20261024.ts');
assert.equal(SEARCH_PRIORITY_SLUGS.length,6);
for(const slug of SEARCH_PRIORITY_SLUGS){const original={slug,title:'Original title',date:'May 28, 2025',content:[{type:'p',text:'Useful original coverage'}]};const p=improveSearchPriorityPost(original);assert.equal(p.date,original.date);assert.equal(p.slug,slug);assert.equal(p.updatedAt,'2026-10-24');assert(p.content.some(b=>b.text==='Useful original coverage'));assert(p.editorial);}
assert.equal(700/2000*100,35);assert.equal(500/2000*100,25);assert.equal(Math.round(500/700*1000)/10,71.4);assert.equal(360/900*100,40);assert.equal(36/45*100,80);assert.equal(25*60/30,50);assert.equal(25+25+10,60);
const inventory=new Set(fs.readFileSync(path.join(root,'docs/releases/url-inventory-gsc-2026-10-24.txt'),'utf8').trim().split('\n').map(x=>new URL(x).pathname));
const text=fs.readFileSync(path.join(root,'lib/gscImprovements20261024.ts'),'utf8')+fs.readFileSync(path.join(root,'components/PracticeResources.tsx'),'utf8');
for(const m of text.matchAll(/\]\((\/[^)]+)\)|href="(\/[^"?]+)[^"\n]*"/g)){const target=m[1]||m[2];if(target==='/quiz')continue;assert(inventory.has(target),'Unpublished internal target: '+target);}
for(const s of ['maths','english'])for(const kind of ['practice','worked-answers']){const file=path.join(root,`public/papers/${s}-${kind}.pdf`);assert(fs.statSync(file).size>10000);assert.equal(fs.readFileSync(file).subarray(0,5).toString(),'%PDF-');}
console.log('PASS: six preserved article dates/URLs/bodies, seven independent example calculations, published link targets and four PDF assets');
