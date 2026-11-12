"""Bounded checks for the 12 November dates/profile release; local or public base."""
import subprocess,json,sys,xml.etree.ElementTree as E
from pathlib import Path
from urllib.parse import urlsplit,urljoin
from datetime import datetime,timezone
from lxml import html
base=sys.argv[1].rstrip('/'); canonical='https://www.11plusexampapers.com'; cache={}
def read(path):
 if path not in cache: cache[path]=subprocess.check_output(['curl','-fsSL','--max-time','40',base+path])
 return cache[path]
def tree(path):return html.fromstring(read(path))
urls=[e.text for e in E.fromstring(read('/sitemap.xml')).findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls))==285
assert set(urls)==set(Path('docs/releases/url-inventory-2026-11-12.txt').read_text().splitlines())
assert not any(any(x in u for x in ['/preview','/api/','/quiz','/test']) for u in urls)
checks=[]
for p in ['/exam-dates','/schools/st-olaves']:
 t=tree(p); assert t.xpath('//link[@rel="canonical"]/@href')==[canonical+p]
 assert len(t.xpath('//h1'))==1 and t.xpath('//title/text()') and t.xpath('//meta[@name="description"]/@content')
 assert not any('noindex' in v.lower() for v in t.xpath('//meta[@name="robots"]/@content'))
 assert canonical+p in urls
 links=set(t.xpath('//main//a/@href')); count=0
 for link in links:
  u=urlsplit(urljoin(canonical+p,link))
  if u.netloc!='www.11plusexampapers.com':continue
  assert canonical+u.path in urls,link
  target=tree(u.path)
  if u.fragment: assert target.xpath('//*[@id=$id]',id=u.fragment),link
  count+=1
 text=' '.join(t.xpath('//main')[0].text_content().split())
 if p=='/exam-dates':
  for phrase in ['17 September 2027','12 November 2027','13 Nov 2026']: assert phrase in text,phrase
  assert '/schools/st-olaves' in links
  assert "St Olave's & Newstead Wood" not in text
 else:
  assert '/exam-dates#st-olaves-2028' in links and '/papers' in links and '/mock-exams' in links
  assert 'VR/NVR then Maths/English' not in text
  for phrase in ['7 June 2027 at 9am','28 June 2027 at midday','1 March 2028','English, logic']:assert phrase in text,phrase
 checks.append({'path':p,'canonical':canonical+p,'title':t.xpath('//title/text()')[0],'singleH1':True,'noNoindex':True,'internalTargetsFetched':count})
assert '/schools/st-olaves' in tree('/schools').xpath('//a/@href')
result={'checkedAt':datetime.now(timezone.utc).isoformat(),'base':base,'pages':checks,'sitemapURLs':len(urls),'unchangedURLSet':True,'reciprocalDateProfileLinks':True,'schoolDirectoryIncomingLink':True,'newBlogs':0,'indexStatus':'not inspected'}
Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
