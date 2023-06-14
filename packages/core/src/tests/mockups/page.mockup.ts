/* eslint-disable sort-keys */

import { PageInterface } from '@webmate/core/interfaces/page.interface';

export const PAGE_MOCKUP: PageInterface = {
  id: 1,
  title: 'Test',
  slug: 'test',
  type: 'post',
  content: [
    {
      id: '1160b824-80e4-4832-bf1f-da6133f4782d',
      tag: 'webmate-container',
      styles: {
        backgroundColor: 'red',
        md: {
          backgroundColor: 'blue'
        }
      },
      properties: {
        children: [
          {
            id: 'b0fe5fbf-01fb-4395-9c68-c521cac31744',
            tag: 'webmate-typography',
            properties: {
              children: 'Hello World',
              element: 'webmate-h1'
            }
          },
          {
            id: 'b0fe5fbf-01fb-4395-9c68-c521cac31749',
            tag: 'bs-button',
            properties: {
              children: 'Hello World'
            },
            files: [
              {
                path: 'https://unpkg.com/@morbidick/bootstrap@latest/dist/elements.bundled.min.js',
                mimetype: 'text/javascript',
                type: 'module'
              }
            ]
          },
          {
            id: 'b0fe5fbf-01fb-4395-9c68-c521cac31741',
            tag: 'bs-badge',
            properties: {
              className: 'warning',
              children: 'Hello World'
            },
            files: [
              {
                path: 'https://unpkg.com/@morbidick/bootstrap@latest/dist/elements.bundled.min.js',
                mimetype: 'text/javascript',
                type: 'module'
              }
            ]
          },
          {
            id: 'b0fe5fbf-01fb-4395-9c68-c521cac31746',
            tag: 'share-button',
            properties: {
              title: 'Shared title',
              text: 'This is the text that will be shared',
              url: 'https://example.com',
              fallbacktext: 'Text that will be copied to your clipboard'
            },
            files: [
              {
                path: 'https://unpkg.com/@andreadev/share-button/src/share-button.js',
                mimetype: 'text/javascript',
                type: 'module'
              }
            ]
          }
        ]
      }
    },
    {
      id: '536d5663-b107-496d-a9d5-d2dbde28a67b',
      tag: 'webmate-container',
      properties: {
        children: [
          {
            id: '3a560f50-731f-480b-86a4-9ece88fa27a8',
            tag: 'webmate-list',
            properties: {
              items: [
                {
                  text: 'test',
                  value: 'aaaa'
                },
                {
                  text: 'a'
                },
                {
                  text: 'ac'
                },
                {
                  text: 'a'
                },
                {
                  text: 'f'
                },
                {
                  text: 'item texta'
                },
                {
                  text: 'e2',
                  value: 'aaaaa'
                },
                {
                  text: 'item aaaa',
                  value: 'item fa'
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 'e71a4be4-5443-4279-a04f-7a90ed2386c5',
      tag: 'webmate-card',
      properties: {
        image:
          'http://localhost:8000/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-17-at-4.12.15-PM.jpeg',
        content: 'Genial',
        title: 'Genial que se cambie todo'
      }
    },
    {
      id: 'f4820437-fe80-4942-999a-e9e0e97c78e6',
      tag: 'webmate-button',
      properties: {
        children: 'Button',
        variant: 'text',
        color: 'success',
        size: 'small'
      }
    }
  ],

  internalUrl: 'http://localhost/post/1',
  register: {
    components: {
      'webmate-container': {
        name: 'container',
        displayName: 'Container',
        tag: 'webmate-container',
        controls: [
          {
            name: 'backgroundColor',
            title: 'Background Color',
            tag: 'webmate-control-input'
          }
        ]
      },
      'bs-button': {
        name: 'button',
        displayName: 'Button',
        tag: 'bs-button',
        controls: [
          {
            name: 'children',
            title: 'Button text',
            tag: 'webmate-control-input'
          }
        ]
      }
    }
  }
};
