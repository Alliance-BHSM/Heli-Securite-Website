import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Clock, Users, Calendar, ArrowRight } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import type { Experience } from '@/payload-types'

export default async function ExperiencesSection() {
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

  const formatAvailability = (experience: Experience) => {
    if (experience.availability?.anytime) return "Toute l'année"
    if (experience.availability?.minimum && experience.availability?.maximum) {
      return `${new Date(experience.availability.minimum).toLocaleDateString()} - ${new Date(experience.availability.maximum).toLocaleDateString()}`
    }
    return 'Contactez-nous pour la disponibilité'
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('experiences.title')}</h2>
          <p className="text-lg">{t('experiences.description')}</p>
        </div>

        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 1 ? 'order-2 md:order-1' : ''}>
                <span className="inline-block bg-primary-button text-white text-sm px-3 py-1 rounded-full mb-4">
                  {experience.category}
                </span>

                <div className="md:hidden mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-button/10 rounded-lg transform rotate-3"></div>
                    <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                      {experience.image &&
                        typeof experience.image !== 'string' &&
                        experience.image.url && (
                          <Image
                            src={experience.image.url}
                            alt={experience.name}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                          />
                        )}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{experience.name}</h3>
                <p className="mb-6">{experience.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-primary mr-1" />
                    <span>{experience.duration} min</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-primary mr-1" />
                    <span>
                      {experience.guests.minimum}-{experience.guests.maximum} pers.
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-primary mr-1" />
                    <span>{formatAvailability(experience)}</span>
                  </div>
                </div>
                <Button variant="red" className="text-white" asChild>
                  <Link href="#booking-form">
                    {t('experiences.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div
                className={`relative hidden md:block ${index % 2 === 1 ? 'order-1 md:order-2' : ''}`}
              >
                <div className="absolute inset-0 bg-primary-button/10 rounded-lg transform rotate-3"></div>
                <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                  {experience.image &&
                    typeof experience.image !== 'string' &&
                    experience.image.url && (
                      <Image
                        src={experience.image.url}
                        alt={experience.name}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
