/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themePrimary: "#FF6154",
        themeSecondary: "#FFEFEE",
      },
    },
  },
  plugins: [require("daisyui")],
};
