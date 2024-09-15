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
        bgColor: "#141516",
        white: "#E7ECEF",
        primary: "#ef233c",
        secondary: "#EF233C",
        tertiary: "#E7ECEF",
        textPlaceholder: "#9ca3af",
      },
      boxShadow: {
        portfolioImage: "0px 0px 10px 1px rgba(239, 35, 60, 1)",
      },
      borderWidth: {
        thin: "1px",
      },
    },
    screens: {
      xlScreen: { max: "2000px" },
      portfolioTextWidth: { max: "1600px" },
      largeScreen: { max: "1500px" },
      midScreen: { max: "1300px" },
      smallScreen: { max: "1150px" },
      xsScreen: { max: "950px" },
      contactFieldWidth: { max: "700px" },
      portfolioTechWidth: { max: "555px" },
      portfolioTechWidthXs: { max: "440px" },
      contactFieldWidthXs: { max: "525px" },
      xxsScreen: { max: "400px" },
    },
  },
  variants: {
    extend: {
      pointerEvents: ["responsive"],
    },
  },
  plugins: [],
};
