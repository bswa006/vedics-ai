/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.95)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        'twinkle-slow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        'float-1': {
          '0%': { transform: 'translate(0, 0) scale(0.95)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1.05)' },
        },
        'float-2': {
          '0%': { transform: 'translate(0, 0) scale(1.05)' },
          '33%': { transform: 'translate(-25px, -15px) scale(0.95)' },
          '66%': { transform: 'translate(15px, 25px) scale(1.05)' },
          '100%': { transform: 'translate(0, 0) scale(0.95)' },
        },
        'float-3': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, 20px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, -10px) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle-slow 4s ease-in-out infinite',
        'float-1': 'float-1 15s ease-in-out infinite',
        'float-2': 'float-2 18s ease-in-out infinite',
        'float-3': 'float-3 20s ease-in-out infinite',
      },
      boxShadow: {
        'glow': '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)',
        'light-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'light-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
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
