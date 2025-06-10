import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Clock, Smile, Plane, Shield, Eye } from 'lucide-react'

const WhyChoose = () => {
  const t = useTranslations('PrivateJet.whyChoose')

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/destinations/hero.webp"
          alt="Private jet interior"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"></div>
      </div>

      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-black mb-6 text-center">
            {t.rich('title', {
              span: (chunks) => <span className="font-caslon text-primary">{chunks}</span>,
            })}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-white transition-colors relative z-10">
              <Clock className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-black group-hover:text-white transition-colors relative z-10">
              {t.rich('reasons.flexibility.title', {
                span: (chunks) => (
                  <span className="font-caslon text-primary group-hover:text-white">{chunks}</span>
                ),
              })}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.flexibility.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-white transition-colors relative z-10">
              <Smile className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-black group-hover:text-white transition-colors relative z-10">
              {t.rich('reasons.service.title', {
                span: (chunks) => (
                  <span className="font-caslon text-primary group-hover:text-white">{chunks}</span>
                ),
              })}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.service.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-white transition-colors relative z-10">
              <Plane className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-black group-hover:text-white transition-colors relative z-10">
              {t.rich('reasons.jets.title', {
                span: (chunks) => (
                  <span className="font-caslon text-primary group-hover:text-white">{chunks}</span>
                ),
              })}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.jets.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-white transition-colors relative z-10">
              <Shield className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-black group-hover:text-white transition-colors relative z-10">
              {t.rich('reasons.security.title', {
                span: (chunks) => (
                  <span className="font-caslon text-primary group-hover:text-white">{chunks}</span>
                ),
              })}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.security.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6 group-hover:bg-white transition-colors relative z-10">
              <Eye className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-black group-hover:text-white transition-colors relative z-10">
              {t.rich('reasons.discretion.title', {
                span: (chunks) => (
                  <span className="font-caslon text-primary group-hover:text-white">{chunks}</span>
                ),
              })}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.discretion.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
