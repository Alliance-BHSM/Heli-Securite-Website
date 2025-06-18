import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Utensils, ChevronRight, Wine, Calendar } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import type { Experience } from '../../payload-types'
import { Button } from '@/components/ui/button'

export default async function GastronomySection() {
  const t = await getTranslations('Experiences.gastronomy')
  const payload = await getPayloadClient()

  const { docs: experiences } = (await payload.find({
    collection: 'experiences',
    where: {
      type: {
        equals: 'gastronomy',
      },
    },
    depth: 1,
  })) as { docs: Experience[] }

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50" id="gastronomy-section">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-button/5 to-transparent z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-12">
          <div className="inline-block mb-4 bg-primary-button/10 px-4 py-2 rounded-full">
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-primary-button mr-2" />
              <span className="text-primary-button font-medium">{t('badge')}</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min mb-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative overflow-hidden rounded-xl shadow-lg ${
                index === 0 || index === experiences.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="relative h-80">
                {experience.image &&
                  typeof experience.image !== 'string' &&
                  experience.image.url && (
                    <Image
                      src={experience.image.url}
                      alt={experience.name}
                      fill
                      className="object-cover"
                    />
                  )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3
                  className={`${
                    index === 0 || index === experiences.length - 1 ? 'text-2xl' : 'text-xl'
                  } font-bold mb-2`}
                >
                  {experience.name}
                </h3>
                <p className="mb-4 line-clamp-3">{experience.description}</p>
                <Link href="/experiences/gastronomie">
                  <Button
                    size="lg"
                    className="bg-primary-button hover:bg-primary-button/90 text-white"
                  >
                    {t('CTA')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/experiences/gastronomie"
            className="inline-flex items-center text-primary-button font-medium hover:underline"
          >
            {t('link')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
