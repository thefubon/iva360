import { whyChooseItems } from '~/content/pages/home-page'

export default defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      data: whyChooseItems,
      timestamp: new Date().toISOString(),
      count: whyChooseItems.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных "Почему выбирают IVA360"'
    })
  }
})
