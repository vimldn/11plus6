#!/usr/bin/env python3
"""Check actual generated article, hub and sitemap output after next build."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json,xml.etree.ElementTree as E
root=Path(__file__).resolve().parents[1]
data=(root/'lib/newBlogPosts20261021.ts').read_text().split('export const OCTOBER_SKILL_POSTS: BlogPost[] = ',1)[1].strip().removesuffix(';')
posts=json.loads(data);base='https://www.11plusexampapers.com'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.canonical=[];self.robots=[];self.details=[];self.h1s=0;self.scripts=[];self.script=None
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='a':self.links.append(d.get('href',''))
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d.get('href'))
  if t=='meta' and d.get('name') in ['robots','googlebot']:self.robots.append(d.get('content',''))
  if t=='h1':self.h1s+=1
  if t=='details':self.details.append('open' in d)
  if t=='script' and d.get('type')=='application/ld+json':self.script=''
 def handle_data(self,data):
  if self.script is not None:self.script+=data
 def handle_endtag(self,t):
  if t=='script' and self.script is not None:self.scripts.append(json.loads(self.script));self.script=None

def read(route):
 p=Page();p.feed((root/'.next/server/app'/f'{route.lstrip("/")}.html').read_text());return p

def walk(o):
 if isinstance(o,dict):
  yield o
  for v in o.values():yield from walk(v)
 elif isinstance(o,list):
  for v in o:yield from walk(v)
urls=[e.text for e in E.fromstring((root/'.next/server/app/sitemap.xml.body').read_bytes()).iter() if e.tag.endswith('loc')]
assert len(urls)==len(set(urls));assert len(urls)==196,len(urls)
for url in urls:assert not any(s in url for s in ['/lesson-preview','/api/','/test'])
for p in posts:
 route='/blog/'+p['slug'];page=read(route)
 assert page.canonical==[base+route];assert page.h1s==1
 assert not any('noindex' in v for v in page.robots)
 assert page.details==[False]*8,(route,page.details)
 articles=[v for s in page.scripts for v in walk(s) if v.get('@type')=='Article']
 assert len(articles)==1
 a=articles[0];assert a['url']==base+route and a['datePublished']=='2026-10-21' and a['dateModified']=='2026-10-21'
 assert base+route in urls
 hub='/subjects/'+p['subject'];assert hub in page.links and route in read(hub).links
 for target in page.links:
  u=urlsplit(target)
  if u.scheme or u.netloc or not u.path.startswith('/'):continue
  path=u.path.rstrip('/') or '/'
  if path=='/':filename=root/'.next/server/app/index.html'
  else:filename=root/'.next/server/app'/f'{path.lstrip("/")}.html'
  compiled=root/'.next/server/app'/path.lstrip('/')/'page.js'
  assert filename.exists() or compiled.exists(),(route,target)
 assert route in read('/blog').links
print('PASS: five generated blogs, 40 initially closed answer controls, self canonicals, single H1, Article dates, indexability, reciprocal hubs, all internal targets and 196 unique sitemap URLs.')
