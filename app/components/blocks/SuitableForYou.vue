<script setup lang="ts">
import { FeatureCard } from '@/components/ui/feature-card'
import type { TargetAudienceItem } from '~/content/pages/home-page'

// Получаем данные через API
const { data: audienceData } = await useFetch<{
  success: boolean
  data: TargetAudienceItem[]
  timestamp: string
  count: number
}>('/api/content/target-audience')

// Реактивные данные
const components = computed(() => audienceData.value?.data || [])
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