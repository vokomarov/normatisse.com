// Icons Nuxt UI renders from its own defaults (modal close, collapsible
// chevron, toast status). `clientBundle.scan` only sees this project's source,
// so anything the library reaches for has to be named here or it silently
// renders nothing once `provider: 'none'` closes the API fallback.
const NUXT_UI_ICONS = [
  'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-up-right',
  'check', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
  'chevrons-left', 'chevrons-right', 'circle-alert', 'circle-check', 'circle-x',
  'copy', 'copy-check', 'ellipsis', 'eye', 'eye-off', 'file', 'folder',
  'folder-open', 'grip-vertical', 'hash', 'info', 'lightbulb', 'loader-circle',
  'menu', 'minus', 'monitor', 'moon', 'panel-left-close', 'panel-left-open',
  'plus', 'rotate-ccw', 'search', 'square', 'star', 'sun', 'terminal',
  'triangle-alert', 'upload', 'x',
].map(name => `lucide:${name}`);

// Named in composables rather than in markup, so the scanner cannot see them.
const DYNAMIC_ICONS = [
  'lucide:calendar-check',
  'lucide:phone',
  'lucide:wand-sparkles',
  'simple-icons:instagram',
  'simple-icons:telegram',
  'simple-icons:viber',
];

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

  // Canonical origin. Read through `useRuntimeConfig().public.siteUrl` so
  // canonical/og URLs stay absolute without hard-coding the host in pages.
  runtimeConfig: {
    public: {
      siteUrl: 'https://normatisse.com',
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      // Emit `bakery.html` rather than `bakery/index.html`. Cloudflare Pages
      // serves the former at `/bakery` directly; the latter makes it 308 to
      // `/bakery/`, so every internal link and the canonical went through a
      // redirect hop.
      autoSubfolderIndex: false,
    },
  },

  // Every icon ships in the bundle. Without this, icons that only appear after
  // an interaction (the collapsible chevron, the lightbox arrows) are fetched
  // from api.iconify.design at runtime — a third-party request on a site whose
  // privacy policy says it makes none, and one a strict CSP would block.
  icon: {
    provider: 'none',
    fallbackToApi: false,
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      icons: [...NUXT_UI_ICONS, ...DYNAMIC_ICONS],
    },
  },

  // WebP everywhere: the source photos are JPEG and IPX keeps the input format
  // unless told otherwise. `image.format` only covers <NuxtPicture>, so this
  // preset is what <NuxtImg preset="photo"> uses.
  image: {
    presets: {
      photo: {
        modifiers: { format: 'webp', quality: 72 },
      },
    },
  },

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
      // All copy on the site is Ukrainian.
      htmlAttrs: { lang: 'uk' },
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
