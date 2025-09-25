<script setup lang="ts">
import IconCard from '@/components/ui/icon-card/IconCard.vue'
import Meetings from "@/components/icons/Meetings.vue"
import Messenger from "@/components/icons/Messenger.vue"
import Mail from "@/components/icons/Mail.vue"
import Calendar from "@/components/icons/Calendar.vue"
import Disc from "@/components/icons/Disc.vue"
import Webinar from "@/components/icons/Webinar.vue"
import Ai from "@/components/icons/Ai.vue"

import type { ProductInAppItem } from '~/content/pages/home-page'

// Map icon names to components
const iconComponents: Record<string, any> = {
  Meetings,
  Messenger,
  Mail,
  Calendar,
  Disc,
  Webinar,
  Ai
}

// Получаем данные через API
const { data: productsData } = await useFetch<{
  success: boolean
  data: ProductInAppItem[]
  timestamp: string
  count: number
}>('/api/content/products-in-app')

// Реактивные данные
const components = computed(() => productsData.value?.data || [])
</script>

<template>
  <div class="container grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
    <div v-for="component in components" :key="component.title">
      <IconCard 
        :title="component.title"
        :description="component.description"
        :image="component.image"
        :icon-component="iconComponents[component.icon]"
        :href="component.href"
        :title-color="component.titleColor"
        :bg-color="component.bgColor"
        :icon-bg-color="component.iconBgColor"
      />
    </div>
  </div>
</template>