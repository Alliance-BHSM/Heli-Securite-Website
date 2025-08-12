import type { CollectionConfig } from 'payload'
import Sitemap from '@/hooks/Sitemap'

export const RegularFlights: CollectionConfig = {
  slug: 'regular-flights',
  admin: {
    useAsTitle: 'start_point',
    defaultColumns: ['start_point', 'end_point'],
  },
  hooks: {
    afterChange: [Sitemap],
  },
  fields: [
    {
      name: 'start_point',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select departure location',
      },
    },
    {
      name: 'end_point',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select arrival location',
      },
    },
    {
      name: 'hero_banner',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Hero Banner Image',
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          localized: true,
        },
      ],
    },
    {
      name: 'time_frames',
      type: 'group',
      fields: [
        {
          name: 'frequency',
          type: 'number',
          required: true,
          localized: false,
        },
        {
          name: 'average_flight_duration',
          type: 'number',
          required: true,
          localized: false,
        },
        {
          name: 'return_departure_delay',
          type: 'number',
          required: true,
          localized: false,
        },
        {
          name: 'first_departure',
          type: 'text',
          required: true,
          localized: false,
          admin: {
            description: 'First departure time (format: HH:MM)',
          },
        },
        {
          name: 'last_departure',
          type: 'text',
          required: true,
          localized: false,
          admin: {
            description: 'Last departure time (format: HH:MM)',
          },
        },
      ],
    },
    {
      name: 'tariffs',
      type: 'group',
      fields: [
        {
          name: 'price_per_adult',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_child',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_newborn',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_baggage',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_flex',
          type: 'number',
          required: true,
        },
        {
          name: 'max_persons',
          type: 'number',
          required: true,
        },
        {
          name: 'max_baggages',
          type: 'number',
          required: true,
        },
        {
          name: 'price_per_cabin_baggage',
          type: 'number',
          required: true,
        },
        {
          name: 'max_cabin_baggages',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
