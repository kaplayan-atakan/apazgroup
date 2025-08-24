import { z } from 'zod';

export const PageFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  role: z.string().optional(),
  date: z.string().optional(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      image: z.string().optional()
    })
    .optional(),
  componentMapping: z.record(z.any()).optional()
});

export const SectionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('prose'), body: z.string() }),
  z.object({ type: z.literal('split'), left: z.string(), right: z.string().optional() }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  // Image + Prose split: left image, right markdown body
  z.object({
    type: z.literal('imageProse'),
    image: z.string(),
    alt: z.string().optional(),
    body: z.string()
  }),
  // Hero section with image support
  z.object({
    type: z.literal('heroSimple'),
    heading: z.string(),
    intro: z.string().optional(),
    image: z.string().optional() 
  }),
  z.object({
    type: z.literal('brandTeaser'),
    title: z.string().optional(),
    body: z.string().optional(),
    images: z.array(z.string()).optional()
  }),
  // Sprint 4 additions
  z.object({
    type: z.literal('quote'),
    text: z.string(),
    cite: z.string().optional()
  }),
  z.object({
    type: z.literal('statsGrid'),
    items: z.array(z.object({ label: z.string(), value: z.string() }))
  }),
  z.object({
    type: z.literal('brandDetail'),
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional()
  }),
  // Custom: About page logos left + rich text right
  z.object({
    type: z.literal('aboutBrands'),
    logos: z.array(z.object({ src: z.string(), alt: z.string().optional() })),
    body: z.string()
  })
]);

export const PageDocumentSchema = z.object({
  frontmatter: PageFrontmatterSchema,
  sections: z.array(SectionSchema),
  slug: z.string(),
  locale: z.string()
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type PageDocument = z.infer<typeof PageDocumentSchema>;
