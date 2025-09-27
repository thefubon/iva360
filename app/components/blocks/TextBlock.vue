<template>
  <section 
    :class="[
      'py-8 md:py-12',
      backgroundClasses
    ]"
  >
    <div 
      :class="[
        widthClasses,
        alignmentClasses
      ]"
    >
      <h2 v-if="block.title" class="text-2xl md:text-3xl font-bold mb-6">
        {{ block.title }}
      </h2>
      
      <div v-if="block.content" class="prose prose-lg max-w-none">
        <SanityPortableText :content="block.content" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TextBlock {
  title?: string
  content?: any[]
  alignment?: 'left' | 'center' | 'right'
  width?: 'full' | 'container' | 'prose'
  backgroundColor?: string
}

interface Props {
  block: TextBlock
}

const props = defineProps<Props>()

const backgroundClasses = computed(() => {
  const bgMap = {
    transparent: '',
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
  }
  return bgMap[props.block.backgroundColor || 'transparent'] || ''
})

const widthClasses = computed(() => {
  const widthMap = {
    full: 'w-full px-4 md:px-6',
    container: 'container mx-auto px-4',
    prose: 'max-w-4xl mx-auto px-4',
  }
  return widthMap[props.block.width || 'container']
})

const alignmentClasses = computed(() => {
  const alignmentMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  return alignmentMap[props.block.alignment || 'left']
})
</script>
