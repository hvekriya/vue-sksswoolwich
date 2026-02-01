// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // SSR and static generation
  ssr: true,
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/admin'],
      failOnError: false
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Woolwich Temple | Shree KS Swaminarayan Temple Woolwich',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content: 'Shree Swaminarayan Mandir Woolwich website contains a variety of information about the Swaminarayan Sampradaya.'
        },
        { name: 'format-detection', content: 'telephone=+442088540823' },
        { name: 'theme-color', content: '#FCC71D' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Woolwich Temple' },
        { property: 'og:url', content: 'https://www.sksswoolwich.org/' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/icons/icon.png' },
        { rel: 'apple-touch-icon', href: '/img/icons/icon.png' }
      ]
    }
  },

  css: ['~/assets/styles/main.css'],

  // Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    'nuxt-vuefire',
    '@nuxtjs/prismic'
  ],

  // Theme configuration (Nuxt UI) handled in app.config.ts
  // ui: { ... }

  // Google Fonts configuration
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],
      'Playfair Display': [400, 700]
    },
    download: false
  },

  // Firebase configuration
  vuefire: {
    auth: {
      enabled: true,
      userCallback: '~/plugins/auth-callback.ts'
    },
    config: {
      apiKey: process.env.firebase_apiKey,
      authDomain: process.env.firebase_authDomain,
      databaseURL: process.env.firebase_databaseURL,
      projectId: process.env.firebase_projectId,
      storageBucket: process.env.firebase_storageBucket,
      messagingSenderId: process.env.firebase_messagingSenderId,
      appId: process.env.firebase_appId,
      measurementId: process.env.firebase_measurementId
    }
  },

  // Prismic configuration
  prismic: {
    endpoint: 'sksswoolwich',
    clientConfig: {
      accessToken: process.env.VUE_APP_PRISMIC,
      routes: [
        { type: 'events', path: '/events/:uid' },
        { type: 'our-temple', path: '/our-temple/:uid' },
        { type: 'blog', path: '/blog/:uid' }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      flickrApiKey: process.env.flickrApiKey,
      flickrUserId: process.env.flickrUserId,
      flickrUrl: process.env.flickrUrl,
      googleCalendarApiKey: process.env.google_calendarApiKey
    }
  },

  // PWA configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Woolwich Temple',
      short_name: 'SKSSWoolwich',
      theme_color: '#FCC71D',
      background_color: '#FCC71D',
      display: 'standalone',
      start_url: '/'
    }
  },

  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: true
    },
    css: {
      // lightningcss: false
    }
  },

  build: {
    transpile: ['@prismicio/vue']
  }
})
