/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* NicoMach production palette — tailwind.config.ts, brief §3.1 */
        ink: "#050705",
        panel: "#0C110D",
        elevated: "#121912",
        gold: { DEFAULT: "#C4A052", light: "#DEC177", deep: "#8A6B22" },
        cream: "#F4EBD8",
        fog: "#A8A696",
        success: "#798C68",
        olive: "#3F4A35",
        marble: { DEFAULT: "#DFC493", dark: "#B99A5E" },
        pouch: "#8B6B3E",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
