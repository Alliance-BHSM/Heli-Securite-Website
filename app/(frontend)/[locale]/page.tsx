import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'
import Experience from '@/components/index/experience'
import Destinations from '@/components/index/destinations'
import Events from '@/components/index/events'
import FleetCarousel from '@/components/index/fleet'
import AttractSection from '@/components/shared/attract-section'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'
import { getTranslations, getLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'indexSEO',
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

export default async function Home() {
  const t = await getTranslations('Destinations')
  const payload = await getPayloadClient()
  return (
    <main>
      <Hero />
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />
      <OurFlights />
      <Destinations />
      <Experience />
      <Events />
      <FleetCarousel />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink={'/contact'}
        imageSrc={'/images/index/hero.webp'}
      />
      <Footer />
    </main>
  )
}
