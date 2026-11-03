'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { load } = require('./load-ts.cjs');
const { BLOG_POSTS } = load('lib/blogPosts.ts');
const { BLOG_ARTWORK, blogImageSrcSet } = load('lib/blogArtwork.ts');
const base = 'https://www.11plusexampapers.com';
const hashes = new Set();
assert(!BLOG_POSTS.some(p => p.imageUrl === '/brand/book-journey.webp'), 'Shared homepage artwork must not be an article cover');
// Include direct per-post covers as well as legacy artwork overrides.
for (const art of BLOG_POSTS.filter(p => p.imageUrl.startsWith('/blog-artwork/'))) {
  const slug = art.slug;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  assert(post, 'Unknown artwork slug ' + slug);
  assert.equal(post.imageUrl, art.imageUrl);
  assert(art.imageAlt.length > 20 && art.imageAlt.length < 200, 'Descriptive alt: ' + slug);
  const full = fs.readFileSync('public' + art.imageUrl);
  const small = fs.readFileSync('public' + art.imageUrl.replace(/\.webp$/, '-600.webp'));
  for (const b of [full, small]) { assert.equal(b.toString('ascii', 0, 4), 'RIFF'); assert.equal(b.toString('ascii', 8, 12), 'WEBP'); }
  assert(full.length < 300000 && small.length < 100000, 'Image size budget: ' + slug);
  const hash = crypto.createHash('sha256').update(full).digest('hex');
  assert(!hashes.has(hash), 'Duplicate artwork: ' + slug); hashes.add(hash);
  assert(blogImageSrcSet(art.imageUrl).includes('600w'));
  const html = fs.readFileSync('.next/server/app/blog/' + slug + '.html', 'utf8');
  assert(html.includes('src="' + art.imageUrl + '"'), 'Hero: ' + slug);
  assert(html.includes('property="og:image" content="' + base + art.imageUrl + '"'), 'OG: ' + slug);
  assert(html.includes('name="twitter:image" content="' + base + art.imageUrl + '"'), 'Twitter: ' + slug);
  assert(html.includes('"image":["' + base + art.imageUrl + '"]'), 'Article image: ' + slug);
  assert(html.includes('rel="canonical" href="' + base + '/blog/' + slug + '"'));
}
const index = fs.readFileSync('.next/server/app/blog.html', 'utf8');
// The compact directory intentionally gives only its latest 13 entries image cards.
for (const post of BLOG_POSTS.slice(0, 13)) assert(index.includes('src="' + post.imageUrl + '"'), 'Recent card cover: ' + post.slug);
for (const post of BLOG_POSTS) assert(index.includes('href="/blog/' + post.slug + '"'), 'Directory link: ' + post.slug);
assert(index.includes('loading="lazy"') && index.includes('srcSet='), 'Responsive lazy cards');
console.log('PASS', hashes.size, 'unique covers, WebP budgets, alt text, responsive variants, archive, heroes, OG/Twitter/Article images and canonicals');
