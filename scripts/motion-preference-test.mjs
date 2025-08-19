#!/usr/bin/env node
/**
 * Motion Preference Test Script
 * 
 * This script analyzes the codebase for proper implementation of motion preference
 * handling to ensure animations respect user preferences for reduced motion.
 * 
 * Usage:
 *   - Basic scan: node scripts/motion-preference-test.mjs
 *   - Verbose output: node scripts/motion-preference-test.mjs --verbose
 *   - JSON output: node scripts/motion-preference-test.mjs --json
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

// Terminal colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Motion preference patterns to check for
const patterns = {
  // Hooks for detecting motion preference
  hooks: {
    pattern: /use(PrefersReducedMotion|MotionPreference)/g,
    good: true,
    type: 'hook',
  },
  // Framer Motion with variants for reduced motion
  framerMotionVariants: {
    pattern: /(const|let|var)\s+\w+\s*=\s*{[^}]*reduced(Motion)?:/g,
    good: true,
    type: 'variant',
  },
  // CSS animation with media query
  cssReducedMotion: {
    pattern: /@media\s*\(\s*prefers-reduced-motion(\s*:|[^)]*)\)/g,
    good: true,
    type: 'css',
  },
  // Direct animation without checks
  uncheckedAnimation: {
    pattern: /animation:|@keyframes\s+\w+|transform:(?!.*reduced-motion)/g,
    good: false,
    type: 'animation',
  },
  // Framer Motion without reduced motion checks
  uncheckedFramerMotion: {
    pattern: /animate=\{[^}]*\}(?!.*reduced-motion|.*usePrefersReducedMotion)/g,
    good: false,
    type: 'framer-motion',
  },
  // Transition timing without checks
  uncheckedTransition: {
    pattern: /transition(-duration|-timing-function|-delay)?:\s*[^;]*;(?!.*@media.*prefers-reduced-motion)/g,
    good: false,
    type: 'transition',
  },
};

// Process a single file for motion preference handling
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(rootDir, filePath);
  const results = [];
  // If file already includes reduced-motion guards, we'll downgrade some findings to warnings
  const hasReducedMotionGuard = /prefersReducedMotion|useMotionPreference|usePrefersReducedMotion/.test(content);
  
  // Check each pattern
  Object.entries(patterns).forEach(([name, config]) => {
    const matches = [...content.matchAll(config.pattern)];
    
    if (matches.length > 0) {
      matches.forEach(match => {
        // Base result
        let type = config.type;
        let isGood = config.good;
        // Downgrade potentially problematic animations to warnings if the file uses reduced-motion guards
        if (!config.good && hasReducedMotionGuard && ['animation','framer-motion','transition'].includes(config.type)) {
          type = 'warning';
        }
        results.push({
          file: relativePath,
          pattern: name,
          match: match[0],
          isGood,
          type,
          lineNumber: getLineNumber(content, match.index),
        });
      });
    }
  });
  
  // Special case: Check if any animation is used but no reduced motion hook is imported
  const hasAnimations = results.some(r => 
    ['animation', 'framer-motion', 'transition'].includes(r.type));
  
  const hasReducedMotionCheck = results.some(r => 
    ['hook', 'css', 'variant'].includes(r.type) && r.isGood);
  
  if (hasAnimations && !hasReducedMotionCheck) {
    results.push({
      file: relativePath,
      pattern: 'missingReducedMotionCheck',
      match: 'File contains animations but no reduced motion checks',
      isGood: false,
      type: 'warning',
      lineNumber: 0,
    });
  }
  
  return results;
}

// Helper to get line number for a match
function getLineNumber(content, index) {
  const lines = content.slice(0, index).split('\n');
  return lines.length;
}

// Recursively scan directory for relevant files
function scanDirectory(dir, fileTypes = ['.tsx', '.jsx', '.ts', '.js', '.css']) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip irrelevant directories
      if (entry.name !== 'node_modules' && entry.name !== '.next' && !entry.name.startsWith('.')) {
        results = [...results, ...scanDirectory(fullPath, fileTypes)];
      }
    } else if (fileTypes.some(ext => entry.name.endsWith(ext))) {
      const fileResults = processFile(fullPath);
      results = [...results, ...fileResults];
    }
  }
  
  return results;
}

// Format and display results
function displayResults(results) {
  // Group results by file for better readability
  const fileResults = {};
  
  results.forEach(result => {
    if (!fileResults[result.file]) {
      fileResults[result.file] = {
        good: [],
        bad: [],
        warnings: [],
      };
    }
    
    if (result.isGood) {
      fileResults[result.file].good.push(result);
    } else if (result.type === 'warning') {
      fileResults[result.file].warnings.push(result);
    } else {
      fileResults[result.file].bad.push(result);
    }
  });
  
  // Count issues
  const counts = {
    files: Object.keys(fileResults).length,
    goodPractices: results.filter(r => r.isGood).length,
    issues: results.filter(r => !r.isGood && r.type !== 'warning').length,
    warnings: results.filter(r => r.type === 'warning').length,
  };
  
  // Output as JSON if requested
  if (jsonOutput) {
    // Don't output any logs before the JSON when in JSON mode
    process.stdout.write(JSON.stringify({ fileResults, counts }, null, 2));
    return;
  }
  
  // Display formatted results
  console.log(`\n${colors.cyan}===== Motion Preference Analysis Report =====\n${colors.reset}`);
  console.log(`${colors.blue}Files scanned: ${counts.files}${colors.reset}`);
  console.log(`${colors.green}Good practices found: ${counts.goodPractices}${colors.reset}`);
  console.log(`${colors.red}Issues found: ${counts.issues}${colors.reset}`);
  console.log(`${colors.yellow}Warnings: ${counts.warnings}${colors.reset}\n`);
  
  // Display detailed report
  Object.entries(fileResults).forEach(([file, data]) => {
    // Only show files with issues if not verbose
    if (!verbose && data.bad.length === 0 && data.warnings.length === 0) {
      return;
    }
    
    console.log(`${colors.cyan}${file}${colors.reset}`);
    
    // Show good practices
    if (verbose && data.good.length > 0) {
      console.log(`  ${colors.green}Good Practices:${colors.reset}`);
      data.good.forEach(result => {
        console.log(`    ${colors.green}✓${colors.reset} Line ${result.lineNumber}: ${result.type} - ${result.match.slice(0, 40)}${result.match.length > 40 ? '...' : ''}`);
      });
    }
    
    // Show issues
    if (data.bad.length > 0) {
      console.log(`  ${colors.red}Issues:${colors.reset}`);
      data.bad.forEach(result => {
        console.log(`    ${colors.red}✗${colors.reset} Line ${result.lineNumber}: ${result.type} - ${result.match.slice(0, 40)}${result.match.length > 40 ? '...' : ''}`);
        if (verbose) {
          console.log(`      ${colors.yellow}Suggestion:${colors.reset} Use usePrefersReducedMotion hook or CSS media query to respect user's motion preferences.`);
        }
      });
    }
    
    // Show warnings
    if (data.warnings.length > 0) {
      console.log(`  ${colors.yellow}Warnings:${colors.reset}`);
      data.warnings.forEach(result => {
        console.log(`    ${colors.yellow}!${colors.reset} ${result.match}`);
        console.log(`      ${colors.yellow}Suggestion:${colors.reset} Import and use usePrefersReducedMotion or wrap animations in conditional logic.`);
      });
    }
    
    console.log('');
  });
  
  console.log(`${colors.cyan}===== End of Report =====\n${colors.reset}`);
  console.log(`Run with --verbose flag to see all details including good practices.`);
}

// Main function
async function runTest() {
  if (!jsonOutput) {
    console.log(`${colors.cyan}Starting motion preference analysis...${colors.reset}`);
  }
  
  // Define which directories to scan
  const dirsToScan = [
    path.join(rootDir, 'src', 'components'),
    path.join(rootDir, 'src', 'hooks'),
    path.join(rootDir, 'src', 'styles'),
  ];
  
  // Scan directories
  let allResults = [];
  for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
      const dirResults = scanDirectory(dir);
      allResults = [...allResults, ...dirResults];
    }
  }
  
  // Display results
  displayResults(allResults);
  
  // Exit with error code if there are issues (useful for CI/CD)
  const hasIssues = allResults.some(r => !r.isGood && r.type !== 'warning');
  if (!jsonOutput && hasIssues) {
    process.exit(1);
  }
}

// Run the test
runTest().catch(error => {
  console.error(`${colors.red}Error running motion preference test:${colors.reset}`, error);
  process.exit(1);
});
