<script setup lang="ts">
import type { NavigationMenuViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  NavigationMenuViewport,

  useForwardProps,
} from "reka-ui"
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)

// Убираем overlay логику отсюда
</script>

<template>
  <div class="absolute top-full inset-x-0 isolate z-60 border-t">
    <NavigationMenuViewport data-slot="navigation-menu-viewport" v-bind="forwardedProps" :class="
        cn(
          'peer origin-top bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:mt-0 data-[state=open]:fade-in-0 data-[state=open]:mt-0 relative mt-5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-b-xl shadow-xl shadow-slate-600/20 duration-200',
          props.class,
        )
      " />
  </div>
</template>
