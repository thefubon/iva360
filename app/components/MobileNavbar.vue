<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Meetings from "@/components/icons/Meetings.vue"
import Messenger from "@/components/icons/Messenger.vue"
import Mail from "@/components/icons/Mail.vue"
import Calendar from "@/components/icons/Calendar.vue"
import Disc from "@/components/icons/Disc.vue"
import Webinar from "@/components/icons/Webinar.vue"
import Ai from "@/components/icons/Ai.vue"

// Props для управления видимостью
interface Props {
  isVisible?: boolean
}

const { isVisible = false } = defineProps<Props>()

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

// Продукты
const products: { title: string, href: string, description: string, icon: string }[] = [
  {
    title: "IVA360 Встречи",
    href: "#",
    description: "Стабильная и защищенная коммуникация для вашей команды.",
    icon: "Meetings"
  },
  {
    title: "IVA360 Ассистент",
    href: "#",
    description: "Ваш ИИ-помощник для рабочих встреч и задач.",
    icon: "Ai"
  },
  {
    title: "IVA360 Мессенджер",
    href: "#",
    description: "Защищенное общение внутри команды и с клиентами.",
    icon: "Messenger"
  },
  {
    title: "IVA360 Почта",
    href: "#",
    description: "Корпоративная почта с высоким уровнем безопасности.",
    icon: "Mail"
  },
  {
    title: "IVA360 Календарь",
    href: "#",
    description: "Планирование встреч и управление расписанием.",
    icon: "Calendar"
  },
  {
    title: "IVA360 Диск",
    href: "#",
    description: "Безопасное хранение и обмен файлами.",
    icon: "Disc"
  },
  {
    title: "IVA360 Вебинары",
    href: "#",
    description: "Проведение онлайн-презентаций и обучений.",
    icon: "Webinar"
  }
]

// Отрасли
const industries: { title: string, href: string, description: string }[] = [
  {
    title: "Финансы и банкинг",
    href: "#",
    description: "Решения для финансового сектора с повышенной безопасностью"
  },
  {
    title: "Здравоохранение",
    href: "#",
    description: "HIPAA-совместимые решения для медицинских организаций"
  },
  {
    title: "Образование",
    href: "#",
    description: "Инструменты для дистанционного и смешанного обучения"
  },
  {
    title: "Государственный сектор",
    href: "#",
    description: "Защищенные коммуникации для государственных учреждений"
  },
  {
    title: "Производство",
    href: "#",
    description: "Оптимизация процессов и коммуникаций на производстве"
  },
  {
    title: "Розничная торговля",
    href: "#",
    description: "Решения для улучшения клиентского сервиса"
  }
]

// Простые пункты меню (без подменю)
const simpleMenuItems = [
  { title: 'Решения', href: '#' },
  { title: 'Для бизнеса', href: '#' },
  { title: 'Ресурсы', href: '#' },
  { title: 'Поддержка', href: '#' }
]
</script>

<template>
  <nav v-if="isVisible" class="px-6 space-y-4">
    <!-- Аккордеон с shadcn/vue для подменю -->
    <Accordion
      type="single"
      collapsible
      default-value="products"
      class="space-y-2"
    >
      <!-- Продукты -->
      <AccordionItem value="products" class="border-0">
        <AccordionTrigger class="py-3 text-lg font-medium hover:no-underline hover:text-primary [&>svg]:size-5">
          Продукты
        </AccordionTrigger>
        <AccordionContent class="pb-2">
          <div class="space-y-3 pl-4">
            <a
              v-for="product in products"
              :key="product.title"
              :href="product.href"
              class="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div class="bg-slate-200 p-2 rounded-lg">
                <component :is="iconComponents[product.icon]" class="!size-6" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm">{{ product.title }}</div>
                <div class="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {{ product.description }}
                </div>
              </div>
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Отрасли -->
      <AccordionItem value="industries" class="border-0">
        <AccordionTrigger class="py-3 text-lg font-medium hover:no-underline hover:text-primary [&>svg]:size-5">
          Отрасли
        </AccordionTrigger>
        <AccordionContent class="pb-2">
          <div class="space-y-3 pl-4">
            <a
              v-for="industry in industries"
              :key="industry.title"
              :href="industry.href"
              class="block p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div class="font-medium text-sm">{{ industry.title }}</div>
              <div class="text-xs text-muted-foreground mt-1 line-clamp-2">
                {{ industry.description }}
              </div>
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <!-- Простые пункты меню -->
    <div class="space-y-2">
      <a
        v-for="item in simpleMenuItems"
        :key="item.title"
        :href="item.href"
        class="block py-3 text-lg font-medium hover:text-primary transition-colors"
      >
        {{ item.title }}
      </a>
    </div>
  </nav>
</template>
