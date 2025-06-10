import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const DestinationsCarousel = async () => {
  const t = await getTranslations('Index.destinations')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const destinations = await payload.find({
    collection: 'destinations',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <Carousel className="w-full h-full pl-6 sm:pl-10 md:pl-20 lg:pl-40 py-10 md:py-20">
      <div
        className={
          'pb-8 pt-8 md:pt-0 md:pb-16 flex-none md:flex md:justify-between pr-0 md:pr-20 lg:pr-40'
        }
      >
        <div>
          <h3 className={'font-brother font-normal text-base md:text-xl'}>{t('subtitle')}</h3>
          <h2 className={'font-brother font-normal text-3xl md:text-5xl'}>
            {t.rich('title', {
              span: (chunks) => (
                <span className={'font-caslon text-primary-button'}>
                  {chunks}
                  <br />
                </span>
              ),
            })}
          </h2>
        </div>
        <div className={'flex items-center gap-1 md:gap-5'}>
          <CarouselPrevious />
          <CarouselNext />
          <Link href={'/destinations'}>
            <Button>{t('CTA')}</Button>
          </Link>
        </div>
      </div>
      <CarouselContent className="-ml-4 h-full">
        {destinations.docs.map((item: any) => (
          <CarouselItem
            className=" basis-2/3 md:basis-2/5 lg:basis-2/9 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            key={item.id}
          >
            <div className={'absolute'}>
              <Link href={`/destinations/${item.slug}`}>
                <Image
                  src={item.carousel.carousel_image.url || '/images/placeholder.png'}
                  alt={item.carousel.carousel_image.alt || 'Destination image'}
                  width={item.carousel.carousel_image.width}
                  height={item.carousel.carousel_image.height}
                  className={
                    'object-cover object-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg'
                  }
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
              </Link>
            </div>
            <div className={'relative p-3'}>
              <h2 className={'font-brother font text-2xl text-white'}>{item.title}</h2>
              <h3 className={'font-brother text-sm text-white w-2/3'}>
                {item.carousel.carousel_subtitle}
              </h3>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default DestinationsCarousel
