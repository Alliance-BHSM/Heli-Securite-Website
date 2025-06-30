'use client'

import * as ui from './ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContext } from '@/context/experiences/experience'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import type { IContext } from '@/context/experiences/experience/card'
import { useTranslations } from 'next-intl'

const Carousel = ({ context }: { context: () => IContext }) => {
  const { states } = context()
  const t = useTranslations('Experiences.experience.card')
  return (
    <ui.Carousel
      opts={{ align: 'start', loop: true }}
      className={'w-full mb-6'}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
    >
      <div className="w-full flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{t('gallery')}</h4>
        <div className="flex gap-4">
          <ui.CarouselPrevious>
            <ChevronLeft className="size-4" />
          </ui.CarouselPrevious>
          <ui.CarouselNext>
            <ChevronRight className="size-4" />
          </ui.CarouselNext>
        </div>
      </div>

      <ui.CarouselContent>
        {useContext().experience.gallery.map(
          (media, i) =>
            typeof media !== 'string' && (
              <ui.CarouselItem
                key={i}
                className="basis-1/2 lg:basis-1/3"
                onClick={() => states.setPhoto(media)}
              >
                <Image
                  src={media.url || '/placeholder.svg'}
                  alt={media.alt}
                  width={media.width || 0}
                  height={media.height || 0}
                  className="w-full h-48 lg:h-32 object-cover object-center rounded-lg cursor-pointer"
                />
              </ui.CarouselItem>
            ),
        )}
      </ui.CarouselContent>
    </ui.Carousel>
  )
}

export default Carousel
