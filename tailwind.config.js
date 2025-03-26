
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-dm-sans)'],
          geist: ['var(--font-geist-sans)'],
        },
        colors: {
            "pale-red": "#f8796c",
            "gray": "#616161",
            "soft-gray": "#80808030",
          },
      },
    },
    plugins: [],
  }