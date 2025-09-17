<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-vue-next';
</script>


<template>
  <div class="bg-slate-900 text-background relative z-60">
    <NuxtLink href="#" class="block group">
      <div class="container flex justify-center items-center gap-4 p-4">
        <div class="flex items-center gap-x-4">
          <Button variant="secondary" size="sm" class="text-xs h-6 group-hover:!bg-primary font-semibold group-hover:text-primary-foreground">
            Вебинар
          </Button>

          <div class="text-sm font-semibold">Тенденции и прогноз развития российского рынка
            унифицированных коммуникаций
            (UC) в
            2025-2026</div>

          <ChevronRight/>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>