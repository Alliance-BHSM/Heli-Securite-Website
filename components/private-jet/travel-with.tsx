import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { ArrowRight, CheckSquare } from 'lucide-react'

const TravelWith = () => {
  const t = useTranslations('PrivateJet.travelWith')

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-black text-white">
      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-brother font-medium  mb-4 sm:mb-6">
              {t.rich('title', {
                span: (chunks) => (
                  <span className="font-caslon text-secondary-button">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-sm sm:text-base md:text-lg  font-brother mb-6 sm:mb-8">
              {t('description')}
            </p>

            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-brother font-medium mb-3 sm:mb-4 ">
                {t.rich('about.title', {
                  span: (chunks) => (
                    <span className="font-caslon text-secondary-button">{chunks}</span>
                  ),
                })}
              </h3>
              <p className=" font-brother mb-3 sm:mb-4 text-sm sm:text-base">
                {t('about.description')}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-secondary-button font-brother hover:text-white transition-colors text-sm sm:text-base"
              >
                {t('about.link')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <p className=" font-brother mb-4 sm:mb-6 text-sm sm:text-base">{t('cta_text')}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <Link href="/contact">
                <Button
                  variant="red"
                  size="lg"
                  className="w-full sm:w-auto bg-secondary-button text-white uppercase text-sm sm:text-base"
                >
                  {t('book_button')}
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="blue"
                  size="lg"
                  className="w-full sm:w-auto hover:bg-secondary-button uppercase text-sm sm:text-base"
                >
                  {t('contact_button')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/index/jet.webp"
                alt="Luxury private jet interior"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-10 max-w-[200px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-brother text-black font-medium leading-tight">
                    {t.rich('badge.title', {
                      span: (chunks) => (
                        <span className="font-brother text-secondary-button">{chunks}</span>
                      ),
                    })}
                  </p>
                  <p className="text-xs text-black font-brother leading-tight">
                    {t('badge.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelWith
