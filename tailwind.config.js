/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c2579cc",
        secondary: "#f6e7ff",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};
