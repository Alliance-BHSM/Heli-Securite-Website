import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import EventListing from '@/components/events/listing'
import { getLocale, getTranslations } from 'next-intl/server'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'eventsSEO',
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

export default async function EventsPage() {
  const t = await getTranslations('Events')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  return (
    <div>
      <Hero
        title={t.rich('hero.title', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
        subtitle={t.rich('hero.subtitle', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
        buttonText={t('hero.CTA')}
        buttonLink={'/'}
        imageSrc={'/images/events/hero.webp'}
      />
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />
      <EventListing
        data={{
          events: await payload.find({
            collection: 'Events',
            locale,
            sort: 'order',
            fallbackLocale: 'fr',
            limit: 0,
          }),
          regions: await payload.find({
            collection: 'regions',
            locale,
            fallbackLocale: 'fr',
            limit: 0,
          }),
        }}
      />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink={'/'}
        imageSrc={'/images/index/hero.webp'}
      />
      <Footer />
    </div>
  )
}
