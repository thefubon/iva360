<script setup lang="ts">
import HorizontalCard from '@/components/ui/horizontal-card/HorizontalCard.vue'
import type { WhyChooseItem } from '~/content/pages/home-page'

// Получаем данные через API
const { data: whyChooseData } = await useFetch<{
  success: boolean
  data: WhyChooseItem[]
  timestamp: string
  count: number
}>('/api/content/why-choose')

// Реактивные данные
const components = computed(() => whyChooseData.value?.data || [])
</script>

<template>
  <div class="container flex flex-col gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
    <div v-for="component in components" :key="component.title">
      <HorizontalCard 
        :title="component.title"
        :description="component.description"
        :image="component.image"
        :href="component.href"
        :is-reverse="component.isReverse"
        :title-html="true"
        :description-html="true"
      />
    </div>
  </div>
</template>