<script setup lang="ts">
import { ref } from 'vue'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Массив данных для периодов подписки
const subscriptionPeriods = ref([
  { id: 1, label: '3 мес.', value: 3, discount: '-3%', isDefault: false },
  { id: 2, label: '6 мес.', value: 6, discount: '-10%', isDefault: false },
  { id: 3, label: '12 мес.', value: 12, discount: '-20%', isDefault: true }
])

// Выбранный период (автоматически найти период по умолчанию)
const selectedPeriod = ref(
  subscriptionPeriods.value.find(period => period.isDefault)?.value || 12
)

// Функция для выбора периода
const selectPeriod = (value: number) => {
  selectedPeriod.value = value
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="lg">
        Настроить и подключить
      </Button>
    </DialogTrigger>

    <DialogScrollContent class="max-w-full md:max-w-[980px] p-0 gap-0 border-none">

      <DialogHeader class="p-4 md:p-6">
        <DialogTitle>Настройка тарифа</DialogTitle>
      </DialogHeader>

      <div class="space-y-6 p-4 md:p-6">

        <div class="grid md:grid-cols-2 gap-4 items-center">
          <div class="grid gap-y-2">
            <h4 class="text-3xl md:text-4xl font-semibold uppercase fontFix">Corp-100</h4>
            <p class="text-secondary">Для встреч, совещаний и командной работы</p>
          </div>

          <div
            class="bg-background shadow-lg shadow-slate-600/15 border-l-4 border-primary h-full rounded-r-md inline-flex flex-col py-2 px-4">
            <p class="text-sm">Вы оформляете ваш тариф CORP-100 на {{ selectedPeriod }}&nbsp;мес.</p>
            <p class="text-sm font-medium">Дата завершения тарифа: <span class="text-primary">17.09.2025</span></p>
          </div>
        </div>

        <h4 class="fontFix text-2xl font-medium">Настройки текущего тарифа</h4>

        <div class="inline-flex h-10">
          <button
            v-for="(period, index) in subscriptionPeriods"
            :key="period.id"
            @click="selectPeriod(period.value)"
            :class="[
              'flex px-4 justify-center items-center transition-colors duration-200 border font-medium',
              selectedPeriod === period.value 
                ? 'bg-primary-50/50 text-primary border-primary z-10' 
                : 'bg-background text-foreground hover:bg-muted border-border',
              // Убираем правый бордер, кроме последнего элемента и выбранного
              index < subscriptionPeriods.length - 1 && selectedPeriod !== period.value ? 'border-r-0' : '',
              // Убираем левый бордер у элемента после выбранного (если текущий не выбран)
              index > 0 && subscriptionPeriods[index - 1]?.value === selectedPeriod && selectedPeriod !== period.value ? 'border-l-0' : '',
              // Первый элемент
              index === 0 ? 'rounded-l-md' : '',
              // Последний элемент
              index === subscriptionPeriods.length - 1 ? 'rounded-r-md' : ''
            ]"
          >
            <span>{{ period.label }}</span>
            <span class="ml-2 px-1.5 py-0.5 bg-primary text-background text-xs rounded-full">
              {{ period.discount }}
            </span>
          </button>
        </div>

      </div>

      <DialogFooter class="p-4 sticky bottom-0 z-20 border-t border-border">
        Footer
      </DialogFooter>

    </DialogScrollContent>
  </Dialog>
</template>