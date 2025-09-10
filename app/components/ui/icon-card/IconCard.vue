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
  variant?: 'default' | 'large' | 'compact'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  titleColor: 'text-foreground',
  bgColor: 'bg-slate-100',
  iconBgColor: 'bg-slate-200',
  titleHtml: false,
  descriptionHtml: false,
  variant: 'default',
  customClass: ''
})

const cardClasses = computed(() => {
  const baseClass = 'rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 overflow-hidden'
  
  const variantClasses = {
    default: 'p-6 md:p-10 space-y-10',
    large: 'p-8 md:p-12 space-y-12',
    compact: 'p-4 md:p-6 space-y-6'
  }
  
  return `${baseClass} ${variantClasses[props.variant]} ${props.bgColor} ${props.customClass}`
})

const iconClasses = computed(() => {
  const baseClass = 'inline-block p-2 rounded-xl'
  return `${baseClass} ${props.iconBgColor}`
})

const iconSize = computed(() => {
  const sizes = {
    default: '!size-12',
    large: '!size-16',
    compact: '!size-8'
  }
  return sizes[props.variant]
})
</script>

<template>
  <div :class="cardClasses">
    <a :href="href" class="absolute inset-0 z-10"/>

    <div class="flex-1 space-y-2">
      <div>
        <div :class="iconClasses">
          <component :is="iconComponent" :class="iconSize" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 v-if="titleHtml" :class="titleColor" v-html="title"/>
        <h3 v-else :class="titleColor">{{ title }}</h3>

        <p v-if="descriptionHtml" class="line-clamp-3 text-muted-foreground text-base md:text-lg" v-html="description"/>
        <p v-else class="line-clamp-3 text-muted-foreground text-base md:text-lg">{{ description }}</p>
      </div>
    </div>

    <div>
      <NuxtImg :src="image" :alt="title" class="w-full" />
    </div>
  </div>
</template>
