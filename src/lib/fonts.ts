import { Inter } from 'next/font/google';

// Import Inter with Latin subset for better performance
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// CSS variables to be used in tailwind.config.ts
// Temporary: brand font disabled until files are added; brand maps to Inter.
export const fontVariables = `${inter.variable}`;

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
 *       brand: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
 *     },
 *   },
 * },
 */
