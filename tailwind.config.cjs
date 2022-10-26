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
      keyframes: {
        headShake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },

          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },

          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },

          "43.5%": {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
        swing: {
          "20%": {
            transform: "rotate3d(0, 0, 1, 15deg)",
          },

          "40%": {
            transform: "rotate3d(0, 0, 1, -10deg)",
          },

          "60%": {
            transform: "rotate3d(0, 0, 1, 5deg)",
          },

          "80%": {
            transform: "rotate3d(0, 0, 1, -5deg)",
          },
          to: {
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
        },
        jello: {
          "from, 11.1%,to": {
            transform: "translate3d(0, 0, 0)",
          },

          "22.2%": {
            transform: "skewX(-12.5deg) skewY(-12.5deg)",
          },

          "33.3%": {
            transform: "skewX(6.25deg) skewY(6.25deg)",
          },

          "44.4%": {
            transform: "skewX(-3.125deg) skewY(-3.125deg)",
          },

          "55.5%": {
            transform: "skewX(1.5625deg) skewY(1.5625deg)",
          },

          "66.6%": {
            transform: "skewX(-0.78125deg) skewY(-0.78125deg)",
          },

          "77.7%": {
            transform: "skewX(0.390625deg) skewY(0.390625deg)",
          },

          "88.8%": {
            transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)",
          },
        },
        flash: {
          "25%, 40%": { opacity: "0" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0" },
        },
      },
      animation: {
        jello: "jello 2s",
        swing: "swing 2s ease-out ",
        headShake: "headShake 2s",
        flash: "flash 2s",
      },
    },
  },
  plugins: [],
};
