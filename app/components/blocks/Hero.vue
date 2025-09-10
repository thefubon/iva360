<script lang="ts" setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="container flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-10">
    <div class="flex flex-col gap-10 flex-1">
      <div class="space-y-6">
        <h1>Цифровая среда для корпоративных коммуникаций</h1>
        <p class="text-base md:text-lg text-muted-foreground">Все, что нужно для коммуникации и&nbsp;взаимодействия:
          видеовстречи,
          мессенджер,
          вебинары, трансляции, AI-ассистент, почта и&nbsp;календарь - в&nbsp;едином корпоративном пространстве.</p>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-4">
        <Button size="xl" class="w-full md:w-auto" asChild>
          <NuxtLink href="#">Попробовать бесплатно</NuxtLink>
        </Button>

        <Form />
      </div>
    </div>

    <div class="flex-1">
      <NuxtImg src="/img/HeroImg.png" alt="" class="w-full" />
    </div>
  </div>
</template>