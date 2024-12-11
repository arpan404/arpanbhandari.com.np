import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        helvetica: ["Helvetica", "sans-serif"],
        "helvetica-light": ["Helvetica Light", "Helvetica", "sans-serif"],
        "helvetica-compressed": [
          "Helvetica Compressed",
          "Helvetica",
          "sans-serif",
        ],
        "helvetica-rounded": ["Helvetica Rounded", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
