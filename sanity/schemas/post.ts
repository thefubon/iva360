import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Статья',
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
      name: 'author',
      title: 'Автор',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Главное изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Категории',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Краткое описание',
      type: 'text',
      rows: 3,
      description: 'Краткое описание статьи для превью на главной странице блога',
    }),
    defineField({
      name: 'body',
      title: 'Содержание (текстовый редактор)',
      type: 'blockContent',
      description: 'Обычный текстовый редактор для простого контента',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Конструктор статьи',
      type: 'pageBlocks',
      description: 'Создайте статью с помощью гибких блоков контента (карточки, баннеры и т.д.)',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `от ${author}` }
    },
  },
})
