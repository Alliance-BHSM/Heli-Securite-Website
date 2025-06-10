'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface CTASectionProps {
  routeData?: any
  isReversed?: boolean
}

export default function CTASection({ routeData, isReversed = false }: CTASectionProps) {
  const t = useTranslations('RegularLine.cta-section')
  const searchParams = useSearchParams()

  const getBookingUrl = () => {
    let baseUrl = '/booking/regular/nice/monaco'

    if (routeData) {
      const startPoint = (isReversed ? routeData.end_point : routeData.start_point) as {
        slug: string
      }
      const endPoint = (isReversed ? routeData.start_point : routeData.end_point) as {
        slug: string
      }
      baseUrl = `/booking/regular/${startPoint.slug}/${endPoint.slug}`
    }
    const params = new URLSearchParams()

    const passengersParams = searchParams.getAll('passengers')
    if (passengersParams.length > 0) {
      params.append('passengers', passengersParams[0] || '1')
      params.append('passengers', passengersParams[1] || '0')
      params.append('passengers', passengersParams[2] || '0')
    } else {
      params.append('passengers', '1')
      params.append('passengers', '0')
      params.append('passengers', '0')
    }

    if (searchParams.get('isReturn') === 'true') {
      params.set('isReturn', 'true')
    } else if (searchParams.get('oneway')) {
      params.set('oneway', searchParams.get('oneway')!)
    }

    return `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="absolute inset-0 bg-primary z-0"></div>
      <div className="absolute top-0 left-0 right-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-secondary">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-brother">{t('title')}</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 font-brother">{t('description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={getBookingUrl()} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              >
                {t('book-now')}
              </Button>
            </Link>
            {/* <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="white"
                className="w-full border-white text-white hover:bg-white/10 font-brother"
              >
                {t('contact-us')}
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}
