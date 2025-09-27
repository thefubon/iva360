import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Текстовый блок',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Содержание',
      type: 'blockContent',
    }),
    defineField({
      name: 'alignment',
      title: 'Выравнивание',
      type: 'string',
      options: {
        list: [
          { title: 'По левому краю', value: 'left' },
          { title: 'По центру', value: 'center' },
          { title: 'По правому краю', value: 'right' },
        ]
      },
      initialValue: 'left'
    }),
    defineField({
      name: 'width',
      title: 'Ширина контента',
      type: 'string',
      options: {
        list: [
          { title: 'Полная ширина', value: 'full' },
          { title: 'Контейнер', value: 'container' },
          { title: 'Узкий (prose)', value: 'prose' },
        ]
      },
      initialValue: 'container'
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
        ]
      },
      initialValue: 'transparent'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      alignment: 'alignment',
    },
    prepare({ title, alignment }) {
      const alignmentNames = {
        left: 'Слева',
        center: 'По центру',
        right: 'Справа',
      }
      return {
        title: title || 'Текстовый блок',
        subtitle: alignmentNames[alignment] || alignment,
      }
    },
  },
})
