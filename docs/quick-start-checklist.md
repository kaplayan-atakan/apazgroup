# New Project Quick Start Checklist

**Purpose:** Rapid reference for setting up new projects using the skeleton architecture  
**Use this when:** Starting a new corporate website project with the proven Next.js 14 architecture

---

## Pre-Flight Checks

- [ ] Node.js 20+ installed
- [ ] Git initialized in project directory
- [ ] Editor set up (VS Code recommended with ESLint, Prettier, Tailwind CSS IntelliSense)
- [ ] Read `docs/project-skeleton-architecture.md` (architecture overview)
- [ ] Read `docs/new-project-setup-guide.md` (detailed steps)

---

## Phase 0: Initialization (10 min)

```bash
# Create project
npx create-next-app@latest project-name
# Select: TypeScript=Yes, ESLint=Yes, Tailwind=Yes, src/=Yes, App Router=Yes

cd project-name

# Install dependencies
npm install gray-matter zod react-hook-form @hookform/resolvers
npm install unified remark-parse remark-rehype rehype-slug rehype-autolink-headings rehype-stringify
npm install framer-motion clsx date-fns
npm install -D sharp tsx prettier eslint-plugin-import @typescript-eslint/eslint-plugin
```

### Configuration Files

- [ ] Update `tsconfig.json`: Add `"noUncheckedIndexedAccess": true`
- [ ] Create `.eslintrc.json` with import ordering rules
- [ ] Create `.prettierrc` with formatting rules
- [ ] Update `package.json` scripts: lint, typecheck, format, test

**Verify:** `npm run lint && npm run typecheck` should pass

---

## Phase 1: Directory Structure (5 min)

```bash
# Content directories
mkdir -p src/content/tr/pages src/content/en/pages

# Component directories
mkdir -p src/components/{content,forms,layout,sections,ui}

# Library directories
mkdir -p src/lib/content src/locales

# API directories
mkdir -p src/app/api/forms/application

# Public assets
mkdir -p public/{hero,brands,team,news}

# Tests and docs
mkdir -p tests docs scripts
```

### Core Files to Create

```bash
touch src/lib/i18n.ts
touch src/lib/seo.ts
touch src/lib/formSchemas.ts
touch src/lib/utils.ts
touch src/locales/tr.json
touch src/locales/en.json
touch src/lib/content/{index,schemas,parser,types}.ts
touch middleware.ts
```

**Verify:** Directory structure matches `docs/project-skeleton-architecture.md` section 2

---

## Phase 2: i18n Setup (15 min)

### Files to Implement

- [ ] `src/lib/i18n.ts` — Locale utilities (locales, defaultLocale, withLocale, getDictionary)
- [ ] `src/locales/tr.json` — Turkish UI translations (nav, footer, common)
- [ ] `src/locales/en.json` — English UI translations
- [ ] `middleware.ts` — Locale detection and redirects

### Test Points

- [ ] Root `/` redirects to `/tr`
- [ ] `/tr` and `/en` routes work
- [ ] Invalid locale returns 404

**Verify:** `npm run build` should succeed, check routes generated

---

## Phase 3: Content System (20 min)

### Files to Implement

- [ ] `src/lib/content/schemas.ts` — Zod schemas (ProseSection, HeroSimpleSection, PageFrontmatter, PageContent)
- [ ] `src/lib/content/parser.ts` — Markdown parsing with gray-matter
- [ ] `src/lib/content/index.ts` — Content loader API (getAllPages, getPageBySlug)
- [ ] `src/lib/content/types.ts` — TypeScript type exports

### Sample Content

- [ ] `src/content/tr/pages/about.md` — Turkish about page
- [ ] `src/content/en/pages/about.md` — English about page

### Test Points

- [ ] Content files validate against schema
- [ ] `getAllPages('tr')` returns array of pages
- [ ] `getPageBySlug('tr', 'about')` returns page object

