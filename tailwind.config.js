/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#E2C054',
          500: '#D4AF37',
          600: '#C99E5D',
        },
      },
    },
  },
  plugins: [],
};