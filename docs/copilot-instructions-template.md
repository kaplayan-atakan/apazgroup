# Copilot Instructions Template (New Project)

**Purpose:** Project-specific guidance for GitHub Copilot/AI agents  
**Usage:** Copy this to `.github/copilot-instructions.md` in your new project and customize

---

## 1. Project Overview

**Project Type:** Multi-language corporate website  
**Architecture:** Next.js 14 App Router + TypeScript + Tailwind CSS  
**Content:** Markdown-based with Zod validation  
**Languages:** [CUSTOMIZE: e.g., Turkish (TR), English (EN)]

### Key Goals
- [CUSTOMIZE: e.g., Showcase company services and brands]
- [CUSTOMIZE: e.g., Provide career opportunities information]
- [CUSTOMIZE: e.g., Enable customer contact via forms]
- Maintain high performance (Lighthouse >= 90)
- Ensure accessibility (WCAG AA compliance)
- Optimize for SEO

---

## 2. Technology Stack

### Core
- Next.js 14.2.5+ (App Router, React 18, TypeScript 5.4+)
- Tailwind CSS 3.4+ (utility-first styling)
- Zod 3.23+ (schema validation)

### Content & Forms
- gray-matter (markdown frontmatter parsing)
- react-hook-form + @hookform/resolvers (form handling)
- unified + remark/rehype (markdown processing)

### Asset Optimization
- Sharp (image optimization)
- next/image (automatic WebP/AVIF)

### Additional
- Framer Motion (optional animations)
- date-fns (date formatting)

---

## 3. Architecture Principles

### Code Organization
- **Colocation:** Place components near where they're used
- **Composition:** Build complex UIs from small, reusable components
- **Type Safety:** Use TypeScript strict mode, avoid `any`
- **Server-First:** Prefer server components unless interactivity needed

### Naming Conventions
- **Files:** kebab-case for files (`user-profile.tsx`)
- **Components:** PascalCase for components (`UserProfile`)
- **Functions:** camelCase for functions (`getUserProfile`)
- **Constants:** UPPER_SNAKE_CASE for constants (`MAX_UPLOAD_SIZE`)

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal utilities/lib
4. Internal components
5. Types
6. Styles/assets

---

## 4. Directory Structure

```
src/
├── app/                        # Next.js App Router
│   ├── [locale]/              # Locale-specific routes
│   ├── api/                   # API routes
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt
├── components/
│   ├── content/               # Content rendering (ContentArticle, etc.)
│   ├── forms/                 # Form components
│   ├── layout/                # Header, Footer, Navigation
│   ├── sections/              # Page sections (Hero, Grid, etc.)
│   └── ui/                    # Reusable UI primitives
├── content/
│   └── [locale]/pages/        # Markdown content files
├── lib/
│   ├── content/               # Content loader & schemas
│   ├── i18n.ts                # Internationalization utilities
│   ├── seo.ts                 # SEO helpers
│   └── formSchemas.ts         # Form validation schemas
├── locales/                   # UI translation dictionaries
└── styles/                    # Global styles
```

---

## 5. Content Management

### Creating Pages

**Location:** `src/content/[locale]/pages/[slug].md`

**Frontmatter Structure:**
```yaml
---
title: "Page Title"
description: "Meta description for SEO"
seo:
  title: "Optional SEO override"
  description: "Optional SEO description override"
sections:
  - type: heroSimple
    heading: "Hero Heading"
    subheading: "Optional subtitle"
    image: "/hero/image.jpg"
  - type: prose
    body: |
      # Markdown Content
      Your content here...
---
```

### Section Types
- `prose` — Standard markdown content
- `heroSimple` — Hero banner with heading/image
- `brandTeaser` — Brand showcase grid
- `split` — Two-column text + image
- `list` — Bullet/numbered list

### Adding New Section Types

1. Define schema in `src/lib/content/schemas.ts`
2. Create renderer component in `src/components/content/`
3. Add to ContentArticle switch statement
4. Export types from `src/lib/content/types.ts`

---

## 6. Internationalization (i18n)

### Locale Configuration

**Default Locale:** [CUSTOMIZE: tr]  
**Available Locales:** [CUSTOMIZE: tr, en]

### URL Structure
```
/                    → Redirects to /[defaultLocale]
/[locale]/          → Homepage
/[locale]/[slug]    → Content page
```

### Translation Files

**Location:** `src/locales/[locale].json`

**Structure:**
```json
{
  "nav": { "home": "Home", "about": "About" },
  "footer": { "address": "Address", "phone": "Phone" },
  "common": { "readMore": "Read More", "submit": "Submit" }
}
```

