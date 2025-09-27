<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Панель предпросмотра -->
    <div class="bg-blue-100 border-b border-blue-200 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium text-blue-800">Предпросмотр страницы</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <nuxt-link 
            to="/preview" 
            class="text-sm text-blue-700 hover:text-blue-900 underline"
          >
            ← Назад к списку
          </nuxt-link>
          <nuxt-link 
            to="/admin" 
            class="text-sm text-blue-700 hover:text-blue-900 underline"
          >
            Админка
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Контент страницы -->
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
      </div>
      
      <article v-else class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-8">
          <!-- Заголовок -->
          <h1 class="text-4xl font-bold mb-6">{{ page.title }}</h1>

          <!-- SEO информация (если есть) -->
          <div v-if="page.seo" class="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold mb-2">SEO информация:</h3>
            <p v-if="page.seo.title" class="text-sm"><strong>Title:</strong> {{ page.seo.title }}</p>
            <p v-if="page.seo.description" class="text-sm"><strong>Description:</strong> {{ page.seo.description }}</p>
          </div>

          <!-- Содержание -->
          <div v-if="page.body" class="prose prose-lg max-w-none">
            <SanityPortableText :content="page.body" />
          </div>
          <div v-else class="text-gray-500 italic">
            Содержание страницы не добавлено.
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'

const route = useRoute()
const config = useRuntimeConfig()

// Создаем клиент с токеном для доступа к черновикам
const client = createClient({
  projectId: config.public.sanity.projectId,
  dataset: config.public.sanity.dataset,
  useCdn: false, // Отключаем CDN для получения актуальных данных
  apiVersion: '2023-12-01',
  token: config.sanity?.token, // Используем токен для доступа к черновикам
})

// Загрузка страницы
const { data: page, pending, error } = await useLazyAsyncData(`preview-page-${route.params.slug}`, async () => {
  return await client.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      slug,
      body,
      seo
    }
  `, { 
    slug: route.params.slug 
  })
})

// SEO
useHead({
  title: () => page.value ? `Предпросмотр: ${page.value.title}` : 'Предпросмотр страницы',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { 
      name: 'description', 
      content: () => page.value ? `Предпросмотр страницы: ${page.value.title}` : 'Предпросмотр страницы'
    }
  ]
})
</script>
