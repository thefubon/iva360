// Данные для карусели авторизации (AuthCarousel.vue)
export interface AuthCarouselItem {
  src: string
  alt: string
  title: string
  description: string
}

export const authCarouselImages: AuthCarouselItem[] = [
  { 
    src: '/img/placeholder.svg', 
    alt: 'IVA360 Dashboard Preview',
    title: 'Умная панель управления',
    description: 'Интуитивный интерфейс для управления всеми процессами вашего бизнеса в одном месте'
  },
  { 
    src: '/img/placeholder.svg', 
    alt: 'Chat Interface',
    title: 'Мгновенное общение',
    description: 'Встроенная система чатов для быстрой коммуникации с командой и клиентами'
  },
  { 
    src: '/img/placeholder.svg', 
    alt: 'Video Conference',
    title: 'Видеоконференции',
    description: 'HD качество видеосвязи для эффективных онлайн-встреч и презентаций'
  },
  { 
    src: '/img/placeholder.svg', 
    alt: 'Analytics Dashboard',
    title: 'Мощные возможности',
    description: 'Расширенная аналитика и инструменты для роста вашего бизнеса'
  },
]
