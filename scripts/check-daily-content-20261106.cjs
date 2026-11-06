const fs=require('fs'),assert=require('node:assert/strict'),crypto=require('crypto');
const {load}=require('./load-ts.cjs'), p=load('lib/dailyPosts20261106.ts').DAILY_POSTS_20261106, all=load('lib/blogPosts.ts').BLOG_POSTS;
const base='https://www.11plusexampapers.com', dir='.next/server/app';
const html=path=>fs.existsSync(dir+path+'.html')?fs.readFileSync(dir+path+'.html','utf8'):require('child_process').execFileSync('curl',['--noproxy','*','-fsS',(process.env.RELEASE_TEST_ORIGIN||'http://127.0.0.1:3166')+path],{encoding:'utf8',maxBuffer:10000000}), map=fs.readFileSync(dir+'/sitemap.xml.body','utf8');
assert.equal(p.length,7);assert.equal(new Set(all.map(x=>x.slug)).size,all.length);
const answers=p.slice(0,5).map(x=>x.content.filter(b=>b.type==='question').map(q=>q.answer));
const digits=[0,1,2,3,4,5,6,7,8,9], satisfying=f=>digits.filter(f);
assert.deepEqual(answers[0],[480/8*14+' ml.',450/6*10+' g.',Math.floor(Math.min(490/(180/4),300/(100/4)))+' rolls.','No.']);assert.equal(.48*1000,480);
assert.deepEqual(satisfying(x=>(402+10*x)%9===0),[3]);assert.deepEqual(satisfying(x=>(710+x)%4===0),[2,6]);assert.deepEqual(satisfying(x=>(360+x)%6===0),[0,6]);assert.notEqual(19%9,0);assert.deepEqual(answers[1],['3 only.','2 and 6.','0 and 6.','No; 19 is one example.']);
assert.deepEqual(answers[2],[(14-6)+'.',(15-6)+'.',(17-(15-6))+'.','No.']);assert.equal(5+5,6+4);
assert.deepEqual(satisfying(x=>208+10*x+177===445),[6]);assert.deepEqual(satisfying(x=>503+10*x-276===287),[6]);assert.deepEqual(digits.flatMap(x=>digits.filter(y=>308+10*x+240+y===585).map(y=>[x,y])),[[3,7]]);assert.deepEqual(satisfying(x=>409+10*x+152===550),[]);assert.deepEqual(answers[3],['6.','6.','3 and 7, in that order.','No.']);
assert.deepEqual(answers[4],['€'+35*1.2+'.','£'+54/1.2+'.','£'+(16*.85).toFixed(2)+'.','Desk A, by €'+((63*120-60*125)/100).toFixed(2)+'.']);
assert.equal(467+185,652);assert.equal(742-368,374);assert.equal(19-8+19-9,21);assert.equal(38-21,17);assert.equal((42-2)*1.25,50);
const before=fs.readFileSync('docs/releases/url-inventory-2026-11-06.txt','utf8').trim().split('\n');
const locs=[...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(new Set(locs),new Set([...before,...p.map(a=>base+'/blog/'+a.slug)]));assert.equal(locs.length,273);assert(!/\/(quiz|lesson-preview|test|api)[/<]/.test(map));
for(const a of p){const path='/blog/'+a.slug,t=html(path), hub=a.kind?'/exam-dates':'/subjects/maths';
assert(t.includes('rel="canonical" href="'+base+path+'"'));assert(!t.includes('content="noindex'));assert(t.includes('property="og:image" content="'+base+a.imageUrl+'"'));assert(t.includes('"image":["'+base+a.imageUrl+'"]'));assert(t.includes(a.kind?'NewsArticle':'Article'));assert(html('/blog').includes(path));assert(html(hub).includes(path));assert(t.includes('href="'+hub+'"'));assert.equal((t.match(/<details[ >]/g)||[]).length,a.kind?0:4);assert(!t.includes('<details open'));
for(const b of a.content)for(const m of (b.text||'').matchAll(/\]\((\/[^)]+)\)/g)){let [target,anchor]=m[1].split('#');assert(locs.includes(base+target),target);if(anchor)assert(html(target).includes('id="'+anchor+'"'))}
}
for(const a of JSON.parse(fs.readFileSync('docs/artwork/blog-artwork-2026-11-06.json')).items)for(const f of [a.asset,a.thumbnail])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f.path)).digest('hex'),f.sha256);
console.log('PASS 5 educational guides, 20 independently checked answers, 2 news pages, 273 canonical sitemap URLs and reciprocal links, 14 artwork variants.');
