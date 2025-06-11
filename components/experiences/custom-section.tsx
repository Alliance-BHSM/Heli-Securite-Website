import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Users, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CustomSection() {
  const t = useTranslations('Experiences.custom')

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-button/20 via-gray-900 to-gray-900 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] border-2 border-dashed border-white/20 rounded-full opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white transform transition-transform hover:scale-105 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-primary-button/20 flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t('options.events.title')}</h3>
              <p className="text-center text-white/80 flex-grow">
                {t('options.events.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white transform transition-transform hover:scale-105 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-primary-button/20 flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t('options.thematic.title')}</h3>
              <p className="text-center text-white/80 flex-grow">
                {t('options.thematic.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white transform transition-transform hover:scale-105 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-primary-button/20 flex items-center justify-center mb-6 mx-auto">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{t('options.vip.title')}</h3>
              <p className="text-center text-white/80 flex-grow">{t('options.vip.description')}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-primary-button hover:bg-primary-button/90 text-white"
              asChild
            >
              <Link href="/contact">{t('cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
