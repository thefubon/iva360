import { additionalFeatureItems } from '~/content/pages/home-page'

export default defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      data: additionalFeatureItems,
      timestamp: new Date().toISOString(),
      count: additionalFeatureItems.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных дополнительных возможностей'
    })
  }
})
