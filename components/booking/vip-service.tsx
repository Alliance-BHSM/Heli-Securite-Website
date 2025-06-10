import React from 'react'
import { useTranslations } from 'next-intl'

const VipService = () => {
  const t = useTranslations('Booking')

  return (
    <section className="py-16 bg-white">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-tertiary rounded-2xl shadow-lg p-8 sm:p-12 max-w-full w-full text-black">
          <h2 className="text-3xl sm:text-4xl font-bold font-brother mb-2">
            {t('vip-service.title')}{' '}
            <span className="text-primary">{t('vip-service.title-highlight')}</span>{' '}
            {t('vip-service.title-end')}
          </h2>

          <p className="mb-12 text-lg opacity-90">{t('vip-service.description')}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('vip-service.lounges.title'),
                desc: t('vip-service.lounges.description'),
              },
              {
                title: t('vip-service.options.title'),
                desc: t('vip-service.options.description'),
              },
              {
                title: t('vip-service.drivers.title'),
                desc: t('vip-service.drivers.description'),
              },
            ].map(({ title, desc }, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-brother">{title}</h3>
                </div>
                <p className="opacity-90">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VipService
