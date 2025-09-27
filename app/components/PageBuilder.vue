<template>
  <div v-if="blocks?.length" class="page-builder">
    <template v-for="(block, index) in blocks" :key="index">
      <!-- Текстовый блок -->
      <TextBlock 
        v-if="block._type === 'textBlock'"
        :block="block"
      />
      
      <!-- Блок карточек -->
      <CardBlock 
        v-else-if="block._type === 'cardBlock'"
        :block="block"
      />
      
      <!-- Баннер -->
      <BannerBlock 
        v-else-if="block._type === 'bannerBlock'"
        :block="block"
      />
      
      <!-- Обычный блок контента (portable text) -->
      <div 
        v-else-if="block._type === 'block'"
        class="py-8 md:py-12"
      >
        <div class="container mx-auto px-4 prose prose-lg max-w-4xl ">
          <SanityPortableText :content="[block]" />
        </div>
      </div>
      
      <!-- Изображение -->
      <div 
        v-else-if="block._type === 'image'"
        class="py-8 md:py-12"
      >
        <div 
          :class="[
            'mx-auto px-4',
            getImageSizeClasses(block.size)
          ]"
        >
          <figure>
            <img
              :src="urlFor(block)"
              :alt="block.alt || ''"
              class="w-full h-auto rounded-lg shadow-md"
            />
            <figcaption 
              v-if="block.caption" 
              class="mt-3 text-center text-sm text-muted-foreground italic"
            >
              {{ block.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
      
      <!-- Неизвестный тип блока (для отладки) -->
      <div 
        v-else 
        class="py-4 px-4 bg-yellow-50 border border-yellow-200 rounded-lg mx-4"
      >
        <p class="text-yellow-800 text-sm">
          <strong>Неизвестный тип блока:</strong> {{ block._type }}
        </p>
        <details class="mt-2">
          <summary class="cursor-pointer text-yellow-600">Показать данные</summary>
          <pre class="mt-2 text-xs overflow-auto">{{ JSON.stringify(block, null, 2) }}</pre>
        </details>
      </div>
    </template>
  </div>
  
  <div v-else class="py-12 text-center text-muted-foreground">
    <p>Содержимое не найдено. Используйте конструктор страницы в Sanity для добавления контента.</p>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '~/composables/useSanity'
import TextBlock from '~/components/blocks/TextBlock.vue'
import CardBlock from '~/components/blocks/CardBlock.vue'
import BannerBlock from '~/components/blocks/BannerBlock.vue'

interface Props {
  blocks?: any[]
}

const props = defineProps<Props>()
const { urlFor } = useSanity()

const getImageSizeClasses = (size?: string) => {
  const sizeMap: Record<string, string> = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-full',
  }
  return sizeMap[size || 'large']
}
</script>
