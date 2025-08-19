# Accessibility Testing Tools Guide

As part of Sprint 8 improvements, we've implemented comprehensive accessibility testing tools to ensure our application is accessible to all users. This document provides an overview of the tools available and how to use them.

## Available Tools

### 1. Accessibility Audit Script (`a11y-audit.mjs`)

This script scans the codebase for common accessibility issues based on WCAG guidelines.

```bash
# Basic usage
npm run audit:a11y

# Detailed output
npm run audit:a11y:verbose

# Focus on specific component
npm run audit:a11y -- --component=Button

# JSON output (for CI integration)
npm run audit:a11y -- --json
```

### 2. Motion Preference Test Script (`motion-preference-test.mjs`)

This script specifically focuses on proper implementation of reduced motion support.

```bash
# Basic usage
npm run audit:motion

# Detailed output
npm run audit:motion:verbose

# JSON output (for CI integration)
npm run audit:motion -- --json
```

### 3. CI Integration Script (`ci-a11y-tests.mjs`)

This script combines both accessibility and motion preference tests for CI/CD pipelines.

```bash
# Run all accessibility tests with summary output
npm run audit:ci

# Alternative command
npm run test:a11y
```

## GitHub Actions Integration

We've set up a GitHub Actions workflow (`.github/workflows/accessibility.yml`) that:

1. Runs on all PRs and pushes to main branches
2. Executes accessibility and motion preference tests
3. Comments on PRs with test results
4. Uploads detailed reports as artifacts

## Current Test Results

As of the most recent audit:

**Accessibility Audit:**
- 0 critical errors
- 21 warnings (mostly form control label associations)
- 36 informational items

**Motion Preference Test:**
- 22 good practices
- 8 potential issues

## Key Rules Checked

### Accessibility Audit
- Missing alt text on images (WCAG 1.1.1)
- Interactive elements without proper roles (WCAG 4.1.2)
- Form controls without labels (WCAG 3.3.2)
- External links missing security attributes
- Color contrast issues (WCAG 1.4.3)
- Heading structure (WCAG 1.3.1)
- ARIA attributes usage

### Motion Preference Test
- Animations respecting reduced motion preferences
- CSS media queries for prefers-reduced-motion
- Framer Motion with appropriate variants
- Unchecked transitions and animations

## Priority Issues to Address

1. Form control label associations in BasvuruForm.tsx
2. External links in Footer.tsx missing rel attributes
3. Motion issues in FadeInSection.tsx and MotionComponents.tsx

## Running Tests During Development

We recommend:

1. Running `npm run audit:a11y:verbose` before submitting PRs
2. Checking specific components with `--component=YourComponent`
3. Using the UI playground to manually test accessibility

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Accessibility Testing Guide](./accessibility-testing.md)
- [Accessibility Improvements Summary](./accessibility-improvements.md)
