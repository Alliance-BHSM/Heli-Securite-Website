import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'category'],
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (data) {
            data.slug = data.name
              .trim()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')
              .toLowerCase()
            return data
          }
        } else {
          return data
        }
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Gastronomy',
          value: 'gastronomy',
        },
        {
          label: 'Lifestyle',
          value: 'lifestyle',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price per person',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      label: 'Duration (minutes)',
      min: 1,
    },
    {
      name: 'guests',
      type: 'group',
      fields: [
        {
          name: 'minimum',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'maximum',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Experience Image',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'details',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'departures',
      type: 'array',
      fields: [
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Starting Price',
          required: true,
        },
      ],
    },
  ],
}
