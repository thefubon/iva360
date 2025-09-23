<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PanelLeftClose, PanelLeftOpen, Menu } from "lucide-vue-next"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar, state, isMobile } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    :variant="isMobile ? 'secondary' : 'ghost'"
    size="icon"
    :class="cn('size-9', props.class)"
    @click="toggleSidebar"
  >
    <Menu v-if="isMobile" class="size-6 stroke-[1.5]" />
    <PanelLeftClose v-else-if="state === 'expanded'" class="size-6 stroke-[1.5]" />
    <PanelLeftOpen v-else class="size-6 stroke-[1.5]" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
