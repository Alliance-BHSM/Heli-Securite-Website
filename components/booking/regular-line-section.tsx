'use client'

import React, { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, Euro, Calendar, Bus } from 'lucide-react'
import { useBookingScroll } from '@/hooks/use-booking-scroll'

const RegularLineSection: React.FC = () => {
  const t = useTranslations('Booking')
  const { scrollToBookingForm } = useBookingScroll()

  const handleBookNow = useCallback(() => {
    scrollToBookingForm('regular-line')
  }, [scrollToBookingForm])

  return (
    <section className="py-16" id="regular-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold font-brother mb-6 text-primary">
              {t('regular-line.title')}
            </h2>
            <p className="mb-8 text-gray-700">{t('regular-line.description')}</p>
            <div className="mb-8 space-y-5">
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-primary-button flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.flight-time.label')}</span>
                  <span> {t('regular-line.flight-time.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-primary-button flex items-center justify-center mr-4">
                  <Euro className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.price.label')}</span>
                  <span> {t('regular-line.price.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-primary-button flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.schedule.label')}</span>
                  <span> {t('regular-line.schedule.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-primary-button flex items-center justify-center mr-4">
                  <Bus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.luggage.label')}</span>
                  <span> {t('regular-line.luggage.value')}</span>
                </div>
              </div>
            </div>
            <Button variant="red" size="lg" className="rounded-lg" onClick={handleBookNow}>
              {t('regular-line.book-now')}
            </Button>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/index/regular.webp"
                alt={t('regular-line.image-alt')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegularLineSection
