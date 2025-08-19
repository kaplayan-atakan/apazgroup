#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const contentRoot = path.resolve('src/content');
const pagesDir = 'pages';

function listSlugs(locale) {
  const dir = path.join(contentRoot, locale, pagesDir);
  if (!fs.existsSync(dir)) return new Set();
  return new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
  );
}

const tr = listSlugs('tr');
const en = listSlugs('en');

const onlyTr = [...tr].filter((s) => !en.has(s)).sort();
const onlyEn = [...en].filter((s) => !tr.has(s)).sort();
const both = [...tr].filter((s) => en.has(s)).sort();

const result = {
  root: contentRoot,
  totals: { tr: tr.size, en: en.size, both: both.length, onlyTr: onlyTr.length, onlyEn: onlyEn.length },
  onlyTr,
  onlyEn,
};

if (process.env.JSON) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Content Parity Report (src/content/*/${pagesDir})`);
  console.log(`- TR pages: ${tr.size}`);
  console.log(`- EN pages: ${en.size}`);
  console.log(`- Common:   ${both.length}`);
  if (onlyTr.length) {
    console.log(`\nMissing in EN (${onlyTr.length}):`);
    for (const s of onlyTr) console.log(`  - ${s}`);
  }
  if (onlyEn.length) {
    console.log(`\nMissing in TR (${onlyEn.length}):`);
    for (const s of onlyEn) console.log(`  - ${s}`);
  }
}
