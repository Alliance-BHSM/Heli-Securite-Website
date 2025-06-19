import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Clock, Users, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function FeaturedSection() {
  const t = await getTranslations('Experiences.featured')

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-primary-button text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.dinner.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.dinner.title')}</h3>
              <p className="mb-6">{t('experiences.dinner.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary-button mr-1" />
                  <span>Durée: {t('experiences.dinner.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.dinner.people')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.dinner.date')}</span>
                </div>
              </div>
              <Button className="bg-primary-button hover:bg-primary-button/90 text-white" asChild>
                <Link href="#booking-form">
                  {t('experiences.dinner.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/images/index/gastronomie.webp"
                alt={t('experiences.dinner.title')}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 relative">
              <Image
                src="/images/index/sport.webp"
                alt={t('experiences.grandprix.title')}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block bg-primary-button text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.grandprix.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.grandprix.title')}</h3>
              <p className="mb-6">{t('experiences.grandprix.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary-button mr-1" />
                  <span>Durée: {t('experiences.grandprix.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.grandprix.people')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.grandprix.date')}</span>
                </div>
              </div>
              <Button className="bg-primary-button hover:bg-primary-button/90 text-white" asChild>
                <Link href="#booking-form">
                  {t('experiences.grandprix.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-primary-button text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.provence.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.provence.title')}</h3>
              <p className="mb-6">{t('experiences.provence.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary-button mr-1" />
                  <span>Durée: {t('experiences.provence.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.provence.people')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary-button mr-1" />
                  <span>{t('experiences.provence.date')}</span>
                </div>
              </div>
              <Button className="bg-primary-button hover:bg-primary-button/90 text-white" asChild>
                <Link href="#booking-form">
                  {t('experiences.provence.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/images/index/culture.webp"
                alt={t('experiences.provence.title')}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
