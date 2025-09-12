<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  description: string
  image: string
  href?: string
  buttonText?: string
  showButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  buttonText: 'Узнать больше',
  showButton: false
})
</script>

<template>
  <div class="bg-slate-100 rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 overflow-hidden">
    <a :href="href" class="absolute inset-0 z-10"/>

    <div class="space-y-4 p-8 md:p-10 h-full">
      <h3>{{ title }}</h3>

      <p class="line-clamp-3 text-muted-foreground text-base md:text-lg">
        {{ description }}
      </p>
    </div>

    <div>
      <NuxtImg :src="image" :alt="title" class="w-full" />
    </div>

    <!-- Кнопка (опционально) -->
    <div v-if="showButton" class="p-8 md:p-10 pt-0">
      <Button variant="outline" class="w-full">
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>
