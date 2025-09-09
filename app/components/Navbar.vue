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

const components: { title: string, href: string, description: string, icon: string }[] = [
  {
    title: "IVA360 Встречи",
    href: "#",
    description:
      "Стабильная и защищенная коммуникация для вашей команды.",
    icon: "Meetings"
  },
  {
    title: "IVA360 Ассистент",
    href: "#",
    description:
      "Ваш ИИ-помощник для рабочих встреч и задач.",
    icon: "Ai"
  },
  {
    title: "IVA360 Мессенджер",
    href: "#",
    description:
      "Защищенное общение внутри команды и с клиентами.",
    icon: "Messenger"
  },
  {
    title: "IVA360 Вебинары",
    href: "#",
    description: "Обучение и презентации, доступные каждому.",
    icon: "Webinar"
  },
  {
    title: "IVA360 Трансляции",
    href: "#",
    description:
      "Онлайн-события под ключ для вашего бизнеса.",
    icon: "Meetings"
  },
  {
    title: "IVA360 Календарь",
    href: "#",
    description:
      "Планируйте встречи и события без хаоса.",
    icon: "Calendar"
  },
  {
    title: "IVA360 Почта",
    href: "#",
    description:
      "Корпоративная электронная почта в защищенной экосистеме.",
    icon: "Mail"
  },
  {
    title: "IVA360 Диск",
    href: "#",
    description:
      "Корпоративная электронная почта в защищенной экосистеме.",
    icon: "Disc"
  },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="uppercase cursor-pointer">Продукты</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[480px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[680px] ">
            <li v-for="component in components" :key="component.title">
              <NavigationMenuLink as-child>
                <a :href="component.href"
                  class="block select-none rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div class="flex gap-x-4">
                    <div>
                      <component :is="iconComponents[component.icon]" class="!size-9" />
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
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger class="uppercase cursor-pointer">Отрасли</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <a class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/">
                  <img src="https://www.reka-ui.com/logo.svg" class="h-6 w-6">
                  <div class="mb-2 mt-4 text-lg font-medium">
                    Баннер
                  </div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components built with Radix UI and
                    Tailwind CSS.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>

            <li>
              <NavigationMenuLink as-child>
                <a href="/docs/introduction"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div class="text-sm font-medium leading-none">Малому и среднему бизнесу</div>
                  <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Облачная платформа для встреч, работы с клиентами и управления командой – все в одном решении.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <a href="/docs/installation"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div class="text-sm font-medium leading-none">Installation</div>
                  <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <a href="/docs/typography"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div class="text-sm font-medium leading-none">Typography</div>
                  <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Styles for headings, paragraphs, lists...etc
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem class="uppercase cursor-pointer">
        <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
          Новости и статьи
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem class="uppercase cursor-pointer">
        <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
          Наши вебинары
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem class="uppercase cursor-pointer">
        <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
          Тарифы
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>