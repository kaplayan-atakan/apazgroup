# Next.js 14 Multi-Language Corporate Site — Project Skeleton Architecture

**Version:** 1.0.0  
**Last Updated:** 2025-11-12  
**Purpose:** Brand-agnostic architectural blueprint for modern, multi-language, accessible corporate websites

---

## 1. Architecture Overview

### Core Philosophy
- **Framework-First**: Leverage Next.js 14 App Router native capabilities
- **Content-Driven**: Markdown-based content with strict type validation
- **Multi-Language by Default**: URL-prefix locale pattern with fallback support
- **Performance-First**: Optimized assets, blur placeholders, efficient caching
- **Accessibility-First**: WCAG AA compliance, semantic HTML, keyboard navigation
- **SEO-Optimized**: Metadata API, structured data (JSON-LD), dynamic sitemaps
- **Type-Safe**: TypeScript strict mode, Zod validation, compile-time guarantees

### Technology Stack

**Core Framework:**
- Next.js 14.2.5+ (App Router)
- React 18.3+
- TypeScript 5.4+ (strict mode)

**Styling:**
- Tailwind CSS 3.4+
- CSS Variables for theme tokens
- Responsive-first approach

**Content Management:**
- Markdown files with frontmatter (gray-matter)
- Zod schemas for type validation
- Custom content loader (build-time parsing)

**Form Handling:**
- react-hook-form 7.51+
- @hookform/resolvers + Zod
- Server-side validation + rate limiting

**Asset Pipeline:**
- Sharp for image optimization
- WebP/AVIF automatic generation
- Blur placeholder pre-generation

**SEO & Structured Data:**
- Next.js Metadata API
- JSON-LD (Organization, Article schemas)
- Dynamic sitemap generation
- robots.txt configuration

---

## 2. Directory Structure

```
project-root/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    # CI/CD pipeline (lint/typecheck/test/build)
│   └── copilot-instructions.md       # Project-specific AI guidance
│
├── docs/
│   ├── agent-brief.md                # Quick reference for automation/agents
│   ├── accessibility-*.md            # A11y testing and improvement docs
│   └── project-skeleton-architecture.md  # This file
│
├── public/
│   ├── hero/                         # Hero section images
│   ├── brands/                       # Brand logos and imagery
│   ├── team/                         # Team member photos
│   ├── news/                         # News article images
│   ├── icons/                        # SVG icons (if not inline)
│   └── fonts/                        # Self-hosted fonts (optional)
│
├── scripts/
│   ├── fetch-legacy-assets.mjs       # Asset optimization pipeline (sharp)
│   ├── audit-content-parity.mjs      # Content completeness checker
│   ├── ci-a11y-tests.mjs             # Accessibility audit script
│   └── test-smtp.mjs                 # Email configuration tester (optional)
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # Root layout (HTML/body wrapper)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── [slug]/               # Dynamic catch-all content pages
│   │   │   │   └── page.tsx
│   │   │   ├── (placeholders)/       # Future content pages (noindex)
│   │   │   │   ├── privacy/page.tsx
│   │   │   │   └── cookies/page.tsx
│   │   │   └── contact/              # Static specialized pages
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── forms/
│   │   │       └── application/      # Form submission endpoint
│   │   │           └── route.ts
│   │   ├── sitemap.ts                # Dynamic sitemap generator
│   │   ├── robots.ts                 # robots.txt generator
│   │   └── layout.tsx                # Root HTML wrapper
│   │
│   ├── components/
│   │   ├── content/
│   │   │   ├── ContentArticle.tsx    # Central markdown renderer
│   │   │   ├── MarkdownSection.tsx   # Section type renderers
│   │   │   └── PlaceholderNotice.tsx # Placeholder page banner
│   │   ├── forms/
│   │   │   └── ApplicationForm.tsx   # Generic application form
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Site header + navigation
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   └── Navigation.tsx        # Mobile + desktop nav
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Hero/banner sections
│   │   │   └── BrandGrid.tsx         # Brand showcase grids
│   │   └── ui/
│   │       ├── Button.tsx            # Base button component
│   │       ├── Icon.tsx              # SVG icon wrapper
│   │       └── BackToTop.tsx         # Scroll-to-top button
│   │
│   ├── content/
│   │   ├── tr/
│   │   │   └── pages/
│   │   │       ├── about.md          # Turkish content
│   │   │       ├── services.md
│   │   │       └── ...
│   │   └── en/
│   │       └── pages/
│   │           ├── about.md          # English content (or fallback to TR)
│   │           └── ...
│   │
│   ├── lib/
│   │   ├── content/
│   │   │   ├── index.ts              # Content loader API
│   │   │   ├── schemas.ts            # Zod content schemas
│   │   │   ├── parser.ts             # Markdown parsing logic
│   │   │   └── types.ts              # Derived TypeScript types
│   │   ├── i18n.ts                   # Locale utilities + dictionaries
│   │   ├── seo.ts                    # SEO metadata generators
│   │   ├── formSchemas.ts            # Zod form validation schemas
│   │   ├── asset-blur-map.json       # Pre-generated blur placeholders
│   │   └── utils.ts                  # Generic utilities
│   │
│   ├── locales/
│   │   ├── tr.json                   # Turkish UI translations
│   │   └── en.json                   # English UI translations
│   │
│   └── styles/
│       └── globals.css               # Global styles + Tailwind directives
│
├── tests/
│   └── formSchema.test.ts            # Form validation tests
│
├── types/
│   └── global.d.ts                   # Global type declarations
│
├── middleware.ts                     # Locale redirect + normalization
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind theme configuration
├── tsconfig.json                     # TypeScript configuration
├── .eslintrc.json                    # ESLint rules
├── .prettierrc                       # Prettier formatting
└── package.json                      # Dependencies + scripts
```

