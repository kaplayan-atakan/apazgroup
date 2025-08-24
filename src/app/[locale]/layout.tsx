import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { isLocale, defaultLocale } from '../../lib/i18n';

import { ClientShell } from './_ClientShell';

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : null;
  if (!locale) return notFound();
  return <ClientShell locale={locale}>{children}</ClientShell>;
}

export function generateStaticParams() {
  return [{ locale: defaultLocale }, { locale: 'en' }];
}