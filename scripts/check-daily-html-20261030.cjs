'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
function load(file){const f=path.resolve(file),m=new Module(f,module);m.filename=f;m.paths=Module._nodeModulePaths(path.dirname(f));m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);return m.exports;}
const posts=load('lib/dailyPosts20261030.ts').DAILY_POSTS_20261030,base='https://www.11plusexampapers.com';
const manifests=JSON.parse(fs.readFileSync('.next/server/app-paths-manifest.json'));
const xml=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8'),urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
assert.equal(urls.length,236);assert.equal(new Set(urls).size,236);assert(!urls.some(u=>/\/(?:lesson-preview|test|api|quiz)(?:\/|$|\?)/.test(u)));
for(const p of posts){const url=base+'/blog/'+p.slug,h=fs.readFileSync('.next/server/app/blog/'+p.slug+'.html','utf8');assert.equal((h.match(/<h1[ >]/g)||[]).length,1);assert(h.includes('rel="canonical" href="'+url+'"'));assert(!/name="robots" content="[^"]*noindex/.test(h));assert(h.includes('"@type":"'+(p.kind==='news'?'NewsArticle':'Article')+'"'));assert(h.includes('"datePublished":"2026-10-30"'));assert(urls.includes(url));
const parent=p.subject?'/subjects/'+p.subject:'/exam-dates';assert(h.includes('href="'+parent+'"'));const hub=fs.readFileSync('.next/server/app'+parent+'.html','utf8');assert(hub.includes('href="/blog/'+p.slug+'"'));
const details=[...h.matchAll(/<details([^>]*)>/g)];assert.equal(details.length,p.subject?8:0);assert(details.every(d=>!/(?:^|\s)open(?:\s|=|$)/.test(d[1])));assert.equal((h.match(/<summary[ >]/g)||[]).length,p.subject?8:0);
for(const a of h.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const target=a[1];if(target==='/'||target.startsWith('/_next/')||target.includes('.'))continue;assert(fs.existsSync('.next/server/app'+target+'.html')||manifests[target+'/page'],'internal '+target);}
assert(!h.includes('CEM Centre — about the 11+ tests'),'generic resources must not imply relevance to a sourced news/skill page');
if(p.kind==='news')assert(h.includes(p.eventNote)&&!h.includes('Development announced 16 October 2026.'));
console.log('PASS',p.slug);}
console.log('PASS 5 rendered pages, 40 closed native answers, 236 unique sitemap URLs, reciprocal hubs, schema/canonicals/dates and all article internal targets');
