import path from 'node:path';

import { normalizeSlug } from '../slug';
import { defaultLocale } from '../i18n';
import { parseISODateToUTCNoon } from '../date';

import { listMarkdownFiles, readMarkdownFile } from './fs';
import { parseMarkdown } from './parser';
import type { PageDocument } from './schemas';


const cache = new Map<string, PageDocument | PageDocument[] | null>();

export function getAllPages(locale: string): PageDocument[] {
  const key = `all:${locale}`;
  if (process.env.NODE_ENV !== 'production' && cache.has(key)) {
    const cached = cache.get(key);
    if (Array.isArray(cached)) return cached as PageDocument[];
  }
  const files = listMarkdownFiles(locale);
  const pages = files
    .map((f: string) => {
      const raw = readMarkdownFile(locale, f);
  const rawSlug = path.basename(f, '.md');
  const slug = normalizeSlug(rawSlug);
      return raw ? parseMarkdown(raw, slug, locale) : null;
    })
    .filter((p): p is PageDocument => p !== null);
  if (process.env.NODE_ENV !== 'production') cache.set(key, pages);
  return pages;
}

export function getPageBySlug(locale: string, slug: string): PageDocument | null {
  const key = `one:${locale}:${slug}`;
  if (process.env.NODE_ENV !== 'production' && cache.has(key)) {
    const cached = cache.get(key);
    if (cached && !Array.isArray(cached)) return cached;
  }
  // Try direct locale first
  const fileName = `${slug}.md`;
  const candidates = [
    fileName,
    path.join('pages', fileName),
    path.join('management', fileName),
    path.join('news', fileName)
  ];
  let raw: string | null = null;
  for (const rel of candidates) {
    raw = readMarkdownFile(locale, rel);
    if (raw) break;
  }
  if (!raw && locale !== defaultLocale) {
    // Fallback to default locale file
    for (const rel of candidates) {
      raw = readMarkdownFile(defaultLocale, rel);
      if (raw) break;
    }
    if (raw && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[i18n-fallback] Using ${defaultLocale} content for missing ${locale}/${slug}`);
    }
  }
  if (!raw) return null;
  const page = parseMarkdown(raw, slug, locale);
  if (process.env.NODE_ENV !== 'production') cache.set(key, page);
  return page;
}

export function getManagementPeople(locale: string): PageDocument[] {
  // List all markdown files and filter those under management/
  const files = listMarkdownFiles(locale).filter((rel: string) => rel.startsWith('management/'));
  const docs: PageDocument[] = files
    .map((rel: string) => {
      const raw = readMarkdownFile(locale, rel);
      if (!raw) return null;
      const rawSlug = path.basename(rel, '.md');
      const slug = normalizeSlug(rawSlug);
      return parseMarkdown(raw, slug, locale);
    })
    .filter((d): d is PageDocument => d !== null);
  return docs;
}

export function getAllNews(locale: string): PageDocument[] {
  const files = listMarkdownFiles(locale).filter((rel: string) => rel.startsWith('news/'));
  const docs: PageDocument[] = files
    .map((rel: string) => {
      const raw = readMarkdownFile(locale, rel);
      if (!raw) return null;
      const rawSlug = path.basename(rel, '.md');
      const slug = normalizeSlug(rawSlug);
      return parseMarkdown(raw, slug, locale);
    })
  .filter((d): d is PageDocument => d !== null)
  // Exclude archived or draft news (optional flags default false)
  .filter((d: PageDocument) => !d.frontmatter.archived && !d.frontmatter.draft)
    // sort by date descending if available in frontmatter.date
      .sort((a, b) => {
        const da = a.frontmatter.date ? (parseISODateToUTCNoon(a.frontmatter.date)?.getTime() ?? 0) : 0;
        const db = b.frontmatter.date ? (parseISODateToUTCNoon(b.frontmatter.date)?.getTime() ?? 0) : 0;
      return db - da;
    });
  return docs;
}
