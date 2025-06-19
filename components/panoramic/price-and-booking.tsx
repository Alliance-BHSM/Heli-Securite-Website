import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { PanoramicFlight, Destination } from '@/payload-types'

interface PriceAndBookingProps {
  price: number | null
  panoramicFlight: PanoramicFlight | null
  passengers?: {
    adults: number
    children: number
    infants: number
  }
  flightType: 'shared' | 'private'
  duration: number
}

export const PriceAndBooking = ({
  price,
  panoramicFlight,
  passengers,
  flightType,
  duration,
}: PriceAndBookingProps) => {
  const t = useTranslations('Panoramic.booking')

  const canShowBookingButton = panoramicFlight?.start && typeof panoramicFlight.start !== 'string'
  const startDestination = canShowBookingButton ? (panoramicFlight.start as Destination) : null

  return (
    <div className="bg-primary/80 rounded-2xl p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">
      <div className="flex flex-col items-center justify-center h-[calc(100%-3.5rem)] flex-grow">
        <div className="flex flex-col items-center">
          <span className="text-secondary text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-brother text-center">
            {price ? `${price}€` : t('price')}
          </span>
          <span className="text-white text-base sm:text-lg lg:text-xl font-brother text-center">
            {t('perFlight')}
          </span>
        </div>
      </div>

      {startDestination && (
        <Link
          href={{
            pathname: `/booking/panoramic/${startDestination.slug}/${startDestination.slug}`,
            query: passengers
              ? {
                  passengers: [
                    passengers.adults.toString(),
                    passengers.children.toString(),
                    passengers.infants.toString(),
                  ],
                  type: flightType,
                  duration: duration.toString(),
                }
              : {
                  type: flightType,
                  duration: duration.toString(),
                },
          }}
        >
          <Button
            variant={'red'}
            className="text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg lg:text-xl font-medium w-full bg-secondary hover:bg-secondary/75 transition-colors font-brother uppercase"
          >
            {t('bookButton')}
          </Button>
        </Link>
      )}
    </div>
  )
}
