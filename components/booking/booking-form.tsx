'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowRight, ChevronDown, ArrowLeftRight, Plus, X } from 'lucide-react'
import type { RegularFlight, Destination, PanoramicFlight } from '@/payload-types'
import { QueryParams } from 'next-intl/navigation'
import { TravelersDropdown } from '@/components/regular-line/travelers-dropdown'
import {
  convertIdToSlug,
  generateFlightSlug,
  type FlightData,
  generateMultipleFlightsPath,
} from '@/lib/destination-mapping'

interface BookingFormProps {
  initialAllDestinations: Destination[]
  initialRoutes: RegularFlight[]
  initialPanoramicFlights: PanoramicFlight[]
}

const BookingForm = ({
  initialAllDestinations,
  initialRoutes,
  initialPanoramicFlights,
}: BookingFormProps) => {
  const t = useTranslations('Booking')
  const router = useRouter()

  const [flightType, setFlightType] = useState('private-flight')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [newborns, setNewborns] = useState(0)
  const [isReturn, setIsReturn] = useState(false)
  const [availableDestinations, setAvailableDestinations] = useState<Destination[]>([])
  const [availableDepartures, setAvailableDepartures] = useState<Destination[]>([])
  const [allDestinations, setAllDestinations] = useState<Destination[]>(initialAllDestinations)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [routes, setRoutes] = useState<RegularFlight[]>(initialRoutes)
  const [panoramicFlights, setPanoramicFlights] =
    useState<PanoramicFlight[]>(initialPanoramicFlights)
  const [maxPassengers, setMaxPassengers] = useState(6)

  const [flights, setFlights] = useState<FlightData[]>([
    {
      id: '1',
      departure: '',
      destination: '',
      adults: 1,
      children: 0,
      newborns: 0,
      isReturn: false,
    },
  ])

  const addFlight = () => {
    const newFlight: FlightData = {
      id: Date.now().toString(),
      departure: '',
      destination: '',
      adults: 1,
      children: 0,
      newborns: 0,
      isReturn: false,
    }
    setFlights([...flights, newFlight])
  }

  const removeFlight = (flightId: string) => {
    if (flights.length > 1) {
      setFlights(flights.filter((flight) => flight.id !== flightId))
    }
  }

  const updateFlight = (flightId: string, updates: Partial<FlightData>) => {
    setFlights(
      flights.map((flight) => (flight.id === flightId ? { ...flight, ...updates } : flight)),
    )
  }

  const encodeFlightsToUrl = (flights: FlightData[]) => {
    return encodeURIComponent(JSON.stringify(flights))
  }

  const decodeFlightsFromUrl = (encoded: string): FlightData[] => {
    try {
      return JSON.parse(decodeURIComponent(encoded))
    } catch {
      return [
        {
          id: '1',
          departure: '',
          destination: '',
          adults: 1,
          children: 0,
          newborns: 0,
          isReturn: false,
        },
      ]
    }
  }

  useEffect(() => {
    if (loading || allDestinations.length === 0) {
      setAvailableDepartures([])
      return
    }

    let filteredDepartures: Destination[] = []

    if (flightType === 'regular-line') {
      if (routes.length > 0) {
        const departureIds = new Set<string>()
        routes.forEach((route) => {
          const startId =
            typeof route.start_point === 'string' ? route.start_point : route.start_point.id
          departureIds.add(startId)
          const endId = typeof route.end_point === 'string' ? route.end_point : route.end_point.id
          departureIds.add(endId)
        })
        filteredDepartures = allDestinations.filter((dest) => departureIds.has(dest.id))
      }
    } else if (flightType === 'private-flight') {
      filteredDepartures = allDestinations
    } else if (flightType === 'panoramic-flight') {
      if (panoramicFlights.length > 0) {
        const startIds = new Set<string>()
        panoramicFlights.forEach((flight) => {
          const startId = typeof flight.start === 'string' ? flight.start : flight.start.id
          startIds.add(startId)
        })
        filteredDepartures = allDestinations.filter((dest) => startIds.has(dest.id))
      }
    }

    if (filteredDepartures.length > 0) {
      setAvailableDepartures(filteredDepartures)
    } else if (flightType === 'private-jet') {
      setAvailableDepartures(allDestinations)
    } else {
      setAvailableDepartures([])
    }
  }, [flightType, loading, allDestinations, routes, panoramicFlights])

  useEffect(() => {
    if (flightType === 'private-flight' && flights.length > 0) {
      const firstFlight = flights[0]
      setDeparture(firstFlight.departure)
      setDestination(firstFlight.destination)
      setAdults(firstFlight.adults)
      setChildren(firstFlight.children)
      setNewborns(firstFlight.newborns)
      setIsReturn(firstFlight.isReturn)
      setPassengers(String(firstFlight.adults + firstFlight.children))
    }
  }, [flights, flightType])

  useEffect(() => {
    if (flightType === 'panoramic-flight') {
      if (panoramicFlights.length > 0) {
        const startIds = new Set<string>()
        panoramicFlights.forEach((flight) => {
          const startId = typeof flight.start === 'string' ? flight.start : flight.start.id
          startIds.add(startId)
        })
        const filteredDestinations = allDestinations.filter((dest) => startIds.has(dest.id))
        setAvailableDestinations(filteredDestinations)
      }
      return
    }

    if (flightType === 'private-flight') {
      setAvailableDestinations(allDestinations.filter((dest) => dest.id !== departure))
      return
    }

    if (departure) {
      if (flightType === 'regular-line') {
        const forwardRoutes = routes.filter((route) => {
          const startId =
            typeof route.start_point === 'string' ? route.start_point : route.start_point.id
          return startId === departure
        })

        const reverseRoutes = routes.filter((route) => {
          const endId = typeof route.end_point === 'string' ? route.end_point : route.end_point.id
          return endId === departure
        })

        const forwardDestIds = forwardRoutes.map((route) => {
          return typeof route.end_point === 'string' ? route.end_point : route.end_point.id
        })

        const reverseDestIds = reverseRoutes.map((route) => {
          return typeof route.start_point === 'string' ? route.start_point : route.start_point.id
        })

        const availableDestIds = [...forwardDestIds, ...reverseDestIds]
        const uniqueDestIds = [...new Set(availableDestIds)]
        const filteredDestinations = allDestinations.filter((dest) =>
          uniqueDestIds.includes(dest.id),
        )
        setAvailableDestinations(filteredDestinations)

        if (destination && !uniqueDestIds.includes(destination)) {
          setDestination('')
        }
      } else {
        setAvailableDestinations([])
      }
    } else {
      setAvailableDestinations([])
    }
  }, [departure, destination, routes, allDestinations, flightType, panoramicFlights])

  useEffect(() => {
    if (flightType === 'panoramic-flight' || flightType === 'private-flight') {
      return
    }

    if (destination) {
      if (flightType === 'regular-line') {
        const forwardRoutes = routes.filter((route) => {
          const endId = typeof route.end_point === 'string' ? route.end_point : route.end_point.id
          return endId === destination
        })

        const reverseRoutes = routes.filter((route) => {
          const startId =
            typeof route.start_point === 'string' ? route.start_point : route.start_point.id
          return startId === destination
        })

        const forwardDepIds = forwardRoutes.map((route) => {
          return typeof route.start_point === 'string' ? route.start_point : route.start_point.id
        })

        const reverseDepIds = reverseRoutes.map((route) => {
          return typeof route.end_point === 'string' ? route.end_point : route.end_point.id
        })

        const availableDepIds = [...forwardDepIds, ...reverseDepIds]
        const uniqueDepIds = [...new Set(availableDepIds)]
        const filteredDepartures = allDestinations.filter((dest) => uniqueDepIds.includes(dest.id))
        if (JSON.stringify(availableDepartures) !== JSON.stringify(filteredDepartures)) {
          setAvailableDepartures(filteredDepartures)
        }

        if (departure && !uniqueDepIds.includes(departure)) {
          setDeparture('')
        }
      } else {
        if (JSON.stringify(availableDepartures) !== JSON.stringify(allDestinations)) {
          setAvailableDepartures(allDestinations)
        }
      }
    }
  }, [destination, departure, routes, allDestinations, flightType, panoramicFlights])

  const handleTravelersChange = (newAdults: number, newChildren: number, newNewborns: number) => {
    setAdults(newAdults)
    setChildren(newChildren)
    setNewborns(newNewborns)
    setPassengers(String(newAdults + newChildren))

    if (flightType === 'private-flight' && flights.length > 0) {
      updateFlight(flights[0].id, {
        adults: newAdults,
        children: newChildren,
        newborns: newNewborns,
      })
    }
  }

  const handleFlightTypeChange = (value: string) => {
    setFlightType(value)
    setDeparture('')
    setDestination('')

    setFlights([
      {
        id: '1',
        departure: '',
        destination: '',
        adults: 1,
        children: 0,
        newborns: 0,
        isReturn: false,
      },
    ])

    if (value === 'panoramic-flight') {
      setIsReturn(false)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (flightType === 'private-flight' && flights.length > 1) {
      const isValid = flights.every((flight) => flight.departure && flight.destination)
      if (!isValid) {
        return
      }

      const { path, passengers } = generateMultipleFlightsPath(flights, allDestinations)
      const query: QueryParams = {}
      query.passengers = passengers

      router.push({ pathname: path, query })
      return
    }

    let pathname = ''
    const query: QueryParams = {}

    if (flightType === 'regular-line') {
      const departureSlug = convertIdToSlug(allDestinations, departure)
      const destinationSlug = convertIdToSlug(allDestinations, destination)

      pathname = `/flights/regular/${departureSlug}/${destinationSlug}`
      query.passengers = [String(adults), String(children), String(newborns)]

      if (isReturn) {
        query.isReturn = 'true'
      } else {
        query.oneway = 'true'
      }
    } else if (flightType === 'panoramic-flight') {
      const destinationSlug = convertIdToSlug(allDestinations, destination)

      pathname = `/flights/panoramic/${destinationSlug}/${destinationSlug}`
      query.passengers = [String(adults), String(children), String(newborns)]
    } else if (flightType === 'private-flight') {
      const departureSlug = convertIdToSlug(allDestinations, departure)
      const destinationSlug = convertIdToSlug(allDestinations, destination)

      pathname = `/booking/private/${departureSlug}/${destinationSlug}`
      query.passengers = [String(adults), String(children), String(newborns)]

      if (isReturn) {
        query.isReturn = 'true'
      } else {
        query.oneway = 'true'
      }
    }

    router.push({ pathname, query })
  }

  const switchLocations = () => {
    const temp = departure
    setDeparture(destination)
    setDestination(temp)
  }

  const renderFlightCard = (flight: FlightData, index: number) => {
    const isFirstFlight = index === 0
    const isLastFlight = index === flights.length - 1

    const getAvailableDestinationsForFlight = (flightDeparture: string) => {
      if (!flightDeparture) return []
      return allDestinations.filter((dest) => dest.id !== flightDeparture)
    }

    const flightAvailableDestinations = getAvailableDestinationsForFlight(flight.departure)

    return (
      <div
        key={flight.id}
        className="bg-white rounded-3xl p-2 shadow-lg mb-6 border-4"
        style={{ borderColor: '#002841' }}
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors cursor-pointer h-20">
              <label className="text-xs text-gray-500 block mb-1">
                {t('booking-form.form.departure.short')}
              </label>
              <div className="flex items-center justify-between">
                <select
                  value={flight.departure}
                  onChange={(e) => updateFlight(flight.id, { departure: e.target.value })}
                  className="text-2xl font-medium text-gray-700 bg-transparent border-none outline-none w-full appearance-none"
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading
                      ? t('booking-form.form.messages.loading-departures')
                      : availableDepartures.length === 0
                        ? t('booking-form.form.messages.no-departures-available')
                        : t('booking-form.form.departure.placeholder')}
                  </option>
                  {availableDepartures.map((dest) => (
                    <option key={`dep-${dest.id}`} value={dest.id}>
                      {dest.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-2">
            <button
              type="button"
              onClick={() => {
                const temp = flight.departure
                updateFlight(flight.id, {
                  departure: flight.destination,
                  destination: temp,
                })
              }}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 relative">
            <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors cursor-pointer h-20">
              <label className="text-xs text-gray-500 block mb-1">
                {t('booking-form.form.destination.short')}
              </label>
              <div className="flex items-center justify-between">
                <select
                  value={flight.destination}
                  onChange={(e) => updateFlight(flight.id, { destination: e.target.value })}
                  className="text-2xl font-medium text-gray-700 bg-transparent border-none outline-none w-full appearance-none"
                  disabled={
                    loading || !flight.departure || flightAvailableDestinations.length === 0
                  }
                >
                  <option value="" disabled>
                    {loading
                      ? t('booking-form.form.messages.loading-destinations')
                      : !flight.departure
                        ? t('booking-form.form.messages.select-departure-first')
                        : flightAvailableDestinations.length === 0
                          ? t('booking-form.form.messages.no-destinations-for-route')
                          : t('booking-form.form.destination.placeholder')}
                  </option>
                  {flightAvailableDestinations.map((dest) => (
                    <option key={`dest-${dest.id}-${flight.id}`} value={dest.id}>
                      {dest.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="lg:w-48">
            <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors h-20">
              <label className="text-xs text-gray-500 block mb-1">
                {t('booking-form.passengers')}
              </label>
              <TravelersDropdown
                maxAdults={maxPassengers}
                maxTotal={maxPassengers}
                onChange={(newAdults, newChildren, newNewborns) => {
                  updateFlight(flight.id, {
                    adults: newAdults,
                    children: newChildren,
                    newborns: newNewborns,
                  })
                }}
                initialAdults={flight.adults}
                initialChildren={flight.children}
                initialNewborns={flight.newborns}
                noBorder={true}
              />
            </div>
          </div>

          <div className="lg:w-48">
            <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors h-20">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-primary-button">
                  {flight.isReturn
                    ? t('booking-form.flight-type.return')
                    : t('booking-form.flight-type.one-way')}
                </span>
                <button
                  type="button"
                  onClick={() => updateFlight(flight.id, { isReturn: !flight.isReturn })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    flight.isReturn ? 'bg-slate-700' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      flight.isReturn ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFirstFlight && (
              <Button
                type="submit"
                size="lg"
                className="bg-primary-button hover:bg-primary-button text-white rounded-xl px-6 h-20 w-full lg:w-auto"
                disabled={loading || flights.some((f) => !f.departure || !f.destination)}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}

            {!isFirstFlight && (
              <button
                type="button"
                onClick={() => removeFlight(flight.id)}
                className="w-full lg:w-12 h-20 bg-primary-button/10 hover:bg-primary-button/20 text-primary-button rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderAddFlightButton = () => (
    <div
      className="bg-white rounded-3xl p-4 shadow-lg mb-6 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
      onClick={addFlight}
    >
      <div className="flex items-center justify-center h-12">
        <Plus className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )

  return (
    <div className="py-6 relative">
      <span className={'absolute z-50 -translate-[64vh] bg-primary-button'} id={'booking-form'} />
      <div className="container mx-auto px-2 sm:px-12">
        <form onSubmit={handleSubmit}>
          {flightType === 'private-flight' ? (
            <>
              {flights.map((flight, index) => renderFlightCard(flight, index))}
              {renderAddFlightButton()}
            </>
          ) : (
            <div
              className="bg-white rounded-3xl p-2 shadow-lg mb-6 border-4"
              style={{ borderColor: '#002841' }}
            >
              <div className="flex flex-col lg:flex-row gap-2">
                {flightType !== 'panoramic-flight' && (
                  <>
                    <div className="flex-1 relative">
                      <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors cursor-pointer h-20">
                        <label className="text-xs text-gray-500 block mb-1">
                          {t('booking-form.form.departure.short')}
                        </label>
                        <div className="flex items-center justify-between">
                          <select
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="text-2xl font-medium text-gray-700 bg-transparent border-none outline-none w-full appearance-none"
                            disabled={loading}
                          >
                            <option value="" disabled>
                              {loading
                                ? t('booking-form.form.messages.loading-departures')
                                : availableDepartures.length === 0
                                  ? t('booking-form.form.messages.no-departures-available')
                                  : t('booking-form.form.departure.placeholder')}
                            </option>
                            {availableDepartures.map((dest) => (
                              <option key={`dep-${dest.id}`} value={dest.id}>
                                {dest.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center p-2">
                      <button
                        type="button"
                        onClick={switchLocations}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <ArrowLeftRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </>
                )}

                <div className="flex-1 relative">
                  <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors cursor-pointer h-20">
                    <label className="text-xs text-gray-500 block mb-1">
                      {flightType === 'panoramic-flight'
                        ? t('booking-form.form.destination.placeholder')
                        : t('booking-form.form.destination.short')}
                    </label>
                    <div className="flex items-center justify-between">
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="text-2xl font-medium text-gray-700 bg-transparent border-none outline-none w-full appearance-none"
                        disabled={
                          loading ||
                          (flightType !== 'panoramic-flight' &&
                            (!departure || availableDestinations.length === 0)) ||
                          (flightType === 'panoramic-flight' && availableDestinations.length === 0)
                        }
                      >
                        <option value="" disabled>
                          {loading
                            ? t('booking-form.form.messages.loading-destinations')
                            : flightType === 'panoramic-flight'
                              ? availableDestinations.length === 0
                                ? t('booking-form.form.messages.no-destinations-available')
                                : t('booking-form.form.messages.select-destination')
                              : !departure
                                ? t('booking-form.form.messages.select-departure-first')
                                : availableDestinations.length === 0
                                  ? t('booking-form.form.messages.no-destinations-for-route')
                                  : t('booking-form.form.destination.placeholder')}
                        </option>
                        {(flightType === 'panoramic-flight'
                          ? availableDestinations
                          : availableDestinations
                        ).map((dest) => (
                          <option key={`dest-${dest.id}`} value={dest.id}>
                            {dest.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="lg:w-48">
                  <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors h-20">
                    <label className="text-xs text-gray-500 block mb-1">
                      {t('booking-form.passengers')}
                    </label>
                    <TravelersDropdown
                      maxAdults={maxPassengers}
                      maxTotal={maxPassengers}
                      onChange={handleTravelersChange}
                      initialAdults={adults}
                      initialChildren={children}
                      initialNewborns={newborns}
                      noBorder={true}
                    />
                  </div>
                </div>

                {(flightType === 'regular-line' ||
                  flightType === 'private-flight' ||
                  flightType === 'private-jet') && (
                  <div className="lg:w-48">
                    <div className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors h-20">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-primary-button">
                          {isReturn
                            ? t('booking-form.flight-type.return')
                            : t('booking-form.flight-type.one-way')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsReturn(!isReturn)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isReturn ? 'bg-slate-700' : 'bg-slate-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isReturn ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-primary-button hover:bg-primary-button text-white rounded-xl px-6 h-20 w-full lg:w-auto"
                    disabled={
                      loading || !destination || (flightType !== 'panoramic-flight' && !departure)
                    }
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => handleFlightTypeChange('private-flight')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                flightType === 'private-flight'
                  ? 'text-primary-button font-semibold'
                  : 'text-gray-600 hover:text-primary-button'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  flightType === 'private-flight'
                    ? 'bg-primary-button'
                    : 'bg-transparent border border-gray-400'
                }`}
              />
              {t('booking-form.flight-types.private-flight')}
            </button>

            <button
              type="button"
              onClick={() => handleFlightTypeChange('regular-line')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                flightType === 'regular-line'
                  ? 'text-primary-button font-semibold'
                  : 'text-gray-600 hover:text-primary-button'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  flightType === 'regular-line'
                    ? 'bg-primary-button'
                    : 'bg-transparent border border-gray-400'
                }`}
              />
              {t('booking-form.flight-types.regular-line')}
            </button>

            <button
              type="button"
              onClick={() => handleFlightTypeChange('panoramic-flight')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                flightType === 'panoramic-flight'
                  ? 'text-primary-button font-semibold'
                  : 'text-gray-600 hover:text-primary-button'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  flightType === 'panoramic-flight'
                    ? 'bg-primary-button'
                    : 'bg-transparent border border-gray-400'
                }`}
              />
              {t('booking-form.flight-types.panoramic-flight')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
