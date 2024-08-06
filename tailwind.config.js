/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#1a1a1a",
        primary: "#ef233c",
        secondary: "#ef233c",
      },
      boxShadow: {
        portfolioImage: "0px 0px 20px 5px rgba(239, 35, 60, 1)",
      },
    },
  },
  plugins: [],
};