---

## 3. Configuration Standards

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "incremental": true
  }
}
```

**Key Principles:**
- Strict mode enabled
- No unchecked indexed access (safer array/object access)
- ESNext features for modern JS
- Incremental builds for speed

### Next.js (`next.config.js`)
```javascript
{
  reactStrictMode: true,
  experimental: {
    typedRoutes: true  // Type-safe route generation
  },
  images: {
    remotePatterns: []  // Configure if loading external images
  }
}
```

**Key Features:**
- Typed routes for compile-time route checking
- Image optimization enabled by default
- Headers for security and SEO
- Redirects for legacy URL support (301/302)

### Tailwind (`tailwind.config.ts`)
```typescript
{
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Define brand colors here (see section 4)
      },
      fontFamily: {
        // Define typography scale
      }
    }
  }
}
```

**Key Principles:**
- Extend default theme (don't override)
- Use semantic color names (`primary`, `secondary`, `accent`)
- Define brand-specific shadows, spacing, and typography

### ESLint (`.eslintrc.json`)
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": ["import"],
  "rules": {
    "import/order": ["warn", { /* group ordering */ }]
  }
}
```

**Key Rules:**
- Import ordering enforcement
- TypeScript best practices
- Tailwind class ordering (optional)
- Next.js specific optimizations

---

## 4. Core Features Implementation

### 4.1 Multi-Language (i18n) Architecture

**URL Pattern:**
```
/                    → Redirects to /[defaultLocale]
/tr/about            → Turkish content
/en/about            → English content (or fallback to TR)
```

**Implementation Files:**
- `middleware.ts`: Locale detection, redirects, normalization
- `src/lib/i18n.ts`: Locale utilities, dictionaries, helpers
- `src/locales/{locale}.json`: UI string translations

**Fallback Strategy:**
```typescript
// If EN content doesn't exist, serve TR content with optional noindex flag
const content = await getPageBySlug('en', 'about') 
  ?? await getPageBySlug('tr', 'about');
```

**Key Features:**
- URL prefix pattern (`/tr`, `/en`)
- Automatic locale detection from Accept-Language header
- Fallback to primary locale if translation missing
- Language switcher in header (preserves current page slug)
- SEO: `hreflang` alternates for all locales

### 4.2 Content Management System

**Content Structure:**
```markdown
---
title: "Page Title"
description: "Meta description"
seo:
  title: "Optional SEO override"
  description: "Optional SEO description"
sections:
  - type: heroSimple
    heading: "Hero Heading"
    subheading: "Optional subtitle"
  - type: prose
    body: |
      Markdown content here...
---

# Additional markdown content (if not in sections)
```

