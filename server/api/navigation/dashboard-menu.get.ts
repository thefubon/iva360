import { dashboardProductItems, dashboardAdminItems, dashboardSupportItems } from '~/content/navigation/dashboard-menu'

export default defineEventHandler(async (event) => {
  try {
    // Возвращаем все группы меню dashboard
    return {
      success: true,
      data: {
        products: dashboardProductItems,
        admin: dashboardAdminItems,
        support: dashboardSupportItems
      },
      timestamp: new Date().toISOString(),
      count: {
        products: dashboardProductItems.length,
        admin: dashboardAdminItems.length,
        support: dashboardSupportItems.length,
        total: dashboardProductItems.length + dashboardAdminItems.length + dashboardSupportItems.length
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении данных меню dashboard'
    })
  }
})
