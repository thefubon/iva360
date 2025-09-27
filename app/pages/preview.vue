<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Режим предпросмотра</h1>
      <p class="text-gray-600">Просмотр черновиков и неопубликованного контента</p>
    </div>

    <!-- Черновики постов -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Черновики постов</h2>
      <div v-if="pending.drafts" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка черновиков...</p>
      </div>
      <div v-else-if="error.drafts" class="text-red-600">
        Ошибка загрузки черновиков: {{ error.drafts }}
      </div>
      <div v-else-if="data.drafts?.length" class="grid gap-6 md:grid-cols-2">
        <article
          v-for="post in data.drafts"
          :key="post._id"
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow border-orange-200 bg-orange-50"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded font-medium">
              ЧЕРНОВИК
            </span>
          </div>
          <div v-if="post.mainImage" class="mb-4">
            <img
              :src="urlFor(post.mainImage)"
              :alt="post.title"
              class="w-full h-48 object-cover rounded"
            />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <div v-if="post.author" class="text-sm text-gray-600 mb-2">
            Автор: {{ post.author.name }}
          </div>
          <div class="text-sm text-gray-500 mb-4">
            Обновлено: {{ formatDate(post._updatedAt) }}
          </div>
          <nuxt-link
            :to="`/preview/post/${post.slug.current}`"
            class="text-orange-600 hover:text-orange-800 underline"
          >
            Предпросмотр черновика
          </nuxt-link>
        </article>
      </div>
      <div v-else class="text-gray-500">
        Черновики не найдены.
      </div>
    </section>

    <!-- Все посты (включая опубликованные) -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Все посты</h2>
      <div v-if="pending.allPosts" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка постов...</p>
      </div>
      <div v-else-if="error.allPosts" class="text-red-600">
        Ошибка загрузки постов: {{ error.allPosts }}
      </div>
      <div v-else-if="data.allPosts?.length" class="grid gap-6 md:grid-cols-2">
        <article
          v-for="post in data.allPosts"
          :key="post._id"
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          :class="post.publishedAt ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'"
        >
          <div class="flex items-center gap-2 mb-3">
            <span 
              class="px-2 py-1 text-xs rounded font-medium"
              :class="post.publishedAt 
                ? 'bg-green-200 text-green-800' 
                : 'bg-orange-200 text-orange-800'"
            >
              {{ post.publishedAt ? 'ОПУБЛИКОВАН' : 'ЧЕРНОВИК' }}
            </span>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <div v-if="post.author" class="text-sm text-gray-600 mb-2">
            Автор: {{ post.author.name }}
          </div>
          <div class="text-sm text-gray-500 mb-4">
            <span v-if="post.publishedAt">Опубликовано: {{ formatDate(post.publishedAt) }}</span>
            <span v-else>Обновлено: {{ formatDate(post._updatedAt) }}</span>
          </div>
          <nuxt-link
            :to="`/preview/post/${post.slug.current}`"
            :class="post.publishedAt 
              ? 'text-green-600 hover:text-green-800 underline' 
              : 'text-orange-600 hover:text-orange-800 underline'"
          >
            {{ post.publishedAt ? 'Просмотреть пост' : 'Предпросмотр черновика' }}
          </nuxt-link>
        </article>
      </div>
      <div v-else class="text-gray-500">
        Посты не найдены.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'

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

// Загрузка черновиков
const { data: drafts, pending: pendingDrafts, error: errorDrafts } = await useLazyAsyncData('preview-drafts', async () => {
  return await client.fetch(`
    *[_type == "post" && !defined(publishedAt)] | order(_updatedAt desc) {
      _id,
      _updatedAt,
      title,
      slug,
      author->{
        _id,
        name
      },
      mainImage
    }
  `)
}, {
  default: () => []
})

// Загрузка всех постов
const { data: allPosts, pending: pendingAllPosts, error: errorAllPosts } = await useLazyAsyncData('preview-all-posts', async () => {
  return await client.fetch(`
    *[_type == "post"] | order(coalesce(publishedAt, _updatedAt) desc) {
      _id,
      _updatedAt,
      title,
      slug,
      publishedAt,
      author->{
        _id,
        name
      },
      mainImage
    }
  `)
}, {
  default: () => []
})

const data = reactive({
  drafts: drafts.value || [],
  allPosts: allPosts.value || []
})

const pending = reactive({
  drafts: pendingDrafts.value,
  allPosts: pendingAllPosts.value
})

const error = reactive({
  drafts: errorDrafts.value,
  allPosts: errorAllPosts.value
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
  title: 'Предпросмотр контента',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Режим предпросмотра для черновиков и неопубликованного контента' }
  ]
})
</script>
