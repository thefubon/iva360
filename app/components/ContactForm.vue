<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from "@vueuse/core"
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery("(min-width: 768px)")

// Checkbox states
const privacyChecked = ref(true)
const termsChecked = ref(true)

const isOpen = ref(false)
</script>

<template>
  <UseTemplate>
    <div class="grid items-start gap-6">
      <!-- Форма без кнопки отправить для переиспользования -->
      <div class="grid gap-3">
        <Label html-for="username">Имя и Фамилия</Label>
        <Input id="username" class="h-12" default-value="" />
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="grid gap-3">
          <Label html-for="email">Email</Label>
          <Input
            id="email"
            class="h-12"
            type="email"
            default-value=""
          />
        </div>

        <div class="grid gap-3">
          <Label html-for="tel">Телефон</Label>
          <Input
            id="tel"
            class="h-12"
            type="tel"
            default-value=""
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="grid gap-3">
          <Label html-for="company">Компания</Label>
          <Input id="company" class="h-12" default-value="" />
        </div>

        <div class="grid gap-3">
          <Label html-for="role">Роль <span class="text-zinc-400">(Опционально)</span></Label>
          <Input id="role" class="h-12" default-value="" />
        </div>
      </div>

      <div class="flex space-x-2">
        <Checkbox
          id="privacy"
          v-model:checked="privacyChecked"
          :default-checked="true"
          class="mt-1 size-6"
        />
        <Label for="privacy" class="font-normal leading-5">Я даю согласие на обработку моих персональных данных в
          соответствии с условиями политики
          конфиденциальности</Label>
      </div>

      <div class="flex space-x-2">
        <Checkbox
          id="terms"
          v-model:checked="termsChecked"
          :default-checked="true"
          class="mt-1 size-6"
        />
        <Label for="terms" class="font-normal leading-5">Даю согласие на получение рекламных и информационных
          сообщений</Label>
      </div>
    </div>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" size="xl" class="cursor-pointer w-full md:w-auto">
        Оставить заявку
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle class="text-3xl">Получить консультацию</DialogTitle>
        <DialogDescription class="text-base">
          Расскажем, как внедрить платформу IVA360 в вашу компанию, и продемонстрируем её работу.
        </DialogDescription>
      </DialogHeader>
      <form class="space-y-6">
        <GridForm />
        <Button size="xl" type="submit" class="cursor-pointer w-full">
          Отправить
        </Button>
      </form>
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button variant="outline" size="xl" class="cursor-pointer w-full md:w-auto">
        Оставить заявку
      </Button>
    </DrawerTrigger>
    <DrawerContent class="fixed inset-x-0 bottom-0 top-5 flex flex-col z-50">
      <DrawerHeader class="text-left flex-shrink-0">
        <DrawerTitle class="text-3xl">Получить консультацию</DrawerTitle>
        <DrawerDescription class="text-base">
          Расскажем, как внедрить платформу IVA360 в вашу компанию, и продемонстрируем её работу.
        </DrawerDescription>
      </DrawerHeader>
      
      <!-- Прокручиваемый контент -->
      <div class="flex-1 overflow-y-auto px-4">
        <GridForm />
      </div>
      
      <!-- Фиксированный футер с кнопками -->
      <DrawerFooter class="pt-4 pb-8 flex-shrink-0 border-t">
        <Button size="xl" type="submit" class="cursor-pointer w-full">
          Отправить
        </Button>
        <DrawerClose as-child>
          <Button variant="outline" class="w-full">
            Отмена
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>