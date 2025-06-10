import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

export default function CostControl() {
  const t = useTranslations('Management.costControl')
  const benefits = t.raw('benefits') as string[]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-black mb-6 font-brother">{t('title')}</h2>
            <p className="text-black mb-8 font-brother">{t('description')}</p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary-button mr-3 mt-1 flex-shrink-0" />
                  <p className="text-black font-brother">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[300px] md:h-[400px] relative mb-8 md:mb-0 order-1 md:order-2">
            <Image
              src="/images/index/regular.webp"
              alt="Contrôle des coûts"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
