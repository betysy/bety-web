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
          deep: "#0B2622",
          light: "#1E4F47",
        },
        sand: {
          DEFAULT: "#E8DCC8",
          light: "#F5EFE2",
        },
        clay: {
          DEFAULT: "#B5502A",
          dark: "#8F3C1E",
        },
        cream: "#FAF7F2",
        ink: "#1A1A18",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        arabic: ["var(--font-tajawal)", "sans-serif"],
      },
      borderRadius: {
        arch: "999px 999px 0 0",
      },
    },
  },
  plugins: [],
};

export default config;
