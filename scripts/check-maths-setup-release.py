import sys,json,subprocess,concurrent.futures,xml.etree.ElementTree as E
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
from lxml import html
base=sys.argv[1].rstrip('/')
canonical='https://www.11plusexampapers.com'
topics=['arithmetic','fractions','percentages','algebra','word-problems','money','geometry','data']
paths=['/subjects/maths','/mock-exams','/papers','/sitemap.xml']+['/mock-exams?subject=maths&topic='+t for t in topics]+['/mock-exams?subject=maths&topic=constructor','/mock-exams?subject=english&topic=algebra','/mock-exams?subject=verbal&topic=algebra','/mock-exams?subject=nonverbal&topic=algebra']
def get(p):return p,subprocess.check_output(['curl','-fsSL','--max-time','40',base+p])
data=dict(concurrent.futures.ThreadPoolExecutor(8).map(get,paths))
urls=[x.text for x in E.fromstring(data['/sitemap.xml']).findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls))==285
assert set(urls)==set(Path('docs/releases/url-inventory-2026-11-24.txt').read_text().splitlines())
assert not any('?' in u or any('/'+t in u for t in ['api/','preview/','quiz','test']) for u in urls)
checked=[]; targets=set()
for p in paths:
 if p=='/sitemap.xml':continue
 tree=html.fromstring(data[p]);path=urlsplit(p).path
 assert len(tree.xpath('//h1'))==1,p
 assert tree.xpath('//link[@rel="canonical"]/@href')==[canonical+path],p
 assert tree.xpath('//title/text()') and tree.xpath('//meta[@name="description"]/@content'),p
 assert 'noindex' not in ' '.join(tree.xpath('//meta[@name="robots"]/@content')),p
 assert canonical+path in urls
 if path=='/mock-exams':
  q=parse_qs(urlsplit(p).query);subject=q.get('subject',['maths'])[0];topic=q.get('topic',[''])[0]
  selected=tree.xpath('//select[@id="maths-practice-topic"]/option[@selected]/@value')
  if subject=='maths':
   assert selected==[topic if topic in topics else ''],(p,selected)
   assert ('10 questions' if topic in topics else '16 questions') in tree.text_content(),p
  else:assert not tree.xpath('//select[@id="maths-practice-topic"]'),p
  assert tree.xpath('//*[@id="configure-practice"]')
 if p in ['/subjects/maths','/mock-exams']:
  for href in tree.xpath('//main//a/@href'):
   u=urlsplit(href)
   if href.startswith('/'):
    assert canonical+u.path in urls or u.path=='/quiz',href
    targets.add(u.path)
  checked.append(p)
hub=html.fromstring(data['/subjects/maths'])
for topic in topics:
 href='/mock-exams?subject=maths&topic='+topic+'#configure-practice'
 assert href in hub.xpath('//a/@href'),href
mock=html.fromstring(data['/mock-exams'])
assert '/subjects/maths' in mock.xpath('//a/@href')
# Follow every new method destination including its fragment.
links=set()
for topic in topics:
 tree=html.fromstring(data['/mock-exams?subject=maths&topic='+topic])
 links.update(tree.xpath('//a[contains(.,"Learn the methods first")]/@href'))
methods=dict(concurrent.futures.ThreadPoolExecutor(8).map(get,sorted({urlsplit(p).path for p in links})))
for href in links:
 u=urlsplit(href);tree=html.fromstring(methods[u.path])
 if u.fragment:assert tree.xpath('//*[@id=$id]',id=u.fragment),href
 assert '/subjects/maths' in tree.xpath('//a/@href') or u.path=='/subjects/maths',href
# Existing maths question and answer downloads retain exact local bytes.
papers=html.fromstring(data['/papers']);pdfs=[p for p in papers.xpath('//a/@href') if p.startswith('/') and p.endswith('.pdf') and 'maths' in p]
for p in set(pdfs):
 _,body=get(p);assert body.startswith(b'%PDF') and body==Path('public'+p).read_bytes(),p
result={'base':base,'changedPages':checked,'setupVariants':len(paths)-4,'newTopicLinks':8,'methodDestinations':sorted(links),'sitemapURLs':len(urls),'publishedInternalPathsValidated':len(targets),'mathsPDFs':len(set(pdfs)),'canonicalHeadingDescriptionRobots':True,'indexStatus':'Not measured; technical checks are not URL Inspection'}
print(json.dumps(result,indent=2))
if len(sys.argv)>2:Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
