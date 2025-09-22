# Документация по навигации сайдбара

## Обзор

Система навигации сайдбара представляет собой многоуровневую, гибкую навигационную структуру для дашборда приложения IVA360. Она поддерживает обычные элементы меню, элементы с подменю, внешние ссылки и систему уведомлений.

## Расположение файлов

- **Основной компонент**: `app/components/dashboard/SidebarNav.vue`
- **UI компоненты**: `app/components/ui/sidebar/`
- **Иконки**: `app/components/icons/sidebar/`

## Структура данных

### Базовая структура элемента меню

```typescript
interface MenuItem {
  title: string;           // Название пункта меню
  url: string;            // URL для навигации
  icon: Component;        // Vue компонент иконки
  target: boolean;        // Открывать в новой вкладке (true/false)
  alert: boolean;         // Показывать индикатор уведомлений (true/false)
  hasSubmenu?: boolean;   // Есть ли подменю (опционально)
  submenu?: SubMenuItem[]; // Массив элементов подменю (опционально)
}

interface SubMenuItem {
  title: string;          // Название подпункта
  url: string;           // URL для навигации
}
```

## Основные секции меню

Навигация разделена на три основные секции:

### 1. Секция "items" - Основные инструменты
```javascript
const items = [
  {
    title: "Встречи",
    url: "#",
    icon: Meetings,
    target: false,
    alert: false,
  },
  {
    title: "Мессенджер", 
    url: "https://meet.iva360.ru",
    icon: Messenger,
    target: true,    // Открывается в новой вкладке
    alert: false,
  },
  {
    title: "Диск и Документы",
    url: "#",
    icon: Disc,
    target: false,
    alert: false,
    hasSubmenu: true,   // Имеет подменю
    submenu: [
      { title: "Все файлы", url: "#/disk/all" },
      { title: "Мои файлы", url: "#/disk/my" },
      { title: "Есть доступ", url: "#/disk/shared" },
      { title: "Избранное", url: "#/disk/favorites" },
      { title: "Корзина", url: "#/disk/trash" },
    ]
  },
];
```

### 2. Секция "items2" - Административные функции
```javascript
const items2 = [
  {
    title: "Дашборд",
    url: "/dashboard",
    icon: LayoutPanelLeft,
    target: false,
    alert: false,
  },
  {
    title: "Пользователи",
    url: "#",
    icon: Users,
    target: false,
    alert: true,    // Показывается индикатор уведомлений
  },
  // ... другие элементы
];
```

### 3. Секция "items3" - Справка и поддержка
```javascript
const items3 = [
  {
    title: "База знаний",
    url: "https://help.iva360.ru",
    icon: BookMarked,
    target: true,    // Внешняя ссылка
    alert: false,
  },
  // ... другие элементы
];
```

## Функциональные возможности

### 1. Обычная навигация
- Клик по элементу без `hasSubmenu` = переход по ссылке
- Поддержка внутренних (`/dashboard`) и внешних (`https://...`) ссылок

### 2. Внешние ссылки (`target: true`)
- Автоматически добавляется `target="_blank"`
- Отображается иконка `ArrowUpRight` справа от названия
- Ссылка открывается в новой вкладке

### 3. Подменю (`hasSubmenu: true`)
- Отображается иконка `ChevronDown` справа от названия
- Клик раскрывает/скрывает подменю
- Стрелка поворачивается на 180° при раскрытии
- Плавная анимация появления/скрытия

### 4. Система уведомлений (`alert: true`)
- Показывается анимированный индикатор в правом верхнем углу
- Двойная анимация: пульсирующий и статичный круг
- Цвет: основной цвет темы (`bg-primary`)
- Настраиваемая скорость анимации

## Настройка и конфигурация

### Скорость анимации уведомлений
```javascript
// В app/components/dashboard/SidebarNav.vue
const alertAnimationDuration = 1.2 // секунды
```

### Управление состоянием подменю
```javascript
// Реактивное состояние для всех подменю
const submenuStates = ref<Record<string, boolean>>({})

// Функция переключения
const toggleSubmenu = (itemTitle: string) => {
  submenuStates.value[itemTitle] = !submenuStates.value[itemTitle]
}
```

## Как добавить новые элементы

### 1. Обычный элемент меню

```javascript
// Добавить в нужную секцию (items, items2, или items3)
{
  title: "Новый пункт",
  url: "/new-page",
  icon: NewIcon,        // Импортировать из lucide-vue-next
  target: false,
  alert: false,
}
```

### 2. Внешняя ссылка

