import React from 'react'
import { useTranslations } from 'next-intl'
import { ChefHat, Star, Wine } from 'lucide-react'

export default function IntroSection() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-32"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">{t('intro.title')}</h2>
          <p className="text-lg">{t('intro.description')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Star className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              {t('intro.features.starred.title')}
            </h3>
            <p className="text-center text-gray-600">{t('intro.features.starred.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ChefHat className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              {t('intro.features.cooking.title')}
            </h3>
            <p className="text-center text-gray-600">{t('intro.features.cooking.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Wine className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              {t('intro.features.tasting.title')}
            </h3>
            <p className="text-center text-gray-600">{t('intro.features.tasting.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
