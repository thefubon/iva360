<template>
  <div v-if="content && content.length" class="prose prose-lg max-w-none">
    <div v-for="(block, index) in content" :key="index">
      <!-- Текстовые блоки -->
      <component
        :is="getTagName(block)"
        v-if="block._type === 'block'"
        :class="getBlockClass(block)"
      >
        <span v-for="(child, childIndex) in block.children" :key="childIndex">
          <component
            :is="getInlineComponent(child)"
            v-bind="getInlineProps(child)"
            :class="getInlineClass(child)"
          >
            {{ child.text }}
          </component>
        </span>
      </component>

      <!-- Изображения -->
      <figure v-else-if="block._type === 'image'" class="my-8">
        <img
          :src="urlFor(block as SanityImageBlock)"
          :alt="(block as SanityImageBlock).alt || ''"
          class="w-full h-auto rounded-lg"
        />
        <figcaption v-if="(block as SanityImageBlock).alt" class="text-center text-gray-600 mt-2">
          {{ (block as SanityImageBlock).alt }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortableTextBlock } from '@portabletext/types'
import { useSanity } from '~/composables/useSanity'

interface SanityImageBlock {
  _type: 'image'
  asset: { 
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

type ExtendedPortableTextBlock = PortableTextBlock | SanityImageBlock

interface Props {
  content: ExtendedPortableTextBlock[]
}

defineProps<Props>()

const { urlFor } = useSanity()

const getTagName = (block: any) => {
  const styleMap: Record<string, string> = {
    normal: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    blockquote: 'blockquote'
  }
  return styleMap[block.style] || 'p'
}

const getBlockClass = (block: any) => {
  const classMap: Record<string, string> = {
    h1: 'text-4xl font-bold mb-6',
    h2: 'text-3xl font-bold mb-5',
    h3: 'text-2xl font-bold mb-4',
    h4: 'text-xl font-bold mb-3',
    h5: 'text-lg font-bold mb-2',
    h6: 'text-base font-bold mb-2',
    blockquote: 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4',
    normal: 'mb-4'
  }
  return classMap[block.style] || 'mb-4'
}

const getInlineComponent = (child: any) => {
  if (child.marks?.includes('strong')) return 'strong'
  if (child.marks?.includes('em')) return 'em'
  if (child.marks?.some((mark: any) => mark._type === 'link')) return 'a'
  return 'span'
}

const getInlineProps = (child: any) => {
  const linkMark = child.marks?.find((mark: any) => mark._type === 'link')
  if (linkMark) {
    return {
      href: linkMark.href,
      target: linkMark.href.startsWith('http') ? '_blank' : undefined,
      rel: linkMark.href.startsWith('http') ? 'noopener noreferrer' : undefined
    }
  }
  return {}
}

const getInlineClass = (child: any) => {
  const linkMark = child.marks?.find((mark: any) => mark._type === 'link')
  if (linkMark) {
    return 'text-blue-600 hover:text-blue-800 underline'
  }
  return ''
}
</script>
