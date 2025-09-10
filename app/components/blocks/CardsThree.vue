<script setup lang="ts">
import { Button } from '@/components/ui/button'

const components: { title: string, href: string, description: string, image: string, position: string }[] = [
  {
    title: "Одна платформа вместо&nbsp;6+ отдельных сервисов",
    href: "#",
    description:
      "Все инструменты для коммуникации и организации рабочего процесса собраны в одном пространстве – без переключений и потерь данных.",
    image: "/img/CardImageVideo.png",
    position: "lg:flex-row-reverse"
  },
  {
    title: "Российская разработка, соответствующая требованиям безопасности",
    href: "#",
    description:
      "Собственная инфраструктура, сертифицированные серверы и контроль доступа в соответствии с корпоративными и государственными стандартами.",
    image: "/img/CardImageChat.png",
    position: ""
  },
  {
    title: "Простой интерфейс, не&nbsp;требующий обучения",
    href: "#",
    description:
      "Интуитивно понятная среда – сотрудники начинают пользоваться сервисами сразу, без долгого онбординга и обучения.",
    image: "/img/CardImageVideo.png",
    position: "lg:flex-row-reverse"
  },
]
</script>

<template>
  <div class="container flex flex-col gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
    <div v-for="component in components" :key="component.title"
      class="bg-slate-100 rounded-3xl flex flex-col-reverse lg:flex-row items-center gap-10 xl:gap-12 p-8 md:p-10"
      :class="component.position">

      <div class="space-y-10 flex-1">
        <div class="space-y-4">
          <h3 v-html="component.title"></h3>

          <p class="line-clamp-3 text-muted-foreground text-base md:text-lg" v-html="component.description"></p>
        </div>

        <div>
          <Button size="xl">Получить консультацию</Button>
        </div>
      </div>

      <div class="flex-1">
        <NuxtImg :src="component.image" :alt="component.title" class="w-full" />
      </div>

    </div>
  </div>
</template>