/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        display: ['"Cormorant Garamond"', '"Bodoni Moda"', '"Instrument Serif"', 'serif'],
      },
      colors: {
        oxblood: {
          DEFAULT: '#78000F',
          950: '#380006',
          900: '#4A0009',
          800: '#5D000B',
          700: '#78000F',
          600: '#940013',
          500: '#B0081C',
          400: '#C51E31',
          100: '#FBE8EA',
          50: '#FDF2F4',
        },
        ivory: {
          DEFAULT: '#F4EEE4',
          50: '#FAF8F3',
          100: '#F4EEE4',
          200: '#ECE4D7',
          300: '#DDD2C2',
          400: '#CFC3B3',
          500: '#B9AD9D',
        },
        sand: {
          DEFAULT: '#DDD2C2',
          100: '#EFEAE1',
          200: '#E5DCce',
          300: '#DDD2C2',
          400: '#CFC3B3',
        },
        stone: {
          border: '#CFC3B3',
          muted: '#B9AD9D',
          dark: '#8C8275',
        },
        charcoal: {
          DEFAULT: '#202020',
          950: '#0D0D0D',
          900: '#111111',
          800: '#151515',
          700: '#202020',
          600: '#2D2D2D',
          500: '#404040',
          400: '#5A5A5A',
          300: '#7A7A7A',
        },
        obsidian: {
          950: '#060504',
          900: '#0A0908',
          800: '#12100E',
          700: '#1A1714',
          600: '#25211D',
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