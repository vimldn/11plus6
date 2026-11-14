"""Bounded rendered checks for the two 14 November English revisions."""
import subprocess,json,sys,hashlib,xml.etree.ElementTree as E
from pathlib import Path
from urllib.parse import urlsplit,urljoin
from lxml import html
from concurrent.futures import ThreadPoolExecutor
base=sys.argv[1].rstrip('/'); canonical='https://www.11plusexampapers.com'
def get(path): return subprocess.check_output(['curl','-fsSL','--max-time','40',base+path])
root=E.fromstring(get('/sitemap.xml')); urls=[e.text for e in root.findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls))==285
assert set(urls)==set(Path('docs/releases/url-inventory-2026-11-14.txt').read_text().splitlines())
assert not any(any(x in u for x in ['/preview','/test','/api/','/quiz']) for u in urls)
article='/blog/11-plus-direct-speech-punctuation';hub='/subjects/english'
pages={p:html.fromstring(get(p)) for p in [article,hub]};checks=[];targets=set()
routes=json.loads(Path('.next/server/app-paths-manifest.json').read_text())
for p,t in pages.items():
 assert t.xpath('//link[@rel="canonical"]/@href')==[canonical+p]
 assert len(t.xpath('//h1'))==1 and t.xpath('//title/text()') and t.xpath('//meta[@name="description"]/@content')
 assert not any('noindex' in s.lower() for s in t.xpath('//meta[@name="robots"]/@content'))
 headers=subprocess.check_output(['curl','-fsSI','--max-time','40',base+p]).decode()
 assert not any('noindex' in line.lower() for line in headers.splitlines() if line.lower().startswith('x-robots-tag:'))
 for href in t.xpath('//main//a/@href'):
  u=urlsplit(urljoin(canonical+p,href))
  if u.netloc!='www.11plusexampapers.com': continue
  assert u.path=='/quiz' or canonical+u.path in urls or u.path+'/page' in routes,href
  targets.add((u.path,u.fragment))
 checks.append({'url':canonical+p,'title':t.xpath('//title/text()')[0],'canonical':True,'singleH1':True,'noMetaOrHeaderNoindex':True})
def target_check(target):
 p,f=target;t=html.fromstring(get(p));assert not f or t.xpath('//*[@id=$f]',f=f),target
with ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(target_check,targets))
assert article in pages[hub].xpath('//main//a/@href')
assert hub+'#choose-english-practice' in pages[article].xpath('//main//a/@href')
assert '/papers#english-printable' in pages[article].xpath('//main//a/@href')
assert '/papers#english-printable' in pages[hub].xpath('//main//a/@href')
assert '/mock-exams#configure-practice' in pages[hub].xpath('//main//a/@href')
questions=pages[article].xpath('//details[summary="Show answer and explanation"]')
assert len(questions)==12 and all(not q.get('open') for q in questions)
assert 'There are three turns: Ada, Milo, Ada' in questions[8].text_content()
assert '\n' in questions[8].xpath('.//p')[0].text_content()
assert 'personal pronoun I' in questions[10].text_content()
schema=[json.loads(s) for s in pages[article].xpath('//script[@type="application/ld+json"]/text()')]
a=next(s for doc in schema for s in doc.get('@graph',[doc]) if s.get('@type')=='Article')
assert a['datePublished'].startswith('2026-10-21') and a['dateModified'].startswith('2026-11-14')
cover='/blog-artwork/11-plus-direct-speech-punctuation.webp'
assert pages[article].xpath('//meta[@property="og:image"]/@content')==[canonical+cover]
assert a['image']==[canonical+cover] and pages[article].xpath('//img[@src=$src]',src=cover)
assert get(cover)[:4]==b'RIFF'
entry=next(e for e in root.findall('{*}url') if e.find('{*}loc').text==canonical+article)
assert entry.find('{*}lastmod').text.startswith('2026-11-14')
pdfs=[]
for suffix in ['practice','worked-answers']:
 p='/papers/english-'+suffix+'.pdf';b=get(p)
 assert b.startswith(b'%PDF-') and hashlib.sha256(b).digest()==hashlib.sha256(Path('public'+p).read_bytes()).digest()
 pdfs.append(p)
result={'checkedAt':'2026-11-14','base':base,'pages':checks,'internalTargetsAndFragments':len(targets),'sitemapURLs':285,'unchangedURLSet':True,'reciprocalLinks':True,'closedAnswerDisclosures':12,'publicationDatePreserved':True,'updatedDate':'2026-11-14','topicCoverHeroOGSchemaAndAsset':True,'pdfsMatchSource':pdfs,'indexing':'not inspected','browserInteraction':'separate check required'}
Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
