<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-6">IVA360 CMS Админка</h1>
        
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Sanity Studio -->
          <div class="border rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Sanity Studio</h2>
            <p class="text-gray-600 mb-4">
              Управление контентом через Sanity Studio
            </p>
            <a 
              href="http://localhost:3333" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Открыть Studio
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <p class="text-sm text-gray-500 mt-2">
              Запустите: <code class="bg-gray-100 px-1 rounded">npx sanity dev --port 3333</code>
            </p>
          </div>

          <!-- Предпросмотр -->
          <div class="border rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Предпросмотр контента</h2>
            <p class="text-gray-600 mb-4">
              Просмотр черновиков и неопубликованного контента
            </p>
            <nuxt-link 
              to="/preview"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Режим предпросмотра
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </nuxt-link>
          </div>
        </div>

        <!-- Статистика -->
        <div class="mt-8 grid gap-4 md:grid-cols-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-900">Всего страниц</h3>
            <p class="text-2xl font-bold text-blue-600">{{ stats.pages }}</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-900">Всего постов</h3>
            <p class="text-2xl font-bold text-green-600">{{ stats.posts }}</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-900">Авторы</h3>
            <p class="text-2xl font-bold text-purple-600">{{ stats.authors }}</p>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-semibold text-orange-900">Черновики</h3>
            <p class="text-2xl font-bold text-orange-600">{{ stats.drafts }}</p>
          </div>
        </div>

        <!-- Последние изменения -->
        <div class="mt-8">
          <h2 class="text-xl font-semibold mb-4">Последние изменения</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-if="recentActivity.length" class="space-y-2">
              <div 
                v-for="item in recentActivity" 
                :key="item._id"
                class="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
              >
                <div>
                  <p class="font-medium">{{ item.title || item.name }}</p>
                  <p class="text-sm text-gray-500">{{ item._type }}</p>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(item._updatedAt) }}
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 text-center py-4">
              Нет данных об активности
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

// Отключаем SSR для админки
definePageMeta({
  ssr: false
})

const { client } = useSanity()

// Загружаем статистику
const { data: stats } = await useLazyAsyncData('admin-stats', async () => {
  const [pages, posts, authors, drafts] = await Promise.all([
    client.fetch(`count(*[_type == "page"])`),
    client.fetch(`count(*[_type == "post"])`),
    client.fetch(`count(*[_type == "author"])`),
    client.fetch(`count(*[_type == "post" && !defined(publishedAt)])`)
  ])
  
  return { pages, posts, authors, drafts }
}, {
  default: () => ({ pages: 0, posts: 0, authors: 0, drafts: 0 })
})

// Загружаем последнюю активность
const { data: recentActivity } = await useLazyAsyncData('recent-activity', async () => {
  return await client.fetch(`
    *[_type in ["page", "post", "author"]] | order(_updatedAt desc)[0...10] {
      _id,
      _type,
      _updatedAt,
      title,
      name
    }
  `)
}, {
  default: () => []
})

// Функция форматирования даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// SEO для админки
useHead({
  title: 'IVA360 CMS Админка',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Панель администратора для управления контентом IVA360' }
  ]
})
</script>
