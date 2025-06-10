import React from 'react'
import { Sparkles, Heart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function IntroSection() {
  const t = useTranslations('Experiences.intro')

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.exclusive.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.exclusive.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.memories.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.memories.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Star className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.service.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.service.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
