<script setup lang="ts">
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Logo from "../Logo.vue";
import { Gem } from 'lucide-vue-next';
</script>

<template>
  <Sidebar>

    <SidebarHeader class="h-16 px-4 flex justify-center bg-background">
      <div class="flex items-center gap-x-3">
        <NuxtLink href="/dashboard" class="inline-block">
          <Logo />
        </NuxtLink>

        <div class="leading-[110%] text-sm font-medium">
          Панель управления
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="p-4 gap-y-4">
      Content
    </SidebarContent>

    <SidebarFooter class="bg-background p-4">
      <NuxtLink href="#" class="block">
        <div class="flex gap-x-2 border border-border rounded-lg p-2">
          <Gem class="size-9 text-primary" />
          <div>
            <p class="text-sm font-semibold text-primary">Выбрать план</p>
            <p class="text-xs text-secondary">Разблокируйте больше возможночстей</p>
          </div>
        </div>
      </NuxtLink>
    </SidebarFooter>
  </Sidebar>
</template>