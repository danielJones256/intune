/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#526F3C",
      },
      fontFamily: {
        montserrat: ["Montserrat", "Sans-serif"],
      },
    },
  },
  plugins: [],
};
