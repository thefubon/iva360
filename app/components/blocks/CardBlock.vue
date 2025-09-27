<template>
  <section 
    :class="[
      'py-8 md:py-12',
      backgroundClasses
    ]"
  >
    <div class="container mx-auto px-4">
      <!-- Заголовок блока -->
      <div v-if="block.title || block.subtitle" class="text-center mb-8 md:mb-12">
        <h2 v-if="block.title" class="text-2xl md:text-3xl font-bold mb-4">
          {{ block.title }}
        </h2>
        <p v-if="block.subtitle" class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ block.subtitle }}
        </p>
      </div>

      <!-- Карточки -->
      <div 
        v-if="block.cards?.length"
        :class="layoutClasses"
      >
        <div
          v-for="(card, index) in block.cards"
          :key="index"
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          :class="cardClasses"
        >
          <!-- Изображение карточки -->
          <div v-if="card.image" :class="imageContainerClasses">
            <img
              :src="urlFor(card.image)"
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Контент карточки -->
          <div :class="contentClasses">
            <!-- Иконка -->
            <div v-if="card.icon" class="mb-4">
              <LucideIcon :name="card.icon" class="w-8 h-8 text-primary" />
            </div>

            <!-- Заголовок -->
            <h3 class="text-xl font-semibold mb-3">
              {{ card.title }}
            </h3>

            <!-- Описание -->
            <p v-if="card.description" class="text-muted-foreground mb-4 flex-1">
              {{ card.description }}
            </p>

            <!-- Ссылка -->
            <div v-if="card.link?.url" class="mt-auto">
              <NuxtLink
                :to="card.link.url"
                :target="card.link.external ? '_blank' : undefined"
                :rel="card.link.external ? 'noopener noreferrer' : undefined"
                class="inline-flex items-center text-primary hover:text-primary-dark font-medium"
              >
                {{ card.link.text || 'Подробнее' }}
                <LucideIcon 
                  :name="card.link.external ? 'external-link' : 'arrow-right'" 
                  class="w-4 h-4 ml-1" 
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

interface Card {
  title: string
  description?: string
  image?: any
  icon?: string
  link?: {
    url: string
    text?: string
    external?: boolean
  }
}

interface CardBlock {
  title?: string
  subtitle?: string
  layout?: 'vertical' | 'horizontal' | 'grid-2' | 'grid-3'
  cards?: Card[]
  backgroundColor?: string
}

interface Props {
  block: CardBlock
}

const props = defineProps<Props>()
const { urlFor } = useSanity()

const backgroundClasses = computed(() => {
  const bgMap = {
    transparent: '',
    'gray-50': 'bg-gray-50',
    white: 'bg-white',
    'blue-50': 'bg-blue-50',
    'green-50': 'bg-green-50',
  }
  return bgMap[props.block.backgroundColor || 'transparent'] || ''
})

const layoutClasses = computed(() => {
  const layout = props.block.layout || 'vertical'
  
  const layoutMap = {
    vertical: 'grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3',
    horizontal: 'space-y-6',
    'grid-2': 'grid gap-6 md:gap-8 md:grid-cols-2',
    'grid-3': 'grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3',
  }
  
  return layoutMap[layout]
})

const cardClasses = computed(() => {
  const layout = props.block.layout || 'vertical'
  
  if (layout === 'horizontal') {
    return 'md:flex md:items-center'
  }
  
  return 'flex flex-col h-full'
})

const imageContainerClasses = computed(() => {
  const layout = props.block.layout || 'vertical'
  
  if (layout === 'horizontal') {
    return 'md:w-1/3 aspect-video md:aspect-auto md:h-48 overflow-hidden'
  }
  
  return 'aspect-video overflow-hidden'
})

const contentClasses = computed(() => {
  const layout = props.block.layout || 'vertical'
  
  if (layout === 'horizontal') {
    return 'p-6 md:w-2/3 flex flex-col'
  }
  
  return 'p-6 flex flex-col flex-1'
})
</script>
