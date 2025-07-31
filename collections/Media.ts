import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 2560,
      withoutEnlargement: true,
      fastShrinkOnLoad: false,
    },
    focalPoint: false,
    mimeTypes: ['image/*', 'video/webm'],
  },
}
