<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Панель предпросмотра -->
    <div class="bg-orange-100 border-b border-orange-200 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium text-orange-800">Режим предпросмотра</span>
          </div>
          <span 
            class="px-2 py-1 text-xs rounded font-medium"
            :class="post?.publishedAt 
              ? 'bg-green-200 text-green-800' 
              : 'bg-orange-200 text-orange-800'"
          >
            {{ post?.publishedAt ? 'ОПУБЛИКОВАН' : 'ЧЕРНОВИК' }}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <nuxt-link 
            to="/preview" 
            class="text-sm text-orange-700 hover:text-orange-900 underline"
          >
            ← Назад к списку
          </nuxt-link>
          <nuxt-link 
            to="/admin" 
            class="text-sm text-orange-700 hover:text-orange-900 underline"
          >
            Админка
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Контент поста -->
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
      </div>
      
      <article v-else class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Главное изображение -->
        <div v-if="post.mainImage" class="aspect-video overflow-hidden">
          <img
            :src="urlFor(post.mainImage)"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-8">
          <!-- Заголовок -->
          <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>

          <!-- Мета информация -->
          <div class="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
            <div v-if="post.author" class="flex items-center gap-3">
              <div v-if="post.author.image" class="w-12 h-12 rounded-full overflow-hidden">
                <img
                  :src="urlFor(post.author.image)"
                  :alt="post.author.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-600 font-medium">
                  {{ post.author.name.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="font-medium">{{ post.author.name }}</p>
                <p class="text-sm text-gray-500">Автор</p>
              </div>
            </div>
            
            <div class="text-sm text-gray-500">
              <p v-if="post.publishedAt">
                Опубликовано: {{ formatDate(post.publishedAt) }}
              </p>
              <p v-else>
                Обновлено: {{ formatDate(post._updatedAt) }}
              </p>
            </div>
          </div>

          <!-- Содержание -->
          <div v-if="post.body" class="prose prose-lg max-w-none">
            <SanityPortableText :content="post.body" />
          </div>
          <div v-else class="text-gray-500 italic">
            Содержание поста не добавлено.
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

// Функция для получения URL изображения
const urlFor = (source: any) => {
  if (!source?.asset?._ref) return ''
  const imageRef = source.asset._ref
  const [id, dimensions, format] = imageRef.replace('image-', '').split('-')
  return `https://cdn.sanity.io/images/${config.public.sanity.projectId}/${config.public.sanity.dataset}/${id}-${dimensions}.${format}`
}

// Загрузка поста
const { data: post, pending, error } = await useLazyAsyncData(`preview-post-${route.params.slug}`, async () => {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      slug,
      publishedAt,
      author->{
        _id,
        name,
        image
      },
      mainImage,
      body
    }
  `, { 
    slug: route.params.slug 
  })
})

// Функция форматирования даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// SEO
useHead({
  title: () => post.value ? `Предпросмотр: ${post.value.title}` : 'Предпросмотр поста',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { 
      name: 'description', 
      content: () => post.value ? `Предпросмотр поста: ${post.value.title}` : 'Предпросмотр поста'
    }
  ]
})
</script>
