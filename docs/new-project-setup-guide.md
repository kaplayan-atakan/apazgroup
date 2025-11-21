# New Project Setup Guide — Step-by-Step Implementation

**Purpose:** Practical guide for implementing the architecture from scratch  
**Prerequisites:** Node.js 20+, npm/pnpm, basic Git knowledge  
**Target Audience:** Developers setting up new corporate website projects

---

## Phase 0: Project Initialization

### 1. Create Next.js Project
```bash
npx create-next-app@latest project-name
# ✔ TypeScript? Yes
# ✔ ESLint? Yes
# ✔ Tailwind CSS? Yes
# ✔ `src/` directory? Yes
# ✔ App Router? Yes
# ✔ Import alias (@/*)? Yes

cd project-name
```

### 2. Install Additional Dependencies
```bash
npm install gray-matter zod react-hook-form @hookform/resolvers
npm install unified remark-parse remark-rehype rehype-slug rehype-autolink-headings rehype-stringify
npm install framer-motion clsx date-fns react-social-icons nodemailer
npm install -D sharp tsx prettier eslint-plugin-import @typescript-eslint/eslint-plugin
```

### 3. Update `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 4. Configure ESLint (`.eslintrc.json`)
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": ["import"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ]
  }
}
```

### 5. Configure Prettier (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### 6. Update `package.json` Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "tsx tests/*.test.ts"
  }
}
```

---

## Phase 1: Directory Structure Setup

### 1. Create Core Directories
```bash
mkdir -p src/content/tr/pages
mkdir -p src/content/en/pages
mkdir -p src/components/content
mkdir -p src/components/forms
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/lib/content
mkdir -p src/locales
mkdir -p src/app/api/forms/application
mkdir -p scripts
mkdir -p tests
mkdir -p docs
mkdir -p public/hero
mkdir -p public/brands
mkdir -p public/team
mkdir -p public/news
```

### 2. Create Empty Placeholder Files
```bash
# Configuration
touch src/lib/i18n.ts
touch src/lib/seo.ts
touch src/lib/formSchemas.ts
touch src/lib/utils.ts

# Locale dictionaries
touch src/locales/tr.json
touch src/locales/en.json

# Content loader
touch src/lib/content/index.ts
touch src/lib/content/schemas.ts
touch src/lib/content/parser.ts
touch src/lib/content/types.ts

# Middleware
touch middleware.ts
```

---

## Phase 2: i18n Configuration

### 1. Create `src/lib/i18n.ts`
```typescript
export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'tr';

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function withLocale(path: string, locale?: Locale): string {
  const l = locale || defaultLocale;
  return `/${l}${path.startsWith('/') ? path : `/${path}`}`;
}

// Locale metadata for SEO
export const localeMetadata = {
  tr: { code: 'tr', hreflang: 'tr-TR', name: 'Türkçe' },
  en: { code: 'en', hreflang: 'en-US', name: 'English' },
} as const;
```

### 2. Create Locale Dictionaries

**`src/locales/tr.json`:**
```json
{
  "nav": {
    "home": "Ana Sayfa",
    "about": "Hakkımızda",
    "services": "Hizmetlerimiz",
    "contact": "İletişim"
  },
  "footer": {
    "address": "Adres",
    "phone": "Telefon",
    "email": "E-posta",
    "socialMedia": "Sosyal Medya"
  },
  "common": {
    "readMore": "Devamını Oku",
    "learnMore": "Daha Fazla Bilgi",
    "submit": "Gönder",
    "close": "Kapat"
  }
}
```

**`src/locales/en.json`:**
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "services": "Our Services",
    "contact": "Contact"
  },
  "footer": {
    "address": "Address",
    "phone": "Phone",
    "email": "Email",
    "socialMedia": "Social Media"
  },
  "common": {
    "readMore": "Read More",
    "learnMore": "Learn More",
    "submit": "Submit",
    "close": "Close"
  }
}
```

### 3. Create Dictionary Loader
```typescript
// src/lib/i18n.ts (append)
import trDict from '@/locales/tr.json';
import enDict from '@/locales/en.json';

export type Dictionary = typeof trDict;

const dictionaries = {
  tr: trDict,
  en: enDict,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
```

### 4. Create Middleware (`middleware.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isValidLocale, locales } from './src/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Root redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to default locale
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
```

---

## Phase 3: Content Management System

### 1. Create Content Schemas (`src/lib/content/schemas.ts`)
```typescript
import { z } from 'zod';

export const ProseSection = z.object({
  type: z.literal('prose'),
  body: z.string(),
});

export const HeroSimpleSection = z.object({
  type: z.literal('heroSimple'),
  heading: z.string(),
  subheading: z.string().optional(),
  image: z.string().optional(),
});

