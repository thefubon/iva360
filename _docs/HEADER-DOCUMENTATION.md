# Header Component - Документация

Компонент Header является основной навигационной панелью приложения IVA360, включающей в себя логотип, меню навигации, кнопки действий и мобильное меню.

## 📁 Расположение файла
```
app/components/Header.vue
```

## 🏗️ Структура компонента

### Основные элементы
1. **Banner** - Верхняя информационная полоса
2. **Navigation Menu Overlay** - Затемнение фона при открытии меню
3. **Header** - Основная навигационная панель
4. **Mobile Menu** - Полноэкранное мобильное меню

## 🎨 Визуальная структура

```html
<Banner />                          <!-- z-60 -->
<Navigation Menu Overlay />         <!-- z-30 -->
<Header>                           <!-- z-60 -->
  ├── Logo
  ├── Desktop Navigation (Navbar)   <!-- xl:flex -->
  └── Action Buttons
      ├── Search Button
      ├── Shopping Cart (badge: 2)
      ├── Login Button
      ├── Register Button           <!-- hidden md:flex -->
      └── Mobile Menu Trigger       <!-- md:hidden -->
</Header>
<Mobile Menu />                    <!-- z-60 -->
```

## ⚙️ Функциональность

### 1. Responsive дизайн
- **Desktop** (xl+): Полная навигация с Navbar
- **Tablet** (md-xl): Скрытый Navbar, кнопки действий
- **Mobile** (<md): Только основные кнопки + мобильное меню

### 2. Z-Index иерархия
```
Banner (z-60)           - Верхняя полоса
Header (z-60)           - Навигационная панель  
Mobile Menu (z-60)      - Мобильное меню
Navigation Viewport (z-60) - Выпадающие меню
Navigation Overlay (z-30)  - Затемнение фона
Content (z-auto/0)      - Основной контент
```

### 3. Мобильное меню

#### Состояния
- `isMobileMenuOpen` - Меню открыто/закрыто
- `isMenuFullyOpen` - Анимация завершена (показать кнопки)
- `isContentVisible` - Контент видим

#### GSAP анимации
```javascript
// Открытие: выезд сверху вниз
$gsap.set(mobileMenuRef.value, { y: '-100%' })
$gsap.to(mobileMenuRef.value, {
  y: '0%',
  duration: 0.8,
  ease: "power3.out"
})

// Закрытие: уход вверх
$gsap.to(mobileMenuRef.value, {
  y: '-100%',
  duration: 0.3,
  ease: "power2.in"
})
```

### 4. Navigation Menu Overlay

#### Логика работы
```javascript
// Отслеживание состояния навигационного меню
const isNavigationMenuOpen = ref(false)

onMounted(() => {
  const checkMenuState = () => {
    const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]')
    if (viewport) {
      const state = viewport.getAttribute('data-state')
      isNavigationMenuOpen.value = state === 'open'
    }
  }
  
  const interval = setInterval(checkMenuState, 100)
})
```

#### Overlay стили
```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgb(from foreground / 0.4);
  z-index: 30;
  transition: opacity 300ms;
  pointer-events: none; /* Не блокирует взаимодействие */
}
```

## 🔧 Конфигурация

### CSS классы
- **Sticky positioning**: `sticky top-0 z-60`
- **Background**: `bg-background border-b`
- **Layout**: `container flex justify-between items-center h-16`

### Responsive точки
- **xl: (1280px+)**: Показать Navbar
- **md: (768px+)**: Показать кнопку регистрации
- **<md**: Показать мобильный триггер

## 📱 Мобильное меню

### Структура
```html
<div class="fixed inset-0 bg-background z-60">
  <!-- Контент с прокруткой -->
  <div class="flex-1 overflow-y-auto">
    <MobileNavbar :is-visible="isContentVisible" />
  </div>
  
  <!-- Sticky кнопка входа -->
  <div class="sticky bottom-0 bg-background border-t p-4">
    <Button class="w-full">Войти</Button>
  </div>
</div>

<!-- Кнопка закрытия -->
<div class="fixed top-4 right-4 z-70">
  <Button @click="toggleMobileMenu">
    <X class="size-6" />
  </Button>
</div>
```

### Особенности
- **Полноэкранное**: `fixed inset-0`
- **Блокировка скролла**: `document.body.style.overflow = 'hidden'`
- **Анимированные переходы**: Vue Transitions + GSAP
- **Sticky кнопка**: Кнопка входа всегда внизу

## 🎯 Интеграция с другими компонентами

### Banner
- Расположен выше Header
- Содержит актуальную информацию (вебинары)
- `z-index: 60` для отображения поверх overlay

### Navbar
- Вложен в Header для desktop версии
- Содержит Navigation Menu систему
- Скрыт на мобильных устройствах

### MobileNavbar
- Отдельный компонент для мобильной навигации
- Получает prop `is-visible` для управления анимациями
- Содержит упрощенную версию навигации

## 🔄 Lifecycle

### onMounted
1. Настройка отслеживания Navigation Menu состояния
2. Создание interval для проверки viewport состояния

### onUnmounted
1. Очистка `document.body.style.overflow`
2. Удаление interval для Navigation Menu
3. Cleanup GSAP анимаций

## 🐛 Особенности и решения

### Проблема: Overlay перекрывает меню
**Решение**: Вынесение overlay в Header.vue вместо NavigationMenuViewport.vue

### Проблема: Конфликт onUnmounted hooks
**Решение**: Объединение всей cleanup логики в один onUnmounted блок

### Проблема: Z-index конфликты
**Решение**: Четкая иерархия z-index значений (30, 60, 70)

## 📝 Примеры использования

### Базовое использование
```vue
<template>
  <Header />
</template>
```

### Кастомизация через CSS переменные
```css
:root {
  --header-height: 4rem;
  --header-bg: var(--background);
  --overlay-opacity: 0.4;
}
```

## 🔗 Связанные файлы
- `app/components/Banner.vue` - Верхняя информационная полоса
- `app/components/Logo.vue` - Логотип компании
- `app/components/Navbar.vue` - Desktop навигация
- `app/components/MobileNavbar.vue` - Мобильная навигация
- `app/components/ui/button/Button.vue` - Кнопки в header
- `app/plugins/gsap.client.ts` - Конфигурация GSAP
