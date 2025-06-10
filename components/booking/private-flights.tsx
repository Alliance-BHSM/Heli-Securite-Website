'use client'

import React, { useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUp, Award, Lock } from 'lucide-react'
import { useBookingScroll } from '@/hooks/use-booking-scroll'

const PrivateFlights: React.FC = () => {
  const t = useTranslations('Booking')
  const { scrollToBookingForm } = useBookingScroll()

  const features = useMemo(
    () => [
      {
        key: 'flexibility',
        title: t('private-flights.flexibility.title'),
        description: t('private-flights.flexibility.description'),
        icon: <ArrowUp className="h-5 w-5 text-primary-button" />,
      },
      {
        key: 'service',
        title: t('private-flights.service.title'),
        description: t('private-flights.service.description'),
        icon: <Award className="h-5 w-5 text-primary-button" />,
      },
      {
        key: 'confidentiality',
        title: t('private-flights.confidentiality.title'),
        description: t('private-flights.confidentiality.description'),
        icon: <Lock className="h-5 w-5 text-primary-button" />,
      },
    ],
    [t],
  )

  const handleBookNow = useCallback(() => {
    scrollToBookingForm('private-flight')
  }, [scrollToBookingForm])

  return (
    <section className="py-16 bg-white" id={'private-flights'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[46px] font-bold font-brother mb-4">{t('private-flights.title')}</h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            {t('private-flights.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4">
                {features.map(({ key, title, description, icon }) => (
                  <div
                    key={key}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 aspect-square rounded-full bg-primary-button/10 flex items-center justify-center mr-3">
                        {icon}
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 w-full">
                <Button
                  size="lg"
                  variant="red"
                  className="w-full rounded-lg"
                  onClick={handleBookNow}
                >
                  {t('private-flights.book-now')}
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full" style={{ height: '350px' }}>
                <Image
                  src="/images/index/private.webp"
                  alt={t('private-flights.image-alt')}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivateFlights
