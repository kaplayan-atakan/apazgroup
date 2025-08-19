import '../styles/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { fontVariables } from '../lib/fonts';
import { generateOrganizationSchema } from '../lib/seo';
import { MotionProvider } from '../components/layout/MotionProvider';

const siteName = 'Apaz Group';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: '%s | Apaz Group'
  },
  description: 'Apaz Group kurumsal web sitesi (yeniden inşa)',
  applicationName: siteName,
  openGraph: {
    siteName,
    type: 'website',
    locale: 'tr_TR',
    title: siteName,
    description: 'Apaz Group kurumsal web sitesi (yeniden inşa)'
  },
  alternates: {
  canonical: '/',
    languages: {
      'tr-TR': '/',
      'en-US': '/en'
    }
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html 
      lang="tr" 
      suppressHydrationWarning 
      dir="ltr"
      className="scroll-smooth"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${fontVariables} font-sans antialiased`}>
        <MotionProvider>
          <div id="__app-shell" className="min-h-dvh flex flex-col">
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateOrganizationSchema())
              }}
            />
            
            {/* Accessibility announcement container */}
            <div
              id="a11y-announcer"
              aria-live="polite"
              className="sr-only"
              role="status"
            />
            
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
