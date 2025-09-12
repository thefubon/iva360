<script setup lang="ts">
import { FeatureCard } from '@/components/ui/feature-card'

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
    <FeatureCard
      v-for="component in components" 
      :key="component.title"
      :title="component.title"
      :description="component.description"
      :image="component.image"
      :href="component.href"
    />
  </div>
</template>