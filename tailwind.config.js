/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff0f9',
          100: '#ffe0f4',
          200: '#ffc2ea',
          300: '#ff8fd4',
          400: '#ff5cb9',
          500: '#ff2d9e',
          600: '#f0057d',
          700: '#cc0067',
          800: '#a80056',
          900: '#8a0049',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
