/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        happyPink: "#FBC4D8",
        happyPinkDark: "#F6AFC5",
        happyGray: "#F3F3F3",
      },
      borderRadius: {
        xs: "4px",
      },
      boxShadow: {
        happy: "8px 8px 0 0 #000",
      },
      keyframes: {
        softScale: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "softScale 0.45s ease-out",
      },
    },
  },
  plugins: [],
};