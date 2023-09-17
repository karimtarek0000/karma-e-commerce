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
  imports: {
    dirs: ["./stores"],
  },
  plugins: ["~/plugins/piniaPlugin.ts", "~/plugins/infinityScroll.ts"],
  css: ["~/assets/style/main.css", "vue-multiselect/dist/vue-multiselect.css"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/image", "nuxt-vue3-google-signin", "@nuxtjs/device", "@formkit/nuxt"],

  // Google signin
  googleSignIn: {
    clientId: "810539462889-hmj4v9ifvujcrr2f4qa4clgula26ekd1.apps.googleusercontent.com",
  },

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
