<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import Logo from "../Logo.vue";
import { Gem } from 'lucide-vue-next';
import SidebarNav from "./SidebarNav.vue";
</script>

<template>
  <Sidebar>

    <SidebarHeader class="h-16 px-4 flex justify-center bg-background">
      <div class="flex items-center gap-x-3">
        <NuxtLink href="/dashboard" class="inline-block">
          <Logo />
        </NuxtLink>

        <div class="leading-[110%] text-sm font-medium">
          Панель<br/>управления
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="gap-y-4">
      <SidebarNav />
    </SidebarContent>

    <SidebarFooter class="bg-background p-4">
      <NuxtLink href="#" class="block">
        <div class="flex gap-x-2 border border-border rounded-lg p-2">
          <Gem class="size-9 text-primary" />
          <div>
            <p class="text-sm font-semibold text-primary">Выбрать план</p>
            <p class="text-xs">Разблокируйте больше возможночстей</p>
          </div>
        </div>
      </NuxtLink>
    </SidebarFooter>
  </Sidebar>
</template>