# Navigation Menu System - Документация

Система навигационного меню IVA360 построена на базе Reka UI и обеспечивает создание выпадающих меню с богатым контентом, анимациями и правильной доступностью.

## 📁 Структура файлов

```
app/components/ui/navigation-menu/
├── index.ts                           # Экспорты всех компонентов
├── NavigationMenu.vue                 # Корневой контейнер меню
├── NavigationMenuContent.vue          # Контент выпадающего меню
├── NavigationMenuItem.vue             # Элемент меню
├── NavigationMenuList.vue             # Список элементов меню
├── NavigationMenuLink.vue             # Ссылка в меню
├── NavigationMenuTrigger.vue          # Триггер (кнопка) меню
├── NavigationMenuViewport.vue         # Viewport для выпадающего контента
└── NavigationMenuIndicator.vue        # Индикатор активного элемента
```

## 🏗️ Архитектура системы

### Иерархия компонентов
```
NavigationMenu (Root)
├── NavigationMenuList
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger ("Продукты")
│   │   └── NavigationMenuContent
│   │       └── [Контент с продуктами]
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger ("Отрасли")  
│   │   └── NavigationMenuContent
│   │       └── [Контент с отраслями]
│   └── NavigationMenuItem
│       └── NavigationMenuLink ("Новости", "Вебинары", "Тарифы")
└── NavigationMenuViewport (Автоматически)
```

## 📋 Описание компонентов

### 1. NavigationMenu.vue
**Назначение**: Корневой контейнер всей навигационной системы

**Расположение**: `app/components/ui/navigation-menu/NavigationMenu.vue`

**Основные функции**:
- Инициализация Reka UI NavigationMenuRoot
- Управление группой навигации (`group/navigation-menu`)
- Автоматическое создание NavigationMenuViewport

**Структура**:
```vue
<NavigationMenuRoot 
  data-slot="navigation-menu"
  :data-viewport="viewport"
  class="group/navigation-menu flex w-full flex-1 items-center justify-center"
>
  <slot />
  <NavigationMenuViewport v-if="viewport" />
</NavigationMenuRoot>
```

**Props**:
- `viewport?: boolean` (default: true) - Создавать ли viewport

### 2. NavigationMenuList.vue  
**Назначение**: Контейнер для списка элементов навигации

**Структура**:
```vue
<NavigationMenuList class="group flex flex-1 list-none items-center justify-center space-x-1">
  <slot />
</NavigationMenuList>
```

### 3. NavigationMenuItem.vue
**Назначение**: Отдельный элемент навигации (может содержать триггер + контент или просто ссылку)

**Структура**:
```vue
<NavigationMenuItem class="relative">
  <slot />
</NavigationMenuItem>
```

### 4. NavigationMenuTrigger.vue
**Назначение**: Кнопка, которая открывает выпадающее меню

**Основные функции**:
- Обработка hover/click событий
- Индикация состояния (открыто/закрыто)
- Иконка стрелки с анимацией поворота

**Структура**:
```vue
<NavigationMenuTrigger class="group inline-flex items-center justify-center">
  <slot />
  <ChevronDown class="relative top-[1px] ml-1 size-3 transition duration-300 
                      group-data-[state=open]:rotate-180" />
</NavigationMenuTrigger>
```

### 5. NavigationMenuContent.vue
**Назначение**: Контейнер для контента выпадающего меню

**Основные функции**:
- Анимации появления/исчезновения
- Позиционирование относительно триггера
- Поддержка различных направлений анимации

**Структура**:
```vue
<NavigationMenuContent class="data-[motion^=from-]:animate-in 
                              data-[motion^=to-]:animate-out
                              data-[motion^=from-]:fade-in 
                              data-[motion^=to-]:fade-out">
  <slot />
</NavigationMenuContent>
```

### 6. NavigationMenuViewport.vue ⭐
**Назначение**: Главный viewport для отображения всех выпадающих меню

**Расположение**: `app/components/ui/navigation-menu/NavigationMenuViewport.vue`

**Основные функции**:
- Единое место отображения всех выпадающих меню
- Анимации fade-in/fade-out
- Позиционирование на полную ширину Header

**Структура**:
```vue
<div class="absolute top-full inset-x-0 isolate z-60">
  <NavigationMenuViewport 
    class="peer origin-top bg-popover text-popover-foreground 
           data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=open]:mt-px relative mt-5 
           h-[var(--reka-navigation-menu-viewport-height)] 
           w-full overflow-hidden rounded-b-xl 
           shadow-xl shadow-slate-600/20 duration-200"
  />
</div>
```

**Ключевые особенности**:
- `absolute top-full inset-x-0` - Позиционирование под Header на всю ширину
- `z-60` - Поверх overlay (z-30) но на уровне Header
- `rounded-b-xl` - Скругление только снизу
- `mt-px` - Минимальный отступ для плавного соединения с Header

