import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Destinations: React.FC = () => {
  const t = useTranslations('Booking')
  const events = [
    t('destinations.events.grand-prix'),
    t('destinations.events.yacht-show'),
    t('destinations.events.cannes-festival'),
    t('destinations.events.mipim'),
    t('destinations.events.cannes-lions'),
    t('destinations.events.others'),
  ]

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Image src="/images/index/hero.webp" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative px-6 py-10 text-start">
            <h2 className="text-2xl font-bold font-brother text-white mb-4">
              {t('destinations.title')}
            </h2>
            <p className="text-white opacity-90 text-lg leading-relaxed mb-8">
              {t('destinations.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {events.map((e, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Destinations
