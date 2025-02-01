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
          50: '#f5f8ff',
          100: '#e8f1ff',
          200: '#d1e3ff',
          300: '#a6c8ff',
          400: '#7aa4ff',
          500: '#4d7dff',
          600: '#3355ff',
          700: '#2940db',
          800: '#2435b3',
          900: '#1f2d8a',
          950: '#121a4d',
        },
        background: {
          light: '#ffffff',
          dark: '#121827',
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
        text: {
          light: {
            primary: '#1e293b',
            secondary: '#475569',
          },
          dark: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
          },
        },
        border: {
          light: '#e2e8f0',
          dark: '#334155',
        },
        accent: {
          light: '#4d7dff',
          dark: '#7aa4ff',
        },
      },
      boxShadow: {
        'light-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'light-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
