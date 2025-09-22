<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PanelLeftClose, PanelLeftOpen } from "lucide-vue-next"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar, state } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('size-9', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeftClose v-if="state === 'expanded'" class="size-6 stroke-[1.5]" />
    <PanelLeftOpen v-else class="size-6 stroke-[1.5]" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
