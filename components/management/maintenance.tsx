import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Wrench, MapPin, Building, Landmark, Ship, Castle, Mountain } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import Heli from '@/public/images/index/hero.webp'

export default function Maintenance() {
  const t = useTranslations('Management.maintenance')

  const locations = [
    {
      title: 'Grimaud',
      description: 'Saint-Tropez',
      icon: <Ship className="h-5 w-5 text-primary-button" />,
    },
    {
      title: 'Cannes',
      description: "Côte d'Azur",
      icon: <Landmark className="h-5 w-5 text-primary-button" />,
    },
    {
      title: 'Annecy',
      description: 'Haute-Savoie',
      icon: <Building className="h-5 w-5 text-primary-button" />,
    },
    {
      title: 'Monaco',
      description: 'Principauté',
      icon: <Castle className="h-5 w-5 text-primary-button" />,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full order-2 md:order-0 h-[300px] md:h-[500px] relative mb-8 md:mb-0">
            <Image
              src={Heli}
              alt="Maintenance d'hélicoptères"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-button/10 flex items-center justify-center mr-4">
                <Wrench className="h-6 w-6 text-primary-button" />
              </div>
              <h2 className="text-3xl font-bold text-black font-brother">{t('title')}</h2>
            </div>

            <div className="space-y-6">
              <p className="text-black font-brother">{t('description')}</p>
              <p className="text-black font-brother">{t('certificationDescription')}</p>
              <p className="text-black font-brother">{t('locationsDescription')}</p>
            </div>

            <div className="mt-8">
              <BentoGrid className="grid-cols-2 md:grid-cols-3 gap-3 py-3 md:auto-rows-[6rem]">
                {locations.map((location, index) => (
                  <BentoGridItem
                    key={index}
                    title={
                      <span className="text-lg font-brother text-primary-button">
                        {location.title}
                      </span>
                    }
                    description={
                      <div className="flex items-center mt-0 ">
                        <MapPin className="h-3 w-3 text-gray-500 mr-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600 font-brother">
                          {location.description}
                        </span>
                      </div>
                    }
                    className="hover:shadow-md transition-all duration-300 border border-gray-100"
                    icon={<div className="flex items-center">{location.icon}</div>}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
