import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes/index'
import React from 'react'

// Получаем переменные окружения
const projectId = process.env.NUXT_SANITY_PROJECT_ID
const dataset = process.env.NUXT_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('Missing required Sanity environment variables. Please check your .env file.')
}

export default defineConfig({
  name: 'default',
  title: 'IVA360 CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .id('content')
          .items([
            // Посты с предпросмотром
            S.listItem()
              .title('Посты')
              .id('posts')
              .child(
                S.documentTypeList('post')
                  .title('Посты')
                  .id('post-list')
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('post')
                      .views([
                        S.view.form().id('form'),
                        // Live Preview
                        S.view
                          .component((props: any) => {
                            const { document } = props
                            const slug = document?.displayed?.slug?.current
                            
                            if (!slug) {
                              return React.createElement('div', {
                                style: { 
                                  padding: '40px', 
                                  textAlign: 'center',
                                  fontSize: '16px',
                                  color: '#666'
                                }
                              }, 'Добавьте слаг для предпросмотра')
                            }
                            
                            const previewUrl = `http://localhost:3000/preview/post/${slug}`
                            
                            return React.createElement('div', {
                              style: { 
                                height: '100vh', 
                                display: 'flex', 
                                flexDirection: 'column' 
                              }
                            }, [
                              React.createElement('div', {
                                key: 'header',
                                style: { 
                                  padding: '12px 16px', 
                                  backgroundColor: '#f1f3f6',
                                  borderBottom: '1px solid #ddd',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }
                              }, [
                                React.createElement('span', {
                                  key: 'title',
                                  style: { fontWeight: 'bold', fontSize: '14px' }
                                }, 'Live Preview'),
                                React.createElement('a', {
                                  key: 'link',
                                  href: previewUrl,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  style: {
                                    padding: '6px 12px',
                                    backgroundColor: '#2276fc',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                  }
                                }, 'Открыть в новой вкладке')
                              ]),
                              React.createElement('iframe', {
                                key: 'iframe',
                                src: previewUrl,
                                style: {
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  flex: 1
                                },
                                title: 'Live Preview'
                              })
                            ])
                          })
                          .title('Предпросмотр')
                          .id('preview')
                      ])
                  )
              ),
            
            // Страницы с предпросмотром
            S.listItem()
              .title('Страницы')
              .id('pages')
              .child(
                S.documentTypeList('page')
                  .title('Страницы')
                  .id('page-list')
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('page')
                      .views([
                        S.view.form().id('page-form'),
                        // Live Preview
                        S.view
                          .component((props: any) => {
                            const { document } = props
                            const slug = document?.displayed?.slug?.current
                            
                            if (!slug) {
                              return React.createElement('div', {
                                style: { 
                                  padding: '40px', 
                                  textAlign: 'center',
                                  fontSize: '16px',
                                  color: '#666'
                                }
                              }, 'Добавьте слаг для предпросмотра')
                            }
                            
              const previewUrl = `http://localhost:3000/${slug}`
                            
                            return React.createElement('div', {
                              style: { 
                                height: '100vh', 
                                display: 'flex', 
                                flexDirection: 'column' 
                              }
                            }, [
                              React.createElement('div', {
                                key: 'header',
                                style: { 
                                  padding: '12px 16px', 
                                  backgroundColor: '#f1f3f6',
                                  borderBottom: '1px solid #ddd',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }
                              }, [
                                React.createElement('span', {
                                  key: 'title',
                                  style: { fontWeight: 'bold', fontSize: '14px' }
                                }, 'Live Preview'),
                                React.createElement('a', {
                                  key: 'link',
                                  href: previewUrl,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  style: {
                                    padding: '6px 12px',
                                    backgroundColor: '#2276fc',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                  }
                                }, 'Открыть в новой вкладке')
                              ]),
                              React.createElement('iframe', {
                                key: 'iframe',
                                src: previewUrl,
                                style: {
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  flex: 1
                                },
                                title: 'Live Preview'
                              })
                            ])
                          })
                          .title('Предпросмотр')
                          .id('preview')
                      ])
                  )
              ),
            
            // Остальные типы документов
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['post', 'page'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  api: {
    projectId,
    dataset,
  },
})
