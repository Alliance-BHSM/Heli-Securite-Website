import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function FeaturesSection() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-lg">{t('features.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={t('features.imageSrc')}
                alt={t('features.imageAlt')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold">{t('features.items.one.title')}</h3>
                </div>
                <p className="text-gray-600 ml-14">{t('features.items.one.description')}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold">{t('features.items.two.title')}</h3>
                </div>
                <p className="text-gray-600 ml-14">{t('features.items.two.description')}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold">{t('features.items.three.title')}</h3>
                </div>
                <p className="text-gray-600 ml-14">{t('features.items.three.description')}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-button rounded-full flex items-center justify-center text-white font-bold mr-4">
                    4
                  </div>
                  <h3 className="text-xl font-bold">{t('features.items.four.title')}</h3>
                </div>
                <p className="text-gray-600 ml-14">{t('features.items.four.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
