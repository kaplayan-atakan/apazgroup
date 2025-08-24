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
  // Temporarily map brand to Inter until local brand fonts are added
  brand: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // Ana renkler
          primary: '#1F3A52',
          'primary-hover': '#172D40',
          // secondary: '#9B5A3C',
          secondary: '#92827a',
          'secondary-hover': '#7D4930',
          accent: '#C48A65',
          'accent-hover': '#A37152',
          // İstenen sarı aksan rengi
          yellow: '#95694e',
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
      },
      boxShadow: {
        'btn-sm': '0 1px 2px -1px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.08)',
        'btn-md': '0 2px 4px -2px rgba(0,0,0,0.18), 0 4px 6px -1px rgba(0,0,0,0.10)',
        'btn-lg': '0 8px 16px -6px rgba(0,0,0,0.20), 0 3px 6px -2px rgba(0,0,0,0.12)'
      },
      keyframes: {
        'slide-in-x': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      animation: {
        'slide-in-x': 'slide-in-x 0.2s ease-out'
      }
    }
  },
  plugins: []
};

export default config;
