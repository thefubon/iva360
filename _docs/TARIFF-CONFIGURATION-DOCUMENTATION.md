# Настройка тарифа

## Описание

Компонент `SettingOrder.vue` предоставляет интерфейс для настройки и заказа тарифного плана CORP-100. Компонент реализует модальное окно с возможностью выбора периода подписки, управления количеством и добавления в корзину.

## Структура компонента

### Основные элементы

1. **Диалоговое окно** - модальное окно с настройками тарифа
2. **Заголовок тарифа** - отображение названия и описания тарифа
3. **Информационный блок** - показывает выбранный период и дату завершения
4. **Переключатель периодов** - кнопки для выбора срока подписки
5. **Футер с ценой** - отображение стоимости и кнопки управления

### Периоды подписки

Доступны три варианта подписки:

```javascript
const subscriptionPeriods = ref([
  { id: 1, label: '3 мес.', value: 3, discount: '-3%', isDefault: false },
  { id: 2, label: '6 мес.', value: 6, discount: '-10%', isDefault: false },
  { id: 3, label: '12 мес.', value: 12, discount: '-20%', isDefault: true }
])
```

- **3 месяца**: скидка 3%
- **6 месяцев**: скидка 10%
- **12 месяцев**: скидка 20% (период по умолчанию)

## Ценообразование

### Базовая стоимость

Базовая стоимость составляет **37 608,44 ₽ за 3 месяца**:

```javascript
// Базовая стоимость за 3 месяца (дефолтный период)
const basePriceFor3Months = ref(37608.44)

// Вычисляем стоимость за месяц на основе базовой цены за 3 месяца
const pricePerMonth = computed(() => {
  return basePriceFor3Months.value / 3
})
```

### Расчёт стоимости

Стоимость рассчитывается по формуле:
```
Итоговая цена = (Цена за месяц × Период × Количество) × (1 - Скидка)
```

#### Примеры расчётов:

**Цена за месяц**: 37 608,44 ÷ 3 = **12 536,15 ₽**

- **3 месяца**: 12 536,15 × 3 = 37 608,44 ₽ (со скидкой 3%)
- **6 месяцев**: 12 536,15 × 6 = 75 216,88 ₽ (со скидкой 10%)
- **12 месяцев**: 12 536,15 × 12 = 150 433,76 ₽ (со скидкой 20%)

### Дополнительная стоимость

Стоимость за докладчика: **23 ₽ в месяц**

```javascript
const pricePerSpeaker = ref(23)
```

## Функциональность

### Выбор периода подписки

#### Интерактивный переключатель периодов

Компонент использует группу кнопок для выбора периода подписки, которая представляет собой визуально объединённый блок с умной системой границ:

```vue
<button v-for="(period, index) in subscriptionPeriods" :key="period.id" 
        @click="selectPeriod(period.value)"
        :class="[
          'flex px-4 justify-center items-center transition-colors duration-200 border font-medium text-sm',
          selectedPeriod === period.value 
            ? 'bg-primary-50/50 text-primary border-primary z-10' 
            : 'bg-background text-foreground hover:bg-muted border-border',
          // Умная система границ для цельного вида
          index < subscriptionPeriods.length - 1 && selectedPeriod !== period.value ? 'border-r-0' : '',
          index > 0 && subscriptionPeriods[index - 1]?.value === selectedPeriod && selectedPeriod !== period.value ? 'border-l-0' : '',
          // Скругления только у крайних элементов
          index === 0 ? 'rounded-l-md' : '',
          index === subscriptionPeriods.length - 1 ? 'rounded-r-md' : ''
        ]">
  <span>{{ period.label }}</span>
  <span class="ml-2 px-1.5 py-0.5 bg-primary text-background text-xs rounded-full">
    {{ period.discount }}
  </span>
</button>
```

#### Как работает переключатель:

**1. Структура данных:**
```javascript
const subscriptionPeriods = ref([
  { id: 1, label: '3 мес.', value: 3, discount: '-3%', isDefault: false },
  { id: 2, label: '6 мес.', value: 6, discount: '-10%', isDefault: false },
  { id: 3, label: '12 мес.', value: 12, discount: '-20%', isDefault: true }
])
```

**2. Логика выбора:**
```javascript
const selectPeriod = (value: number) => {
  selectedPeriod.value = value
}
```

