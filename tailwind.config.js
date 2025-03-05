/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hn-orange': '#FF6600',
        'apple-gray': '#F5F5F7',
        'apple-border': '#E5E5E5',
        'apple-text': '#1D1D1F',
        'apple-meta': '#86868B',
        'apple-input': '#E5E5E5',
        'apple-input-focus': '#DEDEDE',
        'apple-card-border': '#F0F0F0',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'apple-card': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}; 