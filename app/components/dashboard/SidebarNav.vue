<script lang="ts" setup>
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LayoutPanelLeft, Users, BriefcaseBusiness, Blocks, FileCode2, ChartBarStacked, CreditCard, Calendar, MessageCircleQuestionMark, BookMarked, ListTodo, SquareLibrary } from "lucide-vue-next"

const items2 = [
  {
    title: "Дашборд",
    url: "#",
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
          <SidebarMenuItem v-for="item in items2" :key="item.title">
            <SidebarMenuButton class="!h-9 px-2" asChild>
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
            <SidebarMenuButton class="!h-9 px-2" asChild>
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
