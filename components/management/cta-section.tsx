import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('Management.ctaSection')

  return (
    <div
      className="flex items-center justify-center px-4 md:px-40 py-20 bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/index/hero.webp)' }}
    >
      <div className="flex flex-col items-center justify-center max-w-3xl text-center">
        <h2 className="text-4xl md:text-6xl font-caslon text-white pb-5">{t('title')}</h2>
        <p className="text-lg font-brother font-light text-center text-white pb-8">
          {t('description')}
        </p>
        <Link href="/contact">
          <Button variant="primary" className="font-brother text-white">
            {t('CTA')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
