<script setup lang="ts">
const components: { title: string, href: string, description: string, image: string }[] = [
  {
    title: "Бизнес и корпорации",
    href: "#",
    description:
      "Надёжная видеосвязь, корпоративный чат и AI-ассистент  в единой защищённой платформе.",
    image: "/img/CardTwo-1.png"
  },
  {
    title: "Образовательные учреждения",
    href: "#",
    description:
      "Интерактивные вебинары, онлайн-лекции и сопровождение студентов — современная цифровая среда для обучения.",
    image: "/img/CardTwo-2.png"
  },
  {
    title: "Госучреждения",
    href: "#",
    description:
      "Безопасная коммуникация и совместная работа — на российских серверах и в соответствии с требованиями по защите данных.",
    image: "/img/CardTwo-3.png"
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