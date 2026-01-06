/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* =========================
         🎨 Full Brand Palette
      ========================== */
      colors: {
        cherry_blossom: {
          DEFAULT: "#edafb8",
          100: "#430f17",
          200: "#871f2e",
          300: "#ca2e45",
          400: "#de6d7e",
          500: "#edafb8",
          600: "#f1c0c7",
          700: "#f4d0d5",
          800: "#f8dfe3",
          900: "#fbeff1",
        },

        powder_petal: {
          DEFAULT: "#f7e1d7",
          100: "#4e230f",
          200: "#9b461f",
          300: "#d96f3e",
          400: "#e8a98b",
          500: "#f7e1d7",
          600: "#f9e8e0",
          700: "#faeee8",
          800: "#fcf4f0",
          900: "#fdf9f7",
        },

        dust_grey: {
          DEFAULT: "#dedbd2",
          100: "#322f25",
          200: "#645d4a",
          300: "#958b6f",
          400: "#bab4a1",
          500: "#dedbd2",
          600: "#e5e3dc",
          700: "#ebeae5",
          800: "#f2f1ed",
          900: "#f8f8f6",
        },

        ash_grey: {
          DEFAULT: "#b0c4b1",
          100: "#202a21",
          200: "#405541",
          300: "#607f62",
          400: "#86a488",
          500: "#b0c4b1",
          600: "#c0d0c1",
          700: "#d0dbd0",
          800: "#e0e7e0",
          900: "#eff3ef",
        },

        iron_grey: {
          DEFAULT: "#4a5759",
          100: "#0f1112",
          200: "#1e2324",
          300: "#2d3435",
          400: "#3b4647",
          500: "#4a5759",
          600: "#6a7c7f",
          700: "#8e9ea0",
          800: "#b3bec0",
          900: "#d9dfdf",
        },

        /* =========================
           🧠 Semantic Theme Colors
        ========================== */
        primary: "#edafb8",
        background: "#fdf9f7",
        card: "#fcf4f0",
        text: "#4a5759",
        muted: "#8e9ea0",
        border: "#dedbd2",
        danger: "#ca2e45",
        success: "#607f62",
      },
    },
  },
  plugins: [],
};


