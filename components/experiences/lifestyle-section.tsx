import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Trophy, ChevronRight, Calendar, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPayloadClient } from '@/lib/payload'
import type { Experience, Media } from '../../payload-types'

export default async function LifestyleSection() {
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const t = await getTranslations('Experiences.lifestyle')
  const payload = await getPayloadClient()

  const { docs: experiences } = (await payload.find({
    collection: 'experiences',
    where: {
      type: {
        equals: 'lifestyle',
      },
    },
    depth: 1,
    locale,
    fallbackLocale: 'fr',
  })) as { docs: Experience[] }

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 bg-primary-button/10 px-4 py-2 rounded-full">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-primary-button mr-2" />
                <span className="text-primary-button font-medium">{t('badge')}</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg">{t('description')}</p>
          </div>

          <Link
            href="/experiences/lifestyle"
            className="inline-flex items-center text-primary-button font-medium hover:underline mt-4 md:mt-0"
          >
            {t('link')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="relative">
          {experiences.length >= 4 && (
            <>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg z-20 flex items-center justify-center cursor-pointer">
                <ChevronRight className="h-6 w-6 transform rotate-180" />
              </div>

              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg z-20 flex items-center justify-center cursor-pointer">
                <ChevronRight className="h-6 w-6" />
              </div>
            </>
          )}

          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory scrollbar-hide">
            {experiences.map((experience) => (
              <div key={experience.id} className="snap-start flex-shrink-0 w-full sm:w-80 md:w-96">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                  <div className="h-48 relative">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <span className="bg-primary-button/80 text-white text-sm px-2 py-1 rounded">
                          {experience.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{experience.name}</h3>
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{experience.duration} min</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>
                          {experience.guests.minimum}-{experience.guests.maximum} pers.
                        </span>
                      </div>
                      {experience.availability &&
                        !experience.availability.anytime &&
                        experience.availability.minimum &&
                        experience.availability.maximum && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(experience.availability.minimum).toLocaleDateString()} -
                              {new Date(experience.availability.maximum).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-primary-button hover:bg-primary-button/90 text-white"
                    >
                      {t('experiences.cta')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
