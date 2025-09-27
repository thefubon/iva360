import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageBlocks',
  title: 'Блоки страницы',
  type: 'array',
  of: [
    { type: 'textBlock' },
    { type: 'cardBlock' },
    { type: 'bannerBlock' },
    // Встроенные блоки контента
    {
      type: 'block',
      styles: [
        { title: 'Обычный', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Цитата', value: 'blockquote' },
      ],
      lists: [
        { title: 'Маркированный', value: 'bullet' },
        { title: 'Нумерованный', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Жирный', value: 'strong' },
          { title: 'Курсив', value: 'em' },
          { title: 'Подчеркнутый', value: 'underline' },
          { title: 'Зачеркнутый', value: 'strike-through' },
          { title: 'Код', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                title: 'Открыть в новой вкладке',
                name: 'blank',
                type: 'boolean',
                initialValue: false
              }
            ]
          }
        ]
      }
    },
    // Изображение
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Альтернативный текст',
          description: 'Важно для SEO и доступности',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Подпись к изображению',
        },
        {
          name: 'size',
          type: 'string',
          title: 'Размер изображения',
          options: {
            list: [
              { title: 'Маленький', value: 'small' },
              { title: 'Средний', value: 'medium' },
              { title: 'Большой', value: 'large' },
              { title: 'Полная ширина', value: 'full' },
            ]
          },
          initialValue: 'large'
        }
      ]
    }
  ],
})