**Content Loader API:**
```typescript
// src/lib/content/index.ts
export async function getAllPages(locale: string): Promise<Page[]>
export async function getPageBySlug(locale: string, slug: string): Promise<Page | null>
```

**Content Validation:**
- Zod schemas in `src/lib/content/schemas.ts`
- Compile-time type checking
- Runtime validation during build
- Clear error messages for invalid content

**Section Types (Extensible):**
- `prose`: Standard markdown content
- `heroSimple`: Hero banner with heading/image
- `brandTeaser`: Brand showcase grid
- `split`: Two-column text + image
- `list`: Bullet/numbered list with optional images

### 4.3 SEO & Structured Data

**Metadata Generation:**
```typescript
// Every page.tsx implements generateMetadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Page Title",
    description: "Meta description",
    alternates: {
      canonical: `/tr/page-slug`,
      languages: {
        'tr': '/tr/page-slug',
        'en': '/en/page-slug'
      }
    },
    openGraph: {
      title: "OG Title",
      description: "OG Description",
      url: "https://domain.com/tr/page-slug",
      siteName: "Site Name",
      locale: 'tr_TR',
      type: 'website'
    },
    robots: {
      index: true,
      follow: true
    }
  }
}
```

**JSON-LD Structured Data:**
```typescript
// Organization schema (in root layout)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png"
}
</script>

// Article schema (in content pages)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2025-01-01",
  "author": { "@type": "Organization", "name": "Company Name" }
}
</script>
```

**Sitemap Generation:**
```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages('tr');
  
  return pages.map(page => ({
    url: `https://domain.com/tr/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: page.slug === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        tr: `/tr/${page.slug}`,
        en: `/en/${page.slug}`
      }
    }
  }));
}
```

**robots.txt:**
```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/']
    },
    sitemap: 'https://domain.com/sitemap.xml'
  }
}
```

### 4.4 Asset Optimization Pipeline

**Script:** `scripts/fetch-legacy-assets.mjs`

**Capabilities:**
1. Copy/download images from legacy source
2. Generate WebP + AVIF variants
3. Create responsive sizes (if needed)
4. Generate blur placeholders (base64 data URLs)
5. Output `asset-blur-map.json` for component use

**Blur Placeholder Strategy:**
```typescript
// src/lib/asset-blur-map.json
{
  "/hero/homepage.jpg": "data:image/webp;base64,UklGRi4...",
  "/brands/logo1.png": "data:image/webp;base64,UklGRi4..."
}
```

**Component Usage:**
```tsx
import blurMap from '@/lib/asset-blur-map.json';

<Image
  src="/hero/homepage.jpg"
  alt="Hero Image"
  width={1920}
  height={1080}
  placeholder="blur"
  blurDataURL={blurMap["/hero/homepage.jpg"]}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Optimization Filters:**
- Skip very small images (<16KB) from blur generation
- Skip SVG files (already vector)
- Generate blur only for above-the-fold/LCP images

### 4.5 Form Handling

**Form Architecture:**
- UI: `react-hook-form` + Zod validation
- API: Next.js Route Handler (Node runtime for email/file handling)
- Security: Honeypot spam trap + IP rate limiting

**Zod Schema:**
```typescript
// src/lib/formSchemas.ts
export const applicationFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  position: z.string().optional(),
  message: z.string().min(10).max(2000),
  consent: z.boolean().refine(val => val === true),
  hp: z.string().max(0) // Honeypot (must be empty)
});
```

**Form Component:**
```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function ApplicationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(applicationFormSchema)
  });

  const onSubmit = async (data) => {
    const res = await fetch('/api/forms/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    // Handle response...
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

**API Route:**
```typescript
// src/app/api/forms/application/route.ts
export const runtime = 'nodejs'; // For nodemailer or file uploads

