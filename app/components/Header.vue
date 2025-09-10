<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next';
import { ShoppingBag, Menu, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-slate-900 text-background">
    <div class="container flex justify-center items-center gap-4 p-4">
      <div>
        <div class="text-sm md:text-base font-semibold">Вебинар: Тенденции и прогноз развития российского рынка
          унифицированных коммуникаций
          (UC) в
          2025-2026</div>
        <div class="text-sm">
          <span>18 сентября 2025 г.</span>
          <span>11:00</span>
        </div>
      </div>

      <Button class="hidden md:inline-flex" variant="secondary" asChild>
        <NuxtLink href="#">Подробнее</NuxtLink>
      </Button>

      <Button class="md:hidden" variant="secondary" size="icon" asChild>
        <NuxtLink href="#">
          <ChevronRight class="size-5" />
        </NuxtLink>
      </Button>
    </div>
  </div>

  <header class="bg-background border-b sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>

      <div class="flex items-center gap-x-3 md:gap-x-4">
        <Button variant="secondary" size="icon">
          <Search class="size-5" />
        </Button>

        <Button variant="secondary" size="icon" class="relative">
          <div
            class="size-4.5 text-xs bg-destructive text-background !font-bold absolute -top-1.5 -right-1.5 rounded-full flex justify-center items-center">
            2</div>
          <ShoppingBag class="size-5" />
        </Button>

        <Button asChild>
          <NuxtLink href="#">
            Войти
          </NuxtLink>
        </Button>

        <Button class="md:hidden" variant="secondary" size="icon">
          <Menu class="size-5" />
        </Button>
      </div>
    </div>
  </header>

  <div class="hidden md:block bg-background shadow-lg shadow-slate-600/10 relative z-40">
    <div class="container flex justify-center items-center h-20">
      <Navbar />
    </div>
  </div>

</template>