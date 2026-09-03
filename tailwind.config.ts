import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050705",
          secondary: "#0C110D",
          elevated: "#121912",
        },
        cream: "#F4EBD8",
        muted: "#A8A696",
        gold: {
          DEFAULT: "#C4A052",
          light: "#DEC177",
        },
        olive: "#3F4A35",
        success: "#798C68",
        border: {
          gold: "rgba(196, 160, 82, 0.18)",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at center, rgba(196,160,82,0.16) 0%, rgba(196,160,82,0) 70%)",
        "gold-line":
          "linear-gradient(90deg, rgba(196,160,82,0) 0%, rgba(196,160,82,0.6) 50%, rgba(196,160,82,0) 100%)",
      },
      boxShadow: {
        gold: "0 0 40px rgba(196, 160, 82, 0.12)",
        "gold-sm": "0 0 18px rgba(196, 160, 82, 0.16)",
        card: "0 12px 40px rgba(0,0,0,0.45)",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 3s linear infinite",
        "pulse-gold": "pulse-gold 2.6s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
