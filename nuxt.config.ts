// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },
  routeRules: {
    "/": { swr: 3600 }, // Revalidate after each 1 hour
  },
  css: ["~/assets/style/main.css"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/nuxt"],

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
