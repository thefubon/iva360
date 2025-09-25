import { targetAudienceItems } from '~/content/pages/home-page'

export default defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      data: targetAudienceItems,
      timestamp: new Date().toISOString(),
      count: targetAudienceItems.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных целевой аудитории'
    })
  }
})