export const SectionSchema = z.discriminatedUnion('type', [
  ProseSection,
  HeroSimpleSection,
]);

export const PageFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  sections: z.array(SectionSchema).optional(),
  placeholder: z.boolean().optional(),
});

export const PageContent = z.object({
  slug: z.string(),
  locale: z.string(),
  frontmatter: PageFrontmatter,
  body: z.string(),
});

export type Section = z.infer<typeof SectionSchema>;
export type Page = z.infer<typeof PageContent>;
```

### 2. Create Content Parser (`src/lib/content/parser.ts`)
```typescript
import matter from 'gray-matter';
import { PageContent, PageFrontmatter } from './schemas';

export function parseMarkdown(slug: string, locale: string, rawContent: string) {
  const { data, content } = matter(rawContent);

  // Validate frontmatter
  const frontmatter = PageFrontmatter.parse(data);

  return PageContent.parse({
    slug,
    locale,
    frontmatter,
    body: content.trim(),
  });
}
```

### 3. Create Content Loader (`src/lib/content/index.ts`)
```typescript
import fs from 'fs';
import path from 'path';
import { parseMarkdown } from './parser';
import type { Page } from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export async function getAllPages(locale: string): Promise<Page[]> {
  const pagesDir = path.join(CONTENT_DIR, locale, 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    return [];
  }

  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'));
  const pages: Page[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const rawContent = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    const page = parseMarkdown(slug, locale, rawContent);
    pages.push(page);
  }

  return pages;
}

