#!/usr/bin/env node
/**
 * Accessibility Audit Script
 * 
 * This script performs an automated analysis of accessibility issues 
 * in the codebase by checking for common patterns and issues.
 * 
 * Usage:
 *   - Basic scan: node scripts/a11y-audit.mjs
 *   - Verbose mode: node scripts/a11y-audit.mjs --verbose
 *   - Specific component: node scripts/a11y-audit.mjs --component=Button
 *   - JSON output: node scripts/a11y-audit.mjs --json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// CLI arguments
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const jsonOutput = args.includes('--json');
const componentArg = args.find(arg => arg.startsWith('--component='));
const specificComponent = componentArg ? componentArg.split('=')[1] : null;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Rules to check for accessibility issues
const rules = {
  imgAlt: {
    // Flag <img> tags missing alt attribute (multi-line safe)
    pattern: /<img(?![^>]*\balt=)[^>]*>/gi,
    message: 'Image missing alt attribute',
    severity: 'error',
    wcag: '1.1.1',
  },
  buttonRole: {
  // Interactive div without role (robust, multi-line safe)
  // Ensure an on* handler exists and the tag does NOT contain any role=
  pattern: /<div(?=[^>]*(?:onClick|onKeyDown|onKeyPress))(?:(?!\brole=)[^>])*?>/gi,
    message: 'Interactive div missing role attribute',
    severity: 'error',
    wcag: '4.1.2',
  },
  ariaRequired: {
    pattern: /aria-required="(.*?)"/g,
  message: 'aria-required usage detected',
  severity: 'info',
    wcag: '3.3.2',
  },
  colorContrastWarning: {
    pattern: /className="[^"]*(?:text-gray-300|text-gray-400|text-white bg-gray-600)[^"]*"/g,
    message: 'Potential color contrast issue',
    severity: 'warning',
    wcag: '1.4.3',
  },
  linkSafety: {
    // Find external links (we'll custom-check rel attribute)
    pattern: /<a[^>]*target=['"]_blank['"][^>]*>/gi,
    message: 'External link missing rel="noopener noreferrer"',
    severity: 'warning',
    wcag: '2.1.1',
    custom: true,
  },
  headingStructure: {
    pattern: /<[hH]([1-6])[^>]*>/g,
    message: 'Check heading structure',
    severity: 'info',
    wcag: '1.3.1',
    custom: true,
  },
  labelAssociation: {
    // Form controls without an id (multi-line safe)
    pattern: /<(input|select|textarea)(?![^>]*\bid=)[^>]*>/gi,
    message: 'Form control may be missing label association',
    severity: 'warning',
    wcag: '3.3.2',
  },
  ariaLabelledBy: {
    pattern: /aria-labelledby="([^"]*)"/g,
    message: 'Verify referenced ID exists for aria-labelledby',
    severity: 'warning',
    wcag: '4.1.2',
    custom: true,
  },
  ariaControls: {
    pattern: /aria-controls="([^"]*)"/g,
    message: 'Verify referenced ID exists for aria-controls',
    severity: 'warning',
    wcag: '4.1.2',
    custom: true,
  },
  accessibilityHooks: {
    pattern: /use(FocusTrap|ClickOutside|KeyboardNav|AccessibleRoute)/g,
    message: 'Accessibility hook usage detected',
    severity: 'info',
    custom: true,
  },
  motionPreference: {
    pattern: /usePrefersReducedMotion|useMotionPreference/g,
    message: 'Motion preference respected',
    severity: 'info',
    custom: true,
  }
};

// Helper for custom rule logic
function processCustomRule(rule, match, content) {
  if (rule === 'headingStructure') {
    // Check heading structure logic would go here
    return { match: match[0], custom: 'Custom heading structure analysis' };
  }
  if (rule === 'ariaLabelledBy' || rule === 'ariaControls') {
    // Check if referenced ID exists
    const id = match[1];
    const hasMatchingId = new RegExp(`id=["']${id}["']`).test(content);
    return { 
      match: match[0], 
      custom: hasMatchingId ? 'Referenced ID exists' : 'Referenced ID NOT found in file',
      severity: hasMatchingId ? 'info' : 'warning',
    };
  }
  if (rule === 'linkSafety') {
    const tag = match[0];
    const hasRel = /\brel=["'][^"']+["']/i.test(tag);
    if (!hasRel) {
      return { match: tag, severity: 'warning' };
    }
  const relMatch = tag.match(/\brel=["']([^"']+)["']/i);
  const relValue = (relMatch ? relMatch[1] : '').toLowerCase();
    const hasNoopener = relValue.includes('noopener');
    const hasNoreferrer = relValue.includes('noreferrer');
    if (hasNoopener && hasNoreferrer) {
      // Good: both present, no issue
      return { match: tag, custom: 'Rel attributes present', severity: 'info' };
    }
    return { match: tag, custom: 'Add missing rel tokens (noopener noreferrer)', severity: 'warning' };
  }
  if (rule === 'accessibilityHooks' || rule === 'motionPreference') {
    return { 
      match: match[0], 
      custom: '✓ Good practice detected' 
    };
  }
  
  return { match: match[0] };
}

// Process a single file for accessibility issues
function processFile(filePath) {
  const issues = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(rootDir, filePath);
  
  // Check each rule against the file content
  Object.entries(rules).forEach(([ruleName, rule]) => {
    const matches = [...content.matchAll(rule.pattern)];
    
    if (matches.length > 0) {
      matches.forEach(match => {
        let issue = {
          rule: ruleName,
          message: rule.message,
          severity: rule.severity,
          wcag: rule.wcag,
          file: relativePath,
          match: match[0],
        };
        
        // Handle custom rules with special logic
        if (rule.custom) {
          const customResult = processCustomRule(ruleName, match, content, filePath);
          issue = { ...issue, ...customResult };
        }
        
        issues.push(issue);
      });
    }
  });
  
  return issues;
}

// Recursively scan directory for component files
function scanDirectory(dir, fileTypes = ['.tsx', '.jsx', '.ts', '.js']) {
  let issues = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (entry.name !== 'node_modules' && entry.name !== '.next' && !entry.name.startsWith('.')) {
        issues = [...issues, ...scanDirectory(fullPath, fileTypes)];
      }
    } else if (fileTypes.some(ext => entry.name.endsWith(ext))) {
      // Only scan component files
      if (specificComponent && !entry.name.includes(specificComponent)) {
        continue;
      }
      
      const fileIssues = processFile(fullPath);
      issues = [...issues, ...fileIssues];
    }
  }
  
  return issues;
}

// Format and display the results
function displayResults(issues) {
  // Count issues by severity
  const counts = {
    error: 0,
    warning: 0,
    info: 0,
  };
  
  issues.forEach(issue => counts[issue.severity]++);
  
  if (jsonOutput) {
    // Don't output any logs before the JSON when in JSON mode
    process.stdout.write(JSON.stringify({ issues, counts }, null, 2));
    return;
  }
  
  console.log(`\n${colors.cyan}===== Accessibility Audit Report =====\n${colors.reset}`);
  console.log(`${colors.red}Errors: ${counts.error}${colors.reset}`);
  console.log(`${colors.yellow}Warnings: ${counts.warning}${colors.reset}`);
  console.log(`${colors.blue}Info: ${counts.info}${colors.reset}`);
  
  if (issues.length === 0) {
    console.log(`\n${colors.green}No accessibility issues found!${colors.reset}`);
    return;
  }
  
  console.log('\n');
  
  // Group issues by file
  const issuesByFile = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) {
      acc[issue.file] = [];
    }
    acc[issue.file].push(issue);
    return acc;
  }, {});
  
  // Display issues by file
  Object.entries(issuesByFile).forEach(([file, fileIssues]) => {
    console.log(`${colors.cyan}${file}${colors.reset}`);
    
    fileIssues.forEach(issue => {
      let color;
      switch (issue.severity) {
        case 'error': color = colors.red; break;
        case 'warning': color = colors.yellow; break;
        default: color = colors.blue;
      }
      
      console.log(`  ${color}[${issue.severity.toUpperCase()}]${colors.reset} ${issue.message}${issue.wcag ? ` (WCAG ${issue.wcag})` : ''}`);
      
      if (verbose) {
        console.log(`    ${issue.match.slice(0, 100)}${issue.match.length > 100 ? '...' : ''}`);
        if (issue.custom) {
          console.log(`    Note: ${issue.custom}`);
        }
        console.log('');
      }
    });
    
    console.log('');
  });
  
  console.log(`${colors.cyan}===== End of Report =====\n${colors.reset}`);
  console.log(`Run with --verbose flag for detailed output.`);
  
  if (issues.some(i => i.severity === 'error')) {
    console.log(`\n${colors.red}⚠️ Accessibility errors found! Please fix them before deployment.${colors.reset}`);
  }
}

// Main function to run the audit
async function runAudit() {
  if (!jsonOutput) {
    console.log(`${colors.cyan}Starting accessibility audit...${colors.reset}`);
  }
  // Define which directories to scan
  const dirsToScan = [
    path.join(rootDir, 'src', 'components'),
    path.join(rootDir, 'src', 'app'),
  ];
  
  // Scan directories for issues
  let allIssues = [];
  for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
      const dirIssues = scanDirectory(dir);
      allIssues = [...allIssues, ...dirIssues];
    }
  }
  
  // Display results
  displayResults(allIssues);
  
  // Exit with error code if there are errors (useful for CI/CD)
  if (!jsonOutput && allIssues.some(i => i.severity === 'error')) {
    process.exit(1);
  }
}

// Run the audit
runAudit().catch(error => {
  console.error(`${colors.red}Error running audit:${colors.reset}`, error);
  process.exit(1);
});
