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

  runtimeConfig: {
    // Приватные ключи (доступны только на сервере)
    sanity: {
      token: process.env.NUXT_SANITY_TOKEN
    },
    // Публичные ключи (доступны и на клиенте)
    public: {
      sanity: {
        projectId: process.env.NUXT_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_SANITY_DATASET,
        useCdn: process.env.NUXT_SANITY_USE_CDN === 'true' || false,
        apiVersion: process.env.NUXT_SANITY_API_VERSION || '2023-12-01'
      }
    }
  },
})