export async function POST(request: Request) {
  // 1. Parse body
  const body = await request.json();
  
  // 2. Validate with Zod
  const result = applicationFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ ok: false, errors: result.error.flatten() });
  }
  
  // 3. Check honeypot
  if (result.data.hp !== '') {
    return NextResponse.json({ ok: true }); // Silent drop
  }
  
  // 4. Rate limiting (IP-based in-memory cache)
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(clientIP)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }
  
  // 5. Process form (send email, save to DB, etc.)
  // await sendEmail(result.data);
  
  return NextResponse.json({ ok: true });
}
```

**Security Features:**
- Honeypot field (hidden from users, bots fill it)
- IP-based rate limiting (e.g., 3 submissions per hour)
- Server-side validation (never trust client)
- CSRF protection via Next.js built-in mechanisms

### 4.6 Accessibility (A11y) Standards

**Compliance Target:** WCAG 2.1 Level AA

**Key Requirements:**
1. **Semantic HTML:** Use proper heading hierarchy, landmarks (`<nav>`, `<main>`, `<footer>`)
2. **Keyboard Navigation:** All interactive elements accessible via Tab/Enter/Space
3. **Focus Management:** Visible focus indicators, logical tab order, focus restoration
4. **ARIA Attributes:** When semantic HTML insufficient (`aria-label`, `aria-expanded`, etc.)
5. **Color Contrast:** 4.5:1 for normal text, 3:1 for large text/UI components
6. **Alt Text:** Descriptive text for all meaningful images
7. **Form Labels:** Explicit `<label>` or `aria-label` for all inputs
8. **Error Messages:** Clearly associated with form fields via `aria-describedby`

**Testing Scripts:**
```bash
npm run audit:a11y          # Run automated a11y checks
npm run audit:motion        # Test prefers-reduced-motion support
npm run audit:ci            # CI-friendly combined audit
```

**Example Implementation:**
```tsx
// Accessible button with loading state
<button
  type="submit"
  disabled={isSubmitting}
  aria-busy={isSubmitting}
  aria-label={isSubmitting ? "Submitting form..." : "Submit form"}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>

// Accessible navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about" aria-current={isActive ? 'page' : undefined}>About</a></li>
  </ul>
</nav>
```

---

## 5. Development Workflow

### 5.1 NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",                    // Development server
    "build": "next build",                // Production build
    "start": "next start",                // Production server
    "lint": "eslint . --ext .ts,.tsx",    // Lint code
    "typecheck": "tsc --noEmit",          // Type checking
    "format": "prettier --write .",       // Format code
    "format:check": "prettier --check .", // Check formatting
    
    "assets:pull": "node scripts/fetch-legacy-assets.mjs",
    "assets:optimize": "node scripts/fetch-legacy-assets.mjs --optimize",
    "assets:sync": "node scripts/fetch-legacy-assets.mjs --optimize --force",
    
    "audit:content": "node scripts/audit-content-parity.mjs",
    "audit:a11y": "node scripts/a11y-audit.mjs",
    "audit:ci": "node scripts/ci-a11y-tests.mjs",
    
    "test": "tsx tests/*.test.ts"
  }
}
```

### 5.2 Git Workflow

**Branch Strategy:**
- `main` (or `master`): Production-ready code
- `feature/{feature-name}`: New features
- `fix/{bug-name}`: Bug fixes
- `content/{locale}/{slug}`: Content updates

**Commit Message Convention:**
```
type(scope): subject

Examples:
feat(i18n): add Portuguese locale support
fix(forms): resolve email validation regex
content(tr/about): update company history section
refactor(content): extract section renderers
docs(readme): add deployment instructions
```

### 5.3 CI/CD Pipeline

**GitHub Actions (`.github/workflows/ci.yml`):**
```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run format:check
      - run: npm test
      - run: npm run build
      - run: npm run audit:ci
```

**Quality Gates:**
1. ESLint must pass (no errors, warnings acceptable)
2. TypeScript compilation must succeed
3. Prettier formatting must be consistent
4. All tests must pass
5. Build must complete successfully
6. Accessibility audit must have no critical issues

---

## 6. Content Creation Guidelines

### 6.1 Adding New Pages

**Step 1:** Create markdown file
```bash
# File: src/content/tr/pages/new-page.md
---
title: "New Page Title"
description: "Meta description for SEO"
seo:
  title: "Optional SEO Title Override"
sections:
  - type: heroSimple
    heading: "Page Hero Heading"
    image: "/hero/new-page.jpg"
  - type: prose
    body: |
      # Main Content Heading
      
      Your markdown content here...
---
```

