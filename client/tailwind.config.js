// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Matching the purple in the mockup
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  safelist: [
    // Ring utilities
    'ring-2',
    'ring-opacity-50',
    'ring-blue-500',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-blue-500',
    'focus:outline-none',
    
    // Primary color utilities
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-500',
    'bg-primary-600',
    'hover:bg-primary-700',
    'hover:bg-primary-200',
    'text-primary-500',
    'text-primary-600',
    'text-primary-700',
    'hover:text-primary-500',
    'hover:text-primary-700',

    // Secondary color utilities
    'bg-secondary-500',
    'hover:bg-secondary-600',

    // Other common utilities that might be used
    'border-gray-300',
    'focus:border-blue-500',
    'text-white',
    'text-gray-700',
    'hover:bg-gray-50',
    'border-red-500',
    'text-red-500',
    'bg-red-50',
  ],
  plugins: [],
};