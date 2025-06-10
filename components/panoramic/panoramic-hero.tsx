import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function PanoramicHero({ imageSrc }: { imageSrc: string }) {
  const t = useTranslations('Panoramic')

  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Vue panoramique en hélicoptère"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full text-white px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="font-brother font-bold text-5xl sm:text-6xl md:text-7xl mb-4 text-white">
            <span className="text-primary-button">Vols</span> Panoramiques
          </h1>
          <p className="font-brother text-lg sm:text-xl md:text-2xl max-w-3xl text-white">
            {t('hero.description')}
          </p>
        </div>
      </div>
    </div>
  )
}
