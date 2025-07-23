import Hero from '@/components/shared/hero'
import OurHistory from '@/components/about-us/our-history'
import MonacairLeader from '@/components/about-us/monacair-leader'
import OurServices from '@/components/about-us/our-services'
import Alliance from '@/components/about-us/alliance'
import CTASection from '@/components/about-us/cta-section'
import Footer from '@/components/shared/footer'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'aboutSEO',
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

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="#our-history"
        imageSrc="/images/index/panoramique.webp"
      />

      <div id="our-history">
        <OurHistory />
      </div>
      <MonacairLeader />
      <OurServices />
      <Alliance />
      <CTASection />

      <Footer />
    </div>
  )
}
