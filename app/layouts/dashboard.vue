<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/Sidebar.vue";
import { Button } from "~/components/ui/button";

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full min-h-screen flex flex-col">
      <header class="flex justify-between items-center border-b p-4 sticky top-0 z-10 bg-background">
        <div>
          <SidebarTrigger />
        </div>

        <div>
          <Button>
            Выйти
          </Button>
        </div>
      </header>

      <div class="flex-1 p-4">
        <slot />
      </div>

      <footer class="p-4">
        Footer
      </footer>
    </main>
  </SidebarProvider>
</template>
