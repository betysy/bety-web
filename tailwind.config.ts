import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00C896",
          dark: "#00A67D",
          light: "#E5FBF4",
        },
        ink: "#1A1A1A",
        muted: "#6B7280",
        surface: "#F7F8F9",
        border: "#E5E7EB",
      },
      fontFamily: {
        body: ["var(--font-almarai)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
