module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#eb1000",
          secondary: "#00405d",
          accent: "#e6e6e6",
          neutral: "#ef5c00",
          "base-100": "#ffffff",
          warning: "#ff9a00",
        },
      },
      "autumn",
    ],
  },
};
