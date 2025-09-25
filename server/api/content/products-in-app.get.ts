import { productsInAppItems } from '~/content/pages/home-page'

export default defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      data: productsInAppItems,
      timestamp: new Date().toISOString(),
      count: productsInAppItems.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных продуктов в приложении'
    })
  }
})
