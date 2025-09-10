<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'

const components: { title: string, href: string, description: string, image: string }[] = [
  {
    title: "Искусственный интеллект внутри",
    href: "#",
    description:
      "Автоматические протоколы встреч, напоминания и поддержка задач – прямо во время работы.",
    image: "/img/CardFive-1.png"
  },
  {
    title: "Стабильная работа даже при слабом интернете",
    href: "#",
    description:
      "Оптимизированные технологии передачи данных обеспечивают устойчивую видеосвязь даже в удаленных регионах.",
    image: "/img/CardFive-2.png"
  },
  {
    title: "Совместимость с профессиональным видеооборудованием",
    href: "#",
    description:
      "Поддержка современных стандартов связи и интеграция с камерами и переговорными – для бизнеса любого масштаба.",
    image: "/img/CardFive-3.png"
  },
]
</script>

<template>
  <div class="container grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
    <div v-for="component in components" :key="component.title">
      <Card 
        :title="component.title"
        :description="component.description"
        :image="component.image"
        :href="component.href"
      />
    </div>
  </div>
</template>