/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0EFF4",
        "background-alt": "#E7E6EC",
        surface: "#FFFFFF",
        "surface-elevated": "#FFFFFF",
        "surface-subtle": "#F6F5FA",
        border: "rgba(0, 0, 0, 0.08)",
        "border-strong": "rgba(0, 0, 0, 0.16)",
        "border-hover": "rgba(0, 0, 0, 0.28)",
        ink: {
          DEFAULT: "#0A0A0C",
          soft: "#1A1A1E",
          muted: "#666672",
          faint: "#9999A6",
        },
        sun: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
          glow: "rgba(245, 158, 11, 0.25)",
        },
        flame: {
          DEFAULT: "#EA580C",
          light: "#F97316",
          dark: "#C2410C",
        },
      },
      fontFamily: {
        display: ["Syne", "Space Grotesk", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        mega: "0.3em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
