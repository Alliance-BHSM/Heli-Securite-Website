import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Users } from 'lucide-react'
import { Carousel, Card } from '../ui/apple-cards-carousel'

export default function CrewManagement() {
  const t = useTranslations('Management.crewManagement')

  const cards = [
    {
      src: '/images/index/hero.webp',
      title: 'Formation et Certification',
      category: 'Équipage',
      content: (
        <div className="text-black font-brother">
          <p>
            Nos équipages sont entièrement certifiés et formés selon les normes les plus strictes de
            l&apos;industrie aéronautique.
          </p>
        </div>
      ),
    },
    {
      src: '/images/index/jet.webp',
      title: 'Équipage Dédié',
      category: 'Service',
      content: (
        <div className="text-black font-brother">
          <p>Un équipage dédié à votre service pour un vol personnalisé et confortable.</p>
        </div>
      ),
    },
    {
      src: '/images/index/private.webp',
      title: 'Service Flexible',
      category: 'Qualité',
      content: (
        <div className="text-black font-brother">
          <p>
            Notre service s&apos;adapte à vos besoins spécifiques pour une expérience sur mesure.
          </p>
        </div>
      ),
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-primary-button/10 flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-primary-button" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4 font-brother">{t('title')}</h2>
          <div className="max-w-3xl">
            <p className="text-black font-brother">{t('description')}</p>
          </div>
        </div>

        <Carousel
          items={cards.map((card, index) => (
            <Card key={index} card={card} index={index} layout={true} />
          ))}
        />
      </div>
    </section>
  )
}
