<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/Sidebar.vue";
</script>

<template>
  <SidebarProvider>
    <Sidebar />

    <main class="w-full min-h-screen flex flex-col bg-muted">
      <DashboardHeader />

      <div class="flex-1 container">
        <slot />
      </div>

      <DashboardFooter />
    </main>
  </SidebarProvider>
</template>
