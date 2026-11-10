import subprocess,json,sys,hashlib,xml.etree.ElementTree as E
from pathlib import Path
from urllib.parse import urlsplit,urljoin
from lxml import html
base=sys.argv[1].rstrip('/')
canonical='https://www.11plusexampapers.com'
cache={}
def get(path):
 if path not in cache:
  raw=subprocess.check_output(['curl','-fsSL','--max-time','40',base+path]); cache[path]=raw
 return cache[path]
def tree(path): return html.fromstring(get(path))
root=E.fromstring(get('/sitemap.xml'));urls=[e.text for e in root.findall('{*}url/{*}loc')]
previous=[s for s in Path('docs/releases/url-inventory-2026-11-10.txt').read_text().splitlines() if s.startswith('http')]
assert set(urls)==set(previous) and len(urls)==285
assert not any(any(x in u for x in ['/preview','/test','/api/','/quiz']) for u in urls)
routes=json.loads(Path('.next/server/app-paths-manifest.json').read_text())
checks=[]
for path in ['/papers','/mock-exams']:
 t=tree(path); assert t.xpath('//link[@rel="canonical"]/@href')==[canonical+path]
 assert len(t.xpath('//h1'))==1 and t.xpath('//title/text()') and t.xpath('//meta[@name="description"]/@content')
 assert 'noindex' not in ' '.join(t.xpath('//meta[@name="robots"]/@content')).lower()
 assert canonical+path in urls
 links=set(t.xpath('//main//a/@href')); targetChecks=0
 for href in links:
  u=urlsplit(urljoin(canonical+path,href))
  if u.netloc!='www.11plusexampapers.com':continue
  if u.path.endswith('.pdf'): assert Path('public'+u.path).is_file();continue
  assert u.path=='/quiz' or canonical+u.path in urls or u.path+'/page' in routes,href
  if u.fragment:
   assert tree(u.path or path).xpath('//*[@id=$id]',id=u.fragment),href
  targetChecks+=1
 checks.append({'path':path,'title':t.xpath('//title/text()')[0],'h1':t.xpath('//h1')[0].text_content().strip(),'canonical':canonical+path,'indexable':True,'internalTargetsChecked':targetChecks})
for hub in ['maths','english','verbal-reasoning','non-verbal-reasoning']:
 links=tree('/subjects/'+hub).xpath('//main//a/@href')
 assert any(l.split('#')[0].split('?')[0]=='/papers' for l in links),hub
 assert any(l.split('#')[0].split('?')[0]=='/mock-exams' for l in tree('/subjects/'+hub).xpath('//a/@href')),hub
pdfs=[]
for subject in ['maths','english','verbal','nonverbal']:
 for suffix in ['practice','worked-answers']:
  path=f'/papers/{subject}-{suffix}.pdf';data=get(path)
  assert data.startswith(b'%PDF-')
  assert hashlib.sha256(data).digest()==hashlib.sha256(Path('public'+path).read_bytes()).digest()
  pdfs.append(path)
for slug in ['11-plus-order-of-operations','11-plus-factors-multiples-primes','11-plus-negative-numbers','11-plus-percentage-increase-decrease','11-plus-apostrophes','11-plus-direct-speech-punctuation','11-plus-algebra-basics']:
 links=tree('/blog/'+slug).xpath('//main//a/@href')
 assert any(l.split('#')[0]=='/papers' for l in links),slug
assert 'noindex' in ' '.join(tree('/quiz?paper=maths-generated&mode=practice').xpath('//meta[@name="robots"]/@content'))
assert tree('/papers').xpath('//*[@id="review-your-paper"]') and tree('/mock-exams').xpath('//*[@id="review-practice"]')
result={'checkedAt':'2026-11-10','base':base,'sitemapCount':len(urls),'sameURLsAsBefore':True,'pages':checks,'pdfsVerified':pdfs,'subjectHubsWithContextualPapersAndNavigationMocksLinks':4,'reciprocalArticleLinks':7,'quizNoindexPreserved':True}
Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
