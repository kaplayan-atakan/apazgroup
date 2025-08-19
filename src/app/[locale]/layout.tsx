import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { useId } from 'react';

import { isLocale, defaultLocale } from '../../lib/i18n';
import { MainNav } from '../../components/navigation/MainNav';
import { t } from '../../lib/i18n-dict';
import { buildNav } from '../../navigation.config';
import { LangSwitcher } from '../../components/navigation/LangSwitcher';
import { Footer } from '../../components/layout/Footer';
import { BackToTop } from '../../components/ui/BackToTop';
import { SkipLink } from '../../components/accessibility/SkipLink';
import { LiveRegion } from '../../components/accessibility/LiveRegion';

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Generate unique IDs for aria references
  const mainContentId = useId();
  
  const locale = isLocale(params.locale) ? params.locale : null;
  if (!locale) return notFound();
  
  // HTML & body root layout'ta. Burada yalnızca içerik sarmalayıcı ekleyebiliriz.
  const navItems = buildNav(locale, t);
  
  return (
    <div 
      data-locale={locale} 
      className="flex flex-col min-h-dvh"
      lang={locale}
      dir="ltr"
    >
      {/* Skip link for keyboard navigation */}
      <SkipLink 
        href={`#${mainContentId}`} 
        text={locale === 'tr' ? 'İçeriğe geç' : 'Skip to content'} 
      />
      
      {/* Live region for screen reader announcements */}
      <LiveRegion message="" ariaLive="polite" role="status" />
      
      {/* Navigation with accessibility improvements */}
      <header>
        <MainNav locale={locale} items={navItems} endSlot={<LangSwitcher current={locale} />} />
      </header>
      
      {/* Main content area */}
      <div 
        className="flex-1"
        id={mainContentId}
        role="main"
        tabIndex={-1} // Makes the element focusable
      >
        {children}
      </div>
      
      {/* Footer and back to top with accessibility improvements */}
      <Footer locale={locale} />
      <BackToTop locale={locale} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: defaultLocale }, { locale: 'en' }];
}
