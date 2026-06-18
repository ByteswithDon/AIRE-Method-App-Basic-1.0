import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F5EFE0",
        ink: "#1A1A1A",
        amber: "#E8A317",
        sage: "#4A5F38",
        terracotta: "#A8431F",
        border: "#D6CEBC",
        muted: "#3D3426",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
