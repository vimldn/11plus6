"""Check the public sitemap's rendered pages without claiming Google index status."""
import concurrent.futures
import json
import sys
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path
import urllib.request
import urllib.error
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.title = ''; self.h1 = []; self.canonicals = []; self.metas = {}; self.links = []
        self.in_title = False; self.in_h1 = False
        self.feed(content.decode('utf-8', errors='replace'))
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.in_h1 = True; self.h1.append('')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if tag == 'meta': self.metas[a.get('name', '')] = a.get('content', '')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'h1': self.in_h1 = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_h1: self.h1[-1] += data

class Response:
    def __init__(self, raw):
        self.status_code = raw.status; self.headers = raw.headers; self.content = raw.read()
    def raise_for_status(self):
        assert self.status_code == 200, 'HTTP ' + str(self.status_code)

def get(url, timeout=25):
    try:
        with urllib.request.urlopen(url, timeout=timeout) as raw: return Response(raw)
    except urllib.error.HTTPError as raw: return Response(raw)

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3026').rstrip('/')
output = Path(sys.argv[2] if len(sys.argv) > 2 else '/tmp/11plus-rendered-verification.json')
canonical_base = 'https://www.11plusexampapers.com'
sitemap_response = get(base + '/sitemap.xml', timeout=25)
sitemap_response.raise_for_status()
root = ET.fromstring(sitemap_response.content)
urls = [node.text for node in root.findall('.//{*}loc')]
assert urls and len(urls) <= 500, 'Review sitemap scope before crawling more than 500 URLs.'
assert len(set(urls)) == len(urls), 'Duplicate sitemap URLs'

def inspect(url):
    path = urllib.parse.urlsplit(url).path
    result = {'path': path}
    try:
        response = get(base + path, timeout=25)
        soup = Page(response.content)
        title = soup.title.strip()
        canonicals = soup.canonicals
        robots = soup.metas.get('robots', '') + ' ' + response.headers.get('X-Robots-Tag', '')
        errors = []
        if response.status_code != 200: errors.append('HTTP ' + str(response.status_code))
        if len(canonicals) != 1 or canonicals[0].rstrip('/') != url.rstrip('/'): errors.append('Canonical mismatch: ' + str(canonicals))
        if len(soup.h1) != 1: errors.append('Expected one h1')
        if not title or title.count('11 Plus Exam Papers') > 1: errors.append('Missing/repeated title')
        if 'noindex' in robots.lower(): errors.append('Unexpected noindex')
        if not soup.metas.get('description'): errors.append('Missing description')
        result.update(status=response.status_code, title=title, canonical=canonicals, htmlBytes=len(response.content), errors=errors)
        if path == '/blog':
            result['articleLinks'] = len(set(a for a in soup.links if a.startswith('/blog/')))
            assert result['articleLinks'] == 159, 'Blog discovery lost existing URLs'
        if path == '/privacy':
            assert soup.h1[0].strip().lower() == 'privacy and cookie policy'
        if path == '/papers':
            result['pdfLinks'] = sorted(set(a for a in soup.links if a.endswith('.pdf') and a.startswith('/papers/')))
            assert len(result['pdfLinks']) == 8, 'Expected four question/answer pairs'
    except Exception as error:
        result['errors'] = [str(error)]
    return result

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(inspect, urls))

quiz = get(base + '/quiz?paper=visual-reviewed&mode=practice', timeout=25)
quiz_soup = Page(quiz.content)
quiz_robots = quiz_soup.metas.get('robots', '')
assert quiz.status_code == 200 and 'noindex' in quiz_robots, 'Interactive quiz must remain noindex'
assert not any('/quiz' in url or '/lesson-preview' in url or '/test' in url or '/api/' in url for url in urls)
missing = get(base + '/this-page-does-not-exist-seo-check', timeout=25)
assert missing.status_code == 404, 'Unknown routes must return 404'
summary = {'base': base, 'sitemapUrls': len(urls), 'passed': sum(not p['errors'] for p in pages), 'quizNoindex': True, 'real404': True, 'pages': pages}
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'pages'}, indent=2))
failures = [p for p in pages if p['errors']]
if failures:
    print(json.dumps(failures, ensure_ascii=False, indent=2))
    sys.exit(1)
