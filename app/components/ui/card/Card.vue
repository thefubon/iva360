<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  href?: string
  titleHtml?: boolean
  descriptionHtml?: boolean
  customClass?: string
}

const { href = '#', titleHtml = false, descriptionHtml = false, customClass = '', title, description, image } = defineProps<Props>()
</script>

<template>
  <div :class="`bg-slate-100 rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full ${customClass}`">
    <a :href="href" class="absolute inset-0 z-10"/>

    <div class="space-y-4 h-full p-8 md:p-10">
      <h3 v-if="titleHtml" v-html="title"/>
      <h3 v-else>{{ title }}</h3>

      <p v-if="descriptionHtml" class="line-clamp-3 text-muted-foreground text-base md:text-lg" v-html="description"/>
      <p v-else class="line-clamp-3 text-muted-foreground text-base md:text-lg">{{ description }}</p>
    </div>

    <div>
      <NuxtImg :src="image" :alt="title" class="w-full" />
    </div>
  </div>
</template>