**Verify:** No TypeScript errors, content loads during build

---

## Phase 4: Layout Components (20 min)

### Files to Implement

- [ ] `src/app/layout.tsx` — Root HTML wrapper with font configuration
- [ ] `src/app/[locale]/layout.tsx` — Locale-specific layout with Header/Footer
- [ ] `src/components/layout/Header.tsx` — Navigation header
- [ ] `src/components/layout/Footer.tsx` — Site footer

### Test Points

- [ ] Header renders with navigation
- [ ] Footer renders with copyright
- [ ] Font loads correctly
- [ ] Locale validation works

**Verify:** `npm run dev`, visit `localhost:3000/tr`, header/footer visible

---

## Phase 5: Page Routes (15 min)

### Files to Implement

- [ ] `src/app/[locale]/page.tsx` — Homepage
- [ ] `src/app/[locale]/[slug]/page.tsx` — Dynamic content pages
- [ ] `generateStaticParams` function for SSG
- [ ] `generateMetadata` function for SEO

### Test Points

- [ ] Homepage renders at `/tr` and `/en`
- [ ] About page renders at `/tr/about` and `/en/about`
- [ ] EN fallback to TR works if EN content missing
- [ ] 404 for non-existent pages

**Verify:** `npm run build`, check static page count matches content files

---

## Phase 6: SEO Configuration (15 min)

### Files to Implement

- [ ] `src/lib/seo.ts` — SEO utilities (getCanonicalUrl, getAlternateUrls, generateOrganizationSchema)
- [ ] `src/app/sitemap.ts` — Dynamic sitemap generator
- [ ] `src/app/robots.ts` — robots.txt configuration

### Test Points

- [ ] `localhost:3000/sitemap.xml` serves sitemap
- [ ] `localhost:3000/robots.txt` serves robots file
- [ ] Page metadata includes title, description, alternates
- [ ] JSON-LD Organization schema in HTML

**Verify:** View page source, check `<head>` tags and `<script type="application/ld+json">`

---

## Phase 7: Form Implementation (25 min)

### Files to Implement

- [ ] `src/lib/formSchemas.ts` — Zod form schemas (applicationFormSchema)
- [ ] `src/components/forms/ApplicationForm.tsx` — Form component with react-hook-form
- [ ] `src/app/api/forms/application/route.ts` — API endpoint with validation

### Security Features

- [ ] Server-side validation with Zod
- [ ] Honeypot field (hidden, must be empty)
- [ ] Rate limiting (IP-based, in-memory for MVP)
- [ ] Error handling and user feedback

### Test Points

- [ ] Form renders correctly
- [ ] Client-side validation works
- [ ] Server-side validation rejects invalid data
- [ ] Rate limiting blocks rapid submissions
- [ ] Success state shows after submission

**Verify:** Submit form with valid and invalid data, check network tab

---

## Phase 8: Testing & QA (10 min)

### Files to Implement

- [ ] `tests/formSchema.test.ts` — Schema validation tests

### Quality Checks

```bash
npm run lint          # ESLint passes
npm run typecheck     # TypeScript passes
npm run format:check  # Prettier passes
npm test              # Tests pass
npm run build         # Build succeeds
```

### Manual Testing

- [ ] All pages load without errors
- [ ] Navigation works
- [ ] Language switcher works
- [ ] Form submits successfully
- [ ] Mobile responsive (use browser dev tools)
- [ ] No console errors

**Verify:** All commands succeed, no errors in browser console

---

## Post-Setup: Customization Prep

### Documentation to Create

- [ ] `README.md` — Quick start guide
- [ ] `CUSTOMIZATION.md` — How to add branding
- [ ] `.env.example` — Environment variables template

### Placeholders to Note

Document the following for customization:
- [ ] Company name: "Company Name" → Replace with real name
- [ ] Colors: Tailwind defaults → Brand colors
- [ ] Content: Sample markdown → Real content
- [ ] Navigation: Generic items → Business-specific pages
- [ ] Footer: Minimal → Full contact info
- [ ] Forms: Basic fields → Business-specific requirements

