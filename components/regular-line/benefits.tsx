'use client'

import React from 'react'
import { Clock, Users, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface BenefitsProps {
  routeData?: any
  isReversed?: boolean
}

export default function Benefits({ routeData, isReversed = false }: BenefitsProps) {
  const t = useTranslations('RegularLine.benefits')
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
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-primary">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-brother text-primary">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute inset-0 transform rotate-3 bg-primary/10 rounded-lg"></div>
            <div className="relative bg-white p-5 sm:p-6 rounded-lg shadow-md z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 font-brother text-primary">
                {t('advantages.time.title')}
              </h3>
              <p className="text-center text-sm sm:text-base font-brother text-primary">
                {t('advantages.time.description')}
              </p>
            </div>
          </div>
          <div className="relative mt-8 sm:mt-12 md:mt-12">
            <div className="absolute inset-0 transform -rotate-2 bg-primary/10 rounded-lg"></div>
            <div className="relative bg-white p-5 sm:p-6 rounded-lg shadow-md z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 font-brother text-primary">
                {t('advantages.comfort.title')}
              </h3>
              <p className="text-center text-sm sm:text-base font-brother text-primary">
                {t('advantages.comfort.description')}
              </p>
            </div>
          </div>
          <div className="relative mt-8 sm:mt-4 md:mt-4">
            <div className="absolute inset-0 transform rotate-1 bg-primary/10 rounded-lg"></div>
            <div className="relative bg-white p-5 sm:p-6 rounded-lg shadow-md z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 font-brother text-primary">
                {t('advantages.views.title')}
              </h3>
              <p className="text-center text-sm sm:text-base font-brother text-primary">
                {t('advantages.views.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-base sm:text-lg font-medium mb-4 sm:mb-6 font-brother text-primary">
            {t('cta.question')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={getBookingUrl()} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              >
                {t('cta.book')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
