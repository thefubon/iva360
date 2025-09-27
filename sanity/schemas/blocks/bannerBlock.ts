import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bannerBlock',
  title: 'Баннер',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'style',
      title: 'Стиль баннера',
      type: 'string',
      options: {
        list: [
          { title: 'Изображение слева, текст справа', value: 'image-left' },
          { title: 'Текст слева, изображение справа', value: 'image-right' },
          { title: 'Текст поверх изображения', value: 'overlay' },
          { title: 'Полноширинный с центрированным текстом', value: 'fullwidth' },
        ]
      },
      initialValue: 'image-right'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Цвет фона',
      type: 'string',
      options: {
        list: [
          { title: 'Прозрачный', value: 'transparent' },
          { title: 'Белый', value: 'white' },
          { title: 'Светло-серый', value: 'gray-50' },
          { title: 'Темно-серый', value: 'gray-900' },
          { title: 'Синий', value: 'blue-600' },
          { title: 'Зеленый', value: 'green-600' },
        ]
      },
      initialValue: 'gray-50'
    }),
    defineField({
      name: 'textColor',
      title: 'Цвет текста',
      type: 'string',
      options: {
        list: [
          { title: 'Темный', value: 'dark' },
          { title: 'Светлый', value: 'light' },
        ]
      },
      initialValue: 'dark'
    }),
    defineField({
      name: 'buttons',
      title: 'Кнопки',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Текст кнопки',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'url',
              title: 'Ссылка',
              type: 'url',
            }),
            defineField({
              name: 'style',
              title: 'Стиль кнопки',
              type: 'string',
              options: {
                list: [
                  { title: 'Основная', value: 'primary' },
                  { title: 'Вторичная', value: 'secondary' },
                  { title: 'Контурная', value: 'outline' },
                ]
              },
              initialValue: 'primary'
            }),
            defineField({
              name: 'external',
              title: 'Внешняя ссылка',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              text: 'text',
              style: 'style',
            },
            prepare({ text, style }) {
              return {
                title: text || 'Кнопка',
                subtitle: style || 'primary',
              }
            },
          },
        }
      ],
      validation: Rule => Rule.max(3).warning('Рекомендуется не более 3 кнопок')
    }),
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style',
      media: 'image',
    },
    prepare({ title, style, media }) {
      const styleNames = {
        'image-left': 'Изображение слева',
        'image-right': 'Изображение справа',
        'overlay': 'Наложение',
        'fullwidth': 'Полная ширина',
      }
      return {
        title: title || 'Баннер',
        subtitle: styleNames[style] || style,
        media,
      }
    },
  },
})
