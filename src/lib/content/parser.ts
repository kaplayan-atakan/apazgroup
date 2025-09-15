import matter from 'gray-matter';
import { z } from 'zod';

import { PageDocumentSchema } from './schemas';
import type { Section } from './schemas';

// Accept a broader set of optional fields present in PageFrontmatterSchema (to avoid silently dropping them)
const frontmatterShape = z.object({
  title: z.string(),
  description: z.string().optional(),
  role: z.string().optional(),
  date: z.string().optional(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  seo: z
    .object({ title: z.string().optional(), description: z.string().optional(), keywords: z.array(z.string()).optional(), image: z.string().optional() })
    .optional(),
  componentMapping: z.record(z.any()).optional(),
  sections: z.array(z.any()).optional()
});

export function parseMarkdown(raw: string, slug: string, locale: string) {
  const rawParsed = matter(raw);
  const fm = frontmatterShape.parse(rawParsed.data);
  // If sections not provided, treat full markdown as a single prose section (body keeps markdown – rendering pipeline handles conversion)
  const sections: Section[] = (fm.sections as unknown as Section[]) || [
    { type: 'prose', body: rawParsed.content.trim() }
  ];
  const doc = PageDocumentSchema.parse({
    frontmatter: {
      title: fm.title,
      description: fm.description,
      role: fm.role,
      date: fm.date,
      image: fm.image,
      excerpt: fm.excerpt,
      seo: fm.seo,
      componentMapping: fm.componentMapping
    },
    sections,
    slug,
    locale
  });
  return doc;
}
