/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: {
          light: "#ffe5ed", // lighter version
          DEFAULT: "#ffd1dc", // base pastelPink
          dark: "#ffadb8", // darker version
        },
        pastelBlue: {
          light: "#d0f0f8", // lighter version
          DEFAULT: "#a8d8ea", // base pastelBlue
          dark: "#76b7d2", // darker version
        },
        pastelYellow: {
          light: "#fff9e0", // lighter version
          DEFAULT: "#fef4c7", // base pastelYellow
          dark: "#fde895", // darker version
        },
        pastelGreen: {
          light: "#e9f7e4", // lighter version
          DEFAULT: "#d4f1c5", // base pastelGreen
          dark: "#aad99a", // darker version
        },
        pastelPurple: {
          light: "#ebdaf5", // lighter version
          DEFAULT: "#d4c1ec", // base pastelPurple
          dark: "#b39cd5", // darker version
        },
      },
    },
  },
  plugins: [],
};
