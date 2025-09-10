<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const components: { title: string, href: string, description: string, image: string }[] = [
  {
    title: "Бизнес и корпорации",
    href: "#",
    description:
      "Надёжная видеосвязь, корпоративный чат и AI-ассистент  в единой защищённой платформе.",
    image: "/img/CardTwo-1.png"
  },
  {
    title: "Образовательные учреждения",
    href: "#",
    description:
      "Интерактивные вебинары, онлайн-лекции и сопровождение студентов — современная цифровая среда для обучения.",
    image: "/img/CardTwo-2.png"
  },
  {
    title: "Госучреждения",
    href: "#",
    description:
      "Безопасная коммуникация и совместная работа — на российских серверах и в соответствии с требованиями по защите данных.",
    image: "/img/CardTwo-3.png"
  },
]
</script>

<template>
  <div>
    <Carousel
      class="relative flex justify-center"
      :opts="{
        align: 'center',
      }"
    >

      <CarouselContent class="border !-ml-10">
        <CarouselItem
          v-for="component in components"
          :key="component.title"
          class="basis-3/5 lg:basis-3/5 xl:basis-1/3 border border-red-500 !pl-10"
        >
          <div class="bg-slate-100 rounded-3xl relative flex flex-col overflow-hidden h-full">
            <a :href="component.href" class="absolute inset-0 z-10"/>

            <div class="space-y-4 p-4 md:p-10 h-full">
              <h3 class="text-4xl font-medium leading-[110%]">{{ component.title }}</h3>

              <p class="line-clamp-3 text-muted-foreground text-lg">
                {{ component.description }}
              </p>
            </div>

            <div>
              <NuxtImg :src="component.image" :alt="component.title" class="w-full" />
            </div>
          </div>
        </CarouselItem>

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>