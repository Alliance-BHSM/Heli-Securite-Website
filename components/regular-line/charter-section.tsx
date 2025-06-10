import React from 'react'
import { Users, Plane, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function CharterSection() {
  const t = useTranslations('RegularLine.charter-section')

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/index/private.webp"
                alt={t('images.main')}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 -right-6 sm:-right-12 transform -translate-y-1/2 w-24 h-24 sm:w-36 md:w-48 sm:h-36 md:h-48 rounded-lg overflow-hidden shadow-xl border-4 border-white z-20 hidden sm:block">
              <Image
                src="/images/index/jet.webp"
                alt={t('images.interior')}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-brother text-primary">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 font-brother text-primary">
              {t('description.main')}
            </p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 font-brother text-primary">
              {t('description.details')}
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-brother text-primary">
                {t('ideal-for.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-button text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-primary text-sm sm:text-base">
                    <span className="font-medium">{t('ideal-for.groups.title')}</span> -{' '}
                    {t('ideal-for.groups.description')}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-button text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-primary text-sm sm:text-base">
                    <span className="font-medium">{t('ideal-for.events.title')}</span> -{' '}
                    {t('ideal-for.events.description')}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-button text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-primary text-sm sm:text-base">
                    <span className="font-medium">{t('ideal-for.business.title')}</span> -{' '}
                    {t('ideal-for.business.description')}
                  </div>
                </li>
              </ul>
            </div>
            <Link href="/charter">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              >
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
