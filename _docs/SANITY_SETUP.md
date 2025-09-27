# Настройка Sanity CMS для IVA360

## Требования

- **Node.js**: версия >=20.19 <22 || >=22.12 (рекомендуется)
- **pnpm**: для управления пакетами

## Установка

Все необходимые зависимости уже установлены:
- `@sanity/client` - клиент для работы с Sanity API
- `sanity` - Sanity Studio
- `@sanity/vision` - инструмент для тестирования запросов
- `next-sanity` - утилиты для работы с Sanity
- `@portabletext/types` - типы для Portable Text

## Настройка проекта Sanity

1. **Проект уже настроен с данными:**
   - **Project ID**: `---`
   - **Dataset**: `production`
   - **Token**: встроен в конфигурацию

2. **Создайте новый проект:**
   ```bash
   pnpm sanity:dev
   ```
   При первом запуске система предложит создать новый проект.

3. **Данные конфигурации встроены в `nuxt.config.ts`**

## Структура проекта

### Конфигурация
- `sanity.config.ts` - основная конфигурация Sanity Studio
- `nuxt.config.ts` - обновлен для работы с Sanity

### Схемы данных
- `sanity/schemas/page.ts` - схема для страниц
- `sanity/schemas/post.ts` - схема для статей/постов
- `sanity/schemas/author.ts` - схема для авторов
- `sanity/schemas/blockContent.ts` - схема для богатого текста

### Компоненты и утилиты
- `app/plugins/sanity.client.ts` - плагин Nuxt для Sanity клиента
- `app/composables/useSanity.ts` - композабл для работы с Sanity
- `app/components/SanityPortableText.vue` - компонент для отображения Portable Text
- `app/pages/cms-demo.vue` - демо страница

## Команды

```bash
# Запустить Sanity Studio в режиме разработки
npx sanity dev --port 3335

# Собрать Sanity Studio для продакшена
pnpm sanity:build

# Развернуть Sanity Studio
pnpm sanity:deploy

# Запустить Nuxt приложение
pnpm dev
```

## Использование

### В компонентах Vue

```vue
<script setup>
const { getPages, getPosts, urlFor } = useSanity()

// Получить все страницы
const { data: pages } = await useLazyAsyncData('pages', () => getPages())

// Получить страницу по слагу
const { data: page } = await useLazyAsyncData('page', () => getPageBySlug('home'))

// Получить все посты
const { data: posts } = await useLazyAsyncData('posts', () => getPosts())
</script>

<template>
  <div>
    <!-- Отображение страниц -->
    <div v-for="page in pages" :key="page._id">
      <h2>{{ page.title }}</h2>
      <SanityPortableText :content="page.body" />
    </div>

    <!-- Отображение изображений -->
    <img :src="urlFor(post.mainImage)" :alt="post.title" />
  </div>
</template>
```

### В серверных API

```typescript
// server/api/pages.get.ts
export default defineEventHandler(async (event) => {
  const { getPages } = useSanity()
  return await getPages()
})
```

## Типы данных

Все основные типы данных уже определены в `useSanity.ts`:
- `Page` - страницы сайта
- `Post` - статьи/посты
- `Author` - авторы
- `SanityImage` - изображения

## Демо и Live Preview

### Доступные страницы:
- **Sanity Studio**: http://localhost:3333 - редактирование контента с live preview
- **Главная**: http://localhost:3000/home - главная страница сайта
- **Блог**: http://localhost:3000/blog - список всех постов
- **Админка**: http://localhost:3000/admin - панель управления
- **Демо CMS**: http://localhost:3000/cms-demo - демонстрация функций
- **Предпросмотр**: http://localhost:3000/preview - просмотр черновиков
- **Тест соединения**: http://localhost:3000/sanity-test - диагностика

### URL структура:
- Страницы: `/{slug}` (например `/about`, `/contacts`)
- Посты блога: `/blog/{slug}` (например `/blog/privet-mir`)

### Live Preview в Studio:
1. Откройте Sanity Studio (http://localhost:3333)
2. Перейдите в раздел "Посты" или "Страницы"
3. Создайте документ и добавьте слаг
4. Переключитесь на вкладку "Предпросмотр"
5. Видите live preview прямо в Studio!

## Дополнительные возможности

### GROQ запросы
Используйте язык запросов GROQ для более сложных выборок:

```typescript
const customQuery = `*[_type == "post" && publishedAt > $date] | order(publishedAt desc) {
  title,
  slug,
  author->{name, image}
}`

const { client } = useSanity()
const posts = await client.fetch(customQuery, { date: '2024-01-01' })
```

### Предпросмотр в реальном времени
Для включения предпросмотра добавьте токен с правами чтения в конфигурацию.

### Кеширование
Включен автоматический CDN кеш для продакшена через `useCdn: true`.

## Безопасность

- Токен Sanity хранится в серверных переменных окружения
- Публичные настройки (projectId, dataset) доступны на клиенте
- Для записи данных используйте серверные API маршруты

## Поддержка

- [Документация Sanity](https://www.sanity.io/docs)
- [Справочник GROQ](https://www.sanity.io/docs/groq)
- [Portable Text](https://portabletext.org/)
