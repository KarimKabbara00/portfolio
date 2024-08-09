/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      resize: {
        none: "none",
        x: "horizontal",
        y: "vertical",
        both: "both",
      },
      pointerEvents: {
        none: "none",
        auto: "auto",
      },
      colors: {
        bgColor: "#1a1a1a",
        white: "#E7ECEF",
        primary: "#ef233c",
        secondary: "#EF233C",
        tertiary: "#E7ECEF",
        textPlaceholder: "#9ca3af"
      },
      boxShadow: {
        portfolioImage: "0px 0px 20px 2px rgba(239, 35, 60, 1)",
      },
    },
  },
  variants: {
    extend: {
      pointerEvents: ["responsive"],
    },
  },
  plugins: [],
};
