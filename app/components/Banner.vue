<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-vue-next';
</script>


<template>
  <div class="bg-slate-900 text-background">
    <div class="container flex justify-center items-center gap-4 p-4">
      <div class="flex items-center gap-x-4">
        <div class="text-sm grid">
          <span>18 сентября 2025 г.</span>
          <span>11:00</span>
        </div>

        <div class="text-sm font-semibold">Вебинар: Тенденции и прогноз развития российского рынка 
          унифицированных коммуникаций
          (UC) в
          2025-2026</div>
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
</template>