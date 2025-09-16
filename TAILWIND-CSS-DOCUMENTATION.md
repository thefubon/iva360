# Tailwind CSS Configuration - Документация

Полное описание кастомизации Tailwind CSS в проекте IVA360, включая цветовую систему, типографику, анимации и утилиты.

## 📁 Структура CSS файлов

```
app/assets/css/
├── tailwind.css      # Основная конфигурация Tailwind
└── fonts.css         # Определения кастомного шрифта GuarujaNeue
```

## 📋 Основные импорты

### 1. Базовые импорты
```css
@import "tailwindcss";          # Основной Tailwind CSS 4
@import "tw-animate-css";       # Дополнительные анимации
@import "./fonts.css";          # Кастомные шрифты GuarujaNeue
```

### 2. Кастомный вариант для темной темы
```css
@custom-variant dark (&:is(.dark *));
```
**Назначение**: Создает более специфичный селектор для темной темы, обеспечивающий правильное переопределение стилей.

## 🎨 Цветовая система

### Система именования цветов
Проект использует **семантическую** систему именования цветов вместо прямых значений. Это обеспечивает:
- Легкое переключение между светлой/темной темой
- Консистентность интерфейса
- Простоту кастомизации

### Основные цвета

#### 1. **Background & Foreground** (Фон и основной текст)
```css
/* Light Theme */
--background: oklch(1 0 0);                    /* Чистый белый */
--foreground: oklch(0.141 0.005 285.823);     /* Темно-серый */

/* Dark Theme */
--background: oklch(0.141 0.005 285.823);     /* Темно-серый */
--foreground: oklch(0.985 0 0);               /* Почти белый */
```

#### 2. **Primary** (Основной цвет бренда)
```css
/* Light Theme */
--primary: oklab(67.388% -0.13064 0.02123);   /* Бирюзовый IVA360 */
--primary-foreground: oklch(0.985 0 0);       /* Белый текст на primary */

/* Dark Theme */
--primary: oklch(0.985 0 0);                  /* Белый в темной теме */
--primary-foreground: oklab(67.388% -0.13064 0.02123); /* Бирюзовый текст */
```

#### 3. **Secondary** (Вторичные элементы)
```css
/* Light Theme */
--secondary: oklch(96.8% 0.007 247.896);      /* Светло-серый */
--secondary-foreground: oklch(0.21 0.006 285.885); /* Темный текст */
```

#### 4. **Card & Popover** (Карточки и всплывающие элементы)
```css
--card: var(--background);                    /* Совпадает с фоном */
--card-foreground: var(--foreground);         /* Совпадает с основным текстом */

--popover: var(--background);                 /* Фон popup'ов */
--popover-foreground: var(--foreground);      /* Текст в popup'ах */
```

### Расширенная палитра Primary цвета

#### Полный спектр (50-950)
```css
--primary-50:  oklab(95.795% -0.02495 -0.00067);  /* Очень светлый */
--primary-100: oklab(89.806% -0.05976 0.00093);   /* Светлый */
--primary-200: oklab(83.601% -0.09557 0.00489);   /* ... */
--primary-300: oklab(78.019% -0.12307 0.01195);
--primary-400: oklab(73.198% -0.13797 0.02245);
--primary-500: oklab(67.388% -0.13064 0.02123);   /* Основной цвет */
--primary-600: oklab(62.779% -0.12232 0.02131);
--primary-700: oklab(57.210% -0.11193 0.02057);
--primary-800: oklab(51.53% -0.10077 0.01841);
--primary-900: oklab(42.212% -0.08266 0.01535);
--primary-950: oklab(32.061% -0.06176 0.00911);   /* Очень темный */
```

**Использование**: 
- `primary-500` - основной бренд цвет
- `primary-50-200` - светлые акценты
- `primary-700-950` - темные элементы

### Статусные цвета

#### 1. **Destructive** (Ошибки, удаление)
```css
/* Light Theme */
--destructive: oklch(0.577 0.245 27.325);         /* Красный */
--destructive-foreground: oklch(0.577 0.245 27.325);

/* Dark Theme */  
--destructive: oklch(0.396 0.141 25.723);         /* Темнее красный */
--destructive-foreground: oklch(0.637 0.237 25.331);
```

#### 2. **Muted** (Приглушенные элементы)
```css
/* Light Theme */
--muted: oklch(0.967 0.001 286.375);              /* Очень светло-серый */
--muted-foreground: oklch(0.552 0.016 285.938);   /* Серый текст */
```

