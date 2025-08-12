import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: ['/', '/api/media/file/dynamic-sitemap.xml'],
    disallow: ['/admin/', '/api/', '/_next/'],
  },
  sitemap: [
    'https://helisecurite.fr/sitemap.xml',
    'https://helisecurite.fr/api/media/file/dynamic-sitemap.xml',
  ],
})

export default robots
