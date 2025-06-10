import React from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { Calendar, DollarSign, Heart, Shield } from 'lucide-react'

const CustomJets = () => {
  const t = useTranslations('PrivateJet.customJets')

  return (
    <section className="w-full py-16 md:py-24 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-primary/20 hover:border-primary group overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-primary-button transition-colors">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-black">
                {t.rich('features.personalized.title', {
                  span: (chunks) => (
                    <span className="font-caslon text-primary-button">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.personalized.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-primary/20 hover:border-primary group overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-primary-button transition-colors">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-black">
                {t.rich('features.vip.title', {
                  span: (chunks) => (
                    <span className="font-caslon text-primary-button">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.vip.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-primary/20 hover:border-primary group overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-primary-button transition-colors">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-black">
                {t.rich('features.comfort.title', {
                  span: (chunks) => (
                    <span className="font-caslon text-primary-button">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.comfort.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-primary/20 hover:border-primary group overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-primary-button transition-colors">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-black">
                {t.rich('features.discretion.title', {
                  span: (chunks) => (
                    <span className="font-caslon text-primary-button">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.discretion.description')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CustomJets
