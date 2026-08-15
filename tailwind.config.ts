import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#123832",
          deep: "#0A211C",
          light: "#1E4F47",
          soft: "#2A5B52",
        },
        sand: {
          DEFAULT: "#E8DCC8",
          light: "#F5EFE2",
          dark: "#D9C9A8",
        },
        clay: {
          DEFAULT: "#B5502A",
          dark: "#8F3C1E",
          light: "#CC6B42",
        },
        gold: "#C9A45C",
        cream: "#FAF7F2",
        ink: {
          DEFAULT: "#1A1A18",
          soft: "#5A5750",
        },
        line: "#E4DDCC",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,56,50,0.06), 0 8px 24px -8px rgba(18,56,50,0.12)",
        cardHover: "0 4px 8px rgba(18,56,50,0.08), 0 20px 40px -12px rgba(18,56,50,0.22)",
        lift: "0 12px 32px -8px rgba(10,33,28,0.35)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
