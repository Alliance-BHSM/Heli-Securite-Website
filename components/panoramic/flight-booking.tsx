'use client'

import { useTranslations } from 'next-intl'
import { useFlightBookingState } from '@/hooks/use-flight-booking-state'
import { useFlightPricing } from '@/hooks/use-flight-pricing'
import { FlightTypeSelector } from './flight-type-selector'
import { DurationSelector } from './duration-selector'
import { PriceAndBooking } from './price-and-booking'
import type { PanoramicFlight } from '@/payload-types'

interface FlightBookingProps {
  panoramicFlight: PanoramicFlight | null
  passengers?: {
    adults: number
    children: number
    infants: number
  }
  onFlightSelectionChange?: (flightType: 'shared' | 'private', duration: number) => void
}

export default function FlightBooking({
  panoramicFlight,
  passengers,
  onFlightSelectionChange,
}: FlightBookingProps) {
  const t = useTranslations('Panoramic.booking')

  const {
    flightOptions,
    flightType,
    setFlightType,
    duration,
    availableDurations,
    handleDurationChange,
  } = useFlightBookingState({ panoramicFlight, onFlightSelectionChange })

  const price = useFlightPricing(panoramicFlight, flightType, duration)

  if (!panoramicFlight) {
    return (
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="bg-primary rounded-3xl p-4 sm:p-6 lg:p-8 text-white text-center">
          <p className="text-base sm:text-lg">{t('noFlightSelected')}</p>
        </div>
      </div>
    )
  }

  const hasSharedOption = flightOptions.shared !== null
  const hasPrivateOption = flightOptions.private !== null

  if (!hasSharedOption && !hasPrivateOption) {
    return (
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="bg-primary rounded-3xl p-4 sm:p-6 lg:p-8 text-white text-center">
          <p className="text-base sm:text-lg">{t('noFlightOptions')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="bg-black rounded-3xl p-3 sm:p-4 lg:p-6 flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
        <FlightTypeSelector
          flightType={flightType}
          onFlightTypeChange={(value) => setFlightType(value as 'shared' | 'private')}
          sharedOption={flightOptions.shared}
          privateOption={flightOptions.private}
        />

        <DurationSelector
          duration={duration}
          availableDurations={availableDurations}
          onDurationChange={handleDurationChange}
        />

        <PriceAndBooking
          price={price}
          panoramicFlight={panoramicFlight}
          passengers={passengers}
          flightType={flightType}
          duration={duration}
        />
      </div>
    </div>
  )
}
