<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"

// Данные для слайдера изображений
const carouselImages = [
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
    alt: 'Video Conference',
    title: 'Мощные возможности',
    description: 'Расширенная аналитика и инструменты для роста вашего бизнеса'
  },
]

// Текущий активный слайд
const currentSlide = ref(0)

// Ссылка на карусель
const carouselRef = ref()
const carouselApi = ref()

// Функция для перехода к определенному слайду
const goToSlide = (index: number) => {
  if (carouselApi.value) {
    carouselApi.value.scrollTo(index)
    // Перезапускаем автоплей после ручного переключения
    autoplay.destroy()
    setTimeout(() => autoplay.init(), 1000)
  }
}

// Обработчик инициализации API карусели
const onInitApi = (api: any) => {
  carouselApi.value = api
  
  // Подписываемся на события изменения слайда
  api.on('select', () => {
    currentSlide.value = api.selectedScrollSnap()
  })
  
  // Запускаем автоплей после инициализации
  autoplay.init()
}

// Опции для карусели
const carouselOptions = {
  loop: true, // Бесконечная прокрутка
  duration: 20, // Скорость анимации
}

// Плагины для автовоспроизведения
const autoplayPlugin = () => {
  let interval: ReturnType<typeof setInterval> | null = null
  
  const start = () => {
    if (interval) return
    interval = setInterval(() => {
      if (carouselApi.value) {
        carouselApi.value.scrollNext()
      }
    }, 4000) // Переключение каждые 4 секунды
  }
  
  const stop = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
  
  return {
    init: () => {
      start()
    },
    destroy: () => {
      stop()
    }
  }
}

// Инициализация автоплея
const autoplay = autoplayPlugin()

// Остановка автоплея при наведении и возобновление при уходе курсора
const pauseAutoplay = () => autoplay.destroy()
const resumeAutoplay = () => autoplay.init()

// Обработчики для кнопок навигации с перезапуском автоплея
const handleScrollPrev = (scrollPrev: () => void) => {
  scrollPrev()
  autoplay.destroy()
  setTimeout(() => autoplay.init(), 1000)
}

const handleScrollNext = (scrollNext: () => void) => {
  scrollNext()
  autoplay.destroy()
  setTimeout(() => autoplay.init(), 1000)
}

// Остановка автоплея при размонтировании компонента
onUnmounted(() => {
  autoplay.destroy()
})
</script>

<template>
  <div class="relative w-full h-full bg-muted" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
    <Carousel
      ref="carouselRef"
      class="w-full h-full"
      :opts="carouselOptions"
      @init-api="onInitApi"
    >
      <template #default="{ scrollPrev, scrollNext, canScrollPrev, canScrollNext }">
        <CarouselContent class="h-full">
          <CarouselItem v-for="(image, index) in carouselImages" :key="index" class="h-full">
            <div class="p-4 space-y-4">
              <!-- Контейнер изображения -->
              <div class="relative w-full rounded-md overflow-hidden">
                <NuxtImg
                  :src="image.src"
                  :alt="image.alt"
                  class="w-full h-full object-contain dark:brightness-[0.2] dark:grayscale"
                />
              </div>

              <!-- Контент слайда под картинкой -->
              <div class="text-left">
                <h3 class="text-2xl font-bold mb-2 text-foreground">{{ image.title }}</h3>
                <p class="text-foreground text-base leading-relaxed">{{ image.description }}</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <!-- Нижняя панель с индикаторами и кнопками навигации -->
        <div class="absolute bottom-6 left-0 right-0 flex items-end justify-between px-6 z-10">
          <!-- Индикаторы слайдов слева -->
          <div class="flex space-x-2">
            <button
              v-for="(_, index) in carouselImages"
              :key="index"
              class="size-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none border border-border"
              :class="currentSlide === index ? 'bg-primary scale-110' : 'bg-background hover:bg-background/60'"
              :aria-label="`Перейти к слайду ${index + 1}`"
              @click="goToSlide(index)"
            />
          </div>

          <!-- Кнопки навигации справа -->
          <div class="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              class="size-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 opacity-80 hover:opacity-100"
              :disabled="!canScrollPrev"
              @click="() => handleScrollPrev(scrollPrev)"
            >
              <ChevronLeft class="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              class="size-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 opacity-80 hover:opacity-100"
              :disabled="!canScrollNext"
              @click="() => handleScrollNext(scrollNext)"
            >
              <ChevronRight class="size-4" />
            </Button>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