---

## Quick Reference: Common Tasks

### Add New Page

1. Create `src/content/tr/pages/new-page.md`
2. Create `src/content/en/pages/new-page.md`
3. Run `npm run build`
4. Page auto-generated at `/tr/new-page` and `/en/new-page`

### Add New Locale

1. Add to `src/lib/i18n.ts`: `locales = ['tr', 'en', 'de']`
2. Create `src/locales/de.json`
3. Create `src/content/de/pages/` directory
4. Update middleware locale detection
5. Rebuild project

### Add New Section Type

1. Define schema in `src/lib/content/schemas.ts`
2. Create renderer component in `src/components/content/`
3. Add to ContentArticle switch statement
4. Update type exports

### Customize Colors

1. Edit `tailwind.config.ts` → `theme.extend.colors.brand`
2. Define CSS variables in `src/styles/globals.css`
3. Update component classes to use brand colors

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Check for errors
npm run typecheck

# Common fixes:
# - Add missing types
# - Fix any usage
# - Check import paths
```

### Content Not Loading
```bash
# Verify file locations
ls src/content/tr/pages/*.md

# Check frontmatter syntax (YAML)
# Validate with schema
```

### Form Not Submitting
```bash
# Check API route path
# Verify CORS (shouldn't be issue in same-origin)
# Check browser console for errors
# Test schema validation in isolation
```

---

## Deployment Checklist

### Pre-Deploy

- [ ] All tests pass
- [ ] Build succeeds without warnings
- [ ] Environment variables configured
- [ ] Content reviewed and finalized
- [ ] SEO metadata complete

### Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### Post-Deploy

- [ ] Visit production URL
- [ ] Test all routes
- [ ] Submit sitemap to Google Search Console
- [ ] Verify SSL certificate
- [ ] Test form submissions

---

## Time Estimates

| Phase | Duration | Critical? |
|-------|----------|-----------|
| Phase 0: Initialization | 10 min | ✅ Yes |
| Phase 1: Directory Setup | 5 min | ✅ Yes |
| Phase 2: i18n | 15 min | ✅ Yes |
| Phase 3: Content System | 20 min | ✅ Yes |
| Phase 4: Layouts | 20 min | ✅ Yes |
| Phase 5: Routes | 15 min | ✅ Yes |
| Phase 6: SEO | 15 min | ⚠️ Recommended |
| Phase 7: Forms | 25 min | ⚠️ If needed |
| Phase 8: Testing | 10 min | ✅ Yes |
| **Total (MVP)** | **~2 hours** | |

---

## Success Indicators

### Green Lights ✅

- All npm scripts run without errors
- `npm run build` generates expected number of pages
- Browser console has no errors
- All routes accessible
- Language switching works
- Form validation functional

### Red Flags 🚩

- TypeScript `any` types present
- Console errors in browser
- Build warnings about unused variables
- Missing SEO metadata
- Hardcoded strings (not i18n)
- No rate limiting on forms

---

## Next Steps After Setup

1. **Branding:** Update colors, fonts, logos
2. **Content:** Replace all placeholder content
3. **Navigation:** Add business-specific menu items
4. **Forms:** Customize fields for business needs
5. **SEO:** Add real company information to schema
6. **Analytics:** Integrate Google Analytics/Tag Manager
7. **Monitoring:** Set up error tracking (Sentry)
8. **Email:** Configure nodemailer with SMTP
9. **CMS:** Consider adding Contentful/Sanity if needed
10. **Testing:** Add E2E tests with Playwright

---

**Quick Start Command:**

```bash
# After setup is complete
npm run dev
# Open http://localhost:3000/tr
```

**Emergency Reset:**

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

**Document Status:** Living checklist — update as processes evolve  
**Last Updated:** 2025-11-12
