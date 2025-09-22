<script setup lang="ts">
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Logo from "../Logo.vue";
</script>

<template>
  <Sidebar>

    <SidebarHeader class="h-16 px-4 flex justify-center bg-background">
      <div class="flex items-center gap-x-3">
        <NuxtLink href="/dashboard" class="inline-block">
          <Logo />
        </NuxtLink>

        <div class="leading-[120%] not-odd:text-sm font-medium">
          Панель управления
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="p-4 gap-y-4">
      Content
    </SidebarContent>

    <SidebarFooter>
      Footer
    </SidebarFooter>
  </Sidebar>
</template>