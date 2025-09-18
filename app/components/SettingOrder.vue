<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import { ChevronRight, Trash2 } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

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

// Использование глобального состояния корзины
const { addToCart, removeFromCart } = useCart()

// Состояние кнопки добавления
const isAddedToCart = ref(false)

// Количество
const quantity = ref(1)

// URL для перехода в корзину
const cartUrl = ref('#')

// Базовая стоимость за месяц
const basePricePerMonth = ref(500)

// Стоимость за докладчика в месяц
const pricePerSpeaker = ref(23)

// Функция для выбора периода
const selectPeriod = (value: number) => {
  selectedPeriod.value = value
}

// Функция для добавления в корзину
const addToCartHandler = () => {
  isAddedToCart.value = true
  addToCart(quantity.value)
}

// Функция для удаления из корзины
const removeFromCartHandler = () => {
  isAddedToCart.value = false
  removeFromCart()
}

// Отслеживание изменений количества
watch(quantity, (newQuantity) => {
  if (isAddedToCart.value) {
    addToCart(newQuantity)
  }
})

// Вычисляемое свойство для даты завершения тарифа
const endDate = computed(() => {
  const today = new Date()
  const endDate = new Date(today)
  endDate.setMonth(endDate.getMonth() + selectedPeriod.value)
  
  // Форматируем дату в формате DD.MM.YYYY
  const day = endDate.getDate().toString().padStart(2, '0')
  const month = (endDate.getMonth() + 1).toString().padStart(2, '0')
  const year = endDate.getFullYear()
  
  return `${day}.${month}.${year}`
})

// Получаем процент скидки для выбранного периода
const currentDiscount = computed(() => {
  const period = subscriptionPeriods.value.find(p => p.value === selectedPeriod.value)
  return period?.discount || '0%'
})

// Процент скидки в числовом виде
const discountPercent = computed(() => {
  return parseInt(currentDiscount.value.replace('-', '').replace('%', '')) || 0
})

// Общая стоимость без скидки (за весь период с учетом количества)
const originalTotalPrice = computed(() => {
  return basePricePerMonth.value * selectedPeriod.value * quantity.value
})

// Общая стоимость со скидкой (с учетом количества)
const finalTotalPrice = computed(() => {
  const discount = discountPercent.value / 100
  return Math.round(originalTotalPrice.value * (1 - discount))
})
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

      <div class="space-y-6 p-4 md:p-6 md:pt-2">

        <div class="grid md:grid-cols-2 gap-4 items-center">
          <div class="grid gap-y-2">
            <h4 class="text-3xl md:text-4xl font-semibold uppercase fontFix">Corp-100</h4>
            <p class="text-secondary">Для встреч, совещаний и командной работы</p>
          </div>

          <div
            class="bg-background shadow-lg shadow-slate-600/15 border-l-4 border-primary h-full rounded-r-md inline-flex flex-col py-2 px-4">
            <p class="text-sm">Вы оформляете ваш тариф CORP-100 на {{ selectedPeriod }}&nbsp;мес.</p>
            <p class="text-sm font-medium">Дата завершения тарифа: <span class="text-primary">{{ endDate }}</span></p>
          </div>
        </div>

        <h4 class="fontFix text-xl md:text-2xl font-medium">Настройки текущего тарифа</h4>

        <div class="inline-flex h-10">
          <button v-for="(period, index) in subscriptionPeriods" :key="period.id" @click="selectPeriod(period.value)"
            :class="[
              'flex px-4 justify-center items-center transition-colors duration-200 border font-medium text-sm',
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
            ]">
            <span>{{ period.label }}</span>
            <span class="ml-2 px-1.5 py-0.5 bg-primary text-background text-xs rounded-full">
              {{ period.discount }}
            </span>
          </button>
        </div>

      </div>

      <DialogFooter class="p-4 sticky bottom-0 z-20 border-t border-border">
        <div class="flex items-center justify-between gap-4 w-full">
          <!-- Блок с ценой -->
          <div class="flex flex-col">
            <div class="flex items-baseline gap-2">
              <span class="text-sm text-muted-foreground line-through">{{ originalTotalPrice }} ₽</span>
              <span class="text-2xl font-bold">{{ finalTotalPrice }} ₽</span>
            </div>
            <p class="text-sm text-primary">{{ pricePerSpeaker }} ₽ за докладчика в месяц</p>
          </div>
          
          <!-- Блок с кнопками -->
          <div class="flex items-center gap-4">
          <NumberField 
            v-if="isAddedToCart"
            v-model="quantity" 
            :min="1"
            :max="10"
            :default-value="1"
            class="w-24"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          
          <Button 
            v-if="!isAddedToCart"
            size="lg" 
            @click="addToCartHandler"
          >
            Добавить
          </Button>
          
          <template v-else>
            <Button 
              size="lg" 
              variant="secondary"
              as-child
              class="flex items-center gap-2"
            >
              <NuxtLink :to="cartUrl" class="flex items-center gap-2 !text-foreground">
                <span>В корзину</span>
                <ChevronRight class="size-4" />
              </NuxtLink>
            </Button>
            
            <Button 
              variant="outlineDark" 
              size="icon"
              @click="removeFromCartHandler"
            >
              <Trash2 class="size-4" />
            </Button>
          </template>
          </div>
        </div>
      </DialogFooter>

    </DialogScrollContent>
  </Dialog>
</template>