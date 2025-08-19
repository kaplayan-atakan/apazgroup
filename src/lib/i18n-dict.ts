import tr from '../locales/tr.json';
import en from '../locales/en.json';

import { defaultLocale, type Locale } from './i18n';

type Dict = Record<string, unknown>;
const dictionaries: Record<Locale, Dict> = { tr: tr as Dict, en: en as Dict };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function t(locale: Locale, path: string, fallback?: string): string {
  const dict = getDictionary(locale);
  const parts = path.split('.');
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Dict)) {
      current = (current as Dict)[part];
    } else {
      return fallback ?? path;
    }
  }
  return typeof current === 'string' ? current : fallback ?? path;
}
