<script lang="ts" setup>
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { LayoutPanelLeft, Users, BriefcaseBusiness, Blocks, FileCode2, ChartBarStacked, CreditCard, MessageCircleQuestionMark, BookMarked, ListTodo, SquareLibrary } from "lucide-vue-next"
import Meetings from "../icons/Meetings.vue";
import Messenger from "../icons/Messenger.vue";
import Calendar from "../icons/Calendar.vue";
import Disc from "../icons/Disc.vue";

const route = useRoute()

const items = [
  {
    title: "Встречи",
    url: "#",
    icon: Meetings,
  },
  {
    title: "Мессенджер",
    url: "#",
    icon: Messenger,
  },
  {
    title: "Почта и Календарь",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Диск и Документы",
    url: "#",
    icon: Disc,
  },
];

const items2 = [
  {
    title: "Дашборд",
    url: "/dashboard",
    icon: LayoutPanelLeft,
  },
  {
    title: "Пользователи",
    url: "#",
    icon: Users,
  },
  {
    title: "Моя компания",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "Мои продукты",
    url: "#",
    icon: Blocks,
  },
  {
    title: "Управление API",
    url: "#",
    icon: FileCode2,
  },
  {
    title: "Статистика",
    url: "#",
    icon: ChartBarStacked,
  },
  {
    title: "Тарифы",
    url: "#",
    icon: CreditCard,
  },
];

const items3 = [
  {
    title: "Подсказки",
    url: "#",
    icon: MessageCircleQuestionMark,
  },
  {
    title: "База знаний",
    url: "#",
    icon: BookMarked,
  },
  {
    title: "Дорожная карта",
    url: "#",
    icon: ListTodo,
  },
  {
    title: "Документы платформы",
    url: "#",
    icon: SquareLibrary,
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
              '!h-9 px-2 hover:bg-muted font-medium',
              route.path === item.url ? 'bg-muted' : ''
            ]" asChild>
              <NuxtLink :href="item.url">
                <component :is="item.icon" class="!size-6" />
                <span>{{ item.title }}</span>
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
                '!h-9 px-2 hover:bg-muted',
                route.path === item.url ? 'bg-muted' : ''
              ]" asChild>
              <NuxtLink :href="item.url">
                <component :is="item.icon" class="!size-6" />
                <span>{{ item.title }}</span>
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
                '!h-9 px-2 hover:bg-muted',
                route.path === item.url ? 'bg-muted' : ''
              ]" asChild>
              <NuxtLink :href="item.url">
                <component :is="item.icon" class="!size-6" />
                <span>{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </div>
</template>
