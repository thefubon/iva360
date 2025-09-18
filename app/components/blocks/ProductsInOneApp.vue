<script setup lang="ts">
import IconCard from '@/components/ui/icon-card/IconCard.vue'
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
    description: "Проводите встречи до 300 участников с сохранением записи в облако. Пользуйтесь встроенным чатом и онлайн-доской. Демонстрируйте экран или отдельные файлы",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Meetings",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Проводите масштабные мероприятия и включайте интерактивные опросы. Отслеживайте реакции участников и посещаемость. Сохраняйте записи, стенограммы и файлы",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Webinar",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Управляйте защищёнными чатами в мессенджере для компаний и рабочих групп. Включайте поддержку синхронизации с Active Directory и Exchange",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Messenger",
    image: "/img/CardImageChat.png"
  },
  {
    title: "AI-ассистент",
    href: "#",
    description: "Субтитры в реальном времени, онлайн-перевод на 22 языка. Автоматическое резюме встречи, формирование поручений, фиксация принятых решений",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Ai",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Почта и календарь",
    href: "#",
    description: "Безопасная почта на вашем домене. Делегируйте папки и работайте со встроенным календарем. Планирование встреч, автоматический поиск свободного времени и интеграция с сервисами IVA 360",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Mail",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Диск и совместная работа с файлами",
    href: "#",
    description: "Сервис для совместной работы с файлами: загружайте документы, создавайте папки, настраивайте доступ и делитесь документами",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Disc",
    image: "/img/CardImageVideo.png"
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