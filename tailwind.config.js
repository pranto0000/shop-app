/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":"#FF9843",
        "red":"#FF6868",
        "secondary":"#555",
        "primaryBG":"#FCFCFC",
        "skyBlue":"#AEDEFC"
      },
    },
  },
  plugins: [require("daisyui")],

}