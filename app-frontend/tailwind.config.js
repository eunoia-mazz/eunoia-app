/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        14: "14px",
      },
      boxShadow: {
        custom: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
      colors: {
        "custom-blue": "rgba( 255, 255, 255, 0.1 )",
      },
      backgroundImage: {
        "custom-gradient": `linear-gradient(90deg, rgba(1,10,78,1) 0%, rgba(22,42,184,1) 50%, rgba(0,10,92,1) 100%);`,
      },
      keyframes: {
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(300px)" },
        },
      },
      animation: {
        "slide-right": "slide-right 1s forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
