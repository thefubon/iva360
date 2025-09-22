<script setup lang="ts">
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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

    <div class="flex items-center md:gap-4 gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outlineDark" :size="isMobile ? 'icon' : 'default'">
            <MonitorSmartphone class="size-5 stroke-[1.5]" /> <span class="hidden md:block">Приложение</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent side="bottom" align="end" :sideOffset="8" class="border-none shadow-2xl shadow-slate-600/15 rounded-xl" asChild>
          Some popover content
        </PopoverContent>
      </Popover>

      <Button variant="outlineDark" :size="isMobile ? 'icon' : 'default'" as-child>
        <NuxtLink to="#" class="flex items-center gap-2">
          <Ticket class="size-5 stroke-[1.5]" /> <span class="hidden md:block">Промокод</span>
        </NuxtLink>
      </Button>

      <Button variant="outlineDark" size="icon">
        <ShoppingBag class="size-5 stroke-[1.5]" />
      </Button>

      <DashboardProfileMenu />
    </div>
  </div>
</template>