// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: "europe-west1",
        maxInstances: 3,
      },
    },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  app: {
    head: {
      title: "Optika Future",
    },
  },
  modules: [
    "nuxt-quasar-ui",
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    "nuxt-vuefire",
    "@pinia/nuxt",
  ],

  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      projectId: process.env.FB_PROJECT_ID,
      appId: process.env.FB_APP_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      measurementId: process.env.FB_MEASUREMENT_ID,
    },
  },

  quasar: {
    config: {
      brand: {
        primary: "#224B8D",
        secondary: "#E5E7EB",
      },
    },
    sassVariables: "assets/css/quasar.variables.scss",
    extras: {
      font: null,
      fontIcons: ["fontawesome-v6", "material-icons-outlined"],
    },
    plugins: ["Dialog", "Notify"],
  },
  runtimeConfig: {
    public: {
      mapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      FB_API_KEY: process.env.FB_API_KEY,
      FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
      FB_PROJECT_ID: process.env.FB_PROJECT_ID,
      FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
      FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
      FB_APP_ID: process.env.FB_APP_ID,
      FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
    },
  },

  routeRules: {
    "/login": { prerender: true },
    "/register": { prerender: true },
    "/forgot-password": { prerender: true },
    "/book-eye-test": { prerender: true },
    "/account/**": { ssr: false },
    "/admin/**": { ssr: false },
    "/shopping-cart": { ssr: false },
  },
});