**Step 2:** Create English version (or rely on fallback)
```bash
# File: src/content/en/pages/new-page.md
# (Same structure, translated content)
```

**Step 3:** Build and verify
```bash
npm run build
# Check output for /tr/new-page and /en/new-page routes
```

**Step 4:** Add to navigation (if needed)
```typescript
// src/navigation.config.ts or equivalent
export const navItems = [
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.newPage', href: '/new-page' }, // Add this
];
```

### 6.2 Content Section Types

**1. Prose (Standard Markdown):**
```yaml
- type: prose
  body: |
    # Heading
    Paragraph text...
```

**2. Hero Simple (Banner):**
```yaml
- type: heroSimple
  heading: "Main Heading"
  subheading: "Optional subtitle"
  image: "/hero/banner.jpg"
  cta:
    label: "Call to Action"
    href: "/contact"
```

**3. Brand Teaser (Grid):**
```yaml
- type: brandTeaser
  heading: "Our Brands"
  brands:
    - name: "Brand 1"
      slug: "brand-1"
      logo: "/brands/brand1.png"
    - name: "Brand 2"
      slug: "brand-2"
      logo: "/brands/brand2.png"
```

**4. Split (Text + Image):**
```yaml
- type: split
  image: "/content/feature.jpg"
  imagePosition: "right" # or "left"
  body: |
    Markdown content alongside image
```

**5. List (Bullet/Numbered):**
```yaml
- type: list
  items:
    - text: "Feature 1"
      icon: "check"
    - text: "Feature 2"
      icon: "check"
```

### 6.3 Asset Management

**Directory Structure:**
```
public/
├── hero/           # Large hero images (1920x1080 recommended)
├── brands/         # Brand logos (500x500 recommended, PNG/SVG)
├── team/           # Team photos (400x400 recommended)
├── news/           # News article images (800x600 recommended)
└── icons/          # UI icons (prefer inline SVG in components)
```

**Image Optimization Checklist:**
- [ ] Use descriptive filenames (`company-building.jpg`, not `IMG_1234.jpg`)
- [ ] Run optimization script: `npm run assets:optimize`
- [ ] Verify blur placeholders generated in `asset-blur-map.json`
- [ ] Use `next/image` component (never `<img>` tag)
- [ ] Provide accurate `alt` text (describe image content)
- [ ] Define appropriate `sizes` attribute for responsive loading

---

## 7. Extension Points

### 7.1 Adding New Locales

**Step 1:** Add locale to config
```typescript
// src/lib/i18n.ts
export const locales = ['tr', 'en', 'de'] as const; // Add 'de'
export const defaultLocale = 'tr';
```

**Step 2:** Create translation dictionary
```json
// src/locales/de.json
{
  "nav": {
    "about": "Über uns",
    "services": "Dienstleistungen"
  }
}
```

**Step 3:** Create content directory
```bash
mkdir -p src/content/de/pages
```

**Step 4:** Update middleware (if needed)
```typescript
// middleware.ts
// Locale detection logic may need adjustment
```

### 7.2 Adding New Section Types

**Step 1:** Define Zod schema
```typescript
// src/lib/content/schemas.ts
const CalloutSection = z.object({
  type: z.literal('callout'),
  message: z.string(),
  variant: z.enum(['info', 'warning', 'success'])
});

export const SectionSchema = z.discriminatedUnion('type', [
  ProseSection,
  HeroSimpleSection,
  CalloutSection, // Add new type
]);
```

**Step 2:** Create renderer component
```tsx
// src/components/content/CalloutSection.tsx
export function CalloutSection({ message, variant }: CalloutSectionProps) {
  return (
    <div className={`callout callout-${variant}`}>
      {message}
    </div>
  );
}
```

**Step 3:** Add to ContentArticle renderer
```tsx
// src/components/content/ContentArticle.tsx
function renderSection(section: Section) {
  switch (section.type) {
    case 'prose': return <ProseSection {...section} />;
    case 'heroSimple': return <HeroSimple {...section} />;
    case 'callout': return <CalloutSection {...section} />;
    default: return null;
  }
}
```

### 7.3 Custom Form Types

**Step 1:** Create Zod schema
```typescript
// src/lib/formSchemas.ts
export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
  consent: z.boolean().refine(val => val === true)
});
```

