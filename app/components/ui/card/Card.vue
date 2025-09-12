<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'

// Интерфейсы для подкомпонентов
interface CardProps {
  class?: HTMLAttributes["class"]
}

interface CardHeaderProps {
  class?: HTMLAttributes["class"]
}

interface CardTitleProps {
  class?: HTMLAttributes["class"]
}

interface CardDescriptionProps {
  class?: HTMLAttributes["class"]
}

interface CardContentProps {
  class?: HTMLAttributes["class"]
}

interface CardFooterProps {
  class?: HTMLAttributes["class"]
}

interface CardActionProps {
  class?: HTMLAttributes["class"]
}

interface BaseCardProps {
  class?: HTMLAttributes["class"]
}

// Основной пропс для Card
const cardProps = defineProps<CardProps>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        cardProps.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// CardHeader компонент
export const CardHeader = defineComponent({
  name: 'CardHeader',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <div
      data-slot="card-header"
      :class="cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', props.class)"
    >
      <slot />
    </div>
  `
})

// CardTitle компонент
export const CardTitle = defineComponent({
  name: 'CardTitle',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <h3
      data-slot="card-title"
      :class="cn('leading-none font-semibold', props.class)"
    >
      <slot />
    </h3>
  `
})

// CardDescription компонент
export const CardDescription = defineComponent({
  name: 'CardDescription',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <p
      data-slot="card-description"
      :class="cn('text-muted-foreground text-sm', props.class)"
    >
      <slot />
    </p>
  `
})

// CardContent компонент
export const CardContent = defineComponent({
  name: 'CardContent',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <div
      data-slot="card-content"
      :class="cn('px-6', props.class)"
    >
      <slot />
    </div>
  `
})

// CardFooter компонент
export const CardFooter = defineComponent({
  name: 'CardFooter',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <div
      data-slot="card-footer"
      :class="cn('flex items-center px-6 [.border-t]:pt-6', props.class)"
    >
      <slot />
    </div>
  `
})

// CardAction компонент
export const CardAction = defineComponent({
  name: 'CardAction',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <div
      data-slot="card-action"
      :class="cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', props.class)"
    >
      <slot />
    </div>
  `
})

// BaseCard компонент
export const BaseCard = defineComponent({
  name: 'BaseCard',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return {
      cn,
      props
    }
  },
  template: `
    <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)">
      <slot />
    </div>
  `
})
</script>