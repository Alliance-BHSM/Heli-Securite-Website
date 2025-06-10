import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Clock, Award, Users } from 'lucide-react'

const JetPrive = () => {
  const t = useTranslations('Booking')

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="w-full text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-brother text-center mb-6">
              {t('jet-prive.title')}
            </h2>

            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              {t('jet-prive.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 aspect-square bg-primary-button/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-brother">
              {t('jet-prive.personalized.title')}
            </h3>
            <p className="text-gray-600 text-sm">{t('jet-prive.personalized.description')}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 aspect-square bg-primary-button/10 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-brother">{t('jet-prive.vip.title')}</h3>
            <p className="text-gray-600 text-sm">{t('jet-prive.vip.description')}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 aspect-square bg-primary-button/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary-button" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-brother">{t('jet-prive.comfort.title')}</h3>
            <p className="text-gray-600 text-sm">{t('jet-prive.comfort.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JetPrive
