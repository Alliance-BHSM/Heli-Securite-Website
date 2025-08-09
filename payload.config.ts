import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Destinations } from './collections/Destinations'
import { Events } from './collections/Events'
import { Fleet } from './collections/Fleet'
import { RegularFlights } from './collections/RegularFlights'
import { PanoramicFlights } from './collections/PanoramicFlights'
import { Regions } from './collections/Regions'
import { Experiences } from './collections/Experiences'
import { IndexPage } from '@/globals/IndexPage'
import { DestinationsPage } from '@/globals/DestinationsPage'
import { EventsPage } from '@/globals/EventsPage'
import { ExperiencesPage } from '@/globals/ExperiencesPage'
import { BookingPage } from '@/globals/BookingPage'
import { JetPage } from '@/globals/JetPage'
import { ServicesPage } from '@/globals/ServicesPage'
import { FleetPage } from '@/globals/FleetPage'
import { ContactPage } from '@/globals/ContactPage'
import { AboutPage } from '@/globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/public/logos/logo-payload',
      },
    },
  },
  collections: [
    Destinations,
    Events,
    Experiences,
    Fleet,
    Users,
    Media,
    RegularFlights,
    PanoramicFlights,
    Regions,
  ],
  globals: [
    IndexPage,
    BookingPage,
    DestinationsPage,
    EventsPage,
    ExperiencesPage,
    JetPage,
    FleetPage,
    ServicesPage,
    AboutPage,
    ContactPage,
  ],
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    fallback: true,
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  upload: {
    debug: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: 'heli-securite-media',
      config: {
        requestHandler: {
          httpAgent: {
            maxSockets: 100,
            keepAlive: true,
          },
          httpsAgent: {
            maxSockets: 100,
            keepAlive: true,
          },
          connectionTimeout: 5 * 1000,
          requestTimeout: 5 * 1000,
        },
        forcePathStyle: true,
        endpoint: process.env.S3_ENDPOINT || '',
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
      },
    }),
    seoPlugin({
      globals: [
        'indexSEO',
        'bookingSEO',
        'jetSEO',
        'servicesSEO',
        'contactSEO',
        'aboutSEO',
        'destinationsSEO',
        'eventsSEO',
        'experiencesSEO',
        'fleetSEO',
      ],
      collections: ['destinations', 'Events', 'experiences'],
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'keywords',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
      uploadsCollection: 'media',
    }),
  ],
})
