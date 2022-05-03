import { apiEndpoint } from './sm.json'

export default {
  target: "static",
  ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    title: "Pap'hiphop",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
      }
    ]
  },

  server: {
    host: '0'
  },

  plugins: ['~/plugins/socket.io.js'],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/prismic'
  ],

  router: {
    middleware: ['init-app']
  },

  components: true,
  loading: false,

  /*
   ** Global CSS
   */
  // css: ["@/assets/css/resetr.css", "@/assets/css/common.css"],

  css: [
    '@/assets/style/app.scss',
  ],

  prismic: {
    endpoint: apiEndpoint,
    modern: true
    /* see configuration for more */
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },
    transpile: ["@prismicio/vue"],
  },

  generate: {
    fallback: "404.html" // Netlify reads a 404.html, Nuxt will load as an SPA
  }
};
