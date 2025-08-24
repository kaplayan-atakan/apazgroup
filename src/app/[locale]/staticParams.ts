import { defaultLocale } from '../../lib/i18n';

// Generate locale params for static paths
export function generateStaticParams() {
  return [{ locale: defaultLocale }, { locale: 'en' }];
}
