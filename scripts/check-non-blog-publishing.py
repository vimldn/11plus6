from pathlib import Path
from html.parser import HTMLParser
import sys,json,urllib.request,xml.etree.ElementTree as E
class Page(HTMLParser):
 def __init__(self,s):super().__init__();self.c=[];self.r=[];self.h1=0;self.text=[];self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='link' and a.get('rel')=='canonical':self.c.append(a.get('href'))
  if t=='meta' and a.get('name')=='robots':self.r.append(a.get('content',''))
  if t=='h1':self.h1+=1
 def handle_data(self,s):self.text.append(s)
host=sys.argv[1]
def read(route):return urllib.request.urlopen(host+route,timeout=60).read().decode()
base='https://www.11plusexampapers.com';schools=json.loads(Path('data/schools.catalog.json').read_text());api=json.loads(read('/api/schools'))['schools'];assert len(api)==len(schools)==50
for school in api:
 assert school['verifiedSchoolSimulation']==False and school['settingsArePracticeDefaults']==True
 assert school['defaults']['mathsOnly']=={'durationMins':45,'questionCount':25}
for school in schools:
 route='/schools/'+school['id'];p=Page(read(route));assert p.c==[base+route];assert p.h1==1;assert not any('noindex' in x for x in p.r);assert 'What is verified about this assessment?' in ' '.join(p.text)
for school in ['habs-boys','colsg-girls','hch-year7-8','mcs-oxford','kcs-wimbledon']:
 p=Page(read('/schools/'+school));assert 'checked 25 October 2026' in ' '.join(p.text)
q=Page(read('/quiz'));assert any('noindex' in x for x in q.r)
urls=[n.text for n in E.fromstring(read('/sitemap.xml')).findall('.//{*}loc')];assert len(urls)==len(set(urls))==210;assert not any(any(x in u for x in ['/quiz','/test','/api/','/lesson-preview']) for u in urls)
assert set(urls)==set(Path('docs/releases/url-inventory-practice-2026-10-25.txt').read_text().splitlines())
# This endpoint is now intentionally local reviewed-bank selection, never a paid model call.
payload=json.dumps({'schoolId':'habs-boys','subject':'Maths','quizType':'multiple-choice','count':10}).encode();req=urllib.request.Request(host+'/api/exams/generate',data=payload,headers={'Content-Type':'application/json'});r=json.loads(urllib.request.urlopen(req).read());assert r['meta']['source']=='reviewed-bank';assert r['meta']['unreviewedAIHeld']==True;assert r['meta']['verifiedSchoolSimulation']==False;assert r['meta']['uploadedPapersUsed']==False;assert len(r['questions'])==10
print('PASS50 school profiles canonical/H1/source status,50 API defaults and non-simulation flags, quiz noindex, unchanged210 sitemap and live reviewed-only school endpoint10 questions.')
