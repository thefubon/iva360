<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>

  <header class="bg-background border-b sticky top-0 z-50">
    <div class="container flex justify-between items-center h-16">
      <div>
        <Logo />
      </div>

      <div class="flex items-center gap-x-3">
        <Button asChild>
          <NuxtLink href="#">
            Вход
          </NuxtLink>
        </Button>

        <Button variant="outline" asChild>
          <NuxtLink href="#">
            Регистрация
          </NuxtLink>
        </Button>
      </div>
    </div>
  </header>

  <div class="bg-background shadow-lg shadow-slate-600/10 relative z-40">
    <div class="container flex justify-center items-center h-16">
      <Navbar />
    </div>
  </div>

</template>