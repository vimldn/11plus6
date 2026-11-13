import subprocess,json,sys,xml.etree.ElementTree as E
from pathlib import Path
from lxml import html
from urllib.parse import urlsplit,urljoin
from concurrent.futures import ThreadPoolExecutor
base=sys.argv[1]; root='https://www.11plusexampapers.com'
def get(p):return subprocess.check_output(['curl','-fsSL','--max-time','40',base+p])
u=[x.text for x in E.fromstring(get('/sitemap.xml')).findall('{*}url/{*}loc')];assert set(u)==set(Path('docs/releases/url-inventory-2026-11-13.txt').read_text().splitlines());assert len(u)==len(set(u))==285
pages={p:html.fromstring(get(p)) for p in ['/exam-dates','/schools/newstead-wood']};targets=set();checks=[]
for p,t in pages.items():
 assert t.xpath('//link[@rel="canonical"]/@href')==[root+p];assert len(t.xpath('//h1'))==1
 assert t.xpath('//meta[@name="description"]/@content') and t.xpath('//title/text()')
 assert not any('noindex' in x for x in t.xpath('//meta[@name="robots"]/@content'))
 for href in t.xpath('//main//a/@href'):
  a=urlsplit(urljoin(root+p,href))
  if a.netloc=='www.11plusexampapers.com':
   assert root+a.path in u;targets.add((a.path,a.fragment))
 text=t.text_content();assert '26 June 2027' in text and 'unconfirmed' in text
 checks.append({'url':root+p,'canonical':True,'singleH1':True,'metadata':True,'noNoindex':True})
assert '/schools/newstead-wood' in pages['/exam-dates'].xpath('//main//a/@href')
assert '/exam-dates#newstead-2027-tests' in pages['/schools/newstead-wood'].xpath('//main//a/@href')
assert 'GL Assessment (two-stage)' not in pages['/schools/newstead-wood'].text_content()
def check(x):
 p,f=x;t=html.fromstring(get(p));assert not f or t.xpath('//*[@id=$f]',f=f);return p
with ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(check,targets))
r={'base':base,'pages':checks,'sitemapURLs':len(u),'internalTargetsAndFragments':len(targets),'reciprocalLinks':True,'indexing':'not inspected'};Path(sys.argv[2]).write_text(json.dumps(r,indent=2)+'\n');print(r)
