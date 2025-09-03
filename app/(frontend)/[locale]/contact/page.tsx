import React from 'react'
import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Form from '@/components/contact/form'
import Footer from '@/components/shared/footer'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'contactSEO',
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
      canonical: 'https://helisecurite.fr/fr/contact',
      languages: {
        en: 'https://helisecurite.fr/en/contact',
        fr: 'https://helisecurite.fr/fr/contact',
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

export default async function ContactPage() {
  const t = await getTranslations('Contact')
  return (
    <div>
      <Hero
        title={t.rich('title', {
          span: (chunks) => (
            <span className="font-caslon text-primary-button">
              {chunks}
              <br />
            </span>
          ),
        })}
        subtitle={t('subtitle')}
        imageSrc={'/images/destinations/hero.webp'}
        buttonText={t('CTA')}
        buttonLink={'/booking'}
      />
      <Form />
      <Footer />
    </div>
  )
}
