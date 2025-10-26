/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },
      colors: {
        red: { 500: '#ef4444', 600: '#dc2626' },
        green: { 500: '#10b981', 600: '#059669' },
        yellow: { 500: '#f59e0b', 600: '#d97706' },
        purple: { 500: '#a855f7', 600: '#9333ea' },
        indigo: { 500: '#6366f1', 600: '#4f46e5' },
        pink: { 500: '#ec4899', 600: '#db2777' },
        teal: { 500: '#14b8a6', 600: '#0d9488' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
