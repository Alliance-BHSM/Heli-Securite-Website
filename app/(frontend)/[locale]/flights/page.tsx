import Hero from '@/components/shared/hero'
import { getTranslations, getLocale } from 'next-intl/server'
import BookingForm from 'components/booking/booking-form'
import RegularLineSection from 'components/booking/regular-line-section'
import VipService from 'components/booking/vip-service'
import PrivateFlights from 'components/booking/private-flights'
import JetPrive from 'components/booking/jet-prive'
import PanoramicFlights from 'components/booking/panoramic-flights'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'bookingSEO',
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

export default async function BookingPage() {
  const t = await getTranslations('Booking')
  const payload = await getPayloadClient()

  const panoramicFlightsData = await payload.find({
    collection: 'panoramic-flights',
    depth: 2,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="#booking-form"
        imageSrc="/images/index/hero.webp"
      />

      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />

      <PrivateFlights />

      <RegularLineSection />

      <VipService />

      {/* <Destinations /> */}

      <JetPrive />

      <PanoramicFlights panoramicFlights={panoramicFlightsData.docs} />

      <Footer />
    </div>
  )
}
