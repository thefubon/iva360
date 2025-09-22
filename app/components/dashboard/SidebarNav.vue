<script lang="ts" setup>
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LayoutPanelLeft, Users, BriefcaseBusiness, Blocks, FileCode2, ChartBarStacked, CreditCard, Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"

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
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
</script>

<template>
  <div>
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in items2" :key="item.title">
            <SidebarMenuButton asChild>
              <a :href="item.url">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <Separator />

    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in items3" :key="item.title">
            <SidebarMenuButton asChild>
              <a :href="item.url">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </div>
</template>
