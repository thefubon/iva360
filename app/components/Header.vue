<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ShoppingBag, Menu, X } from 'lucide-vue-next'

// Состояние поиска
const searchQuery = ref('')

// Состояние мобильного меню
const isMobileMenuOpen = ref(false)
const isMenuFullyOpen = ref(false)
const isContentVisible = ref(false)
const mobileMenuRef = ref<HTMLElement>()

// Получаем GSAP из плагина
const { $gsap } = useNuxtApp()

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
})
</script>

<template>
  <Banner />

  <header class="bg-background border-b sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16 gap-x-4">
      <div class="flex-shrink-0">
        <Logo />
      </div>

      <!-- Поле поиска во всю ширину -->
      <div class="flex-1 relative">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input 
            v-model="searchQuery" 
            placeholder="Поиск..."
            class="pl-10 w-full"
          />
        </div>
      </div>

      <div class="flex items-center gap-x-3 md:gap-x-4 flex-shrink-0">
        <Button variant="secondary" size="icon" class="relative">
          <div
            class="size-4.5 text-xs bg-destructive text-background !font-bold absolute -top-1.5 -right-1.5 rounded-full flex justify-center items-center">
            2</div>
          <ShoppingBag class="size-5" />
        </Button>

        <Button as-child>
          <NuxtLink href="/auth">
            Войти
          </NuxtLink>
        </Button>

        <Button class="md:hidden" variant="secondary" size="icon" @click="toggleMobileMenu">
          <Menu class="size-5" />
        </Button>
      </div>
    </div>
  </header>

  <div class="sticky top-16 z-40 hidden md:block bg-background shadow-lg shadow-slate-600/10">
    <div class="w-full flex justify-center items-center h-20">
      <Navbar />
    </div>
  </div>

  <!-- Полноэкранное мобильное меню с GSAP анимацией -->
  <div v-if="isMobileMenuOpen" ref="mobileMenuRef"
    class="fixed inset-0 bg-background z-[60] md:hidden flex flex-col py-10">
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
    <div v-if="isMenuFullyOpen" class="fixed top-4 right-4 z-[70] md:hidden">
      <Button variant="outline" size="icon" class="bg-background" @click="toggleMobileMenu">
        <X class="size-6" />
      </Button>
    </div>
  </Transition>


</template>