import subprocess,json,sys,xml.etree.ElementTree as E
from pathlib import Path
from lxml import html
from urllib.parse import urlsplit,urljoin
from concurrent.futures import ThreadPoolExecutor
base=sys.argv[1].rstrip('/');root='https://www.11plusexampapers.com'
def get(p):return subprocess.check_output(['curl','-fsSL','--max-time','40',base+p])
u=[x.text for x in E.fromstring(get('/sitemap.xml')).findall('{*}url/{*}loc')]
assert set(u)==set(Path('docs/releases/url-inventory-2026-11-19.txt').read_text().splitlines())
assert len(u)==len(set(u))==285
assert not any(any(s in x for s in ['/preview','/test','/api/','/quiz']) for x in u)
pages={p:html.fromstring(get(p)) for p in ['/exam-dates','/schools/latymer']};targets=set();checks=[]
for p,t in pages.items():
 assert t.xpath('//link[@rel="canonical"]/@href')==[root+p];assert len(t.xpath('//h1'))==1
 assert t.xpath('//meta[@name="description"]/@content') and t.xpath('//title/text()')
 assert not any('noindex' in x for x in t.xpath('//meta[@name="robots"]/@content'))
 for href in t.xpath('//main//a/@href'):
  a=urlsplit(urljoin(root+p,href))
  if a.netloc=='www.11plusexampapers.com':
   assert root+a.path in u;targets.add((a.path+('?' + a.query if a.query else ''),a.fragment))
 text=t.text_content()
 for term in ['22 December 2026','28 February 2027','September 2028','September 2027','29 April 2027','unconfirmed']:
  assert term in text,term
 checks.append({'url':root+p,'canonical':True,'singleH1':True,'metadata':True,'noMetaNoindex':True})
assert '/schools/latymer' in pages['/exam-dates'].xpath('//main//a/@href')
assert '/exam-dates#latymer-2027-tests' in pages['/schools/latymer'].xpath('//main//a/@href')
assert 'GL Assessment (2-stage)' not in pages['/schools/latymer'].text_content()
assert 'Current format not verified here' not in pages['/schools/latymer'].text_content()
calendar=pages['/exam-dates'].text_content()
assert 'Independent school admissions this week' not in calendar
assert '31 Oct 2026' in calendar
assert '30 Oct 2026' not in calendar
assert 'redbridge-2027-tests' in pages['/exam-dates'].xpath('//*[@id]/@id')
assert 'Exact 2027 registration and test dates, and the format for that cohort, remain unconfirmed here.' in calendar
assert 'Sources checked 19 November 2026' in calendar
assert 'one week until 31 October' not in calendar
assert 'begin this week' not in calendar
assert '24 June 2027' in calendar and 'now past' in calendar
card=pages['/exam-dates'].xpath('//*[contains(text(),"The Latymer School (Edmonton) — September 2027 entry")]');assert card
assert '17 Mar–2 Jun 2026' in pages['/exam-dates'].text_content()
assert '3, 4 or 5 Sep 2026' in pages['/exam-dates'].text_content()
def check(x):
 p,f=x;t=html.fromstring(get(p));assert not f or t.xpath('//*[@id=$f]',f=f);return p
with ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(check,targets))
for subject,count in [('maths',16),('english',20)]:
 t=html.fromstring(get('/mock-exams?subject='+subject));assert str(count)+' questions' in t.xpath('//*[@aria-live="polite"]')[0].text_content()
 assert t.xpath('//link[@rel="canonical"]/@href')==[root+'/mock-exams']
for p in ['/subjects/english/comprehension-retrieval','/subjects/english/comprehension-inference']:
 t=html.fromstring(get(p));assert t.xpath('//details/summary'),p
for name in ['maths','english']:
 for suffix in ['practice','worked-answers']:
  assert get('/papers/'+name+'-'+suffix+'.pdf').startswith(b'%PDF-')
r={'checkedAt':'2026-11-19','base':base,'pages':checks,'sitemapURLs':len(u),'internalTargetsAndFragments':len(targets),'reciprocalLinks':True,'linkedLessonDisclosuresPresent':2,'matchingPracticeSetupVariants':2,'questionAndAnswerPDFs':4,'indexing':'not inspected'}
Path(sys.argv[2]).write_text(json.dumps(r,indent=2)+'\n');print(r)
