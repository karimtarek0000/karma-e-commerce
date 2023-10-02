import { $fetch } from "ofetch";

// ------------------ For dynamic pages ----------------------
const products = async () => {
  const res = await $fetch(`${process.env.NUXT_PUBLIC_BASE_URL}/products?size=5`);
  return res.products.map((product: Product) => `/product-details/${product._id}`);
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },

  // For Head site
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: "Karma - %s",
      meta: [
        { name: "description", content: "Karma | E-commerce" },
        { name: "theme-color", content: "#454692" },
      ],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png" },
        { rel: "manifest", href: "/favicons/site.webmanifest" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: "",
    },
  },

  // Render modes
  // routeRules: {
  //   "/product-details/**": { swr: 3600 },
  // },
  // hooks: {
  //   async "nitro:config"(nitroConfig: any) {
  //     if (nitroConfig.dev) return;

  //     const ids = await products();
  //     nitroConfig.prerender.routes.push(...ids);
  //   },
  // },

  imports: {
    dirs: ["./stores"],
  },
  build: {
    // vue-toastification - old commonjs module
    transpile: ["vue-toastification"],
  },
  plugins: ["~/plugins/piniaPlugin.ts", "~/plugins/infinityScroll.ts"],
  css: [
    "~/assets/style/main.css",
    "~/assets/style/toast.css",
    "vue-multiselect/dist/vue-multiselect.css",
  ],
  modules: [
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-vue3-google-signin",
    "@nuxtjs/device",
    "@formkit/nuxt",
  ],

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
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    quality: 80,
    format: ["webp"],
    optimize: true,
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dmtlew6gk/image/upload/",
    },
    presets: {
      cloudinary: {
        modifiers: {
          format: "webp",
        },
      },
    },
  },
  // Tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
