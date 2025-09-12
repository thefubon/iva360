<script setup lang="ts">
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Ticket, MonitorSmartphone } from 'lucide-vue-next';
import { useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints({
  mobile: 768,
});

const isMobile = breakpoints.smaller('mobile');
</script>

<template>
  <div class="flex justify-between items-center border-b px-4 h-16 sticky top-0 z-10 bg-background">
    <div>
      <SidebarTrigger />
    </div>

    <div class="flex items-center gap-4">
      <Button variant="outline" :size="isMobile ? 'icon' : 'default'" asChild>
        <NuxtLink to="#" class="flex items-center gap-2">
          <MonitorSmartphone class="size-6 stroke-[1.5]" /> <span class="hidden md:block">Приложение</span>
        </NuxtLink>
      </Button>

      <Button variant="secondary" :size="isMobile ? 'icon' : 'default'" asChild>
        <NuxtLink to="#" class="flex items-center gap-2">
          <Ticket class="size-6 stroke-[1.5]" /> <span class="hidden md:block">Промокод</span>
        </NuxtLink>
      </Button>

      <Button variant="secondary" size="icon">
        <ShoppingBag class="size-6 stroke-[1.5]" />
      </Button>

      <NuxtImg src="/img/avatar.png" alt="" class="rounded-lg size-9" />
    </div>
  </div>
</template>