// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BASE_URL: "",
    },
  },
  // routeRules: {
  //   "/": { swr: 3600 }, // Revalidate after each 1 hour
  // },
  css: ["~/assets/style/main.css"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/image", "@nuxtjs/device", "@formkit/nuxt"],
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
  // Image/nuxt
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    optimize: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
