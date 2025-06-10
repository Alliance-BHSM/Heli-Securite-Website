'use client'

import React, { useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { PanoramicFlight, Destination } from '@/payload-types'
import { useBookingScroll } from '@/hooks/use-booking-scroll'

interface PanoramicFlightsProps {
  panoramicFlights: PanoramicFlight[]
}

const PanoramicFlights: React.FC<PanoramicFlightsProps> = ({ panoramicFlights }) => {
  const t = useTranslations('Booking')
  const { scrollToBookingForm } = useBookingScroll()

  const destinations = useMemo(() => {
    const uniqueStartLocations = new Map<string, { destination: Destination; image?: string }>()

    panoramicFlights.forEach((flight) => {
      if (flight.start && typeof flight.start === 'object') {
        const destination = flight.start as Destination
        if (!uniqueStartLocations.has(destination.slug)) {
          const heroUrl =
            typeof flight.hero === 'object' && flight.hero !== null && flight.hero.url
              ? flight.hero.url
              : undefined
          const imageUrl =
            typeof flight.image === 'object' && flight.image !== null && flight.image.url
              ? flight.image.url
              : undefined

          uniqueStartLocations.set(destination.slug, {
            destination,
            image: heroUrl || imageUrl || '/images/index/panoramique.webp',
          })
        }
      }
    })

    return Array.from(uniqueStartLocations.values()).map(({ destination, image }) => ({
      name: destination.title,
      slug: destination.slug,
      image: image || '/images/index/panoramique.webp',
      alt: `${t('panoramic-flights.title')} - ${destination.title}`,
    }))
  }, [panoramicFlights, t])

  const handleBookNow = useCallback(() => {
    scrollToBookingForm('panoramic-flight')
  }, [scrollToBookingForm])

  return (
    <section className="min-h-screen bg-primary text-white py-16" id={'panoramic-flights'}>
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold font-brother text-center mb-8">
          {t('panoramic-flights.title')}
        </h1>

        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          {t('panoramic-flights.description')}
        </p>

        <div className="relative mb-16">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={destination.slug || index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link href={`/flights/panoramic/${destination.slug}/${destination.slug}`}>
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={destination.image}
                          alt={destination.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-3xl font-bold font-brother">{destination.name}</h2>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg mb-8">{t('panoramic-flights.cta-text')}</p>

          <Button
            variant="red"
            size="lg"
            className="px-8 py-6 text-lg font-bold"
            onClick={handleBookNow}
          >
            {t('panoramic-flights.book-now')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PanoramicFlights
