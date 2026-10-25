from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET
import json,sys,urllib.request
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__(); self.links=[];self.canonical=[];self.robots=[];self.h1=0;self.svg=0;self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='a':self.links.append(a.get('href',''))
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
  if t=='h1':self.h1+=1
  if t=='svg' and a.get('class','').startswith('visual-diagram'):self.svg+=1
host=sys.argv[1] if len(sys.argv)>1 else None
def read_route(route):
 return urllib.request.urlopen(host+'/'+route,timeout=45).read().decode() if host else (root/(route+'.html')).read_text()
root=Path('.next/server/app'); built_routes=json.loads(Path('.next/server/app-paths-manifest.json').read_text()); base='https://www.11plusexampapers.com'
for route in ['subjects/non-verbal-reasoning','papers']:
 p=Page(read_route(route));assert p.canonical==[base+'/'+route],p.canonical;assert p.h1==1;assert not any('noindex' in x for x in p.robots)
 for topic in ['rotations','reflections','sequences','matrices']:
  for mode in ['practice','exam']:assert f'/quiz?paper=visual-reviewed&topic={topic}&mode={mode}' in p.links
 assert '/quiz?paper=visual-reviewed&mode=practice' in p.links;assert '/quiz?paper=visual-reviewed&mode=exam' in p.links
 assert '/subjects/non-verbal-reasoning' in p.links and '/papers' in p.links
 assert p.svg==36,p.svg #2 starting figures plus4 closed worked diagrams
 for href in p.links:
  if href.startswith('/') and not href.startswith('/quiz'):
   target=href.split('?')[0].split('#')[0].rstrip('/')
   # Static canonical route target; PDFs are served from public.
   assert (root/(target.lstrip('/')+'.html')).exists() or target+'/page' in built_routes or Path('public'+target).is_file() or target=='',href
q=Page(read_route('quiz'));assert any('noindex' in x for x in q.robots)
xml=urllib.request.urlopen(host+'/sitemap.xml',timeout=45).read().decode() if host else (root/'sitemap.xml.body').read_text();urls=[e.text for e in ET.fromstring(xml).findall('.//{*}loc')];prior=Path('docs/releases/url-inventory-practice-2026-10-25.txt').read_text().splitlines();assert set(urls)==set(prior);assert len(urls)==len(set(urls))==210;assert not any(any(x in u for x in ['/quiz','/lesson-preview','/test','/api/']) for u in urls)
print('PASS: both hubs have exact canonicals, one H1, all focused/mixed/reciprocal routes and36 SVGs; all internal non-quiz targets exist; quiz noindex; unchanged210 canonical sitemap URLs and no draft/test/API sessions.')
