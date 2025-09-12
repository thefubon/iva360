<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <DashboardSidebar />

    <main class="w-full min-h-screen flex flex-col bg-secondary">
      <DashboardHeader />

      <div class="flex-1 container">
        <slot />
      </div>

      <DashboardFooter />
    </main>
  </SidebarProvider>
</template>
