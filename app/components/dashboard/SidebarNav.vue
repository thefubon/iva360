<script lang="ts" setup>
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { LayoutPanelLeft, Users, BriefcaseBusiness, Blocks, FileCode2, ChartBarStacked, CreditCard, MessageCircleQuestionMark, BookMarked, ListTodo, SquareLibrary, SquareArrowOutUpRight } from "lucide-vue-next"
import Meetings from "../icons/sidebar/Meetings.vue";
import Messenger from "../icons/sidebar/Messenger.vue";
import Calendar from "../icons/sidebar/Calendar.vue";
import Disc from "../icons/sidebar/Disc.vue";

const route = useRoute()

// Настройка скорости анимации уведомлений (в секундах)
const alertAnimationDuration = 1.2

const items = [
  {
    title: "Встречи",
    url: "#",
    icon: Meetings,
    target: false,
    alert: false,
  },
  {
    title: "Мессенджер",
    url: "https://meet.iva360.ru",
    icon: Messenger,
    target: true,
    alert: false,
  },
  {
    title: "Почта и Календарь",
    url: "#",
    icon: Calendar,
    target: false,
    alert: false,
  },
  {
    title: "Диск и Документы",
    url: "#",
    icon: Disc,
    target: false,
    alert: false,
  },
];

const items2 = [
  {
    title: "Дашборд",
    url: "/dashboard",
    icon: LayoutPanelLeft,
    target: false,
    alert: false,
  },
  {
    title: "Пользователи",
    url: "#",
    icon: Users,
    target: false,
    alert: true,
  },
  {
    title: "Моя компания",
    url: "#",
    icon: BriefcaseBusiness,
    target: false,
    alert: false,
  },
  {
    title: "Мои продукты",
    url: "#",
    icon: Blocks,
    target: false,
    alert: false,
  },
  {
    title: "Управление API",
    url: "#",
    icon: FileCode2,
    target: false,
    alert: false,
  },
  {
    title: "Статистика",
    url: "#",
    icon: ChartBarStacked,
    target: false,
    alert: false,
  },
  {
    title: "Тарифы",
    url: "#",
    icon: CreditCard,
    target: false,
    alert: false,
  },
];

const items3 = [
  {
    title: "Подсказки",
    url: "#",
    icon: MessageCircleQuestionMark,
    target: false,
    alert: false,
  },
  {
    title: "База знаний",
    url: "https://help.iva360.ru",
    icon: BookMarked,
    target: true,
    alert: false,
  },
  {
    title: "Дорожная карта",
    url: "#",
    icon: ListTodo,
    target: false,
    alert: false,
  },
  {
    title: "Документы платформы",
    url: "#",
    icon: SquareLibrary,
    target: false,
    alert: false,
  },
];
</script>

<template>
  <div class="p-4">
    <SidebarGroup class="p-0">
      <SidebarGroupContent>
        <SidebarMenu class="!gap-y-2">
          <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton :class="[
              '!h-9 px-2 hover:bg-muted font-medium relative',
              route.path === item.url ? 'bg-muted' : ''
            ]" asChild>
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6" />

                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                    :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                  <span class="relative inline-flex size-2.5 rounded-full bg-primary"></span>
                </span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <Separator class="!my-4" />

    <SidebarGroup class="p-0">
      <SidebarGroupContent>
        <SidebarMenu class="!gap-y-2">
          <SidebarMenuItem v-for="item in items2" :key="item.title">
            <SidebarMenuButton :class="[
                '!h-9 px-2 hover:bg-muted relative',
                route.path === item.url ? 'bg-muted' : ''
              ]" asChild>
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6 stroke-[1.5]" />

                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                    :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                  <span class="relative inline-flex size-2.5 rounded-full bg-primary"></span>
                </span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <Separator class="!my-4" />

    <SidebarGroup class="p-0">
      <SidebarGroupContent>
        <SidebarMenu class="!gap-y-2">
          <SidebarMenuItem v-for="item in items3" :key="item.title">
            <SidebarMenuButton :class="[
                '!h-9 px-2 hover:bg-muted relative',
                route.path === item.url ? 'bg-muted' : ''
              ]" asChild>
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6 stroke-[1.5]" />

                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"></span>
                  <span class="relative inline-flex size-2.5 rounded-full bg-primary"></span>
                </span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </div>
</template>

<style scoped>
@keyframes smooth-ping {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  20% {
    transform: scale(1.05);
    opacity: 0.2;
  }
  70% {
    transform: scale(1.4);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.animate-smooth-ping {
  animation: smooth-ping 1.5s cubic-bezier(0.3, 0, 0.6, 1) infinite;
}
</style>
