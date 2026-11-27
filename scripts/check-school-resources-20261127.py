import json,sys,subprocess,xml.etree.ElementTree as E
from pathlib import Path
from lxml import html
base=sys.argv[1].rstrip('/')
def get(p):return subprocess.check_output(['curl','-fsSL','--max-time','40',base+p])
urls=[x.text for x in E.fromstring(get('/sitemap.xml')).findall('{*}url/{*}loc')]
assert set(urls)==set(json.loads(Path('docs/releases/inventory-2026-11-27.json').read_text())['urls'])
assert not any('/tutors' in u for u in urls)
papers=html.fromstring(get('/papers'))
for school,count in [('spgs-girls',6),('pates-grammar',2)]:
 path='/schools/'+school;t=html.fromstring(get(path))
 assert len(t.xpath('//h1'))==1
 assert t.xpath('//link[@rel="canonical"]/@href')==['https://www.11plusexampapers.com'+path]
 assert 'noindex' not in ' '.join(t.xpath('//meta[@name="robots"]/@content'))
 assert path+'#sources' in papers.xpath('//a/@href')
 links=t.xpath('//*[@id="sources"]//a/@href')
 assert len([x for x in links if x.endswith('.pdf')])==count
 assert not any('/tutors' in x for x in t.xpath('//a/@href'))
 assert '/mock-exams' in t.xpath('//a/@href')
 assert any(x.startswith('/papers') for x in t.xpath('//a/@href'))
 text=t.text_content()
 if school=='spgs-girls':assert '5 December 2026' in text and 'two alternative samples' in text
 else:assert '3 July 2027' in text and 'noon on 19 March 2027' in text and 'September 2028' in text
print(json.dumps({'sitemap':len(urls),'schools':2,'officialPDFLinks':8,'metadata':True,'papersSourceAnchors':True,'noTutorLinks':True}))