**Step 2:** Create form component
```tsx
// src/components/forms/ContactForm.tsx
'use client';
export function ContactForm() {
  // Implementation using react-hook-form + zodResolver
}
```

**Step 3:** Create API route
```typescript
// src/app/api/forms/contact/route.ts
export async function POST(request: Request) {
  // Validation + processing
}
```

---

## 8. Performance Optimization

### 8.1 Image Optimization
- Use `next/image` component exclusively
- Define appropriate `sizes` attribute
- Use `priority` prop for LCP images
- Generate blur placeholders for above-the-fold images
- Serve WebP/AVIF formats (automatic with Next.js)

### 8.2 Font Optimization
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
```

### 8.3 Code Splitting
- Use dynamic imports for heavy components
- Lazy load below-the-fold sections
- Split vendor bundles automatically (Next.js default)

### 8.4 Caching Strategy
- Static pages: Cache at CDN level (immutable)
- API routes: Cache headers per endpoint
- Assets: Long-term cache with versioned filenames

---

## 9. Security Considerations

### 9.1 Form Security
- Server-side validation (never trust client)
- Honeypot spam trap
- Rate limiting (IP-based)
- CSRF protection (Next.js built-in)
- Input sanitization (especially for markdown/HTML)

### 9.2 Content Security
- Validate all markdown content at build time
- Escape user-generated content (if any)
- Use `rel="noopener noreferrer"` for external links
- Implement Content Security Policy (CSP) headers

### 9.3 API Security
- Rate limiting on all endpoints
- Input validation with Zod
- Authentication/authorization (if needed)
- CORS configuration (restrict origins)

---

## 10. Deployment Checklist

### Pre-Deployment
- [ ] Run full test suite: `npm test`
- [ ] Type checking: `npm run typecheck`
- [ ] Linting: `npm run lint`
- [ ] Format check: `npm run format:check`
- [ ] Accessibility audit: `npm run audit:ci`
- [ ] Content parity check: `npm run audit:content`
- [ ] Build succeeds: `npm run build`
- [ ] Manual smoke testing on staging

### Environment Variables
```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=***
CONTACT_EMAIL=info@yourdomain.com
```

### Post-Deployment
- [ ] Verify all routes accessible
- [ ] Check sitemap.xml generation
- [ ] Verify robots.txt
- [ ] Test form submissions
- [ ] Check structured data with Google Rich Results Test
- [ ] Run Lighthouse audit (Perf/A11y/SEO >= 90)
- [ ] Verify language switcher functionality
- [ ] Test legacy URL redirects

---

## 11. Maintenance Guidelines

### Regular Tasks
- **Weekly:** Review form submissions, check error logs
- **Monthly:** Update dependencies, review analytics, accessibility audit
- **Quarterly:** Content review, SEO performance analysis, security audit

### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update minor/patch versions
npm update

# Update major versions (review breaking changes first)
npm install react@latest next@latest
```

### Content Updates
- Use consistent markdown formatting
- Maintain SEO metadata (title/description)
- Update `lastModified` dates in frontmatter
- Regenerate blur placeholders if images change

---

## 12. Troubleshooting

### Build Fails
1. Check TypeScript errors: `npm run typecheck`
2. Check ESLint errors: `npm run lint`
3. Validate content schemas: `npm run audit:content`
4. Clear `.next` cache: `rm -rf .next && npm run build`

### Images Not Loading
1. Verify file exists in `public/` directory
2. Check path is correct (leading `/`)
3. Run asset optimization: `npm run assets:optimize`
4. Check Next.js image configuration in `next.config.js`

### Forms Not Submitting
1. Check browser console for errors
2. Verify API route path is correct
3. Test schema validation in isolation
4. Check rate limiting not triggered
5. Verify SMTP configuration (if using email)

### Locale Fallback Not Working
1. Check file naming: `src/content/{locale}/pages/{slug}.md`
2. Verify content loader logic in `src/lib/content/`
3. Check middleware locale detection
4. Rebuild site: `npm run build`

---

## 13. References

### Documentation Links
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Schema Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebPageTest](https://www.webpagetest.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

**Document Status:** Living document — update as architecture evolves  
**Maintainers:** Development team  
**Last Review:** 2025-11-12
