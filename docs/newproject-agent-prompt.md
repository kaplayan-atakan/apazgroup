# #newProject Agent Initialization Prompt

**Purpose:** Bootstrap a new corporate website project using the proven Next.js 14 multi-language architecture

---

## Context

You are about to set up a new corporate website project following an established, production-tested architecture. This architecture has been successfully implemented and is currently running in production with:

- Next.js 14 App Router
- TypeScript (strict mode)
- Multi-language support (TR/EN, extensible to more)
- Markdown-based content management
- SEO optimization (metadata, structured data, sitemaps)
- Accessible design (WCAG AA compliance)
- Performance optimization (image optimization, blur placeholders)
- Form handling (validation, rate limiting, spam protection)

---

## Your Mission

Create a **brand-agnostic skeleton project** that can be customized with specific branding, colors, content, and business requirements AFTER the technical foundation is in place.

---

## Reference Documentation

You have access to three key documents that define the architecture:

1. **`docs/project-skeleton-architecture.md`** — Complete architectural blueprint
   - Technology stack overview
   - Directory structure
   - Configuration standards
   - Core feature implementations
   - Extension points
   - Performance & security guidelines

2. **`docs/new-project-setup-guide.md`** — Step-by-step implementation guide
   - Phase-by-phase setup instructions
   - Code examples for each component
   - Configuration file templates
   - Testing setup
   - Deployment checklist

3. **`docs/agent-brief.md`** (from reference project) — Quick reference for agent operations
   - Common tasks and workflows
   - File locations
   - Content management patterns
   - Troubleshooting

---

## Implementation Strategy

### Phase 0: Project Initialization
1. Create Next.js 14 project with TypeScript, Tailwind, ESLint
2. Install additional dependencies (gray-matter, zod, react-hook-form, etc.)
3. Configure TypeScript strict mode
4. Set up ESLint and Prettier

### Phase 1: Directory Structure
1. Create content directories (`src/content/tr/pages`, `src/content/en/pages`)
2. Create component directories (`layout`, `forms`, `sections`, `ui`, `content`)
3. Create library directories (`lib/content`, `lib/i18n`, etc.)
4. Create public asset directories (`hero`, `brands`, `team`, `news`)

### Phase 2: i18n Configuration
1. Implement locale utilities (`src/lib/i18n.ts`)
2. Create translation dictionaries (`src/locales/{tr,en}.json`)
3. Set up middleware for locale detection and redirects
4. Implement locale-aware routing

### Phase 3: Content Management System
1. Define Zod schemas for content validation (`src/lib/content/schemas.ts`)
2. Implement markdown parser (`src/lib/content/parser.ts`)
3. Create content loader API (`src/lib/content/index.ts`)
4. Add sample content files (about page in TR/EN)

### Phase 4: Layout Components
1. Create root layout with font configuration
2. Implement locale layout with Header/Footer
3. Build Header component with navigation
4. Build Footer component with basic info

### Phase 5: Page Routes
1. Create homepage route (`src/app/[locale]/page.tsx`)
2. Implement dynamic content page route (`src/app/[locale]/[slug]/page.tsx`)
3. Set up generateStaticParams for SSG
4. Implement metadata generation

### Phase 6: SEO Configuration
1. Create SEO utility functions (`src/lib/seo.ts`)
2. Implement dynamic sitemap generator
3. Configure robots.txt
4. Add JSON-LD structured data

### Phase 7: Form Implementation
1. Define form schemas with Zod (`src/lib/formSchemas.ts`)
2. Create form component with react-hook-form
3. Implement API route with validation and rate limiting
4. Add honeypot spam protection

### Phase 8: Testing & Quality Assurance
1. Create basic schema validation tests
2. Set up test runner (tsx)
3. Verify build succeeds
4. Check type checking passes

---

## Critical Requirements

### Must-Have Features
- ✅ TypeScript strict mode
- ✅ Multi-language support (TR/EN default, extensible)
- ✅ Markdown content with Zod validation
- ✅ SEO metadata (title, description, alternates, canonical)
- ✅ Structured data (JSON-LD Organization schema)
- ✅ Dynamic sitemap and robots.txt
- ✅ Form with server-side validation and rate limiting
- ✅ Responsive layout (Header, Footer, Main content)
- ✅ Locale-aware routing and fallback
- ✅ ESLint + Prettier configuration
- ✅ Basic test setup

### Must-NOT Include (Brand-Specific)
- ❌ Company names, logos, or branding
- ❌ Specific color schemes (use semantic names: primary, secondary, accent)
- ❌ Real content (use placeholder text)
- ❌ Specific navigation items (use generic: Home, About, Services, Contact)
- ❌ Business-specific form fields
- ❌ Social media links with real URLs
- ❌ Contact information (address, phone, email)

### Placeholders to Use
- Company name: "Company Name"
- Colors: Use Tailwind default colors or semantic brand tokens
- Content: "Lorem ipsum" style placeholder text
- Navigation: Generic items (Home, About, Services, Contact)
- Footer: Minimal structure without real information

---

## Configuration Standards

### TypeScript
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Tailwind
```typescript
theme: {
  extend: {
    colors: {
      brand: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)'
      }
    }
  }
}
```

### Next.js
```javascript
{
  reactStrictMode: true,
  experimental: { typedRoutes: true }
}
```

---

## Directory Structure Target

