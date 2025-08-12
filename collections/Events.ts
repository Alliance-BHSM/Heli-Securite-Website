import type { CollectionConfig } from 'payload'
import Sitemap from '@/hooks/Sitemap'

export const Events: CollectionConfig = {
  slug: 'Events',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [Sitemap],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
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
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'city', type: 'text', required: true, localized: true },
    { name: 'date', type: 'text', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'group',
      name: 'carousel',
      fields: [
        { name: 'carousel_image', type: 'upload', relationTo: 'media', required: true },
        { name: 'carousel_subtitle', type: 'text', required: true, localized: true },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'richText', required: true, localized: true },
    {
      label: 'Custom title for Advantages or other',
      name: 'custom_text',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      label: 'Blocks for Advantages or other',
      name: 'advantages',
      type: 'array',
      required: true,
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
    { name: 'additional_content', type: 'richText', localized: true },
  ],
}
