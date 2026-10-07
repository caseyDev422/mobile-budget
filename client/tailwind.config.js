/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'app-light-bg': '#f2f2f2',
        'app-light-surface': '#eaf6eb',
        'app-light-surface-alt': '#c7e5c8',
        'app-light-border': '#d9d9d9',
        'app-light-text': '#5e5e5e',
        'app-light-muted': '#b0b0b0',
        'app-light-primary': '#4cae4f',
        'app-light-secondary': '#80c684',
        'app-dark-bg': '#1e1e1e',
        'app-dark-surface': '#2a4032',
        'app-dark-surface-alt': '#424242',
        'app-dark-border': '#424242',
        'app-dark-text': '#e0e0e0',
        'app-dark-muted': '#b0b0b0',
        'app-dark-primary': '#4cae4f',
        'app-dark-secondary': '#3d8f3d'
      }
    },
  },
  plugins: [],
};
