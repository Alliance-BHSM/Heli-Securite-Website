import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'

const EventCard = async () => {
  const t = await getTranslations('Index.events')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const events = await payload.find({
    collection: 'Events',
    locale,
    limit: 3,
    fallbackLocale: 'fr',
  })
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'}>
      {events.docs.map((event: any) => (
        <div
          className={
            'flex flex-col justify-between w-full h-[400px] sm:h-[450px] border-2 border-black rounded-lg p-3'
          }
          key={event.id}
        >
          <div>
            <Image
              src={event.image.url}
              alt={'Event image'}
              width={event.image.width || 500}
              height={event.image.height || 500}
              className={'rounded-lg h-[200px] sm:h-[250px] w-full object-cover object-center'}
            />
            <h3 className={'font-brother text-xs sm:text-sm'}>{event.date}</h3>
            <h2 className={'font-brother text-lg sm:text-xl'}>{event.title}</h2>
          </div>
          <div>
            <h2 className={'text-sm sm:text-lg font-brother pb-2'}>{event.city}</h2>
            <Link href={`/events/${event.slug}`}>
            <Button className={'text-xs sm:text-sm'} size={'sm'} variant={'blue'}>
              {t('CTA')}
            </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const Events = async () => {
  const t = await getTranslations('Index.events')
  return (
    <section className={'px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20'}>
      <div className={'pb-8 md:pb-16 flex flex-col md:flex-row justify-between'}>
        <div>
          <h3 className={'font-brother font-normal text-sm md:text-base'}>{t('subtitle')}</h3>
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
        <Link href={'/events'}>
          <Button className={'text-sm md:text-base'}>{t('CTA')}</Button>
        </Link>
      </div>
      <EventCard />
    </section>
  )
}

export default Events
