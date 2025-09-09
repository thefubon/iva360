<script lang="ts" setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 -top-40 -z-0 overflow-x-clip">
      <BgLine class="w-full scale-110" />
    </div>

    <div class="container grid grid-cols-2 items-center gap-10 relative">
      <div class="flex flex-col gap-10">
        <div class="space-y-6">
          <h1 class="heroTitle text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-[110%]">IVA 360 — платформа для
            эффективной работы
          </h1>
          <p class="text-lg text-foreground">Все, что нужно для коммуникации и взаимодействия: видеовстречи, мессенджер,
            вебинары, трансляции, AI-ассистент, почта и календарь - в едином корпоративном пространстве.</p>
        </div>

        <div class="flex items-center gap-4">
          <Button size="xl" asChild>
            <NuxtLink href="#">Попробовать бесплатно</NuxtLink>
          </Button>

          <Button variant="outline" size="xl" asChild>
            <NuxtLink href="#">Оставить заявку</NuxtLink>
          </Button>
        </div>
      </div>

      <div>
        <NuxtImg src="/img/HeroImg.png" alt="" class="w-full" />
      </div>
    </div>
  </div>
</template>