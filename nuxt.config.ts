// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  
  app: {
    head: {
      titleTemplate: 'IVA360 | %s',
      title: 'IVA360',
      meta: [
        { name: 'description', content: 'Empty' },
        { name: 'robots', content: 'noindex, nofollow' }
      ],
      htmlAttrs: {
        lang: 'ru',
      },
    }
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['shadcn-nuxt', '@nuxt/image', '@nuxt/eslint'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
})