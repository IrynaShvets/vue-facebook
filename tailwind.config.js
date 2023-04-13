/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [],
}