**3. Визуальные состояния:**

- **Активная кнопка:**
  - Фон: `bg-primary-50/50` (полупрозрачный primary)
  - Текст: `text-primary` (акцентный цвет)
  - Граница: `border-primary` (акцентная граница)
  - Z-index: `z-10` (выше соседних элементов)

- **Неактивная кнопка:**
  - Фон: `bg-background` (базовый фон)
  - Текст: `text-foreground` (основной текст)
  - Граница: `border-border` (нейтральная граница)
  - Hover: `hover:bg-muted` (эффект при наведении)

**4. Умная система границ:**

Компонент автоматически управляет границами для создания цельного вида:

- **Убирает правую границу** у кнопок (кроме последней и выбранной)
- **Убирает левую границу** у кнопки после выбранной
- **Скругления** только у крайних элементов (`rounded-l-md`, `rounded-r-md`)

**5. Индикатор скидки:**

Каждая кнопка содержит бейдж со скидкой:
```vue
<span class="ml-2 px-1.5 py-0.5 bg-primary text-background text-xs rounded-full">
  {{ period.discount }}
</span>
```

#### Автоматические действия при выборе:

Когда пользователь выбирает период, автоматически происходит:
- Обновляется выбранный период (`selectedPeriod.value`)
- Пересчитывается итоговая стоимость через `computed` свойства
- Обновляется дата завершения тарифа
- Применяется соответствующая скидка
- Визуально выделяется выбранная кнопка

### Управление корзиной

#### Добавление в корзину
```javascript
const addToCartHandler = () => {
  isAddedToCart.value = true
  addToCart(quantity.value)
}
```

#### Удаление из корзины
```javascript
const removeFromCartHandler = () => {
  isAddedToCart.value = false
  removeFromCart()
}
```

### Управление количеством

Компонент использует `NumberField` для управления количеством товаров:
- Минимальное значение: 1
- Максимальное значение: 10
- Значение по умолчанию: 1

При изменении количества автоматически обновляется корзина:

```javascript
watch(quantity, (newQuantity) => {
  if (isAddedToCart.value) {
    addToCart(newQuantity)
  }
})
```

### Расчёт даты завершения

```javascript
const endDate = computed(() => {
  const today = new Date()
  const endDate = new Date(today)
  endDate.setMonth(endDate.getMonth() + selectedPeriod.value)
  
  const day = endDate.getDate().toString().padStart(2, '0')
  const month = (endDate.getMonth() + 1).toString().padStart(2, '0')
  const year = endDate.getFullYear()
  
  return `${day}.${month}.${year}`
})
```

## Состояния интерфейса

### До добавления в корзину
- Отображается кнопка "Добавить"
- Скрыто поле количества

### После добавления в корзину
- Отображается поле количества (`NumberField`)
- Кнопка "Добавить" заменяется на:
  - Кнопка "В корзину" (переход в корзину)
  - Кнопка удаления (иконка корзины)

## Используемые компоненты

### UI компоненты
- `Dialog` - модальное окно
- `Button` - кнопки
- `NumberField` - поле ввода количества

### Иконки
- `ChevronRight` - стрелка для кнопки "В корзину"
- `Trash2` - иконка удаления

## Стилизация

### Переключатель периодов
- Активная кнопка: `bg-primary-50/50 text-primary border-primary`
- Неактивная кнопка: `bg-background text-foreground hover:bg-muted`
- Скругления только у крайних элементов
- Удаление границ между соседними элементами для цельного вида

### Информационный блок
- Левая граница цвета primary: `border-l-4 border-primary`
- Тень: `shadow-lg shadow-slate-600/15`
- Скругление справа: `rounded-r-md`

### Липкий футер
- Позиция: `sticky bottom-0`
- Верхняя граница: `border-t border-border`
- Z-index: `z-20`

## Интеграция

Компонент использует composable `useCart` для управления глобальным состоянием корзины:

```javascript
import { useCart } from '@/composables/useCart'
const { addToCart, removeFromCart } = useCart()
```

## Адаптивность

Компонент полностью адаптивен:
- На мобильных: одноколонная сетка, меньшие размеры шрифтов
- На десктопе: двухколонная сетка, большие размеры
- Максимальная ширина диалога: `980px`
