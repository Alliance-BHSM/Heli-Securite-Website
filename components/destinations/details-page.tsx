import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Destination } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface DestinationProps {
  destination: Destination
}

const DetailsPage: React.FC<DestinationProps> = ({ destination }) => {
  const t = useTranslations('Contact')
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 justify-items-center items-center py-10 px-6 sm:px-10 md:px-20 lg:px-40">
        <div>
          <RichText
            data={destination.description}
            className="rich-text font-brother text-sm sm:text-base md:text-lg"
          />
        </div>
      </div>
      <div className="mt-10 md:mt-20 bg-black flex flex-col items-center justify-center py-10 px-6 sm:px-10 md:px-20 lg:px-40">
        <h3 className="font-caslon text-white text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8">
          {destination.custom_text}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destination.advantages.map((advantage, index) => (
            <div
              key={advantage.id || index}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-md flex flex-col justify-center items-center"
            >
              <h4 className="font-brother text-secondary-button text-lg sm:text-2xl mb-2 sm:mb-3 text-center">
                {advantage.title}
              </h4>
              <p className="text-center text-black font-brother text-sm sm:text-base">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
        <Link href={'/flights'}>
          <Button variant={'red'} size={'lg'} className={'mt-6'}>
            {t('CTA')}
          </Button>
        </Link>
      </div>
      <div className="mt-10 md:mt-20 flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 lg:px-40">
        {destination.additional_content ? (
          <RichText
            data={destination.additional_content}
            className="rich-text font-brother text-sm sm:text-base md:text-lg"
          />
        ) : null}
      </div>
    </div>
  )
}

export default DetailsPage
