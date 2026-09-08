/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Work Sans"', '"Montserrat"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        obsidian: {
          950: '#060504',
          900: '#0A0908',
          800: '#12100E',
          700: '#1A1714',
          600: '#25211D',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#E8E3D8',
          300: '#D7CEC3',
        },
        gold: {
          400: '#E2C054',
          500: '#D4AF37',
          600: '#C99E5D',
          700: '#8C6D4F',
        },
      },
    },
  },
  plugins: [],
};