<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  description: string
  image: string
  href?: string
  isReverse?: boolean
  titleHtml?: boolean
  descriptionHtml?: boolean
  buttonText?: string
  showButton?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  isReverse: false,
  titleHtml: false,
  descriptionHtml: false,
  buttonText: 'Получить консультацию',
  showButton: true,
  customClass: ''
})

const cardClasses = computed(() => {
  const baseClass = 'bg-slate-100 rounded-3xl flex flex-col-reverse lg:flex-row items-center gap-10 xl:gap-12 p-8 md:p-10'
  const reverseClass = props.isReverse ? 'lg:flex-row-reverse' : ''
  
  return `${baseClass} ${reverseClass} ${props.customClass}`
})
</script>

<template>
  <div :class="cardClasses">
    <div class="space-y-10 flex-1">
      <div class="space-y-4">
        <h3 v-if="titleHtml" v-html="title" />
        <h3 v-else>{{ title }}</h3>

        <p 
          v-if="descriptionHtml"
          class="line-clamp-3 text-muted-foreground text-base md:text-lg"
          v-html="description"
        />
        <p 
          v-else
          class="line-clamp-3 text-muted-foreground text-base md:text-lg"
        >
          {{ description }}
        </p>
      </div>

      <div v-if="showButton">
        <Button size="xl">{{ buttonText }}</Button>
      </div>
    </div>

    <div class="flex-1">
      <NuxtImg 
        :src="image" 
        :alt="title" 
        class="w-full" 
      />
    </div>
  </div>
</template>
