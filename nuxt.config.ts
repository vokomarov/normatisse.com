// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-22',
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

  // Keep the dev server from restarting on prose edits. These paths hold no
  // code the build reads.
  ignore: ['docs/**', '**/*.md'],

  fonts: {
    families: [
      // Display face: Latin brand words only (no Cyrillic coverage).
      { name: 'Josefin Sans', provider: 'google', weights: [400, 600, 700], styles: ['normal', 'italic'] },
      // Text face: carries all Ukrainian copy.
      { name: 'Onest', provider: 'google', weights: [400, 500, 600, 700], subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'] },
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
