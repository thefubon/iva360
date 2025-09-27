import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Страница',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Слаг',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Содержание (устаревшее)',
      type: 'blockContent',
      description: 'Используйте "Конструктор страницы" для создания современного контента',
      hidden: true, // Скрываем старое поле
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Конструктор страницы',
      type: 'pageBlocks',
      description: 'Создайте страницу с помощью гибких блоков контента',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Заголовок',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'SEO Описание',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'SEO Изображение',
          type: 'image',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
