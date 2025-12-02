import { Carlito } from 'next/font/google';

// Import Carlito with Latin-ext for Turkish character support
export const carlito = Carlito({
  subsets: ['latin', 'latin-ext'], // Türkçe karakterler için latin-ext şart
  weight: ['400', '700'], // Carlito sadece Regular ve Bold destekler
  style: ['normal', 'italic'],
  display: 'swap', // FOUT önleme, performans için swap
  variable: '--font-carlito',
  preload: true,
  fallback: ['Calibri', 'Arial', 'Helvetica Neue', 'sans-serif'],
});

// CSS variables to be used in tailwind.config.ts
export const fontVariables = `${carlito.variable}`;

/**
 * Font preload optimization guide:
 * 
 * Current font: Carlito (Google Fonts)
 * - Weights: 400 (Regular), 700 (Bold)
 * - Styles: normal, italic
 * - Character sets: Latin, Latin Extended (Turkish support: ç, ğ, ı, ö, ş, ü)
 * - Fallback chain: Calibri → Arial → Helvetica Neue → system sans-serif
 * 
 * Optimization features:
 * 1. 'swap' display strategy - prevents FOUT, shows fallback until font loads
 * 2. Subset optimization - only Latin + Latin-ext characters loaded
 * 3. Preload enabled - critical font loaded early in page lifecycle
 * 4. Self-hosted - Next.js downloads and serves fonts (no runtime Google requests)
 * 
 * Usage in components:
 * - Body text: font-normal (400)
 * - Emphasized/Bold: font-bold (700)
 * - Headings: font-bold (700)
 * - Note: font-medium (500), font-semibold (600) will fallback to nearest weight
 * 
 * In layout.tsx, font variable is applied to <body>:
 * <body className={`${fontVariables} font-sans antialiased`}>
 * 
 * In tailwind.config.ts, Carlito is the primary sans-serif font:
 * theme: {
 *   extend: {
 *     fontFamily: {
 *       sans: ['var(--font-carlito)', 'Calibri', 'Arial', ...],
 *     },
 *   },
 * },
 */
