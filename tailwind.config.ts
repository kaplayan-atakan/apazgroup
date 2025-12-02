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
        sans: [
          'var(--font-carlito)',
          'Calibri',
          'Arial',
          'Helvetica Neue',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        // Brand font uses same Carlito configuration
        brand: [
          'var(--font-carlito)',
          'Calibri',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          // Bronz/Altın odaklı ana renk paleti
          bronze: {
            50: '#faf8f5',
            100: '#f0ebe3',
            200: '#e3d7c5',
            300: '#d1b89a',
            400: '#b89b6f',  // Ana bronz
            500: '#a58856',
            600: '#8c7047',
            700: '#73593a',
            800: '#5d4830',
            900: '#4a3926',
          },
          gold: {
            50: '#fefbf5',
            100: '#fdf5e6',
            200: '#fae8c7',
            300: '#f5d69d',
            400: '#e8ba6f',
            500: '#d4a255',
            600: '#b8883f',
            700: '#95694e',  // Ana altın
            800: '#765335',
            900: '#5d4228',
          },
          // Navy/koyu ton
          primary: '#1F3A52',
          'primary-hover': '#172D40',
          'primary-light': '#2d4f6b',
          // Bronz ana ton
          secondary: '#b89b6f',
          'secondary-hover': '#a58856',
          'secondary-light': '#d1b89a',
          // Altın aksan
          accent: '#95694e',
          'accent-hover': '#765335',
          'accent-light': '#b8883f',
          // Uyumlu nötr tonlar
          neutral: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
            dark: '#222222',
            light: '#FFFFFF'
          },
          // Legacy uyumluluk
          yellow: '#95694e',
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
