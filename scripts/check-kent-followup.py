import sys,json,subprocess,concurrent.futures,xml.etree.ElementTree as E
from lxml import html
from pathlib import Path
base=sys.argv[1].rstrip('/')
paths=['/sitemap.xml','/blog/kent-test-2027-quest-assessments','/blog/free-11-plus-resources-and-websites','/papers','/exam-dates','/mock-exams']
def get(p):return p,subprocess.check_output(['curl','-fsSL','--max-time','45',base+p])
data=dict(concurrent.futures.ThreadPoolExecutor(6).map(get,paths))
urls=[x.text for x in E.fromstring(data['/sitemap.xml']).findall('{*}url/{*}loc')]
assert set(urls)==set(Path('docs/releases/url-inventory-2026-11-22.txt').read_text().splitlines())
out=[]
for p in paths[1:3]:
 t=html.fromstring(data[p]);text=t.text_content()
 assert len(t.xpath('//h1'))==1
 assert t.xpath('//link[@rel="canonical"]/@href')==['https://www.11plusexampapers.com'+p]
 assert t.xpath('//meta[@name="description"]/@content')
 assert 'noindex' not in ' '.join(t.xpath('//meta[@name="robots"]/@content'))
 assert '2026-11-22' in data[p].decode()
 assert 'September 2028' in text and 'Quest' in text
 assert 'familiarisation is awaited' not in text
 assert '/brand/book-journey.webp' not in ' '.join(t.xpath('//main//img/@src'))
 assert any('/papers' in a for a in t.xpath('//main//a/@href'))
 schemas=[json.loads(x) for x in t.xpath('//script[@type="application/ld+json"]/text()')]
 nodes=[n for x in schemas for n in (x.get('@graph',[x]) if isinstance(x,dict) else x)]
 assert any(x.get('dateModified','').startswith('2026-11-22') for x in nodes if isinstance(x,dict))
 out.append({'path':p,'title':t.xpath('//title/text()')[0],'canonical':True,'updatedAt':'2026-11-22','schema':True})
assert paths[1] in html.fromstring(data['/exam-dates']).xpath('//a/@href')
assert paths[2] in html.fromstring(data['/papers']).xpath('//a/@href')
assert html.fromstring(data['/papers']).xpath('//*[@id="official-materials"]')
assert html.fromstring(data['/mock-exams']).xpath('//*[@id="kent-paper-format"]')
result={'date':'2026-11-22','base':base,'sitemapURLs':len(urls),'pages':out,'existingReciprocalLinks':True}
Path(sys.argv[2]).write_text(json.dumps(result,indent=2));print(json.dumps(result))
