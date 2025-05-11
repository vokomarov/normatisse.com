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
})
