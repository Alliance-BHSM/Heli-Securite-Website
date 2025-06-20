import React from 'react'
import Image from 'next/image'
import { Users, Gauge, MapPin, Luggage, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Fleet } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/fleet/carousel'

interface ExtendedFleet extends Omit<Fleet, 'range' | 'equipment'> {
  description?: any
  range?: string | null
  equipment?: Array<{ item: string; id?: string | null }> | null
}

interface HelicopterShowcaseProps {
  helicopter: ExtendedFleet
  reversed?: boolean
}

export default function HelicopterShowcase({
  helicopter,
  reversed = false,
}: HelicopterShowcaseProps) {
  const t = useTranslations('Fleet.helicopter')

  const HelicopterBadge = () => (
    <div className="inline-block mb-4 bg-primary-button/10 px-4 py-2 rounded-full">
      <span className="text-primary-button font-medium">{helicopter.badge || t('badge')}</span>
    </div>
  )

  const HelicopterContent = () => (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{helicopter.name}</h2>

      {helicopter.description ? (
        <div className="text-base sm:text-lg mb-4 sm:mb-6">
          <RichText data={helicopter.description} />
        </div>
      ) : (
        <p className="text-base sm:text-lg mb-4 sm:mb-6">{t('description')}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-start">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-button/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">{t('specs.capacity.title')}</h4>
            <p className="text-gray-600 text-sm sm:text-base">{helicopter.passengers}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-button/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">{t('specs.speed.title')}</h4>
            <p className="text-gray-600 text-sm sm:text-base">{helicopter.speed}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-button/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">{t('specs.range.title')}</h4>
            <p className="text-gray-600 text-sm sm:text-base">
              {helicopter.range || t('specs.range.default')}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-button/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <Luggage className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">{t('specs.baggage.title')}</h4>
            <p className="text-gray-600 text-sm sm:text-base">{helicopter.baggage}</p>
          </div>
        </div>
      </div>

      {helicopter.equipment && helicopter.equipment.length > 0 && (
        <div className="space-y-3 mb-6 sm:mb-8">
          <h4 className="font-bold text-base sm:text-lg">{t('equipment.title')}</h4>
          <div className="grid grid-cols-1 gap-2">
            {helicopter.equipment.map((equip, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-button mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">{equip.item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/booking">
        <Button variant="primary" className="font-brother text-white w-full sm:w-auto">
          {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </>
  )

  const HelicopterImage = () => (
    <Carousel
      opts={{
        loop: true,
      }}
      className="relative w-[80%] h-auto mx-auto max-w-[90%] mb-4 sm:mb-6 md:mb-0"
    >
      <div className="absolute inset-0 bg-primary-button/10 rounded-lg transform rotate-3"></div>
      <CarouselContent className={'flex justify-start items-center'}>
        {helicopter.carouselImages &&
          helicopter.carouselImages.map(
            (image, i) =>
              typeof image !== 'string' &&
              image.url &&
              image.width &&
              image.height && (
                <CarouselItem key={i}>
                  <div className="relative transform rounded-lg overflow-hidden shadow-xl">
                    <Image
                      key={i}
                      src={image.url}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className={'w-full h-auto'}
                    />
                  </div>
                </CarouselItem>
              ),
          )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {/*typeof helicopter.image === 'object' && helicopter.image?.url ? (
        <Image
          src={helicopter.image.url}
          alt={helicopter.name || 'Helicopter'}
          width={600}
          height={400}
          className="w-full h-auto"
        />
      ) : (
        <Image
          src="/images/index/regular.webp"
          alt={helicopter.name || 'Helicopter'}
          width={600}
          height={400}
          className="w-full h-auto"
        />
      )*/}
    </Carousel>
  )

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16">
            <div className={`${reversed ? 'md:order-2' : 'md:order-1'}`}>
              <HelicopterBadge />
              <div className="block md:hidden">
                <HelicopterImage />
              </div>
              <HelicopterContent />
            </div>
            <div className={`hidden md:block ${reversed ? 'md:order-1' : 'md:order-2'}`}>
              <HelicopterImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
