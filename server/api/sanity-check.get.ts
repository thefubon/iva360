import { createClient } from '@sanity/client'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    console.log('Sanity config:', {
      projectId: config.public.sanity.projectId,
      dataset: config.public.sanity.dataset,
      hasToken: !!config.sanity?.token
    })
    
    const client = createClient({
      projectId: config.public.sanity.projectId,
      dataset: config.public.sanity.dataset,
      useCdn: false,
      apiVersion: '2023-12-01',
      token: config.sanity?.token
    })

    // Простой тест запрос
    const result = await client.fetch('*[_type == "post"][0...1]')
    
    return {
      success: true,
      posts: result,
      config: {
        projectId: config.public.sanity.projectId,
        dataset: config.public.sanity.dataset,
        hasToken: !!config.sanity?.token
      }
    }
  } catch (error: any) {
    console.error('Sanity error:', error)
    return {
      success: false,
      error: error.message,
      config: {
        projectId: useRuntimeConfig().public.sanity.projectId,
        dataset: useRuntimeConfig().public.sanity.dataset
      }
    }
  }
})
