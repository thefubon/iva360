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

const components: { 
  title: string, 
  href: string, 
  description: string, 
  icon: string,
  bannerImage: string,
  bannerTitle: string,
  bannerDescription: string
}[] = [
  {
    title: "Встречи",
    href: "#",
    description: "Стабильная и защищенная коммуникация для вашей команды",
    icon: "Meetings",
    bannerImage: "/img/CardImageVideo.png",
    bannerTitle: "Видеовстречи нового поколения",
    bannerDescription: "Проводите профессиональные видеоконференции с HD-качеством, записью и интеллектуальными функциями"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Обучение и презентации, доступные каждому",
    icon: "Webinar",
    bannerImage: "/img/CardTwo-1.png",
    bannerTitle: "Масштабные вебинары",
    bannerDescription: "Организуйте обучающие мероприятия для больших аудиторий с интерактивными возможностями"
  },
  {
    title: "Онлайн-трансляции",
    href: "#",
    description: "Онлайн-события под ключ для вашего бизнеса",
    icon: "Online",
    bannerImage: "/img/CardFive-1.png",
    bannerTitle: "Профессиональные трансляции",
    bannerDescription: "Стримьте события в реальном времени с высоким качеством и надежностью"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Защищенное общение внутри команды и с клиентами",
    icon: "Messenger",
    bannerImage: "/img/CardImageChat.png",
    bannerTitle: "Корпоративный мессенджер",
    bannerDescription: "Безопасное общение с шифрованием, групповыми чатами и интеграцией с рабочими процессами"
  },
  {
    title: "Календарь",
    href: "#",
    description: "Планируйте встречи и события без хаоса",
    icon: "Calendar",
    bannerImage: "/img/CardTwo-2.png",
    bannerTitle: "Умное планирование",
    bannerDescription: "Синхронизируйте расписания команды, создавайте встречи и получайте напоминания"
  },
  {
    title: "Почта",
    href: "#",
    description: "Корпоративная электронная почта в защищенной экосистеме",
    icon: "Mail",
    bannerImage: "/img/CardFive-2.png",
    bannerTitle: "Корпоративная почта",
    bannerDescription: "Профессиональная электронная почта с защитой от спама и интеграцией с другими сервисами"
  },
  {
    title: "Диск",
    href: "#",
    description: "Удобное хранение и совместная работы с файлами.",
    icon: "Disc",
    bannerImage: "/img/CardTwo-3.png",
    bannerTitle: "Облачное хранилище",
    bannerDescription: "Безопасное хранение файлов с возможностью совместной работы и синхронизации"
  },
  {
    title: "ИИ-ассистент",
    href: "#",
    description: "Ваш ИИ-помощник для рабочих встреч и задач",
    icon: "Ai",
    bannerImage: "/img/CardFive-3.png",
    bannerTitle: "Искусственный интеллект",
    bannerDescription: "Автоматизируйте рутинные задачи, получайте аналитику встреч и умные рекомендации"
  }
]

// Реактивное состояние для отслеживания активного компонента
const activeComponent = ref(0) // По умолчанию показываем первый компонент

// Вычисляемое свойство для получения активного компонента для баннера
const activeBanner = computed(() => components[activeComponent.value] || components[0])
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