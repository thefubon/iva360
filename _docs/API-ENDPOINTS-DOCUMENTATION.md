# Документация API Endpoints

Этот документ описывает все доступные API endpoints для получения данных контента в проекте IVA360.

## Структура данных

Все API endpoints возвращают данные в едином формате:

```json
{
  "success": boolean,
  "data": any,
  "timestamp": string,
  "count": number | object
}
```

## Навигационные данные

### 1. Главное меню - `/api/navigation/main-menu`

**GET** запрос возвращает данные для главного меню продуктов.

**Структура ответа:**
```typescript
interface MainMenuItem {
  title: string
  href: string
  description: string
  icon: string
  bannerImage: string
  bannerTitle: string
  bannerDescription: string
}
```

**Пример ответа:**
```json
{
  "success": true,
  "data": [
    {
      "title": "Встречи",
      "href": "#",
      "description": "Стабильная и защищенная коммуникация для вашей команды",
      "icon": "Meetings",
      "bannerImage": "/img/CardImageVideo.png",
      "bannerTitle": "Видеовстречи нового поколения",
      "bannerDescription": "Проводите профессиональные видеоконференции с HD-качеством, записью и интеллектуальными функциями"
    }
  ],
  "timestamp": "2025-01-01T12:00:00.000Z",
  "count": 8
}
```

### 2. Dashboard меню - `/api/navigation/dashboard-menu`

**GET** запрос возвращает данные для навигации в административной панели.

**Структура ответа:**
```typescript
interface DashboardMenuItem {
  title: string
  url: string
  icon: string
  target: boolean
  alert: boolean
  hasSubmenu?: boolean
  submenu?: Array<{
    title: string
    url: string
    target?: boolean
  }>
}
```

**Пример ответа:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "admin": [...],
    "support": [...]
  },
  "timestamp": "2025-01-01T12:00:00.000Z",
  "count": {
    "products": 4,
    "admin": 7,
    "support": 4,
    "total": 15
  }
}
```

## Контентные данные

### 3. Целевая аудитория - `/api/content/target-audience`

**GET** запрос возвращает данные для блока "Кому подходит".

**Структура ответа:**
```typescript
interface TargetAudienceItem {
  title: string
  href: string
  description: string
  image: string
}
```

### 4. Дополнительные возможности - `/api/content/additional-features`

**GET** запрос возвращает данные для блока дополнительных возможностей.

**Структура ответа:**
```typescript
interface AdditionalFeatureItem {
  title: string
  href: string
  description: string
  image: string
}
```

### 5. Почему выбирают IVA360 - `/api/content/why-choose`

**GET** запрос возвращает данные для блока преимуществ платформы.

**Структура ответа:**
```typescript
interface WhyChooseItem {
  title: string
  href: string
  description: string
  image: string
  isReverse: boolean
}
```

### 6. Продукты в приложении - `/api/content/products-in-app`

**GET** запрос возвращает данные для блока описания продуктов.

**Структура ответа:**
```typescript
interface ProductInAppItem {
  title: string
  href: string
  description: string
  titleColor: string
  bgColor: string
  iconBgColor: string
  icon: string
  image: string
}
```

### 7. Сводные данные главной страницы - `/api/pages/home-content`

**GET** запрос возвращает все данные для главной страницы в одном запросе.

**Пример ответа:**
```json
{
  "success": true,
  "data": {
    "targetAudience": [...],
    "additionalFeatures": [...],
    "whyChoose": [...],
    "productsInApp": [...]
  },
  "timestamp": "2025-01-01T12:00:00.000Z",
  "count": {
    "targetAudience": 3,
    "additionalFeatures": 3,
    "whyChoose": 3,
    "productsInApp": 6,
    "total": 15
  }
}
```

## Данные авторизации

### 8. Карусель авторизации - `/api/auth/carousel`

**GET** запрос возвращает данные для слайдера на странице входа.

**Структура ответа:**
```typescript
interface AuthCarouselItem {
  src: string
  alt: string
  title: string
  description: string
}
```

## Использование в компонентах

### Пример использования с $fetch:

```vue
<script setup lang="ts">
import type { MainMenuItem } from '~/content/navigation/main-menu'

// Получаем данные через API
const { data: menuData } = await $fetch<{
  success: boolean
  data: MainMenuItem[]
  timestamp: string
  count: number
}>('/api/navigation/main-menu')

// Реактивные данные
const components = ref<MainMenuItem[]>(menuData?.data || [])
</script>
```

### Пример использования с useFetch:

```vue
<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/navigation/main-menu')
</script>
```

## Обработка ошибок

Все endpoints возвращают стандартизированные ошибки с HTTP статус-кодами:

- **200** - Успешный запрос
- **500** - Внутренняя ошибка сервера

При ошибке возвращается объект:
```json
{
  "statusCode": 500,
  "statusMessage": "Ошибка при получении данных"
}
```

## Файлы данных

Все данные хранятся в структурированном виде в папке `/app/content/`:

- **navigation/** - данные навигационных меню
  - `main-menu.ts` - главное меню сайта
  - `dashboard-menu.ts` - меню административной панели

- **pages/** - данные страниц
  - `home-page.ts` - все данные главной страницы

- **auth/** - данные авторизации
  - `auth-carousel.ts` - слайдер на странице входа

Эта структура обеспечивает:
- ✅ Централизованное управление контентом
- ✅ Типизированные интерфейсы
- ✅ REST API для получения данных
- ✅ Совместимость с Nuxt 4
- ✅ Легкое масштабирование и поддержку
