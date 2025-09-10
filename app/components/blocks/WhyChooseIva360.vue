<script setup lang="ts">
import HorizontalCard from '@/components/ui/horizontal-card/HorizontalCard.vue'

const components: { 
  title: string, 
  href: string, 
  description: string, 
  image: string, 
  isReverse: boolean 
}[] = [
  {
    title: "Одна платформа вместо&nbsp;6+ отдельных сервисов",
    href: "#",
    description:
      "Все инструменты для коммуникации и организации рабочего процесса собраны в одном пространстве – без переключений и потерь данных.",
    image: "/img/CardImageVideo.png",
    isReverse: true
  },
  {
    title: "Российская разработка, соответствующая требованиям безопасности",
    href: "#",
    description:
      "Собственная инфраструктура, сертифицированные серверы и контроль доступа в соответствии с корпоративными и государственными стандартами.",
    image: "/img/CardImageChat.png",
    isReverse: false
  },
  {
    title: "Простой интерфейс, не&nbsp;требующий обучения",
    href: "#",
    description:
      "Интуитивно понятная среда – сотрудники начинают пользоваться сервисами сразу, без долгого онбординга и обучения.",
    image: "/img/CardImageVideo.png",
    isReverse: true
  },
]
</script>

<template>
  <div class="container flex flex-col gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
    <div v-for="component in components" :key="component.title">
      <HorizontalCard 
        :title="component.title"
        :description="component.description"
        :image="component.image"
        :href="component.href"
        :is-reverse="component.isReverse"
        :title-html="true"
        :description-html="true"
      />
    </div>
  </div>
</template>