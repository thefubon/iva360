<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div v-if="pending" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка страницы...</p>
      </div>
      
      <div v-else-if="error" class="text-red-600 text-center">
        <h2 class="text-xl font-semibold mb-2">Ошибка загрузки</h2>
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="!page" class="text-center">
        <h2 class="text-xl font-semibold mb-2">Страница не найдена</h2>
        <p class="text-gray-600">Страница с указанным слагом не существует.</p>
        <nuxt-link to="/home" class="text-blue-600 hover:text-blue-800 underline mt-4 inline-block">
          ← На главную
        </nuxt-link>
      </div>
      
      <article v-else class="max-w-4xl mx-auto">
        <!-- Навигация -->
        <div class="mb-6">
          <nuxt-link to="/home" class="text-blue-600 hover:text-blue-800 underline">
            ← На главную
          </nuxt-link>
        </div>

        <!-- Заголовок -->
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>
          
          <!-- SEO информация (если есть) -->
          <div v-if="page.seo && (page.seo.title || page.seo.description)" class="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-semibold mb-2 text-blue-900">SEO информация:</h3>
            <p v-if="page.seo.title" class="text-sm mb-1">
              <strong>Title:</strong> {{ page.seo.title }}
            </p>
            <p v-if="page.seo.description" class="text-sm">
              <strong>Description:</strong> {{ page.seo.description }}
            </p>
          </div>
        </header>

        <!-- Содержание -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div v-if="page.body" class="prose prose-lg max-w-none">
            <SanityPortableText :content="page.body" />
          </div>
          <div v-else class="text-gray-500 italic">
            Содержание страницы не добавлено.
          </div>
        </div>

        <!-- Навигация внизу -->
        <div class="mt-8 flex justify-between items-center">
          <nuxt-link 
            to="/blog" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Блог
          </nuxt-link>
          
          <nuxt-link 
            to="/home" 
            class="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            На главную →
          </nuxt-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

const route = useRoute()
const { getPageBySlug } = useSanity()

// Загрузка страницы по слагу
const { data: page, pending, error } = await useLazyAsyncData(`page-${route.params.slug}`, async () => {
  return await getPageBySlug(route.params.slug as string)
})

// SEO
useHead({
  title: () => {
    if (page.value?.seo?.title) return page.value.seo.title
    if (page.value?.title) return page.value.title
    return 'Страница не найдена'
  },
  meta: [
    { 
      name: 'description', 
      content: () => {
        if (page.value?.seo?.description) return page.value.seo.description
        if (page.value?.title) return `Страница: ${page.value.title}`
        return 'Страница не найдена'
      }
    }
  ]
})
</script>
