#!/usr/bin/env node

/**
 * Pre-deploy validation script
 * Checks for common issues before pushing to production
 */

import fs from 'fs/promises';
import path from 'path';

const checks = [];
const warnings = [];
const errors = [];

async function checkFileExists(filePath, description) {
  try {
    await fs.access(filePath);
    checks.push(`✓ ${description}`);
  } catch {
    errors.push(`✗ Missing: ${description} (${filePath})`);
  }
}

async function checkFileContent(filePath, pattern, description) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    if (pattern.test(content)) {
      checks.push(`✓ ${description}`);
    } else {
      warnings.push(`⚠ ${description} (pattern not found)`);
    }
  } catch {
    errors.push(`✗ Cannot check ${description}`);
  }
}

async function validate() {
  console.log('\n🚀 Running pre-deploy validation...\n');

  // Check critical files
  await checkFileExists('./index.html', 'index.html exists');
  await checkFileExists('./styles.css', 'styles.css exists');
  await checkFileExists('./app.js', 'app.js exists');
  await checkFileExists('./manifest.json', 'manifest.json exists');
  await checkFileExists('./service-worker.js', 'service-worker.js exists');
  await checkFileExists('./package.json', 'package.json exists');

  // Check manifest PWA setup
  await checkFileContent(
    './manifest.json',
    /icons|display|start_url/,
    'PWA manifest is configured'
  );

  // Check service worker registration
  await checkFileContent(
    './app.js',
    /serviceWorker/,
    'Service worker registration in app.js'
  );

  // Check accessibility attributes
  await checkFileContent(
    './index.html',
    /aria-label|role|lang/,
    'Accessibility attributes in HTML'
  );

  // Check responsive viewport
  await checkFileContent(
    './index.html',
    /viewport|width=device-width/,
    'Responsive viewport meta tag'
  );

  // Check CSS variables
  await checkFileContent(
    './styles.css',
    /--primary|--bg|--text/,
    'CSS custom properties for theming'
  );

  console.log('\n✅ Checks passed:');
  checks.forEach(c => console.log(`  ${c}`));

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(`  ${w}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach(e => console.log(`  ${e}`));
    process.exit(1);
  }

  console.log('\n✨ Pre-deploy validation passed! Ready to deploy.\n');
}

validate().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
