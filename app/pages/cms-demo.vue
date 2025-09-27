<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Демо Sanity CMS</h1>
    
    <!-- Страницы -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Страницы</h2>
      <div v-if="pending.pages" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка страниц...</p>
      </div>
      <div v-else-if="error.pages" class="text-red-600">
        Ошибка загрузки страниц: {{ error.pages }}
      </div>
      <div v-else-if="data.pages?.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="page in data.pages"
          :key="page._id"
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-xl font-semibold mb-2">{{ page.title }}</h3>
          <p class="text-gray-600 mb-4">Слаг: {{ page.slug.current }}</p>
          <nuxt-link
            :to="`/page/${page.slug.current}`"
            class="text-blue-600 hover:text-blue-800 underline"
          >
            Просмотреть страницу
          </nuxt-link>
        </div>
      </div>
      <div v-else class="text-gray-500">
        Страницы не найдены. Создайте их в Sanity Studio.
      </div>
    </section>

    <!-- Статьи -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Статьи</h2>
      <div v-if="pending.posts" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка статей...</p>
      </div>
      <div v-else-if="error.posts" class="text-red-600">
        Ошибка загрузки статей: {{ error.posts }}
      </div>
      <div v-else-if="data.posts?.length" class="grid gap-6 md:grid-cols-2">
        <article
          v-for="post in data.posts"
          :key="post._id"
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
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
          <div v-if="post.publishedAt" class="text-sm text-gray-500 mb-4">
            {{ formatDate(post.publishedAt) }}
          </div>
          <nuxt-link
            :to="`/blog/${post.slug.current}`"
            class="text-blue-600 hover:text-blue-800 underline"
          >
            Читать статью
          </nuxt-link>
        </article>
      </div>
      <div v-else class="text-gray-500">
        Статьи не найдены. Создайте их в Sanity Studio.
      </div>
    </section>

    <!-- Авторы -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Авторы</h2>
      <div v-if="pending.authors" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка авторов...</p>
      </div>
      <div v-else-if="error.authors" class="text-red-600">
        Ошибка загрузки авторов: {{ error.authors }}
      </div>
      <div v-else-if="data.authors?.length" class="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="author in data.authors"
          :key="author._id"
          class="text-center border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div v-if="author.image" class="mb-4">
            <img
              :src="urlFor(author.image)"
              :alt="author.name"
              class="w-20 h-20 rounded-full mx-auto object-cover"
            />
          </div>
          <h3 class="font-semibold">{{ author.name }}</h3>
        </div>
      </div>
      <div v-else class="text-gray-500">
        Авторы не найдены. Создайте их в Sanity Studio.
      </div>
    </section>

    <!-- Информация -->
    <section class="mt-12 p-6 bg-gray-50 rounded-lg">
      <h2 class="text-xl font-bold mb-4">Как начать работу</h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-700">
        <li>Настройте переменные окружения в файле <code class="bg-gray-200 px-1 rounded">.env</code></li>
        <li>Запустите Sanity Studio: <code class="bg-gray-200 px-1 rounded">pnpm sanity:dev</code></li>
        <li>Создайте контент в студии (страницы, статьи, авторов)</li>
        <li>Обновите эту страницу, чтобы увидеть ваш контент</li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

const { getPages, getPosts, getAuthors, urlFor } = useSanity()

// Загрузка данных
const { data: pages, pending: pendingPages, error: errorPages } = await useLazyAsyncData('pages', () => getPages())
const { data: posts, pending: pendingPosts, error: errorPosts } = await useLazyAsyncData('posts', () => getPosts())
const { data: authors, pending: pendingAuthors, error: errorAuthors } = await useLazyAsyncData('authors', () => getAuthors())

const data = reactive({
  pages: pages.value as any[] || [],
  posts: posts.value as any[] || [],
  authors: authors.value as any[] || []
})

const pending = reactive({
  pages: pendingPages.value,
  posts: pendingPosts.value,
  authors: pendingAuthors.value
})

const error = reactive({
  pages: errorPages.value,
  posts: errorPosts.value,
  authors: errorAuthors.value
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
  title: 'Демо Sanity CMS',
  meta: [
    { name: 'description', content: 'Демонстрация интеграции Sanity CMS с Nuxt 4' }
  ]
})
</script>
