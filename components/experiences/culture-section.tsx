import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Landmark, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPayloadClient } from '@/lib/payload'
import type { Experience, Media } from '../../payload-types'

export default async function CultureSection() {
  const t = await getTranslations('Experiences.culture')
  const payload = await getPayloadClient()

  const { docs: experiences } = (await payload.find({
    collection: 'experiences',
    where: {
      type: {
        equals: 'culture',
      },
    },
    depth: 1,
  })) as { docs: Experience[] }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <div className="inline-block mb-4 bg-primary-button/10 px-4 py-2 rounded-full">
            <div className="flex items-center">
              <Landmark className="h-5 w-5 text-primary-button mr-2" />
              <span className="text-primary-button font-medium">
                {t('badge')}
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min mb-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative group overflow-hidden rounded-xl shadow-lg ${
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
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                <h3
                  className={`${
                    index === 0 || index === experiences.length - 1 ? 'text-2xl' : 'text-xl'
                  } font-bold mb-2`}
                >
                  {experience.name}
                </h3>
                <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {experience.description}
                </p>
                <Button
                  className="bg-primary-button hover:bg-primary-button/90 text-white"
                  asChild
                >
                  <Link href="#booking-form">En savoir plus</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/experiences/culture"
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
