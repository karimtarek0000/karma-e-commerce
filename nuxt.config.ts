import { $fetch } from "ofetch";

// ------------------ For dynamic pages ----------------------
const products = async () => {
  const res = await $fetch(
    `${process.env.NUXT_PUBLIC_BASE_URL}/products?size=5`
  );
  return res.products.map(
    (product: Product) => `/products/product-details/${product._id}`
  );
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
        {
          name: "description",
          content:
            "Shop the Best Products & Brands in Egypt. Same Day Delivery ✓ Cash on Delivery ✓ Easy Free Returns ✓ Credit Cards & Debit Cards",
        },
        { name: "theme-color", content: "#454692" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "favicon.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: "",
      CLIENT_URL: "",
    },
  },

  // Render modes
  routeRules: {
    "/product-details/**": { swr: 3600 },
    "/products/top-rated": { prerender: true },
    "/": { prerender: true },
  },
  hooks: {
    async "nitro:config"(nitroConfig: any) {
      if (nitroConfig.dev) return;

      const ids = await products();
      nitroConfig.prerender.routes.push(...ids);
    },
  },

  imports: {
    dirs: ["./stores", "./services/"],
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
    "nuxt-swiper",
  ],

  // Google signin
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
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
    unsplash: {
      baseURL: "https://images.unsplash.com/",
    },
    presets: {
      cloudinary: {
        modifiers: {
          format: "webp",
        },
      },
      unsplash: {
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
