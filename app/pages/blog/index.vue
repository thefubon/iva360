<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Заголовок -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Блог IVA360</h1>
        <p class="text-xl text-gray-600">Статьи и новости о наших продуктах</p>
      </header>

      <!-- Посты -->
      <div v-if="pending" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Загрузка постов...</p>
      </div>
      
      <div v-else-if="error" class="text-red-600 text-center">
        <h2 class="text-xl font-semibold mb-2">Ошибка загрузки</h2>
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="posts.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post._id"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <!-- Изображение -->
          <div v-if="post.mainImage" class="aspect-video overflow-hidden">
            <nuxt-link :to="`/blog/${post.slug.current}`">
              <img
                :src="urlFor(post.mainImage)"
                :alt="post.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </nuxt-link>
          </div>

          <!-- Содержание карточки -->
          <div class="p-6">
            <!-- Заголовок -->
            <h2 class="text-xl font-semibold mb-3 line-clamp-2">
              <nuxt-link 
                :to="`/blog/${post.slug.current}`"
                class="hover:text-blue-600 transition-colors"
              >
                {{ post.title }}
              </nuxt-link>
            </h2>

            <!-- Краткое описание -->
            <p v-if="post.excerpt" class="text-gray-600 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <!-- Мета информация -->
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div v-if="post.author" class="flex items-center gap-2">
                <div v-if="post.author.image" class="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    :src="urlFor(post.author.image)"
                    :alt="post.author.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div v-else class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <span class="text-xs font-medium">
                    {{ post.author.name.charAt(0) }}
                  </span>
                </div>
                <span>{{ post.author.name }}</span>
              </div>
              
              <div>
                {{ post.publishedAt ? formatDate(post.publishedAt) : 'Черновик' }}
              </div>
            </div>

            <!-- Ссылка на пост -->
            <nuxt-link 
              :to="`/blog/${post.slug.current}`"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Читать далее
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </nuxt-link>
          </div>
        </article>
      </div>
      
      <div v-else class="text-center py-12">
        <h2 class="text-2xl font-semibold mb-4">Пока нет опубликованных постов</h2>
        <p class="text-gray-600 mb-4">Создайте и опубликуйте посты в Sanity Studio</p>
        
        <!-- Информация о черновиках -->
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <h3 class="font-semibold text-orange-900 mb-2">💡 Есть черновики?</h3>
          <p class="text-sm text-orange-800 mb-3">
            Если вы создали посты, но они не отображаются, убедитесь что добавили <strong>дату публикации</strong> в Sanity Studio.
          </p>
          <nuxt-link 
            to="/preview" 
            class="text-orange-600 hover:text-orange-800 underline text-sm"
          >
            Посмотреть черновики →
          </nuxt-link>
        </div>

        <div class="space-y-3">
          <nuxt-link 
            to="/admin" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в админку
          </nuxt-link>
          
          <div class="text-sm text-gray-500">
            или
          </div>
          
          <a 
            href="http://localhost:3333" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Открыть Sanity Studio
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Навигация -->
      <div class="mt-12 text-center">
        <nuxt-link 
          to="/" 
          class="inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          ← Вернуться на главную
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

const { getPosts, urlFor } = useSanity()

// Загружаем все посты
const { data: allPosts, pending, error, refresh } = await useLazyAsyncData('all-posts', async () => {
  const posts = await getPosts()
  // Временно показываем все посты, включая черновики
  return posts
}, {
  default: () => []
})

const posts = computed(() => allPosts.value || [])

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
  title: 'Блог IVA360',
  meta: [
    { name: 'description', content: 'Читайте последние статьи и новости о продуктах IVA360' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
}
</style>