### Adding New Locale

1. Add to `src/lib/i18n.ts`: `locales = ['tr', 'en', 'de']`
2. Create `src/locales/de.json`
3. Create `src/content/de/pages/` directory
4. Update middleware if needed
5. Rebuild: `npm run build`

---

## 7. SEO Strategy

### Page Metadata

Every page must implement `generateMetadata`:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Page Title",
    description: "Meta description",
    alternates: {
      canonical: `/[locale]/[slug]`,
      languages: { 'tr': '/tr/slug', 'en': '/en/slug' }
    },
    openGraph: {
      title: "OG Title",
      description: "OG Description",
      url: "https://domain.com/[locale]/[slug]",
      locale: 'tr_TR',
      type: 'website'
    }
  }
}
```

### Structured Data (JSON-LD)

- Organization schema in root layout
- Article schema in content pages
- Use `src/lib/seo.ts` utilities

### Sitemap & Robots

- Sitemap: `src/app/sitemap.ts` (auto-generated from content)
- Robots: `src/app/robots.ts` (configured for crawling)

---

## 8. Form Handling

### Form Implementation Pattern

1. **Define Schema** (`src/lib/formSchemas.ts`):
```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  consent: z.boolean().refine(val => val === true),
  hp: z.string().max(0) // Honeypot
});
```

2. **Create Component** (`src/components/forms/ContactForm.tsx`):
```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Implementation...
```

3. **Create API Route** (`src/app/api/forms/contact/route.ts`):
```typescript
export const runtime = 'nodejs'; // For email/file handling
export async function POST(request: Request) {
  // Validation, honeypot, rate limiting, processing
}
```

### Security Requirements

- ✅ Server-side validation (never trust client)
- ✅ Honeypot spam trap
- ✅ Rate limiting (IP-based)
- ✅ Input sanitization
- ✅ CSRF protection (Next.js built-in)

---

## 9. Component Guidelines

### Server vs Client Components

**Default to Server Components** unless you need:
- `useState`, `useEffect`, or other hooks
- Event handlers (`onClick`, `onChange`)
- Browser-only APIs
- Third-party libraries requiring `window`

**Client Components:** Add `'use client'` directive at top

### Component Structure

```tsx
import type { ComponentProps } from 'react';

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function MyComponent({ title, description, children }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

### Styling with Tailwind

- Use utility classes directly in JSX
- Extract repeated patterns to components
- Use `clsx()` for conditional classes
- Define custom colors in `tailwind.config.ts`

---

## 10. Asset Management

### Images

**Always use `next/image`:**
```tsx
import Image from 'next/image';

<Image
  src="/hero/banner.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={blurMap["/hero/banner.jpg"]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Directory Structure
```
public/
├── hero/        # Large hero images
├── brands/      # Brand logos
├── team/        # Team photos
└── news/        # News article images
```

### Optimization

- Use WebP/AVIF formats (automatic with Next.js)
- Generate blur placeholders with Sharp
- Define appropriate `sizes` attribute
- Use `priority` for LCP images only

---

## 11. Accessibility Requirements

### Standards
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility

### Key Practices

1. **Semantic HTML:**
```tsx
<header>, <nav>, <main>, <footer>, <article>, <section>
```

2. **Heading Hierarchy:**
```tsx
<h1> → <h2> → <h3> (don't skip levels)
```

3. **ARIA Attributes:**
```tsx
<nav aria-label="Main navigation">
<button aria-expanded={isOpen} aria-controls="menu">
```

4. **Form Labels:**
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

5. **Alt Text:**
```tsx
<Image alt="Descriptive text, not 'image of'" />
```

6. **Focus Management:**
```tsx
// Visible focus indicators, logical tab order
```

---

## 12. Performance Optimization

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Strategies

1. **Image Optimization:**
   - Use `next/image`
   - Lazy load below-the-fold images
   - Appropriate sizing and formats

2. **Font Optimization:**
   - Use `next/font` for self-hosting
   - Preload critical fonts
   - Subset fonts to needed characters

3. **Code Splitting:**
   - Dynamic imports for heavy components
   - Lazy load non-critical sections
   - Tree-shake unused code

4. **Caching:**
   - Static pages cached at CDN
   - Long-term asset caching
   - API response caching where appropriate

---

## 13. Development Workflow

### Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier format
npm run format:check # Check formatting
npm test             # Run tests
```

### Git Workflow

**Branch Naming:**
- `feature/feature-name`
- `fix/bug-name`
- `content/locale/slug`

**Commit Messages:**
```
type(scope): subject

Examples:
feat(forms): add file upload support
fix(seo): correct canonical URL generation
content(tr/about): update company history
docs(readme): add deployment instructions
```

### Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No console errors in browser
- [ ] Accessibility checked
- [ ] Mobile responsive verified

---

## 14. Testing Strategy

### Unit Tests
- Form schema validation
- Utility functions
- Content parsing logic

### Component Tests
- Form submission flows
- Navigation interactions
- Conditional rendering

### E2E Tests (if implemented)
- Critical user paths
- Form submissions
- Language switching

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Test with keyboard navigation
- Test with screen reader (if possible)

---

## 15. Deployment

### Environment Variables

**Required:**
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Optional (for forms):**
```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=***
CONTACT_EMAIL=info@yourdomain.com
```

### Pre-Deploy Checklist

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Environment variables configured
- [ ] Content finalized
- [ ] SEO metadata complete
- [ ] Accessibility audit passed
- [ ] Performance targets met

### Post-Deploy Verification

- [ ] All routes accessible
- [ ] Forms submit successfully
- [ ] Sitemap accessible
- [ ] SSL certificate valid
- [ ] Analytics tracking
- [ ] Error monitoring active

---

## 16. Copilot Usage Guidelines

### When to Use Copilot

✅ **Good for:**
- Generating boilerplate code
- Writing TypeScript types
- Creating component templates
- Implementing common patterns
- Writing tests
- Refactoring code

❌ **Not Good for:**
- Architecture decisions
- Security-critical code (review carefully)
- Business logic (requires domain knowledge)
- Performance optimizations (measure first)

### Code Generation Rules

1. **Always review generated code** — Don't accept blindly
2. **Check types** — Ensure no `any` types
3. **Verify imports** — Correct paths and exports
4. **Test output** — Run and verify behavior
5. **Follow patterns** — Match existing code style

### Prompt Best Practices

**Good Prompt:**
```
Create a form component for [specific purpose] with:
- Fields: name, email, phone, message
- Zod validation schema
- react-hook-form integration
- Error display
- Submit handler that calls /api/forms/[endpoint]
```

**Poor Prompt:**
```
Make a form
```

---

## 17. Troubleshooting

### Common Issues

**Build Fails:**
```bash
rm -rf .next
npm run build
```

**TypeScript Errors:**
```bash
npm run typecheck
# Fix type issues, avoid using `any`
```

**Content Not Loading:**
```bash
# Check file paths
ls src/content/[locale]/pages/*.md
# Verify frontmatter syntax
# Validate against schema
```

**Form Not Submitting:**
```bash
# Check API route path
# Verify schema validation
# Check browser console
# Test rate limiting disabled
```

**Images Not Loading:**
```bash
# Verify file in public/
# Check path starts with /
# Verify next/image config
```

---

## 18. Project-Specific Customization

### [CUSTOMIZE THIS SECTION]

**Brand Colors:**
- Primary: [#HEX]
- Secondary: [#HEX]
- Accent: [#HEX]

**Typography:**
- Headings: [Font Family]
- Body: [Font Family]

**Navigation Items:**
- [List custom nav items]

**Form Types:**
- [List custom forms needed]

**Special Features:**
- [Any unique requirements]

---

## 19. Resources

### Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

### Internal Docs
- `docs/project-skeleton-architecture.md` — Architecture overview
- `docs/new-project-setup-guide.md` — Setup instructions
- `docs/quick-start-checklist.md` — Quick reference
- `docs/agent-brief.md` — Agent operations guide

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) — Performance audit
- [axe DevTools](https://www.deque.com/axe/devtools/) — Accessibility testing
- [Google Rich Results Test](https://search.google.com/test/rich-results) — SEO validation

---

## 20. Maintenance

### Regular Tasks
- **Weekly:** Review error logs, check form submissions
- **Monthly:** Update dependencies, review analytics, accessibility audit
- **Quarterly:** Content review, SEO analysis, security audit

### Dependency Updates
```bash
npm outdated              # Check for updates
npm update                # Update minor/patch
npm install pkg@latest    # Update major (review breaking changes)
```

### Content Updates
- Maintain consistent markdown formatting
- Update SEO metadata when content changes
- Regenerate blur placeholders if images change
- Update sitemap after adding/removing pages

---

**Document Status:** Template — Customize for each project  
**Last Updated:** 2025-11-12  
**Version:** 1.0.0
