'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import type { PanoramicFlight, Destination } from '@/payload-types'
import { validateForm, validationConfigs, hasFieldError, getFieldError } from '@/lib/validation'

import FlightDetails from './flight-details'
import PassengersSection from './passengers-section'
import FleetSelection from './fleet-selection'
import AdditionalOptions from './additional-options'
import ContactInformation from './contact-information'
import BookingSummary from './booking-summary'
import CustomerSupport from './customer-support'

interface BookingFormProps {
  fromParam?: string
  toParam?: string
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
  initialDate?: string
  initialTime?: string
  initialFlex?: boolean
  initialFlightType?: 'shared' | 'private'
  initialDuration?: number
  panoramicFlights?: PanoramicFlight[]
  availableDestinations?: Destination[]
  defaultDestination?: string
}

export default function BookingForm({
  fromParam,
  toParam,
  initialAdults = 2,
  initialChildren = 0,
  initialNewborns = 0,
  initialDate = '',
  initialTime = '',
  initialFlex = false,
  initialFlightType,
  initialDuration,
  panoramicFlights,
  availableDestinations,
  defaultDestination,
}: BookingFormProps) {
  const t = useTranslations('Panoramic.Reservation')

  const [destination, setDestination] = useState(defaultDestination || toParam || 'monaco')
  const [flightType, setFlightType] = useState<'shared' | 'private'>(initialFlightType || 'shared')
  const [duration, setDuration] = useState<number>(initialDuration || 15)
  const [date, setDate] = useState(
    initialDate ||
      (() => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
      })(),
  )
  const [time, setTime] = useState(initialTime)
  const [adults, setAdults] = useState(initialAdults)
  const [childrenCount, setChildrenCount] = useState(initialChildren)
  const [babies, setBabies] = useState(initialNewborns)
  const [hasCancellationInsurance, setHasCancellationInsurance] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [selectedFleetId, setSelectedFleetId] = useState('')

  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const isValidPromoCode = promoCode === 'PANORAMIC2023'

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const currentPanoramicFlight = useMemo(() => {
    if (!panoramicFlights || panoramicFlights.length === 0) return null

    return (
      panoramicFlights.find((flight) => {
        const startPoint = flight.start
        const startSlug = typeof startPoint === 'string' ? startPoint : startPoint?.slug
        return startSlug === destination
      }) || null
    )
  }, [panoramicFlights, destination])

  const availableFlightTypes = useMemo(() => {
    if (!currentPanoramicFlight || !currentPanoramicFlight.routes) {
      return { shared: false, private: false }
    }

    let hasShared = false
    let hasPrivate = false

    currentPanoramicFlight.routes.forEach((route) => {
      route.end?.forEach((endpoint) => {
        const poi = endpoint.point_of_interest
        if (poi && typeof poi === 'object' && poi.fleets) {
          poi.fleets.forEach((fleetEntry) => {
            const fleet = fleetEntry.fleet
            if (fleet && typeof fleet === 'object') {
              if (fleet.type === 'public') hasShared = true
              if (fleet.type === 'private') hasPrivate = true
            }
          })
        }
      })
    })

    return { shared: hasShared, private: hasPrivate }
  }, [currentPanoramicFlight])

  const availableDurations = useMemo(() => {
    if (!currentPanoramicFlight || !currentPanoramicFlight.routes) {
      return [15, 30, 45, 60]
    }

    const durations = new Set<number>()
    const selectedType = flightType === 'shared' ? 'public' : 'private'

    currentPanoramicFlight.routes.forEach((route) => {
      route.end?.forEach((endpoint) => {
        const poi = endpoint.point_of_interest
        if (poi && typeof poi === 'object' && poi.flight_duration && poi.fleets) {
          const hasMatchingFleet = poi.fleets.some((fleetEntry) => {
            const fleet = fleetEntry.fleet
            return fleet && typeof fleet === 'object' && fleet.type === selectedType
          })
          if (hasMatchingFleet) {
            durations.add(poi.flight_duration)
          }
        }
      })
    })

    return Array.from(durations).sort((a, b) => a - b)
  }, [currentPanoramicFlight, flightType])

  const currentPrice = useMemo(() => {
    if (!currentPanoramicFlight || !currentPanoramicFlight.routes) {
      return 390
    }

    const selectedType = flightType === 'shared' ? 'public' : 'private'

    if (selectedFleetId) {
      for (const route of currentPanoramicFlight.routes) {
        if (!route.end) continue

        for (const endpoint of route.end) {
          const poi = endpoint.point_of_interest
          if (!poi || typeof poi === 'string' || !poi.fleets || poi.flight_duration !== duration)
            continue

          for (const fleetEntry of poi.fleets) {
            const fleet = fleetEntry.fleet
            if (!fleet || typeof fleet === 'string' || fleet.type !== selectedType) continue

            const fleetId =
              typeof fleet.helicopter === 'string' ? fleet.helicopter : fleet.helicopter?.id
            if (
              fleetId === selectedFleetId &&
              !fleet.price_on_demand &&
              typeof fleet.price === 'number' &&
              fleet.price > 0
            ) {
              return fleet.price
            }
          }
        }
      }
    }

    for (const route of currentPanoramicFlight.routes) {
      if (!route.end) continue

      for (const endpoint of route.end) {
        const poi = endpoint.point_of_interest
        if (!poi || typeof poi === 'string' || !poi.fleets || poi.flight_duration !== duration)
          continue

        for (const fleetEntry of poi.fleets) {
          const fleet = fleetEntry.fleet
          if (!fleet || typeof fleet === 'string' || fleet.type !== selectedType) continue

          if (!fleet.price_on_demand && typeof fleet.price === 'number' && fleet.price > 0) {
            return fleet.price
          }
        }
      }
    }

    return 390
  }, [currentPanoramicFlight, flightType, duration, selectedFleetId])

  useEffect(() => {
    if (initialFlightType) {
      return
    }

    if (availableFlightTypes.shared) {
      setFlightType('shared')
    } else if (availableFlightTypes.private) {
      setFlightType('private')
    }
  }, [availableFlightTypes, initialFlightType])

  useEffect(() => {
    if (availableDurations.length > 0) {
      if (initialDuration && availableDurations.includes(initialDuration)) {
        setDuration(initialDuration)
      } else if (!availableDurations.includes(duration)) {
        setDuration(availableDurations[0])
      }
    }
  }, [availableDurations, initialDuration])

  const basePrice = currentPrice
  const childPrice = basePrice
  const babyPrice = 0

  const insurancePrice = hasCancellationInsurance ? 30 : 0

  const adultCost = flightType === 'private' ? basePrice : adults * basePrice
  const childCost = flightType === 'private' ? 0 : childrenCount * childPrice
  const babyCost = 0

  const subtotal = adultCost + childCost + babyCost + insurancePrice
  const discount = isValidPromoCode ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      destination,
      flightType,
      duration,
      date,
      time,
      adults,
      firstName,
      lastName,
      email,
      phone,
      acceptTerms,
      companyName,
      isCompany,
    }

    const validation = validateForm(formData, validationConfigs.panoramic)

    if (!validation.isValid) {
      alert('Veuillez corriger les erreurs dans le formulaire')
      return
    }

    if (!acceptTerms) {
      alert('Veuillez accepter les conditions générales')
      return
    }

    ;(e.target as HTMLFormElement).submit()
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form
                action="https://formsubmit.co/contact@helisecurite.fr"
                method="POST"
                onSubmit={handleSubmit}
              >
                <FlightDetails
                  destination={destination}
                  setDestination={setDestination}
                  flightType={flightType}
                  setFlightType={setFlightType}
                  duration={duration}
                  setDuration={setDuration}
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                  availableDestinations={availableDestinations || []}
                  availableFlightTypes={availableFlightTypes}
                  availableDurations={availableDurations}
                  currentPrice={currentPrice}
                />

                <div className="card mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <PassengersSection
                    adults={adults}
                    setAdults={setAdults}
                    childrenCount={childrenCount}
                    setChildren={setChildrenCount}
                    babies={babies}
                    setBabies={setBabies}
                  />
                </div>

                <FleetSelection
                  currentPanoramicFlight={currentPanoramicFlight}
                  flightType={flightType}
                  duration={duration}
                  selectedFleetId={selectedFleetId}
                  setSelectedFleetId={setSelectedFleetId}
                />

                <AdditionalOptions
                  hasCancellationInsurance={hasCancellationInsurance}
                  setHasCancellationInsurance={setHasCancellationInsurance}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  isValidPromoCode={isValidPromoCode}
                />

                <ContactInformation
                  isCompany={isCompany}
                  setIsCompany={setIsCompany}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  acceptTerms={acceptTerms}
                  setAcceptTerms={setAcceptTerms}
                />

                <input
                  type="hidden"
                  name="_subject"
                  value={`Nouvelle réservation de vol: Vol Panoramique - ${destination}`}
                />
                <input
                  type="hidden"
                  name="_next"
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/`}
                />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Merci pour votre réservation de Vol Panoramique avec Heli Securite !"
                />

                <input type="hidden" name="flightType" value="Vol Panoramique" />
                <input type="hidden" name="destination" value={destination} />
                <input type="hidden" name="flightTypeSelected" value={flightType} />
                <input type="hidden" name="duration" value={duration.toString()} />
                <input type="hidden" name="date" value={date} />
                <input type="hidden" name="time" value={time} />
                <input type="hidden" name="selectedFleetId" value={selectedFleetId} />

                <input type="hidden" name="adultsCount" value={adults.toString()} />
                <input type="hidden" name="childrenCount" value={childrenCount.toString()} />
                <input type="hidden" name="babiesCount" value={babies.toString()} />

                <input
                  type="hidden"
                  name="hasCancellationInsurance"
                  value={hasCancellationInsurance ? 'Oui' : 'Non'}
                />
                <input type="hidden" name="promoCode" value={promoCode} />
                <input
                  type="hidden"
                  name="isValidPromoCode"
                  value={isValidPromoCode ? 'Oui' : 'Non'}
                />

                <input type="hidden" name="isCompany" value={isCompany ? 'Oui' : 'Non'} />
                <input type="hidden" name="firstName" value={firstName} />
                <input type="hidden" name="lastName" value={lastName} />
                <input type="hidden" name="companyName" value={companyName} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />

                <input type="hidden" name="basePrice" value={`${basePrice}€`} />
                <input type="hidden" name="childPrice" value={`${childPrice}€`} />
                <input type="hidden" name="babyPrice" value={`${babyPrice}€`} />
                <input type="hidden" name="adultCost" value={`${adultCost}€`} />
                <input type="hidden" name="childCost" value={`${childCost}€`} />
                <input type="hidden" name="babyCost" value={`${babyCost}€`} />
                <input type="hidden" name="insurancePrice" value={`${insurancePrice}€`} />
                <input type="hidden" name="subtotal" value={`${subtotal}€`} />
                <input type="hidden" name="discount" value={`${discount}€`} />
                <input type="hidden" name="totalPrice" value={`${total}€`} />

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start mb-8">
                  <div>
                    <p className="text-sm text-yellow-800">{t('termsValidation.paymentInfo')}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-button text-white py-3 px-6 rounded-lg font-medium"
                  disabled={!acceptTerms}
                >
                  {t('termsValidation.submit')}
                </button>
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-8">
                <BookingSummary
                  destination={destination}
                  date={date}
                  time={time}
                  adults={adults}
                  childrenCount={childrenCount}
                  babies={babies}
                  hasCancellationInsurance={hasCancellationInsurance}
                  promoCode={promoCode}
                  isValidPromoCode={isValidPromoCode}
                  basePrice={basePrice}
                  flightType={flightType}
                  duration={duration}
                />
                <CustomerSupport />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
