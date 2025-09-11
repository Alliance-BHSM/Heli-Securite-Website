import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import IntroSection from '@/components/fleet/intro-section'
import HelicopterShowcase from '@/components/fleet/helicopter-showcase'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import BookingForm from '@/components/booking/booking-form'
import { Fleet } from '@/payload-types'
import React from 'react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'fleetSEO',
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
    alternates: {
      canonical: 'https://helisecurite.fr/fleet',
      languages: {
        en: 'https://helisecurite.fr/en/fleet',
        fr: 'https://helisecurite.fr/fr/fleet',
        'x-default': 'https://helisecurite.fr/fr/fleet',
      },
    },
    openGraph: {
      type: 'website',
      title: response.meta.title || undefined,
      description: response.meta.description || undefined,
      images: ogImage,
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function FleetPage() {
  const [t, locale] = await Promise.all([getTranslations('Fleet.page'), getLocale()])

  const payload = await getPayloadClient()

  const fleetResponse = await payload.find({
    collection: 'Fleet',
    locale: locale as 'en' | 'fr' | 'all',
    sort: 'order',
    fallbackLocale: 'fr',
  })

  const helicopters = fleetResponse.docs || []

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/booking"
        imageSrc="/images/fleet/hero.webp"
      />
      <IntroSection />

      {helicopters.map((helicopter, index) => (
        <HelicopterShowcase
          key={helicopter.id}
          helicopter={helicopter as Fleet}
          reversed={index % 2 !== 0}
        />
      ))}
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />

      <Footer />
    </div>
  )
}
