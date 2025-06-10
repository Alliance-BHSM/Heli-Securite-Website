import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { PinContainer } from '@/components/ui/3d-pin'

const ExclusiveDestinations = () => {
  const t = useTranslations('PrivateJet.destinations')

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-black mb-6 text-center">
            {t.rich('title', {
              span: (chunks) => <span className="font-caslon text-primary-button">{chunks}</span>,
            })}
          </h2>
          <p className="text-base md:text-lg text-center max-w-3xl text-gray-700 font-brother">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PinContainer title={t('categories.events.title')} containerClassName="!border-0">
            <div className="relative overflow-hidden group rounded-xl w-[300px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
              <Image
                src="/images/events/hero.webp"
                alt="International Events"
                width={500}
                height={700}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-brother font-medium text-white mb-3">
                  {t.rich('categories.events.title', {
                    span: (chunks) => (
                      <span className="font-caslon text-primary-button">{chunks}</span>
                    ),
                  })}
                </h3>
                <p className="text-white/90 text-sm mb-4">{t('categories.events.description')}</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.events.examples.first')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.events.examples.second')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.events.examples.third')}
                  </li>
                </ul>
              </div>
            </div>
          </PinContainer>

          <PinContainer title={t('categories.luxury.title')} containerClassName="!border-0">
            <div className="relative overflow-hidden group rounded-xl w-[300px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
              <Image
                src="/images/destinations/hero.webp"
                alt="Luxury Destinations"
                width={500}
                height={700}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-brother font-medium text-white mb-3">
                  {t.rich('categories.luxury.title', {
                    span: (chunks) => (
                      <span className="font-caslon text-primary-button">{chunks}</span>
                    ),
                  })}
                </h3>
                <p className="text-white/90 text-sm mb-4">{t('categories.luxury.description')}</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.luxury.examples.first')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.luxury.examples.second')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.luxury.examples.third')}
                  </li>
                </ul>
              </div>
            </div>
          </PinContainer>

          <PinContainer title={t('categories.business.title')} containerClassName="!border-0">
            <div className="relative overflow-hidden group rounded-xl w-[300px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
              <Image
                src="/images/destinations/hero.webp"
                alt="Business Travel"
                width={500}
                height={700}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-brother font-medium text-white mb-3">
                  {t.rich('categories.business.title', {
                    span: (chunks) => (
                      <span className="font-caslon text-primary-button">{chunks}</span>
                    ),
                  })}
                </h3>
                <p className="text-white/90 text-sm mb-4">{t('categories.business.description')}</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.business.examples.first')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.business.examples.second')}
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary-button flex-shrink-0" />
                    {t('categories.business.examples.third')}
                  </li>
                </ul>
              </div>
            </div>
          </PinContainer>
        </div>
      </div>
    </section>
  )
}

export default ExclusiveDestinations
