<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Meetings from "@/components/icons/Meetings.vue"
import Messenger from "@/components/icons/Messenger.vue"
import Mail from "@/components/icons/Mail.vue"
import Calendar from "@/components/icons/Calendar.vue"
import Online from "@/components/icons/Online.vue"
import Disc from "@/components/icons/Disc.vue"
import Webinar from "@/components/icons/Webinar.vue"
import Ai from "@/components/icons/Ai.vue"

import type { MainMenuItem } from '~/content/navigation/main-menu'

// Map icon names to components
const iconComponents: Record<string, any> = {
  Meetings,
  Messenger,
  Mail,
  Calendar,
  Online,
  Disc,
  Webinar,
  Ai
}

// Получаем данные через API
const { data: menuData, pending, error } = await useFetch<{
  success: boolean
  data: MainMenuItem[]
  timestamp: string
  count: number
}>('/api/navigation/main-menu')

// Реактивные данные
const components = computed(() => menuData.value?.data || [])

// Реактивное состояние для отслеживания активного компонента
const activeComponent = ref(0) // По умолчанию показываем первый компонент

// Вычисляемое свойство для получения активного компонента для баннера
const activeBanner = computed(() => components.value[activeComponent.value] || components.value[0])
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="overflow-hidden">
      <NavigationMenuItem>
        <NavigationMenuTrigger class="h-16 rounded-none group">
          Продукты
          <span
            class="absolute inset-x-0 bg-primary h-1 -bottom-1 group-data-[state=open]:-bottom-0 transition-all duration-300" />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="container">
            <div class="flex gap-8 py-6">
              <!-- Сетка меню слева -->
              <div class="flex-1">
                <ul class="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <li v-for="(component, index) in components" :key="component.title">
                    <NavigationMenuLink as-child>
                      <a :href="component.href"
                        @mouseenter="activeComponent = index"
                        class="block select-none rounded-xl p-4 leading-none no-underline outline-none transition-colors h-full hover:bg-accent hover:text-accent-foreground">
                        <div class="flex gap-x-4">
                          <div>
                            <component :is="iconComponents[component.icon]" class="!size-10" />
                          </div>
                          <div class="space-y-1.5">
                            <div class="font-medium leading-none">{{ component.title }}</div>
                            <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {{ component.description }}
                            </p>
                          </div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
              
              <!-- Баннер справа -->
              <div class="w-80 flex-shrink-0">
                <div v-if="activeBanner" class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 h-full">
                  <div class="space-y-4">
                    <div class="aspect-video w-full overflow-hidden rounded-xl">
                      <img 
                        :src="activeBanner.bannerImage" 
                        :alt="activeBanner.bannerTitle"
                        class="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                    <div class="space-y-2">
                      <h3 class="text-xl font-semibold text-gray-900">
                        {{ activeBanner.bannerTitle }}
                      </h3>
                      <p class="text-sm text-gray-600 leading-relaxed">
                        {{ activeBanner.bannerDescription }}
                      </p>
                    </div>
                    <div class="pt-2">
                      <button class="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                        Узнать больше
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger class="h-16 rounded-none group">
          Отрасли
          <span
            class="absolute inset-x-0 bg-primary h-1 -bottom-1 group-data-[state=open]:-bottom-0 transition-all duration-300" />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="container">
            <ul class="grid w-full gap-4 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <li>
                <NavigationMenuLink as-child>
                  <a href="/docs/introduction"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-full">
                    <div class="font-medium leading-none">Малому и среднему бизнесу</div>
                    <p class="text-sm leading-snug text-muted-foreground">
                      Простой и быстрый способ внедрить профрешение в компании без установки и участия системного
                      администратора
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a href="/docs/installation"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div class="font-medium leading-none">Для крупного бизнеса</div>
                    <p class="text-sm leading-snug text-muted-foreground">
                      Универсальное решение для мероприятий и встреч в компании: видеозвонки и мессенджер в одном
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a href="/docs/typography"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div class="font-medium leading-none">Для образовательных учреждений</div>
                    <p class="text-sm leading-snug text-muted-foreground">
                      Инструменты для онлайн-обучения, вебинаров и взаимодействия с учениками
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a href="/docs/typography"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div class="font-medium leading-none">Для госсектора</div>
                    <p class="text-sm leading-snug text-muted-foreground">
                      Безопасная цифровая среда для совещаний, веб-конференций и остальных внутренних коммуникаций
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a href="/docs/typography"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div class="font-medium leading-none">Партнерам</div>
                    <p class="text-sm leading-snug text-muted-foreground">
                      IVA 360 лучшая платформа для ваши клиентов
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
          Новости и статьи
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="#" class="!text-lg" :class="navigationMenuTriggerStyle()">
          Наши вебинары
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="#" class="!text-lg" :class="navigationMenuTriggerStyle()">
          Тарифы
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>