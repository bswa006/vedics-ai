/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oriental: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae1fd',
          300: '#7ccbfb',
          400: '#36b2f6',
          500: '#0c96e6',
          600: '#0075c4',
          700: '#005c9e',
          800: '#064e84',
          900: '#0b426e',
          950: '#072a49',
        },
      },
    },
  },
  plugins: [],
}
