<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  iconComponent: any
  href?: string
  titleColor?: string
  bgColor?: string
  iconBgColor?: string
  titleHtml?: boolean
  descriptionHtml?: boolean
  customClass?: string
}

const {
  href = '#',
  titleColor = 'text-foreground',
  bgColor = 'bg-slate-100',
  iconBgColor = 'bg-slate-200',
  titleHtml = false,
  descriptionHtml = false,
  customClass = '',
  title,
  description,
  image,
  iconComponent
} = defineProps<Props>()
</script>

<template>
  <div :class="`rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 overflow-hidden p-8 md:p-10 space-y-10 h-full ${bgColor} ${customClass}`">
    <a :href="href" class="absolute inset-0 z-10"/>

    <div class="flex-1 space-y-2">
      <div>
        <div :class="`inline-block p-2 rounded-xl ${iconBgColor}`">
          <component :is="iconComponent" class="!size-12" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 v-if="titleHtml" :class="titleColor" v-html="title"/>
        <h3 v-else :class="titleColor">{{ title }}</h3>

        <p v-if="descriptionHtml" class="line-clamp-3 text-muted-foreground text-base md:text-lg" v-html="description"/>
        <p v-else class="text-muted-foreground text-base md:text-lg">{{ description }}</p>
      </div>
    </div>

    <div>
      <NuxtImg :src="image" :alt="title" class="w-full" />
    </div>
  </div>
</template>
