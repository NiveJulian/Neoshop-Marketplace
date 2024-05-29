/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0069AA',
        secondary: '#FF8200',
        background: '#FFFFFF',
        details: '#EBEBEB',
      }
    },
  },
  plugins: [],
}