<script setup lang="ts">
import IconCard from '@/components/ui/IconCard.vue'
import Meetings from "@/components/icons/Meetings.vue"
import Messenger from "@/components/icons/Messenger.vue"
import Mail from "@/components/icons/Mail.vue"
import Calendar from "@/components/icons/Calendar.vue"
import Disc from "@/components/icons/Disc.vue"
import Webinar from "@/components/icons/Webinar.vue"
import Ai from "@/components/icons/Ai.vue"

// Map icon names to components
const iconComponents: Record<string, any> = {
  Meetings,
  Messenger,
  Mail,
  Calendar,
  Disc,
  Webinar,
  Ai
}

const components: { 
  title: string, 
  href: string, 
  description: string, 
  titleColor: string, 
  bgColor: string, 
  iconBgColor: string, 
  icon: string, 
  image: string 
}[] = [
  {
    title: "Видеовстречи",
    href: "#",
    description: "Запись видеовстреч, субтитры в реальном времени, текстовая расшифровка встреч, онлайн-перевод, составление резюме после встречи.",
    bgColor: "bg-emerald-50",
    iconBgColor: "bg-emerald-100",
    titleColor: "text-emerald-900",
    icon: "Meetings",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Интерактивные опросы, реакции участников, подключение по прямой ссылке, автоматическая запись, субтитры и синхронный перевод ИИ-ассистента.",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100",
    titleColor: "text-blue-900",
    icon: "Webinar",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Онлайн-трансляции",
    href: "#",
    description: "Организуем масштабные трансляции. Полный цикл услуг включает разработку концепции, студийное оборудование, логистику и постпродакшн.",
    bgColor: "bg-purple-50",
    iconBgColor: "bg-purple-100",
    titleColor: "text-purple-900",
    icon: "Messenger",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Ваша команда всегда в едином информационном поле без риска утечек и потерь данных. Управляйте каналами для проектов и бизнес-функций.",
    bgColor: "bg-indigo-50",
    iconBgColor: "bg-indigo-100",
    titleColor: "text-indigo-900",
    icon: "Mail",
    image: "/img/CardImageChat.png"
  },
  {
    title: "AI-ассистент",
    href: "#",
    description: "Автоматические протоколы встреч, напоминания и поддержка задач – ваш умный помощник прямо во время работы.",
    bgColor: "bg-amber-50",
    iconBgColor: "bg-amber-100",
    titleColor: "text-amber-900",
    icon: "Ai",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Почта и календарь",
    href: "#",
    description: "Планируйте встречи и события без хаоса. Корпоративная электронная почта в защищенной экосистеме.",
    bgColor: "bg-rose-50",
    iconBgColor: "bg-rose-100",
    titleColor: "text-rose-900",
    icon: "Calendar",
    image: "/img/CardImageChat.png"
  },
]
</script>

<template>
  <div class="container grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
    <div v-for="component in components" :key="component.title">
      <IconCard 
        :title="component.title"
        :description="component.description"
        :image="component.image"
        :icon-component="iconComponents[component.icon]"
        :href="component.href"
        :title-color="component.titleColor"
        :bg-color="component.bgColor"
        :icon-bg-color="component.iconBgColor"
      />
    </div>
  </div>
</template>