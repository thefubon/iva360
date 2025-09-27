import type { SanityClient } from '@sanity/client'

declare module '#app' {
  interface NuxtApp {
    $sanity: SanityClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $sanity: SanityClient
  }
}

export {}
