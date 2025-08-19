import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isLocale } from './src/lib/i18n';

// Turkish diacritic normalization map for slug segments.
const DIACRITIC_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'c',
  'ğ': 'g', 'Ğ': 'g',
  'ı': 'i', 'İ': 'i',
  'ö': 'o', 'Ö': 'o',
  'ş': 's', 'Ş': 's',
  'ü': 'u', 'Ü': 'u'
};

function normalizeSegment(segment: string) {
  let changed = false;
  const normalized = segment
    .split('')
    .map(ch => {
      const rep = DIACRITIC_MAP[ch];
      if (rep) { changed = true; return rep; }
      return ch;
    })
    .join('');
  return { normalized, changed };
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  // Check locale prefix
  const parts = pathname.split('/'); // ['', maybeLocale, ...rest]
  const maybeLocale = parts[1];
  if (!isLocale(maybeLocale)) return NextResponse.next();
  if (parts.length < 3) return NextResponse.next(); // no slug
  // Only transform last segment (slug)
  const lastIndex = parts.length - 1;
  const last = parts[lastIndex] ?? '';
  const { normalized, changed } = normalizeSegment(decodeURIComponent(last));
  if (changed) {
    parts[lastIndex] = normalized;
    url.pathname = parts.join('/');
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)']
};
