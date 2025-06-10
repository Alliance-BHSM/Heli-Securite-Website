import React from 'react'
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('RegularLine.faq')
  const faqs = t.raw('questions') as Array<{ question: string; answer: string }>

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-primary">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-brother text-primary">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {Array.isArray(faqs) &&
            faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 border-l-2 sm:border-l-4 border-redmonacair">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 font-brother text-primary">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base font-brother text-primary">{faq.answer}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
