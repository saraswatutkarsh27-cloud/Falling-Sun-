/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Reference design tokens ---
        bg: "#e8232b",
        cream: "#f3dfc6",
        ink: {
          DEFAULT: "#1d1210",
          soft: "#1d1210",
          muted: "#4a2c1e",
          faint: "#6b4a35",
        },
        reddark: "#b8161c",
        yellow: {
          DEFAULT: "#ffc50f",
          light: "#ffd54a",
        },
        green: "#1f9a4a",
        brown: "#9a3f12",
        lime: "#c9c93a",
        pink: "#f2327f",
        // --- Legacy aliases remapped onto the new palette ---
        background: "#e8232b",
        "background-alt": "#b8161c",
        surface: "#f3dfc6",
        "surface-elevated": "#f3dfc6",
        "surface-subtle": "#f3dfc6",
        border: "#1d1210",
        sun: {
          DEFAULT: "#ffc50f",
          light: "#ffd54a",
          dark: "#9a3f12",
          glow: "rgba(255, 197, 15, 0.35)",
        },
        flame: {
          DEFAULT: "#b8161c",
          light: "#e8232b",
          dark: "#7d1014",
        },
      },
      fontFamily: {
        display: ['"Londrina Solid"', "Impact", "sans-serif"],
        hand: ['"Caveat Brush"', "cursive"],
        body: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"Space Grotesk"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        mega: "0.3em",
      },
      boxShadow: {
        stamp: "7px 7px 0 #1d1210",
        card: "6px 6px 0 #1d1210",
        btn: "5px 5px 0 #1d1210",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 24s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      // @keyframes marquee and twinkle live in src/index.css (STEP 2)
    },
  },
  plugins: [],
};
