import React from 'react'
import { Clock } from 'lucide-react'
import { RegularFlight, Destination } from '@/payload-types'
import { useTranslations } from 'next-intl'

interface ScheduleProps {
  routeData: RegularFlight
  startPoint?: Destination | null
  endPoint?: Destination | null
  isReversed?: boolean
}

export default function Schedule({
  routeData,
  startPoint,
  endPoint,
  isReversed = false,
}: ScheduleProps) {
  const t = useTranslations('RegularLine.schedule')

  const frequencyMinutes = routeData?.time_frames?.frequency || 10
  const flightDurationMinutes = routeData?.time_frames?.average_flight_duration || 7
  const returnDepartureDelay = routeData?.time_frames?.return_departure_delay || 5
  const firstDeparture = routeData?.time_frames?.first_departure || '08:00'
  const lastDeparture = routeData?.time_frames?.last_departure || '19:00'

  const calculateArrivalTime = (departureTime: string) => {
    const [hours, minutes] = departureTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + flightDurationMinutes
    const arrivalHours = Math.floor(totalMinutes / 60) % 24
    const arrivalMinutes = totalMinutes % 60
    return `${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes.toString().padStart(2, '0')}`
  }

  const calculateReturnDepartureTime = (arrivalTime: string) => {
    const [hours, minutes] = arrivalTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + returnDepartureDelay
    const returnHours = Math.floor(totalMinutes / 60) % 24
    const returnMinutes = totalMinutes % 60
    return `${returnHours.toString().padStart(2, '0')}:${returnMinutes.toString().padStart(2, '0')}`
  }

  const firstReturnDeparture = calculateReturnDepartureTime(calculateArrivalTime(firstDeparture))
  const lastReturnDeparture = calculateReturnDepartureTime(calculateArrivalTime(lastDeparture))

  const originalStartName =
    typeof routeData?.start_point === 'object' ? routeData?.start_point?.title : t('departure')
  const originalEndName =
    typeof routeData?.end_point === 'object' ? routeData?.end_point?.title : t('arrival')

  const startName = startPoint?.title || originalStartName
  const endName = endPoint?.title || originalEndName

  const isRouteReversed =
    isReversed || (startName === originalEndName && endName === originalStartName)

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-primary">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-brother text-primary">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-button"></div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 pl-3 sm:pl-4 font-brother text-primary">
              {startName} → {endName}
            </h3>
            <div className="space-y-4 sm:space-y-6 pl-3 sm:pl-4">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('first-departure')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {isRouteReversed ? firstReturnDeparture : firstDeparture}
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('frequency')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {t('every')} {frequencyMinutes} {t('minutes-peaktime')}
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('last-flight')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {isRouteReversed ? lastReturnDeparture : lastDeparture}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-button"></div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 pl-3 sm:pl-4 font-brother text-primary">
              {endName} → {startName}
            </h3>
            <div className="space-y-4 sm:space-y-6 pl-3 sm:pl-4">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('first-departure')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {isRouteReversed ? firstDeparture : firstReturnDeparture}
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('frequency')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {t('every')} {frequencyMinutes} {t('minutes-peaktime')}
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-button"></div>
                <p className="font-semibold font-brother text-primary">{t('last-flight')}</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  {isRouteReversed ? lastDeparture : lastReturnDeparture}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary-button" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-brother text-primary">
                {t('flight-time.title')}
              </h3>
              <p className="font-brother text-sm sm:text-base text-primary">
                {t('flight-time.description')} {t('flight-time.average')}: {flightDurationMinutes}{' '}
                {t('minutes')}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
