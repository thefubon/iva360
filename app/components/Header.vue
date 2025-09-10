<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next';
import { ShoppingBag } from 'lucide-vue-next';
</script>

<template>

  <header class="bg-background border-b sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>

      <div class="flex items-center gap-x-4">
        <Button variant="secondary" size="icon">
          <Search class="size-5" />
        </Button>

        <Button variant="secondary" size="icon" class="relative">
          <div class="size-4.5 text-xs bg-destructive text-background !font-bold absolute -top-1.5 -right-1.5 rounded-full flex justify-center items-center">2</div>
          <ShoppingBag class="size-5" />
        </Button>

        <Button asChild>
          <NuxtLink href="#">
            Войти
          </NuxtLink>
        </Button>

        <!-- <Button variant="outline" asChild>
          <NuxtLink href="#">
            Регистрация
          </NuxtLink>
        </Button> -->
      </div>
    </div>
  </header>

  <div class="hidden md:block bg-background shadow-lg shadow-slate-600/10 relative z-40">
    <div class="container flex justify-center items-center h-16">
      <Navbar />
    </div>
  </div>

</template>