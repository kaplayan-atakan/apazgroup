import type { Locale } from './lib/i18n';

export interface NavConfigItem { key: string; href: string }

export const navConfig: NavConfigItem[] = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/apaz-group-hakkinda' },
  { key: 'nav.franchising', href: '/franchising' },
  { key: 'nav.career', href: '/insan-kaynaklari-politikamiz' },
  { key: 'nav.contact', href: '/iletisim' }
];

export function buildNav(locale: Locale, t: (l: Locale, p: string, fallback?: string) => string) {
  return navConfig.map(i => ({ label: t(locale, i.key), href: i.href }));
}
