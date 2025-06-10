'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import type { RegularFlight } from '@/payload-types'
import { useSearchParams } from 'next/navigation'

interface PricingProps {
  routeData: RegularFlight
  isReversed?: boolean
}

export default function Pricing({ routeData, isReversed = false }: PricingProps) {
  const t = useTranslations('RegularLine.pricing')
  const searchParams = useSearchParams()

  const formatAdultPrice = () => {
    if (routeData?.tariffs?.price_per_adult) {
      return `${routeData.tariffs.price_per_adult}€`
    }
    return t('regular.price') || '195€'
  }

  const formatFlexPrice = () => {
    if (routeData?.tariffs?.price_per_flex) {
      return `${routeData.tariffs.price_per_flex}€`
    }
    return t('charter.price') || '245€'
  }

  const getMaxPersons = () => {
    if (routeData?.tariffs?.max_persons) {
      return routeData.tariffs.max_persons
    }
    return 6
  }

  const getBookingUrl = (isFlex = false) => {
    const startPoint = (isReversed ? routeData.end_point : routeData.start_point) as {
      slug: string
    }
    const endPoint = (isReversed ? routeData.start_point : routeData.end_point) as { slug: string }

    const baseUrl = `/booking/regular/${startPoint.slug}/${endPoint.slug}`
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

    if (isFlex) {
      params.set('flex', 'true')
    }

    const queryString = params.toString()
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`
  }

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-primary">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg font-brother text-primary">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col">
            <div className="bg-primary-button text-white p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('regular.title')}</h3>
              <p className="text-sm sm:text-base text-white/80 font-brother">
                {t('regular.subtitle')}
              </p>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold font-brother text-primary">
                  {formatAdultPrice()}
                </span>
                <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                  {t('regular.per')}
                </span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('regular.features')[0] || 'Durée de vol: 7 minutes'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('regular.features')[1] || 'Départs toutes les 30 minutes'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('regular.features')[2] || '1 bagage cabine inclus'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('regular.features')[3] || 'Vue panoramique garantie'}
                  </span>
                </li>
              </ul>
              <Link href={getBookingUrl()} className="mt-auto">
                <Button className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother">
                  {t('regular.cta')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col">
            <div className="bg-secondary-button text-primary p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('charter.title')}</h3>
              <p className="text-sm sm:text-base text-primary/80 font-brother">
                {t('charter.subtitle').replace('{max_persons}', getMaxPersons().toString())}
              </p>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold font-brother text-primary">
                  {formatFlexPrice()}
                </span>
                <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                  {t('charter.per')}
                </span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('charter.features')[0] || 'Vol privatisé pour votre groupe'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t
                      .raw('charter.features')[1]
                      ?.replace('{max_persons}', getMaxPersons().toString()) ||
                      `Jusqu'à ${getMaxPersons()} passagers`}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('charter.features')[2] || 'Bagages inclus'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-brother text-primary">
                    {t.raw('charter.features')[3] ||
                      'Service de limousine sur demande (en supplément)'}
                  </span>
                </li>
              </ul>
              <Link href={getBookingUrl(true)} className="mt-auto">
                <Button className="w-full bg-secondary-button hover:bg-secondary-button/90 text-primary font-brother">
                  {t('charter.cta')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col">
            <div className="bg-primary-button text-white p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('private.title')}</h3>
              <p className="text-sm sm:text-base text-white/80 font-brother">
                {t('private.subtitle')}
              </p>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                {/* <span className="text-3xl sm:text-4xl font-bold font-brother text-primary">
                  {t('private.price')}
                </span>
                <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                  {t('private.per')}
                </span> */}
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                {(t.raw('private.features') as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-primary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/flights" className="mt-auto">
                <Button className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother">
                  {t('private.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
