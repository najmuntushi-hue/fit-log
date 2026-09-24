/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        fit: '#ccff00',
        ink: '#0b0c0f',
        panel: '#14161b',
        line: '#242730',
        muted: '#8d929f'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(204,255,0,.05), 0 16px 50px rgba(0,0,0,.25)'
      }
    }
  },
  plugins: []
};
