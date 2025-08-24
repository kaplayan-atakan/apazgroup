import type { Locale } from './lib/i18n';

export interface NavConfigItem { key: string; href: string }

export const navConfig: NavConfigItem[] = [
  // About page - direct hakkimizda path
  { key: 'nav.about', href: '/hakkimizda' },
  { key: 'nav.franchising', href: '/franchising' },
  // Canonicalize to nested career path
  { key: 'nav.career', href: '/kariyer/insan-kaynaklari-politikamiz' },
  { key: 'nav.contact', href: '/iletisim' }
];

export function buildNav(locale: Locale, t: (l: Locale, p: string, fallback?: string) => string) {
  return navConfig.map(i => ({ label: t(locale, i.key), href: i.href }));
}
