/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'primary-red': '#FF3B00',
        'primary-red-dark': '#B30000',
        'primary-white': '#FFFFFF',
        
        // Accent Colors
        'accent-orange': '#FF6600',
        'accent-yellow': '#F5C542',
        
        // Background & UI Colors
        'background-dark': '#1A0000',
        'ui-surface-dark': '#000000',
        'ui-gray-medium': '#666666',
        'ui-gray-dark': '#333333',
        
        // Legacy colors for backward compatibility
        'jush-red': '#FF3B00',
        'jush-orange': '#FF6600',
        'jush-yellow': '#F5C542',
        'jush-white': '#FFFFFF',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}