'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import type { PanoramicFlight, Destination as PayloadDestination } from '../../payload-types'

interface FlightRouteProps {
  panoramicFlight: PanoramicFlight | null
}

interface Stop {
  name: string
  isMainStop: boolean
}

export default function FlightRoute({ panoramicFlight }: FlightRouteProps) {
  const t = useTranslations('Panoramic.route')
  const [stops, setStops] = useState<Stop[]>([])

  useEffect(() => {
    if (panoramicFlight && panoramicFlight.routes && panoramicFlight.routes.length > 0) {
      const route = panoramicFlight.routes[0]

      if (panoramicFlight.start && route.end && route.end.length > 0) {
        const startPoint = panoramicFlight.start as PayloadDestination | string
        const startName =
          typeof startPoint === 'string' ? startPoint : startPoint?.title || 'Monaco'

        const routeStops: Stop[] = [{ name: startName, isMainStop: true }]

        route.end.forEach((endpoint) => {
          const poi = endpoint.point_of_interest
          if (poi && typeof poi === 'object' && poi.stops) {
            poi.stops.forEach((stop) => {
              if (stop) {
                const stopName = typeof stop === 'string' ? stop : stop?.title || 'Stop'
                routeStops.push({ name: stopName, isMainStop: false })
              }
            })
          }
        })

        routeStops.push({ name: startName, isMainStop: true })

        if (
          routeStops.length > 2 &&
          routeStops[routeStops.length - 1].name === routeStops[routeStops.length - 2].name
        ) {
          routeStops.pop()
          routeStops[routeStops.length - 1].isMainStop = true
        }

        setStops(routeStops)
      } else {
        setStops([])
      }
    } else {
      setStops([])
    }
  }, [panoramicFlight, t])

  if (!panoramicFlight || stops.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-caslon mb-8 sm:mb-12 md:mb-16 tracking-tight text-primary">
          {t('title')}
        </h1>
        <div className="text-center py-8">No route information available</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-serif font-caslon mb-8 sm:mb-12 md:mb-16 tracking-tight text-primary">
        {t('title')}
      </h1>

      <div className="relative">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-brother">
            {stops[0]?.name || ''}
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-brother">
            {stops[stops.length - 1]?.name || ''}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-[10px] sm:top-[12px] md:top-[14px] left-0 right-0 border-t-2 sm:border-t-3 md:border-t-4 border-dashed border-primary-button z-0"></div>

          <div className="flex justify-between items-start relative z-10 px-2 sm:px-0">
            {stops.map((stop, index) => (
              <div
                key={index}
                className="flex flex-col items-center max-w-[80px] sm:max-w-[100px] md:max-w-[120px]"
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 sm:border-3 md:border-4 border-primary-button bg-white ${index === 0 || index === stops.length - 1 ? 'ring-2 sm:ring-3 md:ring-4 ring-primary-button ring-opacity-30' : ''}`}
                ></div>
                {!stop.isMainStop && (
                  <div className="mt-3 sm:mt-4 md:mt-6 text-center text-gray-600 font-brother text-xs sm:text-sm md:text-base leading-tight">
                    {stop.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
