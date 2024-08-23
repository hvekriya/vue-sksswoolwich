import PnpWebpackPlugin from "pnp-webpack-plugin";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Woolwich Temple | Shree KS Swaminarayan Temple Woolwich",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Shree Swaminarayan Mandir Woolwich website contains a variety of information about the Swaminarayan Sampradaya. Learn about Mandirs such as Ahmdavad &amp; Bhuj, Acharyas from Ayodhyaprasadji Maharaj to Koshlendraprasadji Maharaj, Shastras such as the Shikshapatri &amp; Vachanamrut, Santo such as Muktanand Swami &amp; Ramanand Swami, Haribhakto, Maala, Tilak Chandlo, Dandvat pranaam and more!",
      },
      { name: "format-detection", content: "telephone=+442088540823" },
      {
        name: "keywords",
        content:
          "swaminarayan woolwich, skss, skssw,woolwich, wedding hall, wedding venue, wedding hall near me, venue, party venue, mandir, yuvak mandal, download, woolwich temple, shikshapatri, calendar, bhuj",
      },
      { name: "theme-color", content: "#FCC71D" },
      // Mobile app
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Woolwich Temple" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "yepurples" },
      // Meta Tags
      { hid: "og-type", property: "og:type", content: "website" },
      { hid: "og-title", property: "og:title", content: "Woolwich Temple" },
      {
        hid: "og-desc",
        property: "og:description",
        content:
          "Shree Swaminarayan Mandir Woolwich website contains a variety of information about the Swaminarayan Sampradaya. Learn about Mandirs such as Ahmdavad &amp; Bhuj, Acharyas from Ayodhyaprasadji Maharaj to Koshlendraprasadji Maharaj, Shastras such as the Shikshapatri &amp; Vachanamrut, Santo such as Muktanand Swami &amp; Ramanand Swami, Haribhakto, Maala, Tilak Chandlo, Dandvat pranaam and more!",
      },
      {
        hid: "og-image",
        property: "og:image",
        content:
          "https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format",
      },
      {
        hid: "og-url",
        property: "og:url",
        content: "https://www.sksswoolwich.org/",
      },
      { hid: "t-type", name: "twitter:card", content: "summary_large_image" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/img/icons/icon.png" },
      { rel: "apple-touch-icon", href: "/img/icons/icon.png" },
      { rel: "apple-touch-icon-precomposed", href: "/img/icons/icon.png" },
      { rel: "apple-touch-startup-image", href: "/img/icons/icon.png" },
      // CSS
      {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
      // Font
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Spectral",
      },
    ],
    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        body: true,
      },
      {
        src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
        body: true,
      },
      {
        src: "/js/main.js",
        body: true,
        defer: true,
      },
    ],
  },

  // Environment variable
  env: {
    google_api_key: process.env.GOOGLE_API_KEY,
    flickrApiKey: process.env.flickrApiKey,
    flickrUserId: process.env.flickrUserId,
    flickrUrl: process.env.flickrUrl,
    buildID: process.env.buildID,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#9b0d02" },

  /*
   ** Global CSS
   */
  css: ["~/assets/styles/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/prismicLinks", ssr: false },
    "~plugins/filters.js",
    "~plugins/wysiwyg.js",
    { src: "~/plugins/lightgallery.client.js", ssr: false },
  ],

  //   serverMiddleware: [
  //   '~plugins/redirects.js'
  // ],

  /*
   ** Nuxt.js modules
   */

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    [
      "nuxt-gmaps",
      {
        key: process.env.VUE_APP_GOOGLE_MAP_API,
      },
    ],
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.firebase_apiKey,
          authDomain: process.env.firebase_authDomain,
          databaseURL: process.env.firebase_databaseURL,
          projectId: process.env.firebase_projectId,
          storageBucket: process.env.firebase_storageBucket,
          messagingSenderId: process.env.firebase_messagingSenderId,
          appId: process.env.firebase_appId,
          measurementId: process.env.firebase_measurementId,
        },
        services: {
          auth: true,
          database: true,
          storage: true,
        },
      },
    ],
  ],

  /*
   ** Style resources
   */
  styleResources: {
    scss: ["~/assets/styles/main.scss"],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/google-analytics",
    "@nuxtjs/prismic",
    "@nuxtjs/fontawesome",
  ],

  fontawesome: {
    component: "Fa",
    suffix: false,
    icons: {
      solid: true,
      brands: true,
    },
  },

  prismic: {
    endpoint: "https://sksswoolwich.prismic.io/api/v2",
    // linkResolver: "~/plugins/link-resolver.js",
    apiOptions: {
      accessToken: process.env.VUE_APP_PRISMIC,
    },
    routes: [
	    { type: 'events', path: '/events/:uid/:id' }
	  ]
  },

  googleAnalytics: {
    id: process.env.GA, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GA,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      short_name: "SKSSWoolwich",
      name: "Shree Kutch Satsang Swaminarayan Temple Woolwich",
      icons: [
        {
          src: "/img/icons/36x36.png",
          type: "image/png",
          sizes: "36x36",
        },
        {
          src: "/img/icons/48x48.png",
          type: "image/png",
          sizes: "48x48",
        },
        {
          src: "/img/icons/72x72.png",
          type: "image/png",
          sizes: "72x72",
        },
        {
          src: "/img/icons/96x96.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          src: "/img/icons/144x144.png",
          type: "image/png",
          sizes: "144x144",
        },
        {
          src: "/img/icons/192x192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          src: "/img/icons/512x512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      background_color: "#FCC71D",
      theme_color: "#FCC71D",
      display: "standalone",
      start_url: "/",
      "mobile-web-app-capable": "yes",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
    // transpile: /@fullcalendar.*/,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },
  },
  // generate: {
  //   routes: async () => {
  //     const client = Prismic.client(nuxtConfig.prismic.endpoint, {
  //       routes: nuxtConfig.prismic.apiOptions.routes,
  //     })

  //     const pages = await client.query(
  //       Prismic.Predicates.at('document.type', 'events'),
  //       Prismic.Predicates.at('document.type', 'article'),
  //       Prismic.Predicates.at('document.type', 'blog'),
  //       Prismic.Predicates.at('document.type', 'home'),
  //       Prismic.Predicates.at('document.type', 'kirtan'),
  //       Prismic.Predicates.at('document.type', 'our-temple')
  //     )

  //     return pages.results.map((page) => page.url)
  //   }
  // }
};
