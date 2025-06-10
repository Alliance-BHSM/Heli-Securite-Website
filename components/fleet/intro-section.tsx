import React from 'react'
import { Shield, Sparkles, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function IntroSection() {
  const t = useTranslations('Fleet.intro')

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.safety.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.safety.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.comfort.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.comfort.description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 h-full">
            <div className="w-16 h-16 bg-primary-button/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Award className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{t('cards.technology.title')}</h3>
            <p className="text-center text-gray-600">{t('cards.technology.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
