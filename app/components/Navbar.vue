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

const components: { title: string, href: string, description: string, icon: string }[] = [
  {
    title: "Встречи",
    href: "#",
    description:
      "Стабильная и защищенная коммуникация для вашей команды",
    icon: "Meetings"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Обучение и презентации, доступные каждому",
    icon: "Webinar"
  },
  {
    title: "Онлайн-трансляции",
    href: "#",
    description:
      "Онлайн-события под ключ для вашего бизнеса",
    icon: "Online"
  },
  {
    title: "Мессенджер",
    href: "#",
    description:
      "Защищенное общение внутри команды и с клиентами",
    icon: "Messenger"
  },
  {
    title: "Календарь",
    href: "#",
    description:
      "Планируйте встречи и события без хаоса",
    icon: "Calendar"
  },
  {
    title: "Почта",
    href: "#",
    description:
      "Корпоративная электронная почта в защищенной экосистеме",
    icon: "Mail"
  },
  {
    title: "Диск",
    href: "#",
    description:
      "Удобное хранение и совместная работы с файлами.",
    icon: "Disc"
  },
  {
    title: "ИИ-ассистент",
    href: "#",
    description:
      "Ваш ИИ-помощник для рабочих встреч и задач",
    icon: "Ai"
  },
  {
    title: "Документы",
    href: "#",
    description:
      "Защищенное общение внутри команды и с клиентами",
    icon: "Messenger"
  },
  {
    title: "Календарь",
    href: "#",
    description:
      "Планируйте встречи и события без хаоса",
    icon: "Calendar"
  },
  {
    title: "Почта",
    href: "#",
    description:
      "Корпоративная электронная почта в защищенной экосистеме",
    icon: "Mail"
  },
  {
    title: "Диск и документы",
    href: "#",
    description:
      "Удобное хранение и совместная работы с файлами.",
    icon: "Disc"
  },
]
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
            <ul class="grid w-full gap-4 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <li v-for="component in components" :key="component.title">
                <NavigationMenuLink as-child>
                  <a :href="component.href"
                    class="block select-none rounded-xl p-4 leading-none no-underline outline-none transition-colors h-full">
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