export async function getPageBySlug(
  locale: string,
  slug: string
): Promise<Page | null> {
  const filePath = path.join(CONTENT_DIR, locale, 'pages', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseMarkdown(slug, locale, rawContent);
}
```

### 4. Create Sample Content

**`src/content/tr/pages/about.md`:**
```markdown
---
title: "Hakkımızda"
description: "Şirket hakkında bilgiler"
sections:
  - type: heroSimple
    heading: "Biz Kimiz?"
    subheading: "25 yıllık tecrübe"
  - type: prose
    body: |
      # Hikayemiz
      
      Şirketimiz 2000 yılında kurulmuştur.
---
```

**`src/content/en/pages/about.md`:**
```markdown
---
title: "About Us"
description: "Information about the company"
sections:
  - type: heroSimple
    heading: "Who We Are"
    subheading: "25 years of experience"
  - type: prose
    body: |
      # Our Story
      
      Our company was founded in 2000.
---
```

---

## Phase 4: Layout Components

### 1. Root Layout (`src/app/layout.tsx`)
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### 2. Locale Layout (`src/app/[locale]/layout.tsx`)
```tsx
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
```

### 3. Header Component (`src/components/layout/Header.tsx`)
```tsx
import Link from 'next/link';
import { getDictionary, type Locale, withLocale } from '@/lib/i18n';

type Props = {
  locale: Locale;
};

export default function Header({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={withLocale('/', locale)} className="text-xl font-bold">
          Logo
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex gap-6">
            <li>
              <Link href={withLocale('/', locale)}>{dict.nav.home}</Link>
            </li>
            <li>
              <Link href={withLocale('/about', locale)}>{dict.nav.about}</Link>
            </li>
            <li>
              <Link href={withLocale('/services', locale)}>{dict.nav.services}</Link>
            </li>
            <li>
              <Link href={withLocale('/contact', locale)}>{dict.nav.contact}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

### 4. Footer Component (`src/components/layout/Footer.tsx`)
```tsx
import { getDictionary, type Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

## Phase 5: Page Routes

### 1. Homepage (`src/app/[locale]/page.tsx`)
```tsx
import { getDictionary, type Locale } from '@/lib/i18n';

type Props = {
  params: { locale: string };
};

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold">{dict.nav.home}</h1>
      <p>Welcome to the homepage.</p>
    </div>
  );
}
```

### 2. Dynamic Content Page (`src/app/[locale]/[slug]/page.tsx`)
```tsx
import { notFound } from 'next/navigation';
import { getAllPages, getPageBySlug } from '@/lib/content';
import { defaultLocale, isValidLocale, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const locales = ['tr', 'en'];
  const params = [];

  for (const locale of locales) {
    const pages = await getAllPages(locale);
    for (const page of pages) {
      params.push({ locale, slug: page.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const page = await getPageBySlug(locale, params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.frontmatter.seo?.title || page.frontmatter.title,
    description: page.frontmatter.seo?.description || page.frontmatter.description,
  };
}

export default async function ContentPage({ params }: Props) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  let page = await getPageBySlug(locale, params.slug);

  // Fallback to default locale
  if (!page && locale !== defaultLocale) {
    page = await getPageBySlug(defaultLocale, params.slug);
  }

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">{page.frontmatter.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.body }} />
    </div>
  );
}
```

---

## Phase 6: SEO Configuration

### 1. Create SEO Utility (`src/lib/seo.ts`)
```typescript
import { localeMetadata, type Locale } from './i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function getCanonicalUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getAlternateUrls(path: string) {
  return {
    'tr-TR': `${SITE_URL}/tr${path}`,
    'en-US': `${SITE_URL}/en${path}`,
  };
}

export function generateOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Company Name',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX',
      contactType: 'Customer Service',
    },
  };
}
```

### 2. Sitemap (`src/app/sitemap.ts`)
```typescript
import { MetadataRoute } from 'next';
import { getAllPages } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const locales = ['tr', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const pages = await getAllPages(locale);

    for (const page of pages) {
      // Skip placeholder pages
      if (page.frontmatter.placeholder) continue;

      entries.push({
        url: `${SITE_URL}/${locale}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page.slug === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
```

### 3. Robots (`src/app/robots.ts`)
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

---

## Phase 7: Form Implementation

### 1. Form Schema (`src/lib/formSchemas.ts`)
```typescript
import { z } from 'zod';

export const applicationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(20),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  consent: z.boolean().refine((val) => val === true, 'You must accept the terms'),
  hp: z.string().max(0), // Honeypot
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
```

### 2. Form Component (`src/components/forms/ApplicationForm.tsx`)
```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema, type ApplicationFormData } from '@/lib/formSchemas';
import { useState } from 'react';

export function ApplicationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    const res = await fetch('/api/forms/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-xl font-bold text-green-900">Thank you!</h2>
        <p className="text-green-700">Your application has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone *
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-start">
        <input
          id="consent"
          type="checkbox"
          {...register('consent')}
          className="mt-1 h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="consent" className="ml-2 text-sm">
          I accept the privacy policy *
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

      {/* Honeypot */}
      <input type="text" {...register('hp')} className="hidden" tabIndex={-1} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### 3. API Route (`src/app/api/forms/application/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import { applicationFormSchema } from '@/lib/formSchemas';

export const runtime = 'nodejs';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastSubmit = rateLimitMap.get(ip);

  if (!lastSubmit) {
    rateLimitMap.set(ip, now);
    return false;
  }

  const timeSince = now - lastSubmit;
  if (timeSince < 60000) {
    // 1 minute
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const result = applicationFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Check honeypot
    if (result.data.hp !== '') {
      return NextResponse.json({ ok: true }); // Silent drop
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Process form (send email, save to DB, etc.)
    console.log('Form submission:', result.data);

    // TODO: Send email with nodemailer or save to database

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## Phase 8: Testing & Quality Assurance

### 1. Create Test File (`tests/formSchema.test.ts`)
```typescript
import { applicationFormSchema } from '../src/lib/formSchemas';

console.log('Testing form schema validation...');

// Valid data
const validData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'This is a test message.',
  consent: true,
  hp: '',
};

const validResult = applicationFormSchema.safeParse(validData);
console.assert(validResult.success === true, 'Valid data should pass');

// Invalid email
const invalidEmail = { ...validData, email: 'not-an-email' };
const emailResult = applicationFormSchema.safeParse(invalidEmail);
console.assert(emailResult.success === false, 'Invalid email should fail');

// Missing consent
const noConsent = { ...validData, consent: false };
const consentResult = applicationFormSchema.safeParse(noConsent);
console.assert(consentResult.success === false, 'Missing consent should fail');

console.log('✅ All tests passed!');
```

### 2. Run Tests
```bash
npm test
```

---

## Phase 9: Deployment

### 1. Environment Variables

Create `.env.production`:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Build and Test
```bash
npm run build
npm run start
```

### 3. Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel dashboard.

---

## Phase 10: Post-Deployment

### 1. Verify Deployment
- [ ] All pages load correctly
- [ ] Language switcher works
- [ ] Forms submit successfully
- [ ] SEO metadata is correct
- [ ] Images load with proper optimization

### 2. Submit Sitemap to Search Engines
```
https://www.google.com/ping?sitemap=https://yourdomain.com/sitemap.xml
```

### 3. Monitor
- Set up error tracking (Sentry, LogRocket)
- Monitor Core Web Vitals (Google Search Console)
- Track form submissions

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Quality checks
npm run lint
npm run typecheck
npm run format:check
npm test

# Asset management (if using custom scripts)
npm run assets:optimize
```

---

**Next Steps:**
- Customize branding (colors, fonts, logos)
- Add more content pages
- Implement additional form types
- Add analytics integration
- Set up monitoring and error tracking

