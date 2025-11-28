/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#FF3B00',
        'primary-red-dark': '#B30000',
        'accent-orange': '#FF6600',
        'accent-yellow': '#F5C542',
        'background-dark': '#1A0000',
        'ui-surface-dark': '#000000',
        'ui-gray-medium': '#666666',
        'ui-gray-dark': '#333333',
      },
    },
  },
  plugins: [],
}

