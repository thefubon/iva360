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

const items = [
  {
    title: "Встречи",
    url: "#",
    icon: Meetings,
    target: false,
  },
  {
    title: "Мессенджер",
    url: "https://meet.iva360.ru",
    icon: Messenger,
    target: true,
  },
  {
    title: "Почта и Календарь",
    url: "#",
    icon: Calendar,
    target: false,
  },
  {
    title: "Диск и Документы",
    url: "#",
    icon: Disc,
    target: false,
  },
];

const items2 = [
  {
    title: "Дашборд",
    url: "/dashboard",
    icon: LayoutPanelLeft,
    target: false,
  },
  {
    title: "Пользователи",
    url: "#",
    icon: Users,
    target: false,
  },
  {
    title: "Моя компания",
    url: "#",
    icon: BriefcaseBusiness,
    target: false,
  },
  {
    title: "Мои продукты",
    url: "#",
    icon: Blocks,
    target: false,
  },
  {
    title: "Управление API",
    url: "#",
    icon: FileCode2,
    target: false,
  },
  {
    title: "Статистика",
    url: "#",
    icon: ChartBarStacked,
    target: false,
  },
  {
    title: "Тарифы",
    url: "#",
    icon: CreditCard,
    target: false,
  },
];

const items3 = [
  {
    title: "Подсказки",
    url: "#",
    icon: MessageCircleQuestionMark,
    target: false,
  },
  {
    title: "База знаний",
    url: "https://help.iva360.ru",
    icon: BookMarked,
    target: true,
  },
  {
    title: "Дорожная карта",
    url: "#",
    icon: ListTodo,
    target: false,
  },
  {
    title: "Документы платформы",
    url: "#",
    icon: SquareLibrary,
    target: false,
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
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6" />
                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>
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
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6 stroke-[1.5]" />
                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>
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
              <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined">
                <component :is="item.icon" class="!size-6 stroke-[1.5]" />
                <div class="flex items-center gap-2">{{ item.title }}
                  <SquareArrowOutUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </div>
</template>
