/** @type {import('tailwindcss').Config} */

const withOpacity = (colorVar) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(--${colorVar}),${opacityValue})`;
    return `rgba(var(--${colorVar}))`;
  };
};

export const content = [
  "./src/components/**/*.{js,vue,ts}",
  "./src/layouts/**/*.vue",
  "./src/pages/**/*.vue",
  "./src/plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
  "./src/tailwind-theme.ts",
  "./src/App.vue",
];
export const theme = {
  extend: {
    backgroundColor: {
      primary: withOpacity("color-primary"),
      secondary: withOpacity("color-secondary"),
    },
    colors: {
      primary: withOpacity("color-primary"),
      secondary: withOpacity("color-secondary"),
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
    gridTemplateColumns: {},
  },
  container: {
    center: true,
  },
};
export const plugins = [require("tailwind-scrollbar"), require("@tailwindcss/forms"), require("@formkit/themes/tailwindcss")];
