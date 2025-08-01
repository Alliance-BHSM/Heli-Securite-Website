import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import DetailsPage from '@/components/events/details-page'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined

  const eventResponse = await payload.find({
    collection: 'Events',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const event = eventResponse.docs[0]

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    }
  }

  const ogImage =
    event.meta.image && typeof event.meta.image === 'object' && event.meta.image.url
      ? { url: event.meta.image.url }
      : undefined

  return {
    title: event.meta.title,
    description: event.meta.description,
    keywords: event.meta.keywords,
    openGraph: {
      type: 'website',
      title: event.meta.title || undefined,
      description: event.meta.description || undefined,
      images: ogImage,
    },
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTranslations('Events')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const eventResponse = await payload.find({
    collection: 'Events',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const event = eventResponse.docs[0]

  if (!event) {
    return notFound()
  }

  return (
    <div>
      <Hero
        title={event.title}
        subtitle={event.carousel.carousel_subtitle}
        buttonText="RESERVER"
        buttonLink="/booking"
        imageSrc={
          typeof event.heroImage === 'string'
            ? event.heroImage
            : event.heroImage?.url || '/images/placeholder.png'
        }
      />
      <DetailsPage event={event} />
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
