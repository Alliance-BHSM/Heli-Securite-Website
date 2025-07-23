import { getPayloadClient } from '@/lib/payload'
import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import CustomJets from '@/components/private-jet/custom-jets'
import ExclusiveDestinations from '@/components/private-jet/destinations'
import BookingCta from '@/components/private-jet/booking-cta'
import BookingForm from '@/components/booking/booking-form'
import WhyChoose from '@/components/private-jet/why-choose'
import TravelWith from '@/components/private-jet/travel-with'
import AttractSection from '@/components/shared/attract-section'
import Footer from '@/components/shared/footer'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'jetSEO',
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

export default async function PrivateJetPage() {
  const t = await getTranslations('PrivateJet.page')
  const payload = await getPayloadClient()
  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/contact"
        imageSrc="/images/index/jet.webp"
      />
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />

      <CustomJets />

      <ExclusiveDestinations />

      <BookingCta />

      <WhyChoose />

      <TravelWith />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink="/booking"
        imageSrc="/images/index/hero.webp"
      />
      <Footer />
    </div>
  )
}
