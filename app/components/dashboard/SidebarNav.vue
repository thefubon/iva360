<script lang="ts" setup>
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { LayoutPanelLeft, Users, BriefcaseBusiness, Blocks, FileCode2, ChartBarStacked, CreditCard, MessageCircleQuestionMark, BookMarked, ListTodo, SquareLibrary, ArrowUpRight, ChevronDown } from "lucide-vue-next"
import Meetings from "../icons/sidebar/Meetings.vue";
import Messenger from "../icons/sidebar/Messenger.vue";
import Calendar from "../icons/sidebar/Calendar.vue";
import Disc from "../icons/sidebar/Disc.vue";

const route = useRoute()

// Получаем доступ к функциям управления сайдбаром
const { isMobile, setOpenMobile } = useSidebar()

// Настройка скорости анимации уведомлений (в секундах)
const alertAnimationDuration = 1.2

// Состояние для раскрытия подменю (объект для хранения состояния всех подменю)
const submenuStates = ref<Record<string, boolean>>({})

// Функция для переключения подменю
const toggleSubmenu = (itemTitle: string) => {
  submenuStates.value[itemTitle] = !submenuStates.value[itemTitle]
}

// Функция для закрытия сайдбара в мобильной версии при клике на ссылку
const handleNavClick = (url: string, target?: boolean) => {
  // Закрываем сайдбар только в мобильной версии и только для внутренних ссылок
  if (isMobile.value && !target && url !== '#') {
    setOpenMobile(false)
  }
}

// Функция для проверки, находится ли пользователь на одной из страниц подменю
const isActiveInSubmenu = (item: any) => {
  if (!item.hasSubmenu || !item.submenu) return false
  return item.submenu.some((subItem: any) => route.path === subItem.url)
}

// Автоматически раскрываем подменю, если пользователь находится на одной из внутренних страниц
const initializeSubmenuStates = () => {
  const allItems = [...items, ...items2, ...items3]
  allItems.forEach(item => {
    if ((item as any).hasSubmenu && isActiveInSubmenu(item)) {
      submenuStates.value[item.title] = true
    }
  })
}

// Инициализируем состояния подменю при монтировании
onMounted(() => {
  initializeSubmenuStates()
})

// Следим за изменениями маршрута
watch(() => route.path, () => {
  initializeSubmenuStates()
})

