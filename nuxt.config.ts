// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Server-side rendering on Netlify (Nitro serverless functions)
  ssr: true,
  nitro: {
    preset: 'netlify',
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

  // Modules (PWA disabled – SW generation was failing during build)
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    // '@vite-pwa/nuxt',
    'nuxt-vuefire',
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

  // Firebase configuration (auth disabled here so Auth SDK/iframe loads only on /admin)
  vuefire: {
    auth: {
      enabled: false,
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

  // Runtime configuration (env keys from build/deploy)
  runtimeConfig: {
    netlifyBuildHookId: process.env.NETLIFY_BUILD_HOOK_ID || process.env.buildID || '',
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY || '',
      flickrApiKey: process.env.flickrApiKey || process.env.NUXT_PUBLIC_FLICKR_API_KEY || '',
      flickrUserId: (() => {
        const id = process.env.flickrUserId || process.env.NUXT_PUBLIC_FLICKR_USER_ID || '';
        if (!id) return '';
        return id.includes('@') ? id : `${id}@N08`;
      })(),
      flickrUrl: process.env.flickrUrl || process.env.NUXT_PUBLIC_FLICKR_URL || 'https://api.flickr.com/services/rest',
      googleCalendarApiKey: process.env.google_calendarApiKey || process.env.NUXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || '',
      gaMeasurementId: process.env.firebase_measurementId,
    }
  },

  // PWA disabled – re-enable @vite-pwa/nuxt in modules when SW build is fixed

  // Vite configuration – split large vendors to reduce main bundle and improve caching
  // Important: run Lighthouse against PRODUCTION build (npm run build && npm run preview), not dev server
  vite: {
    build: {
      minify: 'esbuild',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase') && !id.includes('firebase-admin')) return 'firebase'
              if (id.includes('swiper')) return 'swiper'
              if (id.includes('lightgallery')) return 'lightgallery'
              if (id.includes('@nuxt/ui') || id.includes('@nuxtjs/')) return 'nuxt-ui'
              if (id.includes('vuefire') || id.includes('vue-fire')) return 'vuefire'
            }
          }
        }
      }
    },
    css: {
      // lightningcss: false
    }
  },

  build: {}
})
