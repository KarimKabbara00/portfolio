/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#1a1a1a",
        white: "#E7ECEF",
        primary: "#ef233c",
        secondary: "#C98D00",
        tertiary: "#E7ECEF",
      },
      boxShadow: {
        portfolioImage: "0px 0px 20px 2px rgba(239, 35, 60, 1)",
      },
    },
  },
  plugins: [],
};
