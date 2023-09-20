/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans", "sans-serif"],
      },
      colors: {
        clrMediumGrey: "#828282",
        clrClearBlue: "#2F80ED",
        clrCelestialBlue: "#2D9CDB",
        clrPaleSlate: "#BDBDBD",
        clrPastelRed: "#EB5757",
        clrSeashell: "#F2F2F2",
        clrVampireGrey: "#4F4F4F",
        clrDarkGrey: "#333333",
      },
    },
  },
  plugins: [],
};
