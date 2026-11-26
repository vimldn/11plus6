import { BLOG_POSTS as archive, type BlockType } from './blogPosts';

export type { BlockType } from './blogPosts';

// Keep retired articles archived in source, not in public pages, lists or sitemap.
const retiredSlugs = new Set([
  'do-we-need-an-11-plus-tutor',
  'online-vs-in-person-11-plus-tutoring-which-is-better',
  'is-a-tutor-necessary-for-grammar-school-entrance',
]);

function removeRetiredLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (original, label: string, href: string) => {
    if (href === '/tutors' || href.startsWith('/tutors/') || href.startsWith('/tutors#')) return label;
    if (!href.startsWith('/blog/')) return original;
    const slug = href.slice('/blog/'.length).split(/[/?#]/, 1)[0];
    return retiredSlugs.has(slug) ? label : original;
  });
}

function cleanBlock(block: BlockType): BlockType {
  if ('text' in block) return { ...block, text: removeRetiredLinks(block.text) };
  if ('items' in block) return { ...block, items: block.items.map(removeRetiredLinks) };
  if (block.type === 'table') {
    return { ...block, headers: block.headers.map(removeRetiredLinks), rows: block.rows.map(row => row.map(removeRetiredLinks)) };
  }
  return block;
}

export const BLOG_POSTS = archive
  .filter(post => !retiredSlugs.has(post.slug))
  .map(post => ({ ...post, content: post.content.map(cleanBlock) }));

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function getAllSlugs() {
  return BLOG_POSTS.map(post => post.slug);
}
