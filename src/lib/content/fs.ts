import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

function walk(dir: string, acc: string[] = [], base = dir): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, acc, base);
    } else if (entry.endsWith('.md')) {
      acc.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return acc;
}

export function listMarkdownFiles(locale: string): string[] {
  const dir = path.join(CONTENT_ROOT, locale);
  return walk(dir, [] , dir);
}

export function readMarkdownFile(locale: string, relativePath: string): string | null {
  const p = path.join(CONTENT_ROOT, locale, relativePath);
  // // If there is a marker file with .md.outdated, treat the original as nonexistent
  // if (p.endsWith('.md')) {
  //   const outdatedMarker = `${p}.outdated`;
  //   if (fs.existsSync(outdatedMarker)) {
  //     // Only treat as outdated if marker explicitly indicates so
  //     try {
  //       const marker = fs.readFileSync(outdatedMarker, 'utf8');
  //       const isOutdated = /(^|\n)\s*outdated\s*:\s*true\s*($|\n)/i.test(marker.trim());
  //       if (isOutdated) return null;
  //       // If marker exists but doesn't explicitly set outdated: true, ignore the marker
  //     } catch {
  //       // On any read error, be conservative and ignore the marker
  //     }
  //   }
  // }
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}
