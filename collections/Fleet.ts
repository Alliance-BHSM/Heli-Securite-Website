import type { CollectionConfig } from 'payload'

export const Fleet: CollectionConfig = {
  slug: 'Fleet',
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if ((operation === 'create' || operation === 'update') && data?.name) {
          data.id = data.name
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'badge', type: 'text', required: false, localized: true },
    { name: 'speed', type: 'text', required: true, localized: true },
    { name: 'passengers', type: 'text', required: true, localized: true },
    { name: 'baggage', type: 'text', required: true, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    { name: 'carouselImages', type: 'upload', hasMany: true, relationTo: 'media', required: false },
    {
      name: 'description',
      type: 'richText',
      required: false,
      localized: true,
    },
    {
      name: 'range',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'equipment',
      type: 'array',
      required: false,
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