### 7. NavigationMenuLink.vue
**Назначение**: Обычная ссылка в навигации (без выпадающего контента)

**Структура**:
```vue
<NavigationMenuLink class="block select-none space-y-1 rounded-md p-3">
  <slot />
</NavigationMenuLink>
```

## 🎨 Стилизация и анимации

### CSS переменные
```css
--reka-navigation-menu-viewport-height: auto; /* Высота viewport */
```

### Анимации
- **Fade-in/out**: `data-[state=open]:animate-in data-[state=closed]:animate-out`
- **Directional motion**: `data-[motion=from-start]:slide-in-from-left-52`
- **Viewport animations**: Автоматические переходы высоты

### Состояния
- `data-state="open"` - Меню открыто
- `data-state="closed"` - Меню закрыто
- `data-motion="from-start"` - Направление анимации

## 📝 Использование в проекте

### В Navbar.vue
```vue
<NavigationMenu>
  <NavigationMenuList>
    <!-- Выпадающий элемент "Продукты" -->
    <NavigationMenuItem>
      <NavigationMenuTrigger>Продукты</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div class="container">
          <ul class="grid w-full gap-4 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="component in components" :key="component.title">
              <NavigationMenuLink as-child>
                <a :href="component.href">
                  <div class="flex gap-x-4">
                    <component :is="iconComponents[component.icon]" />
                    <div>
                      <div class="font-medium">{{ component.title }}</div>
                      <p class="text-muted-foreground">{{ component.description }}</p>
                    </div>
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <!-- Обычные ссылки -->
    <NavigationMenuItem>
      <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
        Новости и статьи
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## 🔧 Конфигурация

### Index.ts экспорты
```typescript
export {
  NavigationMenu,
  NavigationMenuContent,  
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from './navigation-menu'
```

### Utility функции
```typescript
const navigationMenuTriggerStyle = () =>
  cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")
```

## 🎯 Контент структуры

### Продукты (4x2 сетка)
```typescript
const components = [
  {
    title: "IVA360 Встречи",
    href: "#",
    description: "Стабильная и защищенная коммуникация для вашей команды.",
    icon: "Meetings"
  },
  // ... 7 других продуктов
]
```

### Отрасли (Баннер + список)
```html
<ul class="grid w-full gap-3 py-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
  <li class="row-span-3">
    <!-- Баннер с изображением -->
  </li>
  <li>
    <!-- Малому и среднему бизнесу -->
  </li>
  <!-- ... другие отрасли -->
</ul>
```

## 🔄 Lifecycle и состояния

### Состояния меню
1. **Closed** (по умолчанию) - `data-state="closed"`
2. **Opening** - Переходное состояние
3. **Open** - `data-state="open"`, контент виден
4. **Closing** - Переходное состояние

### События
- **hover** - Открытие меню при наведении
- **focus** - Поддержка клавиатурной навигации
- **click** - Альтернативное открытие
- **escape** - Закрытие меню

## 🐛 Решенные проблемы

### 1. Ширина viewport
**Проблема**: Меню ограничивалось шириной Navbar контейнера  
**Решение**: 
- Viewport: `absolute top-full inset-x-0` - на всю ширину
- Контент: `<div class="container">` - центрирование внутри

### 2. Z-index конфликты
**Проблема**: Overlay перекрывал само меню  
**Решение**: Четкая иерархия z-index:
- Navigation: `z-60`
- Overlay: `z-30`

### 3. Скругление углов
**Проблема**: Меню не соединялось плавно с Header  
**Решение**: 
- `rounded-b-xl` - скругление только снизу
- `mt-px` - минимальный отступ

## 🔗 Зависимости

### Внешние библиотеки
- **Reka UI** (`reka-ui`) - Базовая функциональность навигации
- **@vueuse/core** - Утилиты для реактивности
- **Lucide Vue Next** - Иконки (ChevronDown)

### Внутренние утилиты
- **cn utility** (`@/lib/utils`) - Объединение CSS классов
- **Custom icons** - Иконки продуктов (`@/components/icons/`)

## 📱 Адаптивность

### Breakpoints
- **xl+ (1280px)**: Полное меню видимо
- **<xl**: Меню скрыто, показывается мобильная версия

### Responsive сетки
- **Продукты**: `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Отрасли**: `md:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]`

## 💡 Лучшие практики

### Доступность
- Все элементы имеют правильные ARIA атрибуты
- Поддержка клавиатурной навигации
- Семантически корректная HTML структура

### Производительность  
- Ленивая загрузка контента
- Эффективные CSS анимации
- Минимальное количество DOM элементов

### Поддерживаемость
- Четкое разделение ответственности между компонентами
- Переиспользуемые утилиты стилизации
- Документированные props и события
