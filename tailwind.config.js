/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#FFF',
        gray: '#999',
        red: '#F00'
      }
    },
  },
  plugins: [],
}

