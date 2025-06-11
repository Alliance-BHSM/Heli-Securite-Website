import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
      bucket: 'heli-media',
      config: {
        forcePathStyle: true,
        endpoint: process.env.S3_ENDPOINT || '',
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
      },
    }),
  ],
})
