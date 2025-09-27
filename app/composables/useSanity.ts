import { createClient, type SanityClient } from '@sanity/client'
import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  author?: Author
  mainImage?: SanityImage
  publishedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  pageBuilder?: any[]
}

export interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  body?: PortableTextBlock[]
  pageBuilder?: any[]
  seo?: {
    title?: string
    description?: string
    image?: SanityImage
  }
}

export const useSanity = () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  
  // Создаем клиент напрямую, если плагин не сработал
  const client = nuxtApp.$sanity || createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    useCdn: false, // Отключаем CDN для избежания проблем с HTTPS
    apiVersion: '2023-12-01',
    // Убираем perspective для получения всех документов
  })

  // Функция для получения URL изображения
  const urlFor = (source: SanityImage) => {
    if (!source?.asset?._ref) return ''
    const config = useRuntimeConfig()
    const sanityConfig = config.public.sanity as {
      projectId: string
      dataset: string
    }
    
    // Простое построение URL для изображения
    const imageRef = source.asset._ref
    const [id, dimensions, format] = imageRef.replace('image-', '').split('-')
    return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dimensions}.${format}`
  }

  // Получение всех страниц
  const getPages = async (): Promise<Page[]> => {
    const query = `*[_type == "page"] | order(title asc) {
      _id,
      title,
      slug,
      body,
      seo
    }`
    return await client.fetch(query)
  }

  // Получение страницы по слагу
  const getPageBySlug = async (slug: string): Promise<Page | null> => {
    const query = `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      pageBuilder,
      seo
    }`
    return await client.fetch(query, { slug })
  }

  // Получение всех постов
  const getPosts = async (): Promise<Post[]> => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image
      },
      mainImage,
      publishedAt,
      excerpt,
      body,
      pageBuilder
    }`
    return await client.fetch(query)
  }

  // Получение поста по слагу (включая черновики)
  const getPostBySlug = async (slug: string): Promise<Post | null> => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      mainImage,
      publishedAt,
      excerpt,
      body,
      pageBuilder
    }`
    
    try {
      // Сначала пробуем получить через обычный клиент
      const result = await client.fetch(query, { slug })
      if (result) return result
      
      // Если не найден, пробуем через клиент с токеном для черновиков
      const config = useRuntimeConfig()
      const draftClient = createClient({
        projectId: config.public.sanity.projectId,
        dataset: config.public.sanity.dataset,
        useCdn: false,
        apiVersion: '2023-12-01',
        token: config.sanity?.token,
        perspective: 'previewDrafts'
      })
      
      return await draftClient.fetch(query, { slug })
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  // Получение всех авторов
  const getAuthors = async (): Promise<Author[]> => {
    const query = `*[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio
    }`
    return await client.fetch(query)
  }

  return {
    client,
    urlFor,
    getPages,
    getPageBySlug,
    getPosts,
    getPostBySlug,
    getAuthors
  }
}
