import subprocess,sys,json,xml.etree.ElementTree as E
from pathlib import Path
from lxml import html
base=sys.argv[1].rstrip('/')
def get(p):return subprocess.check_output(['curl','-fsSL','--max-time','40',base+p])
t=html.fromstring(get('/subjects/maths'))
assert len(t.xpath('//h1'))==1
assert t.xpath('//link[@rel="canonical"]/@href')==['https://www.11plusexampapers.com/subjects/maths']
assert t.xpath('//title/text()') and t.xpath('//meta[@name="description"]/@content')
assert 'noindex' not in ' '.join(t.xpath('//meta[@name="robots"]/@content'))
d=t.xpath('//*[@id="topic-practice"]//details');assert len(d)==8
for node,answer in zip(d,['46','36','210','13','21','575','84','14']):assert answer in node.text_content()
links=t.xpath('//*[@id="topic-practice"]//a/@href')
assert '/blog/11-plus-money-best-value' in links
u=[x.text for x in E.fromstring(get('/sitemap.xml')).findall('{*}url/{*}loc')]
assert set(u)==set(Path('docs/releases/url-inventory-2026-11-25.txt').read_text().splitlines())
assert len(u)==len(set(u))==285
for href in links:
 assert 'https://www.11plusexampapers.com'+href in u or href.startswith('/quiz?')
m=html.fromstring(get('/blog/11-plus-money-best-value'));assert '/subjects/maths' in m.xpath('//a/@href')
assert '/subjects/maths' in html.fromstring(get('/papers')).xpath('//a/@href')
print(json.dumps({'base':base,'workedAnswers':8,'sitemapURLs':285,'moneyReciprocalLink':True,'papersHubLink':True,'metadata':True,'allTopicLinksResolveToPublishedRoutesOrQuiz':True}))
