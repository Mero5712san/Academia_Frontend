// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)", // custom soft shadow
      },
      colors: {
        teal1: "#2ac3b2",
        teal2: "#40d1bf",
      },
      backgroundImage: {
        "header-gradient": "linear-gradient(90deg, #34c7af 0%, #40d1bf 100%)",
      },
    },
  },
  plugins: [],
}
