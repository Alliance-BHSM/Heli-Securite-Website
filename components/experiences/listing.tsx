'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Experience } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { PaginatedDocs } from 'payload'

const ExperiencesListing = ({ data }: { data: { experience: PaginatedDocs<Experience> } }) => {
  const t = useTranslations('Experiences.gastronomy')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredExperiences = selectedType
    ? data.experience.docs.filter((experience) => experience.type === selectedType)
    : data.experience.docs

  const handleTypeClick = (type: string) => {
    setSelectedType((prevType) => (prevType === type ? null : type))
  }

  return (
    <section id={'listing'} className={'px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20'}>
      <div className={'flex flex-wrap items-center justify-center gap-3 mb-5'}>
        <div
          className={`relative w-64 h-24 rounded-4xl bg-primary border ${selectedType === 'gastronomy' ? 'border-2 border-secondary-button' : 'border-black'} overflow-hidden cursor-pointer hover:opacity-90 transition-all`}
          onClick={() => handleTypeClick('gastronomy')}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-brother text-2xl font-medium px-3 text-center">
              {t('filters.gastronomy')}
            </span>
          </div>
        </div>
        <div
          className={`relative w-64 h-24 bg-secondary-button rounded-4xl border ${selectedType === 'lifestyle' ? 'border-2 border-secondary-button' : 'border-black'} overflow-hidden cursor-pointer hover:opacity-90 transition-all`}
          onClick={() => handleTypeClick('lifestyle')}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-brother text-2xl font-medium px-3 text-center">
              {t('filters.lifestyle')}
            </span>
          </div>
        </div>
      </div>

      {selectedType && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setSelectedType(null)}
            className="text-xs font-brother text-secondary-button hover:underline"
          >
            {t('filters.all')}
          </button>
        </div>
      )}

      <hr className="h-[2px] bg-black my-5 w-full" />

      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((card) => (
            <div
              className={
                'flex-col flex justify-between w-full h-[550px] border-2 border-black rounded-lg p-3'
              }
              key={card.id}
            >
              <div>
                <Image
                  src={
                    typeof card.image === 'string'
                      ? card.image
                      : card.image?.url || '/images/placeholder.png'
                  }
                  alt={(typeof card.image !== 'string' && card.image?.alt) || 'Experience image'}
                  width={(typeof card.image === 'string' ? undefined : card.image?.width) || 500}
                  height={(typeof card.image === 'string' ? undefined : card.image?.height) || 500}
                  className={'rounded-lg h-[250px] w-full object-cover object-center'}
                />
                <h3 className={'font-brother text-sm'}>{card.location}</h3>
                <h2 className={'font-brother font-bold text-2xl'}>{card.name}</h2>
                <h2 className={'text-lg font-brother pb-2'}>{card.subtitle}</h2>
              </div>
              <div>
                <div className={'text-lg font-brother font-bold pb-2 flex flex-row'}>
                  <p className={'mr-1'}>{t('card.price')}</p>
                  <p className={'text-primary-button'}>{card.price}</p>
                  <p className={'text-primary-button mx-1'}>EURO/PERS</p>
                </div>
                <Link href={`/experiences/${card.slug}`} className="block">
                  <Button className={'text-base'} size={'lg'} variant={'red'}>
                    {t('CTA')}
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="font-brother text-lg">No experiences found for this type.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ExperiencesListing
