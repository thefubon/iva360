<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Search, ShoppingBag, Menu, X } from 'lucide-vue-next'

// Состояние мобильного меню
const isMobileMenuOpen = ref(false)
const isMenuFullyOpen = ref(false)
const isContentVisible = ref(false)
const mobileMenuRef = ref<HTMLElement>()

// Получаем GSAP из плагина
const { $gsap } = useNuxtApp()

// Overlay для navigation menu
const isNavigationMenuOpen = ref(false)

// Отслеживаем состояние навигационного меню
let menuStateInterval: NodeJS.Timeout | null = null

onMounted(() => {
  nextTick(() => {
    const checkMenuState = () => {
      const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]')
      if (viewport) {
        const state = viewport.getAttribute('data-state')
        isNavigationMenuOpen.value = state === 'open'
      }
    }
    
    // Проверяем состояние каждые 100мс
    menuStateInterval = setInterval(checkMenuState, 100)
  })
})

// Функция для открытия мобильного меню с анимацией
const openMobileMenu = () => {
  isMobileMenuOpen.value = true
  // Показываем содержимое сразу
  isContentVisible.value = true
  
  // Блокируем скролл body
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
  
  nextTick(() => {
    if (!mobileMenuRef.value) return
    
    // Устанавливаем начальное состояние (сверху)
    $gsap.set(mobileMenuRef.value, { y: '-100%' })
    
    // Анимация выезда контейнера сверху вниз (медленнее)
    $gsap.to(mobileMenuRef.value, {
      y: '0%',
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        // После открытия контейнера показываем кнопки
        setTimeout(() => {
          isMenuFullyOpen.value = true
        }, 150)
      }
    })
  })
}

// Функция для закрытия мобильного меню с анимацией
const closeMobileMenu = () => {
  if (!mobileMenuRef.value) return
  
  // Скрываем только кнопки, контент остается видимым
  isMenuFullyOpen.value = false
  
  // Сразу начинаем анимацию контейнера вверх
  $gsap.to(mobileMenuRef.value, {
    y: '-100%',
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      // После анимации скрываем контент и контейнер
      isContentVisible.value = false
      isMobileMenuOpen.value = false
      // Разблокируем скролл body
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  })
}

// Функция для переключения мобильного меню
const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenu()
  } else {
    openMobileMenu()
  }
}

// Очищаем блокировку скролла при размонтировании
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  
  // Очищаем interval для отслеживания меню
  if (menuStateInterval) {
    clearInterval(menuStateInterval)
  }
})
</script>

<template>
  <Banner />

  <!-- Navigation Menu Overlay -->
  <div 
    :class="[
      'fixed inset-0 bg-foreground/40 z-30 transition-opacity duration-400',
      isNavigationMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]" 
    style="pointer-events: none;" />

  <header class="bg-background shadow-xl shadow-slate-600/10 sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16 gap-x-4">
      <div class="flex-shrink-0">
        <Logo />
      </div>

      <!-- Поле поиска во всю ширину -->
      <div class="hidden xl:flex flex-1">
        <Navbar />
      </div>

      <div class="flex items-center gap-x-3 md:gap-x-3 flex-shrink-0">
        <Button variant="outlineDark" size="icon">
          <Search class="size-5" />
        </Button>


        <Button variant="outlineDark" size="icon" class="relative">
          <div
            class="size-4.5 text-xs bg-primary text-background !font-bold absolute -top-2 -right-2 rounded-full flex justify-center items-center">
            2</div>
          <ShoppingBag class="size-5" />
        </Button>

        <Button as-child>
          <NuxtLink href="/auth">
            Войти
          </NuxtLink>
        </Button>

        <Button class="hidden md:flex" variant="outline" as-child>
          <NuxtLink href="/auth">
            Регистрация
          </NuxtLink>
        </Button>

        <Button class="xl:hidden" variant="secondary" size="icon" @click="toggleMobileMenu">
          <Menu class="size-5" />
        </Button>
      </div>
    </div>
  </header>

  <!-- Полноэкранное мобильное меню с GSAP анимацией -->
  <div v-if="isMobileMenuOpen" ref="mobileMenuRef"
    class="fixed inset-0 bg-background z-[60] xl:hidden flex flex-col py-10">
    <!-- Контент меню с прокруткой -->
    <div v-if="isContentVisible" class="flex-1 overflow-y-auto">
      <MobileNavbar :is-visible="isContentVisible" />
    </div>

    <!-- Sticky кнопка входа снизу -->
    <Transition enter-active-class="transition-all duration-300 ease-out delay-150"
      enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-8">
      <div v-if="isMenuFullyOpen" class="sticky bottom-0 bg-background border-t p-4 mt-auto">
        <Button class="w-full" size="lg" @click="toggleMobileMenu">
          Войти
        </Button>
      </div>
    </Transition>
  </div>

  <!-- Фиксированная кнопка закрытия (выезжает справа) -->
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-x-8"
    enter-to-class="opacity-100 translate-x-0" leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-8">
    <div v-if="isMenuFullyOpen" class="fixed top-4 right-4 z-[70] xl:hidden">
      <Button variant="outline" size="icon" class="bg-background" @click="toggleMobileMenu">
        <X class="size-6" />
      </Button>
    </div>
  </Transition>


</template>