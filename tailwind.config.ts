import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-brand)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // Ana renkler
          primary: '#1F3A52',
          'primary-hover': '#172D40',
          secondary: '#9B5A3C',
          'secondary-hover': '#7D4930',
          accent: '#C48A65',
          'accent-hover': '#A37152',
          neutral: {
            dark: '#222222',
            light: '#FFFFFF'
          },
          // Eski değerler geriye uyumluluk için korundu
          danger: '#9d223c',
          success: '#00a65a',
          gray: {
            100: '#f5f5f5',
            300: '#B2B2B2',
            600: '#666666'
          }
        }
      }
    }
  },
  plugins: []
};

export default config;
