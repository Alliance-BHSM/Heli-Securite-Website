import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextNav,
  CarouselPreviousNav,
} from '@/components/ui/carousel'
import { useTranslations } from 'next-intl'
import { Destination, Event } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { Button } from '@/components/ui/button'

const DestinationsCarousel = ({
  data,
  onItemClick,
}: {
  data: PaginatedDocs<Destination>
  onItemClick?: () => void
}) => {
  const t = useTranslations('Index.destinations')
  return (
    <Carousel className={'w-full flex flex-col'}>
      <div className={'flex justify-end items-center'}>
        <Link href={'/destinations'} onClick={onItemClick}>
          <Button size={'sm'} variant={'black'} className={'m-3'}>
            {t('CTA')}
          </Button>
        </Link>
        <CarouselPreviousNav />
        <CarouselNextNav />
      </div>
      <CarouselContent className="h-full">
        {data.docs.map((item: any) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 relative h-[300px] sm:h-[400px]"
            key={item.id}
          >
            <Link href={`/destinations/${item.slug}`} onClick={onItemClick}>
              <div className="absolute">
                <Image
                  src={item.carousel.carousel_image.url}
                  alt={item.carousel.carousel_image.alt}
                  width={item.carousel.carousel_image.width}
                  height={item.carousel.carousel_image.height}
                  className="object-cover object-center h-[300px] sm:h-[400px] w-full rounded-md"
                />
                <div className="absolute inset-0 bg-black/20 rounded-md" />
              </div>
              <div className="relative p-3">
                <h2 className="font-brother text-2xl text-white">{item.title}</h2>
                <h3 className="font-brother text-sm text-white w-2/3">
                  {item.carousel.carousel_subtitle}
                </h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

const EventsCarousel = ({
  data,
  onItemClick,
}: {
  data: PaginatedDocs<Event>
  onItemClick?: () => void
}) => {
  const t = useTranslations('Index.destinations')
  return (
    <Carousel className={'w-full flex flex-col'}>
      <div className={'flex justify-end items-center'}>
        <Link href={'/events'} onClick={onItemClick}>
          <Button size={'sm'} variant={'black'} className={'m-3'}>
            {t('CTA')}
          </Button>
        </Link>
        <CarouselPreviousNav />
        <CarouselNextNav />
      </div>
      <CarouselContent className="h-full">
        {data.docs.map((item: any) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 relative h-[300px] sm:h-[400px]"
            key={item.id}
          >
            <Link href={`/events/${item.slug}`} onClick={onItemClick}>
              <div className="absolute">
                <Image
                  src={item.carousel.carousel_image.url}
                  alt={item.carousel.carousel_image.alt}
                  width={item.carousel.carousel_image.width}
                  height={item.carousel.carousel_image.height}
                  className="object-cover object-center h-[300px] sm:h-[400px] w-full rounded-md"
                />
                <div className="absolute inset-0 bg-black/20 rounded-md" />
              </div>
              <div className="relative p-3">
                <h2 className="font-brother text-2xl text-white">{item.title}</h2>
                <h3 className="font-brother text-sm text-white w-2/3">
                  {item.carousel.carousel_subtitle}
                </h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export { DestinationsCarousel, EventsCarousel }