#### 3. **Accent** (Акцентные элементы)
```css
--accent: oklch(0.967 0.001 286.375);             /* Совпадает с muted */
--accent-foreground: oklch(0.21 0.006 285.885);   /* Темный текст на accent */
```

### Служебные цвета

#### Border, Input, Ring
```css
/* Light Theme */
--border: oklch(92.9% 0.013 255.508);             /* Светлые границы */
--input: oklch(0.92 0.004 286.32);                /* Фон полей ввода */
--ring: oklch(0.705 0.015 286.067);               /* Focus ring */

/* Dark Theme */
--border: oklch(0.274 0.006 286.033);             /* Темные границы */
--input: oklch(0.274 0.006 286.033);              /* Темный фон полей */
--ring: oklch(0.442 0.017 285.786);               /* Темный focus ring */
```

### Графики и Chart цвета

#### 5 цветов для графиков
```css
/* Light Theme */
--chart-1: oklch(0.646 0.222 41.116);             /* Оранжевый */
--chart-2: oklch(0.6 0.118 184.704);              /* Голубой */
--chart-3: oklch(0.398 0.07 227.392);             /* Синий */
--chart-4: oklch(0.828 0.189 84.429);             /* Желто-зеленый */
--chart-5: oklch(0.769 0.188 70.08);              /* Зеленый */

/* Dark Theme */
--chart-1: oklch(0.488 0.243 264.376);            /* Фиолетовый */
--chart-2: oklch(0.696 0.17 162.48);              /* Бирюзовый */
--chart-3: oklch(0.769 0.188 70.08);              /* Зеленый */
--chart-4: oklch(0.627 0.265 303.9);              /* Розовый */
--chart-5: oklch(0.645 0.246 16.439);             /* Оранжевый */
```

### Sidebar цвета

#### Специальные цвета для боковой панели
```css
--sidebar: oklch(1 0 0);                          /* Фон sidebar */
--sidebar-foreground: oklch(0.141 0.005 285.823); /* Текст sidebar */
--sidebar-primary: oklch(0.21 0.006 285.885);     /* Основной цвет sidebar */
--sidebar-accent: oklch(0.967 0.001 286.375);     /* Акцент sidebar */
--sidebar-border: oklch(0.92 0.004 286.32);       /* Границы sidebar */
--sidebar-ring: oklch(0.705 0.015 286.067);       /* Focus ring sidebar */
```

## 📐 Система размеров

### Border Radius
```css
--radius: 0.625rem;                               /* Базовый радиус (10px) */

/* Производные значения */
--radius-sm: calc(var(--radius) - 4px);          /* 6px */
--radius-md: calc(var(--radius) - 2px);          /* 8px */
--radius-lg: var(--radius);                      /* 10px */
--radius-xl: calc(var(--radius) + 4px);          /* 14px */
```

**Использование в Tailwind**:
- `rounded-sm` → `--radius-sm`
- `rounded-md` → `--radius-md`
- `rounded-lg` → `--radius-lg`
- `rounded-xl` → `--radius-xl`

## 🎭 Анимации

### Accordion анимации
```css
/* Определение анимаций для accordion */
--animate-accordion-down: accordion-down 0.2s ease-out;
--animate-accordion-up: accordion-up 0.2s ease-out;

@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--reka-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--reka-accordion-content-height); }
  to { height: 0; }
}
```

**Назначение**: Плавное раскрытие/закрытие accordion компонентов с динамической высотой.

## 🔤 Типографическая система

### Основной принцип
- **Заголовки (h1-h6)**: GuarujaNeue (кастомный шрифт)
- **Остальной текст**: Inter (system fonts fallback)

### Конфигурация заголовков

#### H1 - Главные заголовки
```css
h1 {
  @apply text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-[110%];
  font-family: 'GuarujaNeue', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans";
  font-weight: 600 !important;
}
```
**Responsive размеры**:
- Mobile: `3xl` (30px)
- Large: `4xl` (36px) 
- XL: `5xl` (48px)
- 2XL: `6xl` (60px)

#### H2 - Вторичные заголовки
```css
h2 {
  @apply text-3xl lg:text-4xl xl:text-5xl leading-[110%];
  font-family: 'GuarujaNeue', ...;
  font-weight: 500 !important;
}
```

#### H3 - Третичные заголовки
```css
h3 {
  @apply text-3xl lg:text-4xl leading-[120%];
  font-family: 'GuarujaNeue', ...;
  font-weight: 500 !important;
}
```

