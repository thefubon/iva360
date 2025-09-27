import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категория',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
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
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
