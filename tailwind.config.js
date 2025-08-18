/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },

      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
      },
      variants: {
        scrollBehavior: ['responsive'],
      },
    }
  },
  plugins: [],
}
