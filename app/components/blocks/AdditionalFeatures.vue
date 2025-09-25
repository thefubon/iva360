<script setup lang="ts">
import { FeatureCard } from '@/components/ui/feature-card'
import type { AdditionalFeatureItem } from '~/content/pages/home-page'

// Получаем данные через API
const { data: featuresData } = await useFetch<{
  success: boolean
  data: AdditionalFeatureItem[]
  timestamp: string
  count: number
}>('/api/content/additional-features')

// Реактивные данные
const components = computed(() => featuresData.value?.data || [])
</script>

<template>
  <div class="container grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
    <FeatureCard
      v-for="component in components" 
      :key="component.title"
      :title="component.title"
      :description="component.description"
      :image="component.image"
      :href="component.href"
    />
  </div>
</template>