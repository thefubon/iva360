import { mainMenuItems } from '~/content/navigation/main-menu'

export default defineEventHandler(async (event) => {
  try {
    // Возвращаем данные главного меню
    return {
      success: true,
      data: mainMenuItems,
      timestamp: new Date().toISOString(),
      count: mainMenuItems.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных главного меню'
    })
  }
})
