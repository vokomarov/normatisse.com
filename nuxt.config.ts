// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Josefin+Sans', provider: 'google' },
    ],
  },

  app: {
    head: {
      script: [],
      meta: [
        {
          property: 'apple-mobile-web-app-title',
          content: 'Normatisse'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
            sizes: '180x180'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
      ]
    }
  },
})
