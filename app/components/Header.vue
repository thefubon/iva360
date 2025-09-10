<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Search, ShoppingBag, Menu } from 'lucide-vue-next';
</script>

<template>
  <Banner />

  <header class="bg-background border-b sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>

      <div class="flex items-center gap-x-3 md:gap-x-4">
        <Button variant="secondary" size="icon">
          <Search class="size-5" />
        </Button>

        <Button variant="secondary" size="icon" class="relative">
          <div
            class="size-4.5 text-xs bg-destructive text-background !font-bold absolute -top-1.5 -right-1.5 rounded-full flex justify-center items-center"
          >
            2</div>
          <ShoppingBag class="size-5" />
        </Button>

        <Button as-child>
          <NuxtLink href="#">
            Войти
          </NuxtLink>
        </Button>

        <Button class="md:hidden" variant="secondary" size="icon">
          <Menu class="size-5" />
        </Button>
      </div>
    </div>
  </header>

  <div class="hidden md:block bg-background shadow-lg shadow-slate-600/10 relative z-40">
    <div class="container flex justify-center items-center h-20">
      <Navbar />
    </div>
  </div>

</template>