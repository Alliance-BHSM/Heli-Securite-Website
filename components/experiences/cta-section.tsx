import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'

export default async function CTASection() {
  const t = await getTranslations('Experiences.action')

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 z-0"></div>
      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="max-w-4xl mx-auto text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
              <p className="mb-8">{t('description')}</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[color:var(--color-primary-button)] hover:bg-[color:var(--color-primary-button)]/90 text-white"
                  asChild
                >
                  <Link href="#listing">{t('book')}</Link>
                </Button>
                <Button size="lg" className="text-black bg-white border-white hover:bg-white/90">
                  <Link href="/contact">{t('contact')}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[color:var(--color-primary-button)]/10 rounded-lg"></div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/index/jet.webp"
                  alt="Expériences Monacair"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