```
project-root/
├── docs/
│   ├── project-skeleton-architecture.md
│   ├── new-project-setup-guide.md
│   └── agent-brief.md
├── public/
│   ├── hero/
│   ├── brands/
│   └── team/
├── scripts/
│   └── (asset optimization scripts - optional for MVP)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── api/forms/application/route.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx
│   ├── components/
│   │   ├── content/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/
│   │   ├── tr/pages/
│   │   └── en/pages/
│   ├── lib/
│   │   ├── content/
│   │   ├── i18n.ts
│   │   ├── seo.ts
│   │   ├── formSchemas.ts
│   │   └── utils.ts
│   ├── locales/
│   │   ├── tr.json
│   │   └── en.json
│   └── styles/
│       └── globals.css
├── tests/
│   └── formSchema.test.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Success Criteria

### Build & Development
- [ ] `npm run dev` starts development server without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes (no errors)
- [ ] `npm run typecheck` passes (no errors)
- [ ] `npm test` passes

### Functionality
- [ ] Root `/` redirects to `/tr`
- [ ] `/tr` and `/en` locales work
- [ ] `/tr/about` and `/en/about` pages render
- [ ] Language switcher preserves current page slug
- [ ] Form validation works (client and server)
- [ ] Rate limiting prevents spam
- [ ] Honeypot catches bots

### SEO
- [ ] `/sitemap.xml` generates with all pages
- [ ] `/robots.txt` serves correctly
- [ ] Each page has proper metadata (title, description)
- [ ] hreflang alternates present for all locales
- [ ] JSON-LD Organization schema in root layout

### Code Quality
- [ ] All TypeScript strict checks pass
- [ ] ESLint rules followed
- [ ] Prettier formatting consistent
- [ ] No console errors in browser
- [ ] Responsive design works on mobile/desktop

---

## Step-by-Step Execution Plan

### 1. Read Documentation First
Before writing any code, thoroughly review:
- `docs/project-skeleton-architecture.md` (architecture overview)
- `docs/new-project-setup-guide.md` (implementation steps)

### 2. Follow Phases Sequentially
Implement each phase from the setup guide in order:
- Phase 0: Initialization
- Phase 1: Directory structure
- Phase 2: i18n
- Phase 3: Content system
- Phase 4: Layouts
- Phase 5: Routes
- Phase 6: SEO
- Phase 7: Forms
- Phase 8: Testing

### 3. Verify Each Phase
After completing each phase:
- Run `npm run typecheck`
- Run `npm run lint`
- Test in browser if applicable

### 4. Document Deviations
If you make any changes to the reference architecture:
- Document why in comments
- Update `docs/agent-brief.md` with new patterns

---

## Common Pitfalls to Avoid

1. **Don't skip TypeScript strict checks** — Type safety is critical
2. **Don't use `any` type** — Use proper typing or `unknown`
3. **Don't forget locale fallback logic** — EN should fall back to TR if missing
4. **Don't hardcode URLs** — Use `withLocale()` utility
5. **Don't skip server-side validation** — Never trust client-only validation
6. **Don't forget rate limiting** — Forms need spam protection
7. **Don't use `<img>` tags** — Always use Next.js `<Image>` component
8. **Don't forget alt text** — Accessibility requirement
9. **Don't skip SEO metadata** — Every page needs title/description
10. **Don't forget mobile responsiveness** — Test on small screens

---

## After Completion

### Handoff Checklist
Provide the following to the project owner:

1. **Working application:**
   - Development server runs on `localhost:3000`
   - Production build succeeds
   - All quality checks pass

2. **Documentation:**
   - README.md with quick start instructions
   - List of placeholder content to replace
   - List of environment variables needed
   - Deployment instructions

3. **Customization guide:**
   - How to change colors (Tailwind config)
   - How to add new pages (content files)
   - How to add new locales
   - How to customize forms

4. **Next steps:**
   - Replace placeholder content
   - Add brand colors and fonts
   - Add real company information
   - Configure email service (nodemailer/SMTP)
   - Set up analytics
   - Configure domain and SSL

---

## Questions to Ask During Development

If you encounter ambiguity, refer to the reference documents first. If still unclear:

1. **Architectural decisions:** Check `docs/project-skeleton-architecture.md`
2. **Implementation details:** Check `docs/new-project-setup-guide.md`
3. **Common patterns:** Check `docs/agent-brief.md`

Only ask the human if:
- A requirement conflicts with another requirement
- You need to make a significant architectural change
- Documentation is missing or unclear

---

## Output Format

### Progress Updates
Provide updates after each phase:
```
✅ Phase 0 Complete: Project initialized with Next.js 14
   - Installed dependencies: next, react, typescript, tailwind, zod, etc.
   - Configured tsconfig.json (strict mode enabled)
   - Set up ESLint and Prettier
   
Next: Phase 1 - Directory structure setup
```

### Issue Reports
If you encounter problems:
```
⚠️ Issue in Phase X: [Brief description]
   - What went wrong: [Details]
   - What I tried: [Attempted solutions]
   - Current blocker: [What's preventing progress]
   
Question: [Specific question for human]
```

### Completion Report
When finished:
```
🎉 Project Setup Complete!

Summary:
- ✅ All 8 phases implemented
- ✅ Build succeeds (120 static pages generated)
- ✅ All quality checks pass
- ✅ SEO configured (sitemap, robots, metadata)
- ✅ Form working with validation

Ready for customization:
1. Update Tailwind config with brand colors
2. Replace placeholder content in src/content/
3. Add company information to Footer
4. Configure SMTP for form submissions
5. Add real navigation items

Command to start:
$ npm run dev
```

---

## Begin Implementation

You are now ready to create a production-grade, brand-agnostic corporate website skeleton. Follow the phases in `docs/new-project-setup-guide.md` step by step, refer to `docs/project-skeleton-architecture.md` for architectural decisions, and maintain code quality throughout.

**Remember:** This is a foundation, not a finished product. Keep it generic, maintainable, and well-documented so it can be easily customized for any corporate brand.

Good luck! 🚀