const items = [
  {
    title: "Встречи",
    url: "/dashboard/meet",
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
    hasSubmenu: true,
    submenu: [
      { title: "Все файлы", url: "/dashboard/disc" },
      { title: "Мои файлы", url: "#/disk/my" },
      { title: "Есть доступ", url: "#/disk/shared" },
      { title: "Избранное", url: "#/disk/favorites" },
      { title: "Корзина", url: "#/disk/trash" },
    ]
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
    url: "/dashboard/users",
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
            <!-- Элемент с подменю -->
            <template v-if="(item as any).hasSubmenu">
              <SidebarMenuButton @click="() => toggleSubmenu(item.title)" :class="[
                  '!h-9 px-2 font-medium relative cursor-pointer transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'active:bg-sidebar-accent/80 active:scale-[0.98]',
                  !submenuStates[item.title] && isActiveInSubmenu(item) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                ]">
                <component :is="item.icon" class="!size-6" />
                <span>{{ item.title }}</span>
                <ChevronDown :class="[
                  '!size-4 ml-auto transition-transform duration-200',
                  submenuStates[item.title] ? 'rotate-180' : ''
                ]" />

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                    :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                  <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                </span>
              </SidebarMenuButton>

              <!-- Подменю -->
              <SidebarMenuSub v-if="submenuStates[item.title]">
                <SidebarMenuSubItem v-for="subItem in (item as any).submenu || []" :key="subItem.title">
                  <SidebarMenuSubButton :class="[
                    route.path === subItem.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  ]" asChild>
                    <NuxtLink :href="subItem.url" @click="() => handleNavClick(subItem.url)">
                      <span>{{ subItem.title }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </template>

            <!-- Обычный элемент без подменю -->
            <template v-else>
              <SidebarMenuButton :class="[
                '!h-9 px-2 font-medium relative transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                'active:bg-sidebar-accent/80 active:scale-[0.98]',
                route.path === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
              ]" asChild>
                <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined" @click="() => handleNavClick(item.url, item.target)">
                  <component :is="item.icon" class="!size-6" />

                  <div class="flex items-center gap-2">
                    <span>{{ item.title }}</span>
                    <ArrowUpRight v-if="item.target" class="!size-4 ml-auto" />
                  </div>

                  <span v-if="item.alert"
                    class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                    <span
                      class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                      :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                    <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </template>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <Separator class="!my-4" />

    <SidebarGroup class="p-0">
      <SidebarGroupContent>
        <SidebarMenu class="!gap-y-2">
          <SidebarMenuItem v-for="item in items2" :key="item.title">
            <!-- Элемент с подменю -->
            <template v-if="(item as any).hasSubmenu">
              <SidebarMenuButton @click="() => toggleSubmenu(item.title)" :class="[
                  '!h-9 px-2 relative cursor-pointer transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'active:bg-sidebar-accent/80 active:scale-[0.98]',
                  !submenuStates[item.title] && isActiveInSubmenu(item) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                ]">
                <component :is="item.icon" class="!size-5 stroke-[1.5]" />

                <div class="flex items-center gap-2">
                  <span>{{ item.title }}</span>
                  <ArrowUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>

                <ChevronDown :class="[
                  '!size-4 ml-auto transition-transform duration-200',
                  submenuStates[item.title] ? 'rotate-180' : ''
                ]" />

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                    :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                  <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                </span>
              </SidebarMenuButton>

              <!-- Подменю -->
              <SidebarMenuSub v-if="submenuStates[item.title]">
                <SidebarMenuSubItem v-for="subItem in (item as any).submenu || []" :key="subItem.title">
                  <SidebarMenuSubButton :class="[
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    route.path === subItem.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  ]" asChild>
                    <NuxtLink :href="subItem.url" @click="() => handleNavClick(subItem.url)">
                      <div class="flex items-center gap-2">
                        <span>{{ subItem.title }}</span>
                        <ArrowUpRight v-if="subItem.target" class="!size-4 ml-auto" />
                      </div>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </template>

            <!-- Обычный элемент без подменю -->
            <template v-else>
              <SidebarMenuButton :class="[
                  '!h-9 px-2 relative transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent/80 active:scale-[0.98]',
                  route.path === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                ]" asChild>
                <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined" @click="() => handleNavClick(item.url, item.target)">
                  <component :is="item.icon" class="!size-5 stroke-[1.5]" />

                  <div class="flex items-center gap-2">
                    <span>{{ item.title }}</span>
                    <ArrowUpRight v-if="item.target" class="!size-4 ml-auto" />
                  </div>

                  <span v-if="item.alert"
                    class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                    <span
                      class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                      :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                    <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </template>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <Separator class="!my-4" />

    <SidebarGroup class="p-0">
      <SidebarGroupContent>
        <SidebarMenu class="!gap-y-2">
          <SidebarMenuItem v-for="item in items3" :key="item.title">
            <!-- Элемент с подменю -->
            <template v-if="(item as any).hasSubmenu">
              <SidebarMenuButton @click="() => toggleSubmenu(item.title)" :class="[
                  '!h-9 px-2 relative cursor-pointer transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'active:bg-sidebar-accent/80 active:scale-[0.98]',
                  !submenuStates[item.title] && isActiveInSubmenu(item) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                ]">
                <component :is="item.icon" class="!size-6 stroke-[1.5]" />
                <div class="flex items-center gap-2">
                  <span>{{ item.title }}</span>
                  <ArrowUpRight v-if="item.target" class="!size-4 ml-auto" />
                </div>
                <ChevronDown :class="[
                  '!size-4 ml-auto transition-transform duration-200',
                  submenuStates[item.title] ? 'rotate-180' : ''
                ]" />

                <span v-if="item.alert"
                  class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                  <span
                    class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                    :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                  <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                </span>
              </SidebarMenuButton>

              <!-- Подменю -->
              <SidebarMenuSub v-if="submenuStates[item.title]">
                <SidebarMenuSubItem v-for="subItem in (item as any).submenu || []" :key="subItem.title">
                  <SidebarMenuSubButton :class="[
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    route.path === subItem.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  ]" asChild>
                    <NuxtLink :href="subItem.url" @click="() => handleNavClick(subItem.url)">
                      <div class="flex items-center gap-2">
                        <span>{{ subItem.title }}</span>
                        <ArrowUpRight v-if="subItem.target" class="!size-4 ml-auto" />
                      </div>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </template>

            <!-- Обычный элемент без подменю -->
            <template v-else>
              <SidebarMenuButton :class="[
                  '!h-9 px-2 relative transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent/80 active:scale-[0.98]',
                  route.path === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                ]" asChild>
                <NuxtLink :href="item.url" :target="item.target ? '_blank' : undefined" @click="() => handleNavClick(item.url, item.target)">
                  <component :is="item.icon" class="!size-5 stroke-[1.5]" />

                  <div class="flex items-center gap-2">
                    <span>{{ item.title }}</span>
                    <ArrowUpRight v-if="item.target" class="!size-4 ml-auto" />
                  </div>

                  <span v-if="item.alert"
                    class="absolute top-1 right-1 flex size-4 rounded-full justify-center items-center">
                    <span
                      class="absolute inline-flex h-full w-full animate-smooth-ping rounded-full bg-primary opacity-75"
                      :style="{ '--animation-duration': alertAnimationDuration + 's' }"></span>
                    <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </template>
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
