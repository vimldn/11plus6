"""Verify the released artwork collection against its local provenance manifest."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import urllib.request
import xml.etree.ElementTree as ET

BASE = 'https://www.11plusexampapers.com'
items = json.loads(Path('docs/artwork/blog-artwork-2026-10-30.json').read_text())['items']

def get(path):
    with urllib.request.urlopen(BASE + path, timeout=30) as response:
        assert response.status == 200 and response.url == BASE + path, path
        assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower(), path
        return response.read()

def check(item):
    slug = item['slug']
    cover = item['path'].removeprefix('public')
    for asset in (item['path'], item['thumbnail']):
        actual = get(asset.removeprefix('public'))
        assert hashlib.sha256(actual).hexdigest() == hashlib.sha256(Path(asset).read_bytes()).hexdigest(), asset
    html = get('/blog/' + slug).decode()
    assert 'src="' + cover + '"' in html, slug
    assert 'property="og:image" content="' + BASE + cover + '"' in html, slug
    assert 'name="twitter:image" content="' + BASE + cover + '"' in html, slug
    assert '"image":["' + BASE + cover + '"]' in html, slug
    assert 'rel="canonical" href="' + BASE + '/blog/' + slug + '"' in html, slug
    return slug

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    checked = list(pool.map(check, items))
index = get('/blog').decode()
for item in items:
    assert 'src="' + item['path'].removeprefix('public') + '"' in index
urls = [node.text for node in ET.fromstring(get('/sitemap.xml')).iter() if node.tag.endswith('loc')]
assert len(urls) == len(set(urls))
assert all(BASE + '/blog/' + slug in urls for slug in checked)
print('PASS', len(checked), 'public article covers/social/schema/canonicals;', len(checked) * 2, 'assets match local SHA256; archive and sitemap verified')
