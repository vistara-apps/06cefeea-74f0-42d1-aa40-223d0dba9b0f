import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
