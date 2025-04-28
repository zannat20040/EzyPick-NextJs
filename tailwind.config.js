const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_ClientSideComponents/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pale-red': '#f8796c',
        'custom-gray': '#616161',
        'soft-gray': '#80808030',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'geist': ['Geist', 'sans-serif'],
      },
    },
  },


  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light"]
  }
});
