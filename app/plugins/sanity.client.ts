import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Проверяем наличие необходимых конфигурационных данных
  if (!config.public.sanity?.projectId) {
    console.warn('Sanity projectId не найден в конфигурации')
    return
  }
  
  const client = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    useCdn: false, // Отключаем CDN для избежания проблем с HTTPS
    apiVersion: '2023-12-01',
    // Убираем perspective для получения всех документов
    // token: config.sanity.token // для записи данных
  })

  return {
    provide: {
      sanity: client
    }
  }
})
