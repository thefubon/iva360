import { 
  targetAudienceItems, 
  additionalFeatureItems, 
  whyChooseItems, 
  productsInAppItems 
} from '~/content/pages/home-page'

export default defineEventHandler(async (event) => {
  try {
    // Возвращаем все данные для главной страницы
    return {
      success: true,
      data: {
        targetAudience: targetAudienceItems,
        additionalFeatures: additionalFeatureItems,
        whyChoose: whyChooseItems,
        productsInApp: productsInAppItems
      },
      timestamp: new Date().toISOString(),
      count: {
        targetAudience: targetAudienceItems.length,
        additionalFeatures: additionalFeatureItems.length,
        whyChoose: whyChooseItems.length,
        productsInApp: productsInAppItems.length,
        total: targetAudienceItems.length + additionalFeatureItems.length + whyChooseItems.length + productsInAppItems.length
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении контента главной страницы'
    })
  }
})