#### H4, H5, H6 - Малые заголовки
```css
h4, h5, h6 {
  font-family: 'GuarujaNeue', ...;
  font-weight: 500 !important;
}
```

### Параграфы
```css
p {
  @apply !leading-[150%];                         /* Увеличенный межстрочный интервал */
}
```

## 🔧 Утилиты и базовые стили

### Базовые стили элементов
```css
@layer base {
  * {
    @apply border-border outline-ring/50;         /* Единообразные границы и outline */
  }
  
  body {
    @apply bg-background text-foreground antialiased flex flex-col overflow-x-clip;
  }
}
```

**Объяснение**:
- `border-border` - все границы используют semantic цвет
- `outline-ring/50` - focus outline с 50% прозрачностью
- `antialiased` - сглаживание шрифтов
- `flex flex-col` - body как flex контейнер
- `overflow-x-clip` - скрытие горизонтального скролла

### Кастомная утилита Container
```css
@utility container {
  @apply mx-auto px-4;
}
```

**Отличие от стандартного container**:
- Добавляет `px-4` отступы по умолчанию
- Центрирует контент через `mx-auto`

## 📱 Адаптивная типографика

### Система размеров
```
Mobile    Large     XL        2XL
text-3xl  text-4xl  text-5xl  text-6xl
30px      36px      48px      60px
```

### Межстрочные интервалы
- **Заголовки**: `110%` (плотно) / `120%` (h3)
- **Параграфы**: `150%` (читабельно)

## 🎨 Использование OKLCH цветового пространства

### Преимущества OKLCH
1. **Перцептуальная равномерность** - одинаковые изменения значений дают одинаковые визуальные изменения
2. **Лучшая интерполяция** - плавные переходы между цветами
3. **Широкая цветовая гамма** - поддержка современных дисплеев
4. **Предсказуемая яркость** - L (lightness) интуитивно понятна

### Структура OKLCH
```
oklch(L C H)
L - Lightness (0-1)     - Яркость
C - Chroma (0-0.4+)     - Насыщенность  
H - Hue (0-360)         - Оттенок
```

**Пример**: `oklch(0.705 0.015 286.067)`
- `0.705` - 70.5% яркости
- `0.015` - Низкая насыщенность (серый)
- `286.067` - Фиолетово-синий оттенок

## 🛠️ Интеграция с компонентами

### Shadcn/ui компоненты
Все компоненты используют семантические цвета:
```css
.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
}
```

### Кастомные компоненты
```css
.navigation-menu {
  background: var(--popover);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
```

## 📋 Практические примеры

### Создание темной кнопки
```html
<button class="bg-primary text-primary-foreground hover:bg-primary/90">
  Кнопка
</button>
```

### Карточка с границей
```html
<div class="bg-card text-card-foreground border border-border rounded-lg p-4">
  Контент карточки
</div>
```

### Адаптивный заголовок
```html
<h1>Заголовок</h1>
<!-- Автоматически: text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl -->
```

## 🔧 Кастомизация и расширение

### Добавление новых цветов
1. Добавить CSS переменную в `:root` и `.dark`
2. Добавить в `@theme inline` для Tailwind
3. Использовать как `bg-new-color`

### Создание новых утилит
```css
@utility my-utility {
  @apply flex items-center space-x-2;
}
```

### Переопределение базовых стилей
```css
@layer base {
  button {
    @apply rounded-md transition-colors;
  }
}
```

## 🎯 Лучшие практики

### Цвета
- ✅ Используйте семантические названия (`primary`, `muted`)
- ❌ Избегайте прямых цветов (`red-500`, `blue-200`)
- ✅ Тестируйте в обеих темах
- ✅ Используйте `/50` для прозрачности

### Типографика
- ✅ Заголовки только GuarujaNeue
- ✅ Проверяйте читабельность на мобильных
- ✅ Используйте семантические теги (h1, h2, p)

### Анимации
- ✅ Используйте встроенные transition утилиты
- ✅ Соблюдайте accessibility (prefers-reduced-motion)
- ✅ Короткие длительности (200-300ms)

## 🔗 Связанные файлы

- `app/assets/css/fonts.css` - Определения GuarujaNeue шрифта
- `nuxt.config.ts` - Подключение Tailwind CSS
- `app/components/ui/` - Компоненты использующие цветовую систему
- `tailwind.config.js` - Дополнительная конфигурация (если есть)
