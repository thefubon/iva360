<script setup lang="ts">
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
    <div v-for="component in components" :key="component.title"
      class="bg-slate-100 rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <a :href="component.href" class="absolute inset-0 z-10"></a>

      <div class="space-y-4 p-8 md:p-10 h-full">
        <h3>{{ component.title }}</h3>

        <p class="line-clamp-3 text-muted-foreground text-base md:text-lg">
          {{ component.description }}
        </p>
      </div>

      <div>
        <NuxtImg :src="component.image" :alt="component.title" class="w-full" />
      </div>

    </div>
  </div>
</template>