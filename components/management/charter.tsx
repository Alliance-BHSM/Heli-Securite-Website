import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Plane, MapPin, Compass, SunSnow, Mountain, Palmtree } from 'lucide-react'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'

export default function Charter() {
  const t = useTranslations('Management.charter')

  const destinations = [
    {
      title: 'Sud de la France',
      description: 'Monaco, Nice, Cannes, Saint-Tropez, Marseille',
      icon: <Palmtree className="h-6 w-6 text-primary-button" />,
    },
    {
      title: 'Les Alpes',
      description: "Courchevel, Megève, Val d'Isère, Chamonix",
      icon: <Mountain className="h-6 w-6 text-primary-button" />,
    },
    {
      title: 'Italie',
      description: 'Milan, Portofino, Sardaigne, Toscane',
      icon: <Compass className="h-6 w-6 text-primary-button" />,
    },
    {
      title: 'Corse',
      description: 'Ajaccio, Calvi, Figari, Bastia',
      icon: <SunSnow className="h-6 w-6 text-primary-button" />,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-button/10 flex items-center justify-center mr-4">
                <Plane className="h-6 w-6 text-primary-button" />
              </div>
              <h2 className="text-3xl font-bold text-black font-brother">{t('title')}</h2>
            </div>

            <p className="text-black font-brother">{t('description')}</p>

            <div className="mt-8">
              <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-3 md:auto-rows-[10rem]">
                {destinations.map((destination, index) => (
                  <BentoGridItem
                    key={index}
                    title={
                      <span className="text-xl font-brother text-primary-button">
                        {destination.title}
                      </span>
                    }
                    description={
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                        <span className="text-black font-brother">{destination.description}</span>
                      </div>
                    }
                    className="hover:shadow-lg transition-all duration-300 border border-gray-100"
                    icon={destination.icon}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[300px] md:h-[500px] relative mb-8 md:mb-0 order-1 md:order-2">
            <Image
              src="/images/index/private.webp"
              alt="Charter et affrètement"
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
