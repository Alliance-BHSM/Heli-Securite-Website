import type { CollectionAfterChangeHook } from 'payload'
import sitemapGen from '@/lib/sitemap-gen'

const Sitemap: CollectionAfterChangeHook = async ({ req }) => await sitemapGen(req.payload)

export default Sitemap
