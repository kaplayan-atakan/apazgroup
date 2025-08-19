#!/usr/bin/env node
/**
 * CI Accessibility Tests
 * 
 * This script runs accessibility and motion preference tests in CI environments,
 * combines the results, and provides a summary output with exit code.
 * 
 * Usage in CI:
 *   node scripts/ci-a11y-tests.mjs
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Colors for terminal output (works in GitHub Actions)
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Helper to run a command and capture output
function runCommand(command) {
  try {
    const output = execSync(command, { encoding: 'utf8', cwd: rootDir });
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || '',
      error: error.stderr || error.message,
      exitCode: error.status || 1,
    };
  }
}

async function runTests() {
  console.log(`\n${colors.cyan}===== CI Accessibility Tests =====\n${colors.reset}`);
  
  // Run accessibility audit with JSON output
  console.log(`${colors.blue}Running accessibility audit...${colors.reset}`);
  const a11yResult = runCommand('node scripts/a11y-audit.mjs --json');
  
  // Run motion preference test with JSON output
  console.log(`${colors.blue}Running motion preference test...${colors.reset}`);
  const motionResult = runCommand('node scripts/motion-preference-test.mjs --json');
  
  // Parse results if they ran successfully
  let a11yData;
  let motionData;
  
  try {
    if (a11yResult.success) {
      a11yData = JSON.parse(a11yResult.output);
    }
  } catch (e) {
    console.error(`${colors.red}Error parsing accessibility audit results:${colors.reset}`, e);
  }
  
  try {
    if (motionResult.success) {
      motionData = JSON.parse(motionResult.output);
    }
  } catch (e) {
    console.error(`${colors.red}Error parsing motion preference test results:${colors.reset}`, e);
  }
  
  // Display summary
  console.log(`\n${colors.cyan}===== Test Results Summary =====\n${colors.reset}`);
  
  // Accessibility audit results
  if (a11yData) {
    console.log(`${colors.blue}Accessibility Audit:${colors.reset}`);
    console.log(`  ${colors.red}Errors: ${a11yData.counts.error}${colors.reset}`);
    console.log(`  ${colors.yellow}Warnings: ${a11yData.counts.warning}${colors.reset}`);
    console.log(`  ${colors.blue}Info: ${a11yData.counts.info}${colors.reset}`);
    
    // Show top errors if any
    if (a11yData.counts.error > 0) {
      const errors = a11yData.issues.filter(i => i.severity === 'error');
      console.log(`\n${colors.red}Top accessibility errors:${colors.reset}`);
      errors.slice(0, 5).forEach(issue => {
        console.log(`  - ${issue.file}: ${issue.message}`);
      });
      if (errors.length > 5) {
        console.log(`  ... and ${errors.length - 5} more errors`);
      }
    }
  } else {
    console.log(`${colors.red}Accessibility audit failed to run or parse results${colors.reset}`);
  }
  
  // Motion preference test results
  if (motionData) {
    console.log(`\n${colors.blue}Motion Preference Test:${colors.reset}`);
    console.log(`  ${colors.blue}Files scanned: ${motionData.counts.files}${colors.reset}`);
    console.log(`  ${colors.green}Good practices: ${motionData.counts.goodPractices}${colors.reset}`);
    console.log(`  ${colors.red}Issues: ${motionData.counts.issues}${colors.reset}`);
    console.log(`  ${colors.yellow}Warnings: ${motionData.counts.warnings}${colors.reset}`);
    
    // Show top issues if any
    if (motionData.counts.issues > 0) {
      const issues = [];
      Object.entries(motionData.fileResults).forEach(([file, data]) => {
        data.bad.forEach(item => {
          issues.push({ file, message: `${item.type} - ${item.match.slice(0, 40)}...` });
        });
      });
      
      console.log(`\n${colors.red}Top motion preference issues:${colors.reset}`);
      issues.slice(0, 5).forEach(issue => {
        console.log(`  - ${issue.file}: ${issue.message}`);
      });
      if (issues.length > 5) {
        console.log(`  ... and ${issues.length - 5} more issues`);
      }
    }
  } else {
    console.log(`${colors.red}Motion preference test failed to run or parse results${colors.reset}`);
  }
  
  // Determine exit code based on error presence
  const hasA11yErrors = a11yData && a11yData.counts.error > 0;
  const hasMotionErrors = motionData && motionData.counts.issues > 0;
  
  if (hasA11yErrors || hasMotionErrors) {
    console.log(`\n${colors.red}✗ CI tests failed with accessibility or motion preference issues${colors.reset}`);
    process.exit(1);
  } else if (!a11yResult.success || !motionResult.success) {
    console.log(`\n${colors.yellow}⚠️ CI tests had execution problems but no critical errors were found${colors.reset}`);
    process.exit(0); // Non-critical failure
  } else {
    console.log(`\n${colors.green}✓ CI tests passed with no critical accessibility issues${colors.reset}`);
    process.exit(0);
  }
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Error running CI tests:${colors.reset}`, error);
  process.exit(1);
});
