import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Import Inter with Latin subset for better performance
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Local brand font with optional configuration
// Note: Update the src path to match your actual font files
export const brandFont = localFont({
  src: [
    {
      path: '../../public/fonts/brand-font-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/brand-font-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/brand-font-bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-brand',
  fallback: ['system-ui', 'sans-serif'],
});

// CSS variables to be used in tailwind.config.ts
export const fontVariables = `${inter.variable} ${brandFont.variable}`;

/**
 * Font preload optimization guide:
 * 
 * 1. Make sure fonts are placed in /public/fonts/ directory
 * 2. Use next/font/local for local fonts or next/font/google for Google fonts
 * 3. Use 'swap' display strategy for better UX during font loading
 * 4. Use subsets when possible to reduce font file size
 * 5. Include only the weights you actually use in your design
 * 
 * In layout.tsx, add the font variables to the body className:
 * <body className={`${fontVariables} ...other classes`}>
 * 
 * In tailwind.config.ts, reference the CSS variables:
 * theme: {
 *   extend: {
 *     fontFamily: {
 *       sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
 *       brand: ['var(--font-brand)', ...defaultTheme.fontFamily.sans],
 *     },
 *   },
 * },
 */
