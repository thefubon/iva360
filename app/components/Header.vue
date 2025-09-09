<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="shadow-lg shadow-slate-600/10">
    <header class="bg-background sticky top-0 z-50 border-b">
      <div class="container flex justify-between items-center h-16">
        <div>
          <IconsLogo />
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

    <div class="container flex justify-center items-center h-16">
      <Navbar />
    </div>
  </div>
</template>