'use client'

import Image from 'next/image'
import { Shield, Eye, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import type { PanoramicFlight, Fleet, Destination as PayloadDestination } from '@/payload-types'
import { Link } from '@/i18n/navigation'

interface HelicopterTourProps {
  panoramicFlight: PanoramicFlight | null
  passengers?: {
    adults: number
    children: number
    infants: number
  }
}

interface PricedHelicopter {
  title: string
  passengers: string | null | undefined
  price: number
}

export default function HelicopterTour({ panoramicFlight, passengers }: HelicopterTourProps) {
  const t = useTranslations('Panoramic.advantages')

  const DEFAULT_HELICOPTER_MODELS = ['Airbus H130', 'H125']
  const DEFAULT_PASSENGER_CAPACITY = '5 à 6 passagers'
  const DEFAULT_DESTINATION = 'Nice'
  const DEFAULT_REGION = 'la Riviera'

  const icons = useMemo(
    () => ({
      Eye: <Eye className="w-5 h-5 text-primary-button" />,
      Shield: <Shield className="w-5 h-5 text-primary-button" />,
      Users: <Users className="w-5 h-5 text-primary-button" />,
    }),
    [],
  )

  const featuresConfig = useMemo(
    () => [
      {
        key: 'views',
        icon: 'Eye' as keyof typeof icons,
        titleKey: 'features.0.title',
        descriptionKey: 'features.0.description',
      },
      {
        key: 'security',
        icon: 'Shield' as keyof typeof icons,
        titleKey: 'features.1.title',
        descriptionKey: 'features.1.description',
      },
      {
        key: 'flexibility',
        icon: 'Users' as keyof typeof icons,
        titleKey: 'features.2.title',
        descriptionKey: 'features.2.description',
      },
    ],
    [],
  )

  const processedData = useMemo(() => {
    if (!panoramicFlight || !panoramicFlight.routes) {
      return {
        helicopterModelNames: DEFAULT_HELICOPTER_MODELS,
        passengerCapacityDisplay: DEFAULT_PASSENGER_CAPACITY,
        destinationName: DEFAULT_DESTINATION,
        regionName: DEFAULT_REGION,
        imageSrc: '/images/index/hero.webp',
        imageAlt: 'Hélicoptère survolant la côte',
      }
    }

    const pricedHelicopterOffers: PricedHelicopter[] = []

    panoramicFlight.routes.forEach((route) => {
      route.end?.forEach((endpoint) => {
        const poi = endpoint.point_of_interest
        if (poi && typeof poi === 'object' && poi.fleets) {
          poi.fleets.forEach((fleetEntry) => {
            if (
              fleetEntry.fleet &&
              typeof fleetEntry.fleet === 'object' &&
              fleetEntry.fleet.helicopter &&
              typeof fleetEntry.fleet.helicopter === 'object' &&
              typeof fleetEntry.fleet.price === 'number'
            ) {
              const helicopterData = fleetEntry.fleet.helicopter as Fleet
              pricedHelicopterOffers.push({
                title: helicopterData.name || 'Unnamed Helicopter',
                passengers: helicopterData.passengers,
                price: fleetEntry.fleet.price,
              })
            }
          })
        }
      })
    })

    pricedHelicopterOffers.sort((a, b) => b.price - a.price)

    const topTwoDistinctHelicopters: { title: string; passengers: string | null | undefined }[] = []
    const addedModelTitles = new Set<string>()

    for (const offer of pricedHelicopterOffers) {
      if (topTwoDistinctHelicopters.length < 2 && !addedModelTitles.has(offer.title)) {
        topTwoDistinctHelicopters.push({ title: offer.title, passengers: offer.passengers })
        addedModelTitles.add(offer.title)
      }
      if (topTwoDistinctHelicopters.length === 2) break
    }

    let helicopterModelNames = DEFAULT_HELICOPTER_MODELS
    let passengerCapacityDisplay = DEFAULT_PASSENGER_CAPACITY

    if (topTwoDistinctHelicopters.length > 0) {
      helicopterModelNames = topTwoDistinctHelicopters.map((h) => h.title)

      if (topTwoDistinctHelicopters.length === 1) {
        const p1 = topTwoDistinctHelicopters[0].passengers
        passengerCapacityDisplay = p1 && p1.trim() !== '' ? p1 : DEFAULT_PASSENGER_CAPACITY
      } else {
        const p1 = topTwoDistinctHelicopters[0].passengers
        const p2 = topTwoDistinctHelicopters[1].passengers

        const p1Display = p1 && p1.trim() !== '' ? p1 : null
        const p2Display = p2 && p2.trim() !== '' ? p2 : null

        if (p1Display && p2Display) {
          passengerCapacityDisplay = `${p1Display} ou ${p2Display}`
        } else if (p1Display) {
          passengerCapacityDisplay = p1Display
        } else if (p2Display) {
          passengerCapacityDisplay = p2Display
        }
      }
    }

    let destinationName = DEFAULT_DESTINATION
    const regionName = DEFAULT_REGION

    if (panoramicFlight.routes && panoramicFlight.routes.length > 0) {
      const firstRoute = panoramicFlight.routes[0]
      if (firstRoute?.end?.length > 0) {
        const firstEndpoint = firstRoute.end[0]
        if (
          firstEndpoint?.point_of_interest &&
          typeof firstEndpoint.point_of_interest === 'object'
        ) {
          const poi = firstEndpoint.point_of_interest
          if (poi.stops && poi.stops.length > 0) {
            const firstStop = poi.stops[0]
            if (firstStop && typeof firstStop === 'object' && firstStop.title) {
              destinationName = firstStop.title
            }
          }
        }
      }
    }

    const imageSrc =
      panoramicFlight.image &&
      typeof panoramicFlight.image === 'object' &&
      panoramicFlight.image.url
        ? panoramicFlight.image.url
        : '/images/index/hero.webp'
    const imageAlt =
      panoramicFlight.image &&
      typeof panoramicFlight.image === 'object' &&
      panoramicFlight.image.alt
        ? panoramicFlight.image.alt
        : 'Hélicoptère survolant la côte'

    return {
      helicopterModelNames,
      passengerCapacityDisplay,
      destinationName,
      regionName,
      imageSrc,
      imageAlt,
    }
  }, [panoramicFlight])

  const {
    helicopterModelNames,
    passengerCapacityDisplay,
    destinationName,
    regionName,
    imageSrc,
    imageAlt,
  } = processedData

  const dynamicSecurityDescription = useMemo(
    () =>
      `Nos hélicoptères ${helicopterModelNames.join(' ou ')} offrent un vol silencieux et confortable pour ${passengerCapacityDisplay}.`,
    [helicopterModelNames, passengerCapacityDisplay],
  )

  if (!panoramicFlight) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-caslon font-bold text-primary mb-12 max-w-md">
          {t('title')}
        </h1>
        <p className="text-center">{t('noFlightDataAvailable')}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-serif font-caslon font-bold text-primary mb-12 max-w-md">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {featuresConfig.map((feature) => (
          <div key={feature.key} className="bg-gray-100 p-6 rounded-lg">
            <div className="w-10 h-10 bg-primary-button/10 rounded-full flex items-center justify-center mb-4">
              {icons[feature.icon]}
            </div>
            <h3 className="font-bold font-brother text-xl mb-3">{t(feature.titleKey as any)}</h3>
            <p className="text-gray-700 font-brother">
              {feature.key === 'security'
                ? dynamicSecurityDescription
                : t(feature.descriptionKey as any)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <p className="text-gray-800 font-brother">{dynamicSecurityDescription}</p>

          <p className="text-gray-800 font-brother">
            {`Prêt à vivre une expérience inoubliable ? Réservez dès maintenant votre vol panoramique en hélicoptère au départ de ${destinationName} et découvrez la splendeur de ${regionName} depuis le ciel.`}
          </p>

          <p className="text-gray-800 font-brother">{t('cta.paragraph2')}</p>

          <p className="text-gray-800 font-brother">{t('cta.paragraph3')}</p>

          {typeof panoramicFlight.start !== 'string' && (
            <div className="flex justify-end">
              <Link
                href={{
                  pathname: `/booking/panoramic/${panoramicFlight.start.slug}/${panoramicFlight.start.slug}`,
                  query: passengers
                    ? {
                        passengers: [
                          passengers.adults.toString(),
                          passengers.children.toString(),
                          passengers.infants.toString(),
                        ],
                      }
                    : undefined,
                }}
              >
                <Button
                  variant={'red'}
                  className="bg-primary-button hover:bg-primary-button/90 text-white font-brother"
                >
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
