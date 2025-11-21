import '../styles/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { fontVariables } from '../lib/fonts';
import { generateOrganizationSchema } from '../lib/seo';
// Defer MotionProvider to client-only to avoid SSR vendor-chunk resolution for framer-motion
const MotionProvider = dynamic(
  () => import('../components/layout/MotionProvider').then(m => m.MotionProvider),
  { ssr: false }
);

const siteName = 'Apaz Group';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: '%s | Apaz Group'
  },
  description: 'Apaz Group kurumsal web sitesi',
  applicationName: siteName,
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon-64x64.png', sizes: '64x64', type: 'image/png' }
    ]
  },
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
  <meta name="theme-color" content="#020617" />
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
