<script setup lang="ts">
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

const components: { title: string, href: string, description: string, textColor: string, iconColor: string, icon: string, image: string }[] = [
  {
    title: "Видеовстречи ",
    href: "#",
    description:
      "Запись видеовстреч, субтитры в реальном времени, текстовая расшифровка встреч, онлайн-перевод, составление резюме после встречи.",
    iconColor: "bg-slate-100",
    icon: "Meetings",
    textColor: "text-forgraund",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Вебинары",
    href: "#",
    description:
      "Интерактивные опросы, реакции участников, подключение по прямой ссылке, автоматическая запись, субтитры и синхронный перевод ИИ-ассистента, и аналитика посещаемости превращают каждое мероприятие в цепочку действий с измеримыми результатами.",
    iconColor: "bg-slate-100",
    textColor: "text-forgraund",
    icon: "Calendar",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Онлайн-трансляции",
    href: "#",
    description:
      "Организуем масштабные трансляции. Полный цикл услуг включает разработку концепции, студийное оборудование, логистику и постпродакшн. Трансляции на сайт или внешние ресурсы Rutube, Vimeo...",
    iconColor: "bg-slate-100",
    icon: "Messenger",
    textColor: "text-forgraund",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Ваша команда всегда в едином информационном поле без риска утечек и потерь данных. Управляйте каналами для проектов и бизнес-функций. Экосистемность, объединяющая мессенджер, видеозвонки, почту, диск. А также синхронизации с Active Directory и Exchange.",
    iconColor: "bg-slate-100",
    icon: "Webinar",
    textColor: "text-forgraund",
    image: "/img/CardImageChat.png"
  },
  {
    title: "AI-ассистент",
    href: "#",
    description:
      "Онлайн-события под ключ для вашего бизнеса.",
    iconColor: "bg-slate-100",
    icon: "Ai",
    textColor: "text-forgraund",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Почта и календарь",
    href: "#",
    description:
      "Планируйте встречи и события без хаоса.",
    iconColor: "bg-slate-100",
    icon: "Calendar",
    textColor: "text-forgraund",
    image: "/img/CardImageChat.png"
  },
]
</script>

<template>
  <div class="md:container space-y-10 md:space-y-16">
    <h2 class="px-4 md:px-0">Все продукты<br />в одном приложении</h2>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 3xl:gap-12">
      <div v-for="component in components" :key="component.title" :class="component.iconColor"
        class="rounded-3xl relative flex flex-col md:hover:-translate-y-2 transition-all duration-300 p-4 md:p-10 space-y-10">

        <a :href="component.href" class="absolute inset-0 z-10"></a>

        <div class="flex-1 space-y-2">
          <div>
            <div class="inline-block p-2 rounded-xl" :class="component.iconColor">
              <component :is="iconComponents[component.icon]" class="!size-12" />
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-4xl font-medium leading-[110%]" :class="component.textColor">{{ component.title }}</h3>

            <p class="line-clamp-3 text-muted-foreground">
              {{ component.description }}
            </p>
          </div>
        </div>

        <div>
          <NuxtImg :src="component.image" :alt="component.title" class="w-full" />
        </div>

      </div>
    </div>
  </div>
</template>