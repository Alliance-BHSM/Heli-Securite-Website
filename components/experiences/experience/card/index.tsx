import type { IContext } from '@/context/experiences/experience'
import { ContextProvider, useContext } from '@/context/experiences/experience/card'

import * as ui from '@/components/ui/card'
import Figure from './figure'
import Carousel from './carousel'
import Sidebar from './sidebar'

import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'

const Card = async ({ data }: { data: IContext }) => {
  const t = await getTranslations('Experiences.experience.card')
  return (
    <div className={'w-full flex flex-col lg:flex-row justify-start items-start gap-8'}>
      <ui.Card className={'overflow-hidden w-full lg:w-2/3'}>
        <ContextProvider data={{ photo: data.experience.gallery[0] }}>
          <Figure context={useContext}>
            <Badge className={'absolute top-4 left-4 bg-redmonacair cursor-default'}>
              {data.experience.category}
            </Badge>
          </Figure>

          <ui.CardContent className="w-full p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.experience.name}</h2>
              <p className="text-gray-600 font-medium italic mb-4">{data.experience.subtitle}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{data.experience.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t('duration')} <b>&asymp;</b>{' '}
                    {data.experience.duration >= 60
                      ? `${Math.floor(data.experience.duration / 60)}h${data.experience.duration % 60 > 0 ? String(data.experience.duration % 60).padStart(2, '0') : ''}`
                      : `${data.experience.duration}min`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {data.experience.guests.minimum} {t('participants.connector')}{' '}
                    {data.experience.guests.maximum} {t('participants.label')}
                  </span>
                </div>
              </div>
            </div>

            <RichText
              data={data.experience.text}
              className={'rich-text text-gray-700 mb-6 leading-relaxed max-h-64 overflow-y-auto'}
            />

            <Carousel context={useContext} />

            <div className={'bg-secondary-button text-white p-4 rounded-lg text-center uppercase'}>
              <div className="text-3xl font-bold mb-1">
                {data.experience.price.toLocaleString('fr-FR')}&euro;
              </div>
              <div className="text-sm opacity-90">{t('price')}</div>
            </div>
          </ui.CardContent>
        </ContextProvider>
      </ui.Card>
      <Sidebar
        data={{
          details: data.experience.details,
          departures: data.experience.departures,
          experience: {
            name: data.experience.name,
            guests: data.experience.guests,
          },
        }}
      />
    </div>
  )
}
export default Card
