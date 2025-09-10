<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  href?: string
  titleHtml?: boolean
  descriptionHtml?: boolean
  variant?: 'default' | 'large' | 'horizontal'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  titleHtml: false,
  descriptionHtml: false,
  variant: 'default',
  customClass: ''
})

const cardClasses = computed(() => {
  const baseClass = 'bg-slate-100 rounded-3xl relative flex md:hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full'
  
  const variantClasses = {
    default: 'flex-col',
    large: 'flex-col p-6 md:p-12',
    horizontal: 'flex-row items-center'
  }
  
  return `${baseClass} ${variantClasses[props.variant]} ${props.customClass}`
})

const contentClasses = computed(() => {
  const baseClass = 'space-y-4 h-full'
  
  const variantClasses = {
    default: 'p-8 md:p-10',
    large: 'p-0',
    horizontal: 'p-6 flex-1'
  }
  
  return `${baseClass} ${variantClasses[props.variant]}`
})
</script>

<template>
  <div :class="cardClasses">
    <a :href="href" class="absolute inset-0 z-10"/>

    <div :class="contentClasses">
      <h3 v-if="titleHtml" v-html="title"/>
      <h3 v-else>{{ title }}</h3>

      <p v-if="descriptionHtml" class="line-clamp-3 text-muted-foreground text-base md:text-lg" v-html="description"/>
      <p v-else class="line-clamp-3 text-muted-foreground text-base md:text-lg">{{ description }}</p>
    </div>

    <div :class="{ 'flex-1': variant === 'horizontal' }">
      <NuxtImg :src="image" :alt="title" class="w-full" />
    </div>
  </div>
</template>
