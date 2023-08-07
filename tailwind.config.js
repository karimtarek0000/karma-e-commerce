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
        primaryDarken: withOpacity("color-primary-darken"),
      },
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        18: "1.125rem",
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
