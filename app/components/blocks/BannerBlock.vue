<template>
  <section 
    :class="[
      'py-8 md:py-16',
      backgroundClasses,
      textColorClasses
    ]"
  >
    <div 
      v-if="block.style === 'fullwidth'"
      class="relative"
    >
      <!-- Фоновое изображение для полноширинного баннера -->
      <div 
        v-if="block.image"
        class="absolute inset-0 z-0"
      >
        <img
          :src="urlFor(block.image)"
          :alt="block.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <!-- Контент поверх изображения -->
      <div class="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          {{ block.title }}
        </h2>
        
        <p v-if="block.subtitle" class="text-xl md:text-2xl mb-4 opacity-90">
          {{ block.subtitle }}
        </p>
        
        <p v-if="block.description" class="text-lg mb-8 max-w-3xl mx-auto opacity-80">
          {{ block.description }}
        </p>
        
        <div v-if="block.buttons?.length" class="flex flex-wrap justify-center gap-4">
          <component
            v-for="(button, index) in block.buttons"
            :key="index"
            :is="button.external ? 'a' : 'NuxtLink'"
            :to="button.external ? undefined : button.url"
            :href="button.external ? button.url : undefined"
            :target="button.external ? '_blank' : undefined"
            :rel="button.external ? 'noopener noreferrer' : undefined"
            :class="getButtonClasses(button.style, true)"
          >
            {{ button.text }}
          </component>
        </div>
      </div>
    </div>

    <!-- Обычные стили (image-left, image-right, overlay) -->
    <div v-else class="container mx-auto px-4">
      <div 
        :class="[
          'flex flex-col gap-8 md:gap-12 items-center',
          block.style === 'image-left' ? 'lg:flex-row' : '',
          block.style === 'image-right' ? 'lg:flex-row-reverse' : '',
          block.style === 'overlay' ? 'relative' : ''
        ]"
      >
        <!-- Изображение -->
        <div 
          v-if="block.image"
          :class="[
            block.style === 'overlay' ? 'absolute inset-0 z-0' : 'flex-1',
          ]"
        >
          <img
            :src="urlFor(block.image)"
            :alt="block.title"
            :class="[
              'w-full object-cover rounded-lg',
              block.style === 'overlay' ? 'h-full' : 'h-64 md:h-80 lg:h-96'
            ]"
          />
          <div 
            v-if="block.style === 'overlay'"
            class="absolute inset-0 bg-black/40 rounded-lg"
          ></div>
        </div>

        <!-- Контент -->
        <div 
          :class="[
            'flex-1',
            block.style === 'overlay' ? 'relative z-10 text-center text-white p-8 md:p-12' : '',
          ]"
        >
          <h2 
            :class="[
              'font-bold mb-4',
              block.style === 'overlay' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
            ]"
          >
            {{ block.title }}
          </h2>
          
          <p 
            v-if="block.subtitle" 
            :class="[
              'mb-4',
              block.style === 'overlay' ? 'text-xl opacity-90' : 'text-lg text-muted-foreground'
            ]"
          >
            {{ block.subtitle }}
          </p>
          
          <p 
            v-if="block.description" 
            :class="[
              'mb-6',
              block.style === 'overlay' ? 'text-lg opacity-80' : 'text-base text-muted-foreground'
            ]"
          >
            {{ block.description }}
          </p>
          
          <div v-if="block.buttons?.length" class="flex flex-wrap gap-4">
            <component
              v-for="(button, index) in block.buttons"
              :key="index"
              :is="button.external ? 'a' : 'NuxtLink'"
              :to="button.external ? undefined : button.url"
              :href="button.external ? button.url : undefined"
              :target="button.external ? '_blank' : undefined"
              :rel="button.external ? 'noopener noreferrer' : undefined"
              :class="getButtonClasses(button.style, block.style === 'overlay')"
            >
              {{ button.text }}
            </component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'

interface Button {
  text: string
  url?: string
  style?: 'primary' | 'secondary' | 'outline'
  external?: boolean
}

interface BannerBlock {
  title: string
  subtitle?: string
  description?: string
  image?: any
  style?: 'image-left' | 'image-right' | 'overlay' | 'fullwidth'
  backgroundColor?: string
  textColor?: 'dark' | 'light'
  buttons?: Button[]
}

interface Props {
  block: BannerBlock
}

const props = defineProps<Props>()
const { urlFor } = useSanity()

const backgroundClasses = computed(() => {
  const bgMap = {
    transparent: '',
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-900': 'bg-gray-900',
    'blue-600': 'bg-blue-600',
    'green-600': 'bg-green-600',
  }
  return bgMap[props.block.backgroundColor || 'transparent'] || ''
})

const textColorClasses = computed(() => {
  if (props.block.style === 'fullwidth' || props.block.style === 'overlay') {
    return 'text-white'
  }
  
  const colorMap = {
    dark: 'text-gray-900',
    light: 'text-white',
  }
  return colorMap[props.block.textColor || 'dark'] || 'text-gray-900'
})

const getButtonClasses = (style: string = 'primary', isLight: boolean = false) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all'
  
  const styles = {
    primary: isLight 
      ? `${baseClasses} bg-white text-gray-900 hover:bg-gray-100`
      : `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`,
    secondary: isLight
      ? `${baseClasses} bg-white/20 text-white border border-white/30 hover:bg-white/30`
      : `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/80`,
    outline: isLight
      ? `${baseClasses} border-2 border-white text-white hover:bg-white hover:text-gray-900`
      : `${baseClasses} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`,
  }
  
  return styles[style] || styles.primary
}
</script>
