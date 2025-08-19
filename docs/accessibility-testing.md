# Accessibility Testing Guide

This guide provides information on using the accessibility testing tools available in the project.

## Table of Contents
1. [Automated Testing](#automated-testing)
2. [Manual Testing](#manual-testing)
3. [UI Component Testing](#ui-component-testing)
4. [Screen Reader Testing](#screen-reader-testing)
5. [Keyboard Navigation](#keyboard-navigation)

## Automated Testing

### Using the Accessibility Audit Tool

We've implemented an automated accessibility audit script that can help identify common accessibility issues in the codebase.

```bash
# Run a basic accessibility audit
npm run audit:a11y

# Run a verbose audit with detailed information
npm run audit:a11y:verbose

# Scan a specific component
npm run audit:a11y -- --component=Button

# Output in JSON format (useful for CI/CD integration)
npm run audit:a11y -- --json
```

### What the Tool Checks

The accessibility audit tool checks for:

- Missing alt attributes on images (WCAG 1.1.1)
- Interactive elements missing proper ARIA roles (WCAG 4.1.2)
- External links without proper security attributes
- Form controls without proper labeling (WCAG 3.3.2)
- Potential color contrast issues (WCAG 1.4.3)
- Proper heading structure (WCAG 1.3.1)
- Proper use of aria-labelledby and aria-controls
- Motion preference respect through custom hooks

### Interpreting Results

The audit results are categorized by severity:

- **Errors**: Critical issues that must be fixed for compliance
- **Warnings**: Potential issues that should be manually verified
- **Info**: Informational findings or good practice detections

## Manual Testing

While automated testing can catch many issues, manual testing is essential for complete accessibility verification.

### Component Checklist

For each component, verify:

1. **Keyboard accessibility**: Can you navigate and operate the component using only a keyboard?
2. **Screen reader compatibility**: Does the component provide adequate information to screen readers?
3. **Color contrast**: Do all text elements meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)?
4. **Text resizing**: Does the component work properly when text is resized up to 200%?
5. **Reduced motion**: Does the component respect the user's motion preference settings?

## UI Component Testing

The UI Playground provides a central location to test our accessible components:

```
/ui-playground
```

This page contains examples of:

- Accessible checkboxes and radio buttons
- Form labels with proper associations
- Native and custom select components
- Motion-aware animations that respect user preferences
- Loading indicators with appropriate ARIA attributes

## Screen Reader Testing

For screen reader testing, we recommend:

- **Windows**: NVDA or JAWS
- **macOS**: VoiceOver
- **Mobile**: VoiceOver (iOS) or TalkBack (Android)

### Basic Testing Steps

1. Navigate through the entire application using tab keys
2. Listen to how content is announced
3. Verify that all interactive elements are properly labeled
4. Check that hidden content is not announced
5. Ensure dynamic content changes are properly announced

## Keyboard Navigation

Test keyboard navigation by:

1. Using tab to navigate forward through interactive elements
2. Using shift+tab to navigate backward
3. Using enter or space to activate buttons and links
4. Using arrow keys for selection controls
5. Checking that focus indicators are visible
6. Verifying that keyboard traps are implemented for modal dialogs

### Keyboard Shortcuts

Our application implements the following keyboard shortcuts:

- **Skip to content**: <kbd>Tab</kbd> from the beginning of the page
- **Escape**: Close modals and dropdowns
- **Enter/Space**: Activate focused buttons, links, or checkboxes
- **Arrow keys**: Navigate within select dropdowns

For additional accessibility testing guidance, refer to the [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/).
