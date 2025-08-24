"use client";

import { ReactNode, useId } from 'react';
import Script from 'next/script';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { BackToTop } from '../../components/ui/BackToTop';
import { SkipLink } from '../../components/accessibility/SkipLink';
import { LiveRegion } from '../../components/accessibility/LiveRegion';
import { NavigationProvider } from '../../components/context/NavigationContext';
import type { Locale } from '../../lib/i18n';

export function ClientShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const mainContentId = useId();
  return (
    <NavigationProvider>
      <div data-locale={locale} className="flex flex-col min-h-dvh" lang={locale} dir="ltr">
        <Script id="route-prefetch" strategy="afterInteractive">
          {`
            function prefetchRoutes() {
              const prefetchLinks = [
                '/${locale}/hakkimizda',
                '/${locale}/franchising',
                '/${locale}/hakkimizda/yonetim',
                '/${locale}/iletisim'
              ];
              prefetchLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = href;
                link.as = 'document';
                document.head.appendChild(link);
              });
            }
            window.addEventListener('load', () => {
              if ('requestIdleCallback' in window) {
                requestIdleCallback(prefetchRoutes);
              } else {
                setTimeout(prefetchRoutes, 1000);
              }
            });
          `}
        </Script>
        <SkipLink href={`#${mainContentId}`} text={locale === 'tr' ? 'İçeriğe geç' : 'Skip to content'} />
        <LiveRegion message="" ariaLive="polite" role="status" />
  <Header locale={locale} />
        <div className="flex-1 pt-16" id={mainContentId} role="main" tabIndex={-1}>
          {children}
        </div>
  <Footer locale={locale} />
  <BackToTop locale={locale} />
      </div>
    </NavigationProvider>
  );
}
