import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Maintenance from '@/components/management/maintenance'
import Management from '@/components/management/management'
import Handling from '@/components/management/handling'
import CTASection from '@/components/management/cta-section'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'servicesSEO',
    locale,
    fallbackLocale: 'fr',
  })

  const ogImage =
    response.meta.image && typeof response.meta.image === 'object' && response.meta.image.url
      ? { url: response.meta.image.url }
      : undefined

  return {
    title: response.meta.title,
    description: response.meta.description,
    keywords: response.meta.keywords,
    openGraph: {
      type: 'website',
      title: response.meta.title || undefined,
      description: response.meta.description || undefined,
      images: ogImage,
    },
  }
}

export default async function ServicesPage() {
  const t = await getTranslations('Management.hero')

  return (
    <main>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('CTA')}
        buttonLink="/contact"
        imageSrc="/images/index/services.webp"
      />
      <Management />
      <Maintenance />
      <Handling />
      <CTASection />
      <Footer />
    </main>
  )
}
