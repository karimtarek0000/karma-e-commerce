// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },
  css: ["~/assets/style/main.css"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt"],

  // Pinia - state mangement
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  // Fonts
  googleFonts: {
    families: {
      Roboto: [400, 700],
    },
    preload: true,
    prefetch: true,
    preconnect: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
