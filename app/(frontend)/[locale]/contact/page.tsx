import React from 'react'
import { useTranslations } from 'next-intl'
import Hero from '@/components/shared/hero'
import Form from '@/components/contact/form'
import Footer from '@/components/shared/footer'

export default function ContactPage() {
  const t = useTranslations('Contact')
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
