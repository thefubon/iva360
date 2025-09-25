import { authCarouselImages } from '~/content/auth/auth-carousel'

export default defineEventHandler(async (event) => {
  try {
    // Возвращаем данные карусели авторизации
    return {
      success: true,
      data: authCarouselImages,
      timestamp: new Date().toISOString(),
      count: authCarouselImages.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных карусели авторизации'
    })
  }
})
