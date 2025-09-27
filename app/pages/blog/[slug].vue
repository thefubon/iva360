<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div v-if="pending" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка поста...</p>
      </div>
      
      <div v-else-if="error" class="text-red-600 text-center">
        <h2 class="text-xl font-semibold mb-2">Ошибка загрузки</h2>
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="!post" class="text-center">
        <h2 class="text-xl font-semibold mb-2">Пост не найден</h2>
        <p class="text-gray-600">Пост с указанным слагом не существует.</p>
        <nuxt-link to="/blog" class="text-blue-600 hover:text-blue-800 underline mt-4 inline-block">
          ← Вернуться к списку постов
        </nuxt-link>
      </div>
      
      <article v-else class="max-w-4xl mx-auto">
        <!-- Предупреждение о черновике -->
        <div v-if="isDraft" class="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium text-orange-900">Черновик</span>
          </div>
          <p class="text-sm text-orange-800">
            Этот пост находится в черновиках и не опубликован. Добавьте дату публикации в Sanity Studio, чтобы опубликовать его.
          </p>
        </div>

        <!-- Навигация -->
        <div class="mb-6">
          <nuxt-link to="/blog" class="text-blue-600 hover:text-blue-800 underline">
            ← Вернуться к блогу
          </nuxt-link>
        </div>

        <!-- Главное изображение -->
        <div v-if="post.mainImage" class="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            :src="urlFor(post.mainImage)"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Заголовок и мета информация -->
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
          
          <div class="flex items-center gap-6 text-gray-600">
            <div v-if="post.author" class="flex items-center gap-3">
              <div v-if="post.author.image" class="w-10 h-10 rounded-full overflow-hidden">
                <img
                  :src="urlFor(post.author.image)"
                  :alt="post.author.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-600 font-medium text-sm">
                  {{ post.author.name.charAt(0) }}
                </span>
              </div>
              <span class="font-medium">{{ post.author.name }}</span>
            </div>
            
            <div v-if="post.publishedAt" class="text-sm">
              {{ formatDate(post.publishedAt) }}
            </div>
          </div>
        </header>

        <!-- Содержание -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Конструктор страницы (новый способ) -->
          <div v-if="post.pageBuilder?.length">
            <PageBuilder :blocks="post.pageBuilder" />
          </div>
          
          <!-- Старый текстовый редактор -->
          <div v-else-if="post.body" class="p-8">
            <div class="prose prose-lg max-w-none">
              <SanityPortableText :content="post.body" />
            </div>
          </div>
          
          <!-- Если нет контента -->
          <div v-else class="p-8 text-center text-gray-500 italic">
            <p>Содержание поста не добавлено.</p>
            <p class="text-sm mt-2">Используйте конструктор страницы или текстовый редактор в Sanity Studio.</p>
          </div>
        </div>

        <!-- Навигация внизу -->
        <div class="mt-8 text-center">
          <nuxt-link 
            to="/blog" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Все посты блога
          </nuxt-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

const route = useRoute()
const { getPostBySlug, urlFor } = useSanity()

// Загрузка поста по слагу
const { data: post, pending, error, refresh } = await useLazyAsyncData(`blog-post-${route.params.slug}`, async () => {
  return await getPostBySlug(route.params.slug as string)
}, {
  default: () => null
})

// Функция форматирования даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: () => post.value ? post.value.title : 'Пост не найден',
  meta: [
    { 
      name: 'description', 
      content: () => post.value ? `Читайте пост: ${post.value.title}` : 'Пост не найден'
    }
  ]
})

// Для черновиков показываем предупреждение, но не 404
const isDraft = computed(() => post.value && !post.value.publishedAt)
</script>
