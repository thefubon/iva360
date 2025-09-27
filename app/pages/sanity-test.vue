<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Тест соединения с Sanity</h1>
    
    <div class="space-y-4">
      <div class="p-4 bg-gray-100 rounded">
        <h2 class="font-semibold">Конфигурация:</h2>
        <p>Project ID: {{ config.projectId }}</p>
        <p>Dataset: {{ config.dataset }}</p>
        <p>API Version: {{ config.apiVersion }}</p>
      </div>

      <div class="p-4 rounded" :class="connectionStatus.success ? 'bg-green-100' : 'bg-red-100'">
        <h2 class="font-semibold">Статус соединения:</h2>
        <p>{{ connectionStatus.message }}</p>
        <pre v-if="connectionStatus.error" class="mt-2 text-sm">{{ connectionStatus.error }}</pre>
      </div>

      <button 
        @click="testConnection" 
        :disabled="testing"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ testing ? 'Тестирование...' : 'Проверить соединение' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'

const config = useRuntimeConfig()
const testing = ref(false)
const connectionStatus = ref({
  success: false,
  message: 'Соединение не проверено',
  error: null as string | null
})

// Создаем клиент для тестирования
const testClient = createClient({
  projectId: config.public.sanity.projectId,
  dataset: config.public.sanity.dataset,
  useCdn: false, // Отключаем CDN для тестирования
  apiVersion: '2023-12-01', // Используем стабильную версию API
})

const testConnection = async () => {
  testing.value = true
  connectionStatus.value = {
    success: false,
    message: 'Проверка соединения...',
    error: null
  }

  try {
    // Простой запрос для проверки соединения - получаем любые документы
    const result = await testClient.fetch('*[_type in ["post", "page", "author"]] | order(_createdAt desc) [0...3]')
    
    connectionStatus.value = {
      success: true,
      message: `Соединение успешно! Найдено документов: ${result.length}`,
      error: null
    }
  } catch (error: any) {
    connectionStatus.value = {
      success: false,
      message: 'Ошибка соединения',
      error: error.message || String(error)
    }
  } finally {
    testing.value = false
  }
}

// Проверяем соединение при загрузке
onMounted(() => {
  testConnection()
})

useHead({
  title: 'Тест Sanity соединения'
})
</script>
