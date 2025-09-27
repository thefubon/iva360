import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cardBlock',
  title: 'Блок карточек',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок блока',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      title: 'Расположение карточек',
      type: 'string',
      options: {
        list: [
          { title: 'Вертикальные карточки', value: 'vertical' },
          { title: 'Горизонтальные карточки', value: 'horizontal' },
          { title: 'Сетка 2x2', value: 'grid-2' },
          { title: 'Сетка 3x3', value: 'grid-3' },
        ]
      },
      initialValue: 'vertical'
    }),
    defineField({
      name: 'cards',
      title: 'Карточки',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Заголовок карточки',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Описание',
              type: 'text',
              rows: 3,
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
              name: 'link',
              title: 'Ссылка',
              type: 'object',
              fields: [
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                }),
                defineField({
                  name: 'text',
                  title: 'Текст ссылки',
                  type: 'string',
                }),
                defineField({
                  name: 'external',
                  title: 'Внешняя ссылка',
                  type: 'boolean',
                  initialValue: false,
                }),
              ]
            }),
            defineField({
              name: 'icon',
              title: 'Иконка',
              type: 'string',
              description: 'Название иконки из библиотеки Lucide',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Карточка',
                media,
              }
            },
          },
        }
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Цвет фона',
      type: 'string',
      options: {
        list: [
          { title: 'Прозрачный', value: 'transparent' },
          { title: 'Светло-серый', value: 'gray-50' },
          { title: 'Белый', value: 'white' },
          { title: 'Голубой', value: 'blue-50' },
          { title: 'Зеленый', value: 'green-50' },
        ]
      },
      initialValue: 'transparent'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      cardCount: 'cards.length',
    },
    prepare({ title, layout, cardCount }) {
      const layoutNames = {
        vertical: 'Вертикальные',
        horizontal: 'Горизонтальные', 
        'grid-2': 'Сетка 2x2',
        'grid-3': 'Сетка 3x3',
      }
      return {
        title: title || 'Блок карточек',
        subtitle: `${layoutNames[layout || 'vertical']} • ${cardCount || 0} карточек`,
      }
    },
  },
})