```javascript
{
  title: "Внешний сервис",
  url: "https://external-service.com",
  icon: ExternalIcon,
  target: true,         // Откроется в новой вкладке
  alert: false,
}
```

### 3. Элемент с подменю

```javascript
{
  title: "Раздел с подразделами",
  url: "#",
  icon: SectionIcon,
  target: false,
  alert: false,
  hasSubmenu: true,     // Активировать подменю
  submenu: [
    { title: "Подраздел 1", url: "/subsection-1" },
    { title: "Подраздел 2", url: "/subsection-2" },
    { title: "Подраздел 3", url: "/subsection-3" },
  ]
}
```

### 4. Элемент с уведомлениями

```javascript
{
  title: "Раздел с уведомлениями",
  url: "/notifications",
  icon: NotificationIcon,
  target: false,
  alert: true,          // Показать индикатор
}
```

## Стилизация

### CSS классы для элементов
- `!h-9` - высота элементов меню
- `px-2` - горизонтальные отступы
- `hover:bg-muted` - фон при наведении
- `bg-muted` - фон активного элемента
- `font-medium` - жирность шрифта для основной секции

### Иконки
- Основная секция: `!size-6` (24px)
- Остальные секции: `!size-6 stroke-[1.5]` (24px с тонкой обводкой)
- Стрелки: `!size-4` (16px)
- Индикаторы уведомлений: `size-2` (8px)

### Анимации
- Поворот стрелки: `transition-transform duration-200`
- Уведомления: кастомная анимация `smooth-ping`

## Кастомная анимация уведомлений

```css
@keyframes smooth-ping {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  20% {
    transform: scale(1.05);
    opacity: 0.2;
  }
  70% {
    transform: scale(1.4);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.animate-smooth-ping {
  animation: smooth-ping 1.5s cubic-bezier(0.3, 0, 0.6, 1) infinite;
}
```

## Используемые библиотеки и компоненты

### Shadcn/ui компоненты
- `SidebarGroup` - группа элементов
- `SidebarGroupContent` - контент группы
- `SidebarMenu` - контейнер меню
- `SidebarMenuItem` - элемент меню
- `SidebarMenuButton` - кнопка элемента
- `SidebarMenuSub` - контейнер подменю
- `SidebarMenuSubItem` - элемент подменю
- `SidebarMenuSubButton` - кнопка элемента подменю

### Lucide иконки
- `ArrowUpRight` - для внешних ссылок
- `ChevronDown` - для раскрывающихся подменю
- Различные иконки для элементов меню

### Nuxt компоненты
- `NuxtLink` - для навигации

## Примеры использования

### Полный пример с различными типами элементов

```javascript
const exampleItems = [
  // Обычный элемент
  {
    title: "Главная",
    url: "/dashboard",
    icon: Home,
    target: false,
    alert: false,
  },
  
  // Внешняя ссылка с уведомлением
  {
    title: "Внешний сервис",
    url: "https://external.com",
    icon: ExternalLink,
    target: true,
    alert: true,
  },
  
  // Элемент с подменю
  {
    title: "Управление",
    url: "#",
    icon: Settings,
    target: false,
    alert: false,
    hasSubmenu: true,
    submenu: [
      { title: "Пользователи", url: "/manage/users" },
      { title: "Роли", url: "/manage/roles" },
      { title: "Настройки", url: "/manage/settings" },
    ]
  }
];
```

## Рекомендации по разработке

1. **Иконки**: Используйте иконки из библиотеки Lucide Icons для консистентности
2. **URL**: Для внутренних ссылок используйте относительные пути, для внешних - полные URL
3. **Названия**: Делайте названия пунктов меню краткими и понятными
4. **Подменю**: Не делайте подменю слишком длинными (рекомендуется до 7 элементов)
5. **Уведомления**: Используйте `alert: true` только для действительно важных уведомлений

## Troubleshooting

### Проблема: Подменю не раскрывается
**Решение**: Убедитесь, что у элемента есть `hasSubmenu: true` и массив `submenu`

### Проблема: Иконка не отображается
**Решение**: Проверьте импорт иконки из `lucide-vue-next`

### Проблема: Ошибки TypeScript
**Решение**: Используйте приведение типов `(item as any).hasSubmenu` для элементов без подменю

### Проблема: Анимация уведомлений слишком быстрая/медленная
**Решение**: Измените значение `alertAnimationDuration` в секундах

## Заключение

Система навигации сайдбара обеспечивает гибкую и расширяемую структуру для навигации в дашборде. Она поддерживает все необходимые функции: обычную навигацию, внешние ссылки, многоуровневые подменю и систему уведомлений с анимацией.
