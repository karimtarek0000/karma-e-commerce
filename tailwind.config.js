/** @type {import('tailwindcss').Config} */

const withOpacity = (colorVar) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(--${colorVar}),${opacityValue})`;
    return `rgba(var(--${colorVar}))`;
  };
};

module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/App.vue",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: withOpacity("color-primary"),
      },
      fontSize: {
        14: "0.875rem",
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      colors: {
        primary: withOpacity("--color-primary"),
      },
      gridTemplateColumns: {},
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
