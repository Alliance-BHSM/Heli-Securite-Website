import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import DetailsPage from '@/components/destinations/details-page'
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

  const destinationResponse = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const destination = destinationResponse.docs[0]

  if (!destination) {
    return {
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    }
  }

  const ogImage =
    destination.meta.image &&
    typeof destination.meta.image === 'object' &&
    destination.meta.image.url
      ? { url: destination.meta.image.url }
      : undefined

  return {
    title: destination.meta.title,
    description: destination.meta.description,
    keywords: destination.meta.keywords,
    openGraph: {
      type: 'website',
      title: destination.meta.title || undefined,
      description: destination.meta.description || undefined,
      images: ogImage,
    },
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTranslations('Destinations')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const destinationResponse = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const destination = destinationResponse.docs[0]

  if (!destination) {
    return notFound()
  }

  return (
    <div>
      <Hero
        title={destination.title}
        subtitle={destination.carousel.carousel_subtitle}
        buttonText="RESERVER"
        buttonLink="/booking"
        imageSrc={
          typeof destination.heroImage === 'string'
            ? destination.heroImage
            : destination.heroImage?.url || '/images/placeholder.png'
        }
      />
      <DetailsPage destination={destination} />
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
