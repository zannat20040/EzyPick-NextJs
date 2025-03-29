/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/(pages)/**/*.{js,ts,jsx,tsx}',  // Fixed path
    './src/_components/**/*.{js,ts,jsx,tsx}',   // Fixed `_components` to `_component`
    './src/_ClientSideComponents/**/*.{js,ts,jsx,tsx}', // Added `_clientcomponents`
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        geist: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
};
