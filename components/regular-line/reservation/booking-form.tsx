'use client'

import { useState, FormEvent, useEffect, useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { RegularFlight, Destination } from '@/payload-types'
import {
  getDestinations,
  getRegularFlights,
  getFlightTimeslots,
} from '@/app/(frontend)/[locale]/booking/actions'
import { validateForm, validationConfigs, hasFieldError, getFieldError } from '@/lib/validation'
import { getDestinationTitle, type FlightData } from '@/lib/destination-mapping'

import ProgressSteps from '../reservation/progress-steps'
import FlightType from '../reservation/flight-type'
import FlightDetails from '../reservation/flight-details'
import ContactInformation from '../reservation/contact-information'
import BookingSummary from '../reservation/booking-summary'
import CustomerSupport from '../reservation/customer-support'

interface BookingFormProps {
  initialFlightType?: string
  initialDepartureId: string
  initialArrivalId: string
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
  initialFlex?: boolean
  initialDate?: string
  isRouteInitiallyReversed?: boolean
  initialTime?: string
  initialReturnDate?: string
  initialReturnTime?: string
  initialIsReturn?: boolean
  initialMultipleFlights?: FlightData[]

  initialRouteDetails: RegularFlight | null
  initialDepartureDetails: Destination | null
  initialArrivalDetails: Destination | null
  dataFetchingError?: string | null
}

export default function BookingForm({
  initialFlightType = 'ligne-reguliere',
  initialDepartureId,
  initialArrivalId,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
  initialFlex = false,
  initialDate = '',
  isRouteInitiallyReversed = false,
  initialTime = '',
  initialReturnDate = '',
  initialReturnTime = '',
  initialIsReturn = false,
  initialMultipleFlights,
  initialRouteDetails,
  initialDepartureDetails,
  initialArrivalDetails,
  dataFetchingError,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.Reservation')

  const [currentStep, setCurrentStep] = useState(1)

  const [flightType, setFlightType] = useState(initialFlightType)

  const [multipleFlights, setMultipleFlights] = useState<FlightData[]>(initialMultipleFlights || [])
  const isMultipleFlight = multipleFlights.length > 1

  const [departure, setDeparture] = useState(initialDepartureId)
  const [arrival, setArrival] = useState(initialArrivalId)
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState(initialTime)
  const [adults, setAdults] = useState(initialAdults)
  const [childPassengers, setChildPassengers] = useState(initialChildren)
  const [babies, setBabies] = useState(initialNewborns)
  const [cabinLuggage, setCabinLuggage] = useState(0)
  const [checkedLuggage, setCheckedLuggage] = useState(0)
  const [flex, setFlex] = useState(initialFlex)

  const [isReturn, setIsReturn] = useState(initialIsReturn)

  const [returnDate, setReturnDate] = useState(initialReturnDate)
  const [returnTime, setReturnTime] = useState(initialReturnTime)

  const [hasCommercialFlight, setHasCommercialFlight] = useState(false)
  const [airline, setAirline] = useState('')
  const [flightOriginDestination, setFlightOriginDestination] = useState('')
  const [flightTime, setFlightTime] = useState('')

  const [needsDriverService, setNeedsDriverService] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('')

  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [allDestinations, setAllDestinations] = useState<Destination[]>([])
  const [routes, setRoutes] = useState<RegularFlight[]>([])
  const [availableDestinations, setAvailableDestinations] = useState<Destination[]>([])
  const [availableArrivalDestinations, setAvailableArrivalDestinations] = useState<Destination[]>(
    [],
  )
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [availableReturnTimes, setAvailableReturnTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const departureTitle = isRouteInitiallyReversed
    ? initialArrivalDetails?.title || arrival
    : initialDepartureDetails?.title || departure
  const arrivalTitle = isRouteInitiallyReversed
    ? initialDepartureDetails?.title || departure
    : initialArrivalDetails?.title || arrival

  const getBaseAdultPrice = () => {
    if (initialRouteDetails?.tariffs?.price_per_adult) {
      const basePrice = initialRouteDetails.tariffs.price_per_adult
      return flightType === 'vol-prive' ? Math.round(basePrice * 1.5) : basePrice
    }

    let basePrice = 195
    if (
      (departure === 'nice' && arrival === 'monaco') ||
      (departure === 'monaco' && arrival === 'nice')
    ) {
      basePrice = 195
    } else if (
      (departure === 'nice' && arrival === 'cannes') ||
      (departure === 'cannes' && arrival === 'nice')
    ) {
      basePrice = 220
    } else {
      basePrice = 250
    }

    return flightType === 'vol-prive' ? Math.round(basePrice * 1.5) : basePrice
  }

  const getFlexPrice = () => {
    if (initialRouteDetails?.tariffs?.price_per_flex) {
      return initialRouteDetails.tariffs.price_per_flex
    }
    return getBaseAdultPrice() + 50
  }

  const getAdultPrice = () => {
    const basePrice = getBaseAdultPrice()
    return basePrice
  }

  const getChildPrice = () => {
    const baseChildPrice =
      initialRouteDetails?.tariffs?.price_per_child || getBaseAdultPrice() * 0.8
    const price = flightType === 'vol-prive' ? Math.round(baseChildPrice * 1.5) : baseChildPrice
    return price
  }

  const getBabyPrice = () => {
    return 0
  }

  const getBaggagePrice = () => {
    const baseBaggagePrice = initialRouteDetails?.tariffs?.price_per_baggage || 15
    return flightType === 'vol-prive' ? Math.round(baseBaggagePrice * 1.2) : baseBaggagePrice
  }

  const getCabinBaggagePrice = () => {
    const baseCabinBaggagePrice = initialRouteDetails?.tariffs?.price_per_cabin_baggage || 10
    return flightType === 'vol-prive'
      ? Math.round(baseCabinBaggagePrice * 1.2)
      : baseCabinBaggagePrice
  }

  const adultPrice = getAdultPrice()
  const childPrice = getChildPrice()
  const babyPrice = getBabyPrice()
  const baggagePrice = getBaggagePrice()
  const cabinBaggagePrice = getCabinBaggagePrice()

  const adultCost =
    flex && flightType === 'ligne-reguliere' ? adults * getFlexPrice() : adults * adultPrice
  const childCost =
    flex && flightType === 'ligne-reguliere'
      ? childPassengers * getFlexPrice()
      : childPassengers * childPrice
  const babyCost = 0
  const baggageCost = checkedLuggage * baggagePrice
  const cabinBaggageCost = cabinLuggage * cabinBaggagePrice

  const calculateMultipleFlightsTotal = () => {
    if (!isMultipleFlight) return 0

    return multipleFlights.reduce((total, flight) => {
      const flightAdultCost = flight.adults * adultPrice
      const flightChildCost = flight.children * childPrice
      const flightBabyCost = 0
      const flightBaggageCost = (flight.checkedLuggage || 0) * baggagePrice
      const flightCabinBaggageCost = (flight.cabinLuggage || 0) * cabinBaggagePrice

      const flightTotal =
        flightAdultCost +
        flightChildCost +
        flightBabyCost +
        flightBaggageCost +
        flightCabinBaggageCost
      return total + (flight.isReturn ? flightTotal * 2 : flightTotal)
    }, 0)
  }

  const singleTripTotal = adultCost + childCost + babyCost + baggageCost + cabinBaggageCost
  const total = isMultipleFlight
    ? calculateMultipleFlightsTotal()
    : isReturn
      ? singleTripTotal * 2
      : singleTripTotal

  const allDestinationsIds = useMemo(
    () => allDestinations.map((dest) => dest.id).join(','),
    [allDestinations],
  )

  const routesIds = useMemo(() => routes.map((route) => route.id).join(','), [routes])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [destinationsData, routesData] = await Promise.all([
          getDestinations(),
          getRegularFlights(),
        ])

        setAllDestinations(destinationsData)
        setRoutes(routesData)

        if (initialRouteDetails) {
          const times = await getFlightTimeslots(initialRouteDetails)

          if (
            initialRouteDetails.time_frames?.average_flight_duration &&
            initialRouteDetails.time_frames?.return_departure_delay
          ) {
            const originalStartId =
              typeof initialRouteDetails.start_point === 'string'
                ? initialRouteDetails.start_point
                : initialRouteDetails.start_point?.id
            const originalEndId =
              typeof initialRouteDetails.end_point === 'string'
                ? initialRouteDetails.end_point
                : initialRouteDetails.end_point?.id
            const isRouteReversed = departure === originalEndId && arrival === originalStartId

            if (isRouteReversed) {
              const delayMinutes =
                initialRouteDetails.time_frames.average_flight_duration +
                initialRouteDetails.time_frames.return_departure_delay
              const adjustedTimes = times.map((time) => {
                const [hours, minutes] = time.split(':').map(Number)
                const totalMinutes = hours * 60 + minutes + delayMinutes
                const newHours = Math.floor(totalMinutes / 60) % 24
                const newMinutes = totalMinutes % 60
                return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
              })
              setAvailableTimes(adjustedTimes)
            } else {
              setAvailableTimes(times)
            }
          } else {
            setAvailableTimes(times)
          }

          if (
            initialRouteDetails.time_frames?.average_flight_duration &&
            initialRouteDetails.time_frames?.return_departure_delay
          ) {
            const originalStartId =
              typeof initialRouteDetails.start_point === 'string'
                ? initialRouteDetails.start_point
                : initialRouteDetails.start_point?.id
            const originalEndId =
              typeof initialRouteDetails.end_point === 'string'
                ? initialRouteDetails.end_point
                : initialRouteDetails.end_point?.id
            const isRouteReversed = departure === originalEndId && arrival === originalStartId

            if (!isRouteReversed) {
              const delayMinutes =
                initialRouteDetails.time_frames.average_flight_duration +
                initialRouteDetails.time_frames.return_departure_delay
              const adjustedReturnTimes = times.map((time) => {
                const [hours, minutes] = time.split(':').map(Number)
                const totalMinutes = hours * 60 + minutes + delayMinutes
                const newHours = Math.floor(totalMinutes / 60) % 24
                const newMinutes = totalMinutes % 60
                return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
              })
              setAvailableReturnTimes(adjustedReturnTimes)
            } else {
              setAvailableReturnTimes(times)
            }
          } else {
            setAvailableReturnTimes(times)
          }
        } else {
          const defaultTimes = [
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
          ]
          setAvailableTimes(defaultTimes)
          setAvailableReturnTimes(defaultTimes)
        }
      } catch (error) {
        console.error('Error loading data:', error)
        const defaultTimes = [
          '08:00',
          '08:30',
          '09:00',
          '09:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
        ]
        setAvailableTimes(defaultTimes)
        setAvailableReturnTimes(defaultTimes)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [initialRouteDetails])

  useEffect(() => {
    if (loading || allDestinations.length === 0) {
      setAvailableDestinations([])
      return
    }

    let filteredDestinations: Destination[] = []

    if (flightType === 'ligne-reguliere') {
      if (routes.length > 0) {
        const destinationIds = new Set<string>()
        routes.forEach((route) => {
          const startId =
            typeof route.start_point === 'string' ? route.start_point : route.start_point?.id
          const endId = typeof route.end_point === 'string' ? route.end_point : route.end_point?.id
          if (startId) destinationIds.add(startId)
          if (endId) destinationIds.add(endId)
        })
        filteredDestinations = allDestinations.filter((dest) => destinationIds.has(dest.id))
      }
    } else if (flightType === 'vol-prive') {
      setAvailableDestinations(allDestinations)
      return
    }

    if (filteredDestinations.length > 0) {
      setAvailableDestinations(filteredDestinations)
    } else {
      if (initialDepartureDetails && initialArrivalDetails) {
        setAvailableDestinations([initialDepartureDetails, initialArrivalDetails])
      } else {
        setAvailableDestinations(allDestinations)
      }
    }
  }, [allDestinations, routes, flightType, loading, initialDepartureDetails, initialArrivalDetails])

  useEffect(() => {
    if (!loading && allDestinations.length > 0 && departure && flightType === 'ligne-reguliere') {
      const availableFromDeparture: Destination[] = []

      routes.forEach((route) => {
        const startId =
          typeof route.start_point === 'string' ? route.start_point : route.start_point?.id
        const endId = typeof route.end_point === 'string' ? route.end_point : route.end_point?.id

        if (startId === departure && endId) {
          const destination = allDestinations.find((dest) => dest.id === endId)
          if (destination && !availableFromDeparture.some((d) => d.id === destination.id)) {
            availableFromDeparture.push(destination)
          }
        }

        if (endId === departure && startId) {
          const destination = allDestinations.find((dest) => dest.id === startId)
          if (destination && !availableFromDeparture.some((d) => d.id === destination.id)) {
            availableFromDeparture.push(destination)
          }
        }
      })

      setAvailableArrivalDestinations(availableFromDeparture)
    } else if (flightType === 'vol-prive') {
      setAvailableArrivalDestinations(allDestinations)
    }
  }, [loading, allDestinations, routes, departure, flightType])

  useEffect(() => {
    if (initialMultipleFlights && initialMultipleFlights.length > 0) {
      setMultipleFlights(initialMultipleFlights)
    }
  }, [initialMultipleFlights])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      departure,
      arrival,
      date,
      time,
      adults,
      firstName,
      lastName,
      email,
      phone,
      acceptTerms,
      returnDate: isReturn ? returnDate : '',
      returnTime: isReturn ? returnTime : '',
      isReturn,
      airline: hasCommercialFlight ? airline : '',
      flightOriginDestination: hasCommercialFlight ? flightOriginDestination : '',
      flightTime: hasCommercialFlight ? flightTime : '',
      hasCommercialFlight,
      pickupLocation: needsDriverService ? pickupLocation : '',
      needsDriverService,
      companyName: isCompany ? companyName : '',
      isCompany,
    }

    const validation = validateForm(formData, validationConfigs.regularLine)

    if (!validation.isValid) {
      alert('Veuillez corriger les erreurs dans le formulaire')
      return
    }

    setIsSubmitting(true)

    try {
      const dateTimeISO = date && time ? `${date}T${time}:00Z` : null
      const returnDateTimeISO =
        isReturn && returnDate && returnTime ? `${returnDate}T${returnTime}:00Z` : null

      const bookingData = {
        flightType: flightType === 'vol-prive' ? 'private-flight' : 'regular-line',
        departure,
        arrival,
        datetime: dateTimeISO,
        returnDatetime: returnDateTimeISO,
        isReturn,
        passengers: {
          adults,
          children: childPassengers,
          babies,
        },
        luggage: {
          checked: checkedLuggage,
        },
        driverService: needsDriverService
          ? {
              pickupLocation,
            }
          : null,
        contact: {
          type: isCompany ? 'company' : 'individual',
          firstName,
          lastName,
          companyName: isCompany ? companyName : '',
          email,
          phone,
        },
        pricing: {
          adultPrice,
          childPrice,
          babyPrice,
          baggagePrice,
          adultCost,
          childCost,
          babyCost,
          baggageCost,
          totalPrice: total,
        },
      }

      const flightTypeLabel = flightType === 'vol-prive' ? 'Vol Privé' : 'Ligne Régulière'

      let emailBody = `
        Nouvelle réservation :
        
        Type : ${flightTypeLabel}
      `

      if (isMultipleFlight) {
        emailBody += `
        Nombre de vols : ${multipleFlights.length}
        `

        if (flightType === 'vol-prive') {
          multipleFlights.forEach((flight, index) => {
            const flightDeparture = getDestinationTitle(allDestinations, flight.departure)
            const flightArrival = getDestinationTitle(allDestinations, flight.destination)

            emailBody += `
        
        Vol ${index + 1} :
        Trajet : ${flightDeparture} -> ${flightArrival}
        Date : ${flight.date || 'Non spécifiée'}
        Heure : ${flight.time || 'Non spécifiée'}
        ${flight.isReturn && flight.returnDate ? `Date retour : ${flight.returnDate}` : ''}
        ${flight.isReturn && flight.returnTime ? `Heure retour : ${flight.returnTime}` : ''}
        Passagers : ${flight.adults} adultes, ${flight.children} enfants, ${flight.newborns} bébés
        Bagages cabine : ${flight.cabinLuggage || 0}
        Bagages soute : ${flight.checkedLuggage || 0}
        Type : ${flight.isReturn ? 'Aller-retour' : 'Aller simple'}
        `
          })

          emailBody += `
        
        TARIF : Prix sur demande - Notre équipe vous contactera pour établir un devis personnalisé`
        } else {
          let totalMultipleFlightsCost = 0

          multipleFlights.forEach((flight, index) => {
            const flightDeparture = getDestinationTitle(allDestinations, flight.departure)
            const flightArrival = getDestinationTitle(allDestinations, flight.destination)

            const flightAdultCost = flight.adults * adultPrice
            const flightChildCost = flight.children * childPrice
            const flightBabyCost = 0
            const flightBaggageCost = (flight.checkedLuggage || 0) * baggagePrice
            const flightCabinBaggageCost = (flight.cabinLuggage || 0) * cabinBaggagePrice

            const flightSubtotal =
              flightAdultCost +
              flightChildCost +
              flightBabyCost +
              flightBaggageCost +
              flightCabinBaggageCost
            const flightTotal = flight.isReturn ? flightSubtotal * 2 : flightSubtotal
            totalMultipleFlightsCost += flightTotal

            emailBody += `
        
        Vol ${index + 1} :
        Trajet : ${flightDeparture} -> ${flightArrival}
        Date : ${flight.date || 'Non spécifiée'}
        Heure : ${flight.time || 'Non spécifiée'}
        ${flight.isReturn && flight.returnDate ? `Date retour : ${flight.returnDate}` : ''}
        ${flight.isReturn && flight.returnTime ? `Heure retour : ${flight.returnTime}` : ''}
        Passagers : ${flight.adults} adultes, ${flight.children} enfants, ${flight.newborns} bébés
        Bagages cabine : ${flight.cabinLuggage || 0}
        Bagages soute : ${flight.checkedLuggage || 0}
        Type : ${flight.isReturn ? 'Aller-retour' : 'Aller simple'}
        Prix vol : ${flightAdultCost}€ (adultes) + ${flightChildCost}€ (enfants) + ${flightBabyCost}€ (bébés) + ${flightBaggageCost}€ (bagages soute) + ${flightCabinBaggageCost}€ (bagages cabine) = ${flightTotal}€
        `
          })

          emailBody += `
        
        TOTAL TOUS VOLS : ${totalMultipleFlightsCost}€`
        }
      } else {
        emailBody += `
        Trajet : ${departureTitle} -> ${arrivalTitle}
        Date : ${date}
        Heure : ${time}
        ${
          isReturn
            ? `
        Trajet retour : ${arrivalTitle} -> ${departureTitle}
        Date : ${returnDate}
        Heure : ${returnTime}
        `
            : ''
        }
        Passagers : ${adults} adultes, ${childPassengers} enfants, ${babies} bébés
        Bagages : ${checkedLuggage} unités enregistrées
        `
      }

      emailBody += `
        
        Contact : ${isCompany ? companyName : `${firstName} ${lastName}`}
        Email : ${email}
        Téléphone : ${phone}
        `

      if (flightType === 'vol-prive') {
        emailBody += `
        
        TARIF : Prix sur demande - Notre équipe vous contactera pour établir un devis personnalisé
        `
      } else {
        if (isMultipleFlight) {
          emailBody += `
        
        PRIX TOTAL FINAL : ${total}€
        `
        } else {
          emailBody += `
        
        Prix :
        Adultes : ${adults} x ${adultPrice}€ = ${adultCost}€
        Enfants : ${childPassengers} x ${childPrice}€ = ${childCost}€
        Bébés : ${babies} x ${babyPrice}€ = ${babyCost}€
        Bagages : ${checkedLuggage} x ${baggagePrice}€ = ${baggageCost}€
        ${isReturn ? `Total aller-retour : ${total}€ (${singleTripTotal}€ x 2)` : `Total : ${total}€`}
        `
        }
      }

      alert(t('formSubmitted'))
      window.location.href = '/'
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('formError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (isMultipleFlight) {
        const allFlightsValid = multipleFlights.every((flight) => {
          const hasBasicInfo = flight.departure && flight.destination && flight.date && flight.time
          const hasReturnInfo = !flight.isReturn || (flight.returnDate && flight.returnTime)

          let isReturnDateValid = true
          if (flight.isReturn && flight.date && flight.returnDate) {
            const departureDate = new Date(flight.date)
            const returnDate = new Date(flight.returnDate)
            isReturnDateValid = returnDate >= departureDate
          }

          return hasBasicInfo && hasReturnInfo && isReturnDateValid
        })

        if (!allFlightsValid) {
          return
        }
      } else {
        if (!departure || !arrival || !date || !time) {
          return
        }

        if (isReturn && (!returnDate || !returnTime)) {
          return
        }

        if (isReturn && date && returnDate) {
          const departureDate = new Date(date)
          const returnDate_parsed = new Date(returnDate)
          if (returnDate_parsed < departureDate) {
            return
          }
        }
      }

      setCurrentStep(2)
    } else {
      setCurrentStep(currentStep + 1)
    }
    window.scrollTo(0, 0)
  }

  const goToPreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else {
      setCurrentStep(currentStep - 1)
    }
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const isReturnParam = searchParams.get('isReturn')
    const onewayParam = searchParams.get('oneway')
    const datetimeParam = searchParams.get('datetime')
    const returndatetimeParam = searchParams.get('returndatetime')

    if (isReturnParam === 'true') {
      setIsReturn(true)
    } else if (onewayParam === 'true') {
      setIsReturn(false)
    }

    if (datetimeParam) {
      try {
        const dateObj = new Date(datetimeParam)
        setDate(dateObj.toISOString().split('T')[0])
        setTime(dateObj.toISOString().split('T')[1].substr(0, 5))
      } catch (error) {
        console.error('Error parsing datetime parameter:', error)
      }
    }

    if (returndatetimeParam) {
      try {
        const dateObj = new Date(returndatetimeParam)
        setReturnDate(dateObj.toISOString().split('T')[0])
        setReturnTime(dateObj.toISOString().split('T')[1].substr(0, 5))
      } catch (error) {
        console.error('Error parsing returndatetime parameter:', error)
      }
    }
  }, [])

  const updateMultipleFlight = useCallback((flightId: string, updates: Partial<FlightData>) => {
    setMultipleFlights((prevFlights) =>
      prevFlights.map((flight) => (flight.id === flightId ? { ...flight, ...updates } : flight)),
    )
  }, [])

  const flightSetters = useMemo(() => {
    const setters: Record<string, any> = {}

    multipleFlights.forEach((flight) => {
      setters[flight.id] = {
        setDeparture: (value: string) => updateMultipleFlight(flight.id, { departure: value }),
        setArrival: (value: string) => updateMultipleFlight(flight.id, { destination: value }),
        setDate: (value: string) => updateMultipleFlight(flight.id, { date: value }),
        setTime: (value: string) => updateMultipleFlight(flight.id, { time: value }),
        setAdults: (value: number) => updateMultipleFlight(flight.id, { adults: value }),
        setChildren: (value: number) => updateMultipleFlight(flight.id, { children: value }),
        setNewborns: (value: number) => updateMultipleFlight(flight.id, { newborns: value }),
        setCabinLuggage: (value: number) =>
          updateMultipleFlight(flight.id, { cabinLuggage: value }),
        setCheckedLuggage: (value: number) =>
          updateMultipleFlight(flight.id, { checkedLuggage: value }),
        setIsReturn: (value: boolean) => updateMultipleFlight(flight.id, { isReturn: value }),
        setReturnDate: (value: string) => updateMultipleFlight(flight.id, { returnDate: value }),
        setReturnTime: (value: string) => updateMultipleFlight(flight.id, { returnTime: value }),
      }
    })

    return setters
  }, [multipleFlights.map((f) => f.id).join(','), updateMultipleFlight])

  return (
    <section className="py-16 bg-gray-50 " id="booking-form">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ProgressSteps
            currentStep={currentStep}
            steps={[t('steps.flightDetails'), t('steps.contact')]}
          />

          {currentStep === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                goToNextStep()
              }}
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <FlightType flightType={flightType} setFlightType={setFlightType} />

                  {isMultipleFlight ? (
                    <>
                      {multipleFlights.map((flight, index) => {
                        const isLastFlight = index === multipleFlights.length - 1

                        return (
                          <div key={flight.id} className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                              {t('multipleFlights.flightNumber', { number: index + 1 })}
                            </h3>
                            <FlightDetails
                              departure={flight.departure}
                              setDeparture={(value: string) =>
                                flightSetters[flight.id].setDeparture(value)
                              }
                              arrival={flight.destination}
                              setArrival={(value: string) =>
                                flightSetters[flight.id].setArrival(value)
                              }
                              date={flight.date || ''}
                              setDate={(value: string) => flightSetters[flight.id].setDate(value)}
                              time={flight.time || ''}
                              setTime={(value: string) => flightSetters[flight.id].setTime(value)}
                              adults={flight.adults}
                              setAdults={(value: number) =>
                                flightSetters[flight.id].setAdults(value)
                              }
                              childPassengers={flight.children}
                              setChildPassengers={(value: number) =>
                                flightSetters[flight.id].setChildren(value)
                              }
                              babies={flight.newborns}
                              setBabies={(value: number) =>
                                flightSetters[flight.id].setNewborns(value)
                              }
                              cabinLuggage={flight.cabinLuggage || 0}
                              setCabinLuggage={(value: number) =>
                                flightSetters[flight.id].setCabinLuggage(value)
                              }
                              checkedLuggage={flight.checkedLuggage || 0}
                              setCheckedLuggage={(value: number) =>
                                flightSetters[flight.id].setCheckedLuggage(value)
                              }
                              flex={false}
                              setFlex={() => {}}
                              isReturn={flight.isReturn}
                              setIsReturn={(value: boolean) =>
                                flightSetters[flight.id].setIsReturn(value)
                              }
                              returnDate={flight.returnDate || ''}
                              setReturnDate={(value: string) =>
                                flightSetters[flight.id].setReturnDate(value)
                              }
                              returnTime={flight.returnTime || ''}
                              setReturnTime={(value: string) =>
                                flightSetters[flight.id].setReturnTime(value)
                              }
                              hasCommercialFlight={hasCommercialFlight}
                              setHasCommercialFlight={setHasCommercialFlight}
                              airline={airline}
                              setAirline={setAirline}
                              flightOriginDestination={flightOriginDestination}
                              setFlightOriginDestination={setFlightOriginDestination}
                              flightTime={flightTime}
                              setFlightTime={setFlightTime}
                              needsDriverService={needsDriverService}
                              setNeedsDriverService={setNeedsDriverService}
                              pickupLocation={pickupLocation}
                              setPickupLocation={setPickupLocation}
                              goToNextStep={isLastFlight ? goToNextStep : () => {}}
                              showNextButton={isLastFlight}
                              isReversed={false}
                              availableDestinations={availableDestinations}
                              availableArrivalDestinations={availableArrivalDestinations}
                              availableTimes={availableTimes}
                              availableReturnTimes={availableReturnTimes}
                              routeData={null}
                              maxPassengers={6}
                              maxBaggage={2}
                              maxCabinBaggage={2}
                              baggagePrice={baggagePrice}
                              cabinBaggagePrice={cabinBaggagePrice}
                              flightType={flightType}
                            />
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <FlightDetails
                      departure={departure}
                      setDeparture={setDeparture}
                      arrival={arrival}
                      setArrival={setArrival}
                      date={date}
                      setDate={setDate}
                      time={time}
                      setTime={setTime}
                      adults={adults}
                      setAdults={setAdults}
                      childPassengers={childPassengers}
                      setChildPassengers={setChildPassengers}
                      babies={babies}
                      setBabies={setBabies}
                      cabinLuggage={cabinLuggage}
                      setCabinLuggage={setCabinLuggage}
                      checkedLuggage={checkedLuggage}
                      setCheckedLuggage={setCheckedLuggage}
                      flex={flex}
                      setFlex={setFlex}
                      isReturn={isReturn}
                      setIsReturn={setIsReturn}
                      returnDate={returnDate}
                      setReturnDate={setReturnDate}
                      returnTime={returnTime}
                      setReturnTime={setReturnTime}
                      hasCommercialFlight={hasCommercialFlight}
                      setHasCommercialFlight={setHasCommercialFlight}
                      airline={airline}
                      setAirline={setAirline}
                      flightOriginDestination={flightOriginDestination}
                      setFlightOriginDestination={setFlightOriginDestination}
                      flightTime={flightTime}
                      setFlightTime={setFlightTime}
                      needsDriverService={needsDriverService}
                      setNeedsDriverService={setNeedsDriverService}
                      pickupLocation={pickupLocation}
                      setPickupLocation={setPickupLocation}
                      goToNextStep={goToNextStep}
                      showNextButton={true}
                      isReversed={isRouteInitiallyReversed}
                      availableDestinations={availableDestinations}
                      availableArrivalDestinations={availableArrivalDestinations}
                      availableTimes={availableTimes}
                      availableReturnTimes={availableReturnTimes}
                      routeData={initialRouteDetails}
                      maxPassengers={6}
                      maxBaggage={2}
                      maxCabinBaggage={initialRouteDetails?.tariffs?.max_cabin_baggages || 2}
                      baggagePrice={baggagePrice}
                      cabinBaggagePrice={cabinBaggagePrice}
                      flightType={flightType}
                    />
                  )}
                </div>
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <BookingSummary
                      flightType={flightType}
                      departure={departureTitle}
                      arrival={arrivalTitle}
                      date={date}
                      time={time}
                      isReturn={isReturn}
                      returnDate={returnDate}
                      returnTime={returnTime}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      flex={flex}
                      basePrice={adultPrice}
                      baggagePrice={baggagePrice}
                      cabinBaggagePrice={cabinBaggagePrice}
                      total={total}
                      multipleFlights={
                        isMultipleFlight
                          ? multipleFlights.map((flight) => ({
                              departure: getDestinationTitle(allDestinations, flight.departure),
                              destination: getDestinationTitle(allDestinations, flight.destination),
                              adults: flight.adults,
                              children: flight.children,
                              newborns: flight.newborns,
                              isReturn: flight.isReturn,
                              cabinLuggage: flight.cabinLuggage || 0,
                              checkedLuggage: flight.checkedLuggage || 0,
                              date: flight.date || '',
                              time: flight.time || '',
                              returnDate: flight.returnDate || '',
                              returnTime: flight.returnTime || '',
                            }))
                          : undefined
                      }
                    />
                    <div className="mt-6">
                      <CustomerSupport />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form
              action="https://formsubmit.co/contact@helisecurite.fr"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
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
                    goToPreviousStep={goToPreviousStep}
                  />

                  <input
                    type="hidden"
                    name="_subject"
                    value={`Nouvelle réservation de vol: ${flightType === 'vol-prive' ? 'Vol Privé' : 'Ligne Régulière'}${isMultipleFlight ? ` - ${multipleFlights.length} vols` : ` - ${departureTitle} - ${arrivalTitle}`}`}
                  />
                  <input type="hidden" name="_next" value={`${window.location.origin}/`} />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_autoresponse"
                    value={`Merci pour votre réservation de ${flightType === 'vol-prive' ? 'Vol Privé' : 'Ligne Régulière'} avec Heli Securite !`}
                  />

                  <input
                    type="hidden"
                    name="flightType"
                    value={flightType === 'vol-prive' ? 'Vol Privé' : 'Ligne Régulière'}
                  />
                  <input type="hidden" name="departure" value={departureTitle} />
                  <input type="hidden" name="arrival" value={arrivalTitle} />
                  <input type="hidden" name="date" value={date} />
                  <input type="hidden" name="time" value={time} />
                  <input type="hidden" name="isReturn" value={isReturn ? 'Oui' : 'Non'} />
                  <input type="hidden" name="flexTariff" value={flex ? 'Oui' : 'Non'} />
                  {isReturn && (
                    <>
                      <input type="hidden" name="returnDate" value={returnDate} />
                      <input type="hidden" name="returnTime" value={returnTime} />
                    </>
                  )}

                  <input type="hidden" name="adultsCount" value={adults.toString()} />
                  <input type="hidden" name="childrenCount" value={childPassengers.toString()} />
                  <input type="hidden" name="babiesCount" value={babies.toString()} />
                  <input type="hidden" name="luggageCount" value={checkedLuggage.toString()} />
                  <input type="hidden" name="cabinLuggageCount" value={cabinLuggage.toString()} />

                  {hasCommercialFlight && (
                    <>
                      <input type="hidden" name="hasCommercialFlight" value="Oui" />
                      <input type="hidden" name="airline" value={airline} />
                      <input
                        type="hidden"
                        name="flightOriginDestination"
                        value={flightOriginDestination}
                      />
                      <input type="hidden" name="flightTime" value={flightTime} />
                    </>
                  )}

                  {needsDriverService && (
                    <>
                      <input type="hidden" name="needsDriverService" value="Oui" />
                      <input type="hidden" name="pickupLocation" value={pickupLocation} />
                    </>
                  )}

                  {flightType !== 'vol-prive' && (
                    <>
                      <input type="hidden" name="adultPrice" value={`${adultPrice}€`} />
                      <input type="hidden" name="childPrice" value={`${childPrice}€`} />
                      <input type="hidden" name="babyPrice" value={`${babyPrice}€`} />
                      <input type="hidden" name="baggagePrice" value={`${baggagePrice}€`} />
                      <input type="hidden" name="adultCost" value={`${adultCost}€`} />
                      <input type="hidden" name="childCost" value={`${childCost}€`} />
                      <input type="hidden" name="babyCost" value={`${babyCost}€`} />
                      <input type="hidden" name="baggageCost" value={`${baggageCost}€`} />
                      <input
                        type="hidden"
                        name="cabinBaggagePrice"
                        value={`${cabinBaggagePrice}€`}
                      />
                      <input type="hidden" name="cabinBaggageCost" value={`${cabinBaggageCost}€`} />
                      <input type="hidden" name="totalPrice" value={`${total}€`} />
                    </>
                  )}

                  {flightType === 'vol-prive' && (
                    <input type="hidden" name="pricing" value="Prix sur demande" />
                  )}

                  {isMultipleFlight && (
                    <>
                      <input type="hidden" name="multipleFlights" value="true" />
                      <input
                        type="hidden"
                        name="flightCount"
                        value={multipleFlights.length.toString()}
                      />
                      {flightType !== 'vol-prive' && (
                        <input
                          type="hidden"
                          name="multipleFlightsTotal"
                          value={`${calculateMultipleFlightsTotal()}€`}
                        />
                      )}
                      {multipleFlights.map((flight, index) => {
                        const flightDeparture = getDestinationTitle(
                          allDestinations,
                          flight.departure,
                        )
                        const flightArrival = getDestinationTitle(
                          allDestinations,
                          flight.destination,
                        )

                        const flightAdultCost = flight.adults * adultPrice
                        const flightChildCost = flight.children * childPrice
                        const flightBabyCost = 0
                        const flightBaggageCost = (flight.checkedLuggage || 0) * baggagePrice
                        const flightCabinBaggageCost =
                          (flight.cabinLuggage || 0) * cabinBaggagePrice
                        const flightSubtotal =
                          flightAdultCost +
                          flightChildCost +
                          flightBabyCost +
                          flightBaggageCost +
                          flightCabinBaggageCost
                        const flightTotal = flight.isReturn ? flightSubtotal * 2 : flightSubtotal

                        return (
                          <div key={flight.id}>
                            <input
                              type="hidden"
                              name={`flight${index + 1}Departure`}
                              value={flightDeparture}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Arrival`}
                              value={flightArrival}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Date`}
                              value={flight.date || ''}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Time`}
                              value={flight.time || ''}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}ReturnDate`}
                              value={flight.returnDate || ''}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}ReturnTime`}
                              value={flight.returnTime || ''}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Adults`}
                              value={flight.adults.toString()}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Children`}
                              value={flight.children.toString()}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}Newborns`}
                              value={flight.newborns.toString()}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}CabinLuggage`}
                              value={(flight.cabinLuggage || 0).toString()}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}CheckedLuggage`}
                              value={(flight.checkedLuggage || 0).toString()}
                            />
                            <input
                              type="hidden"
                              name={`flight${index + 1}IsReturn`}
                              value={flight.isReturn ? 'Oui' : 'Non'}
                            />
                            {flightType !== 'vol-prive' && (
                              <>
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}AdultCost`}
                                  value={`${flightAdultCost}€`}
                                />
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}ChildCost`}
                                  value={`${flightChildCost}€`}
                                />
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}BabyCost`}
                                  value={`${flightBabyCost}€`}
                                />
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}BaggageCost`}
                                  value={`${flightBaggageCost}€`}
                                />
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}CabinBaggageCost`}
                                  value={`${flightCabinBaggageCost}€`}
                                />
                                <input
                                  type="hidden"
                                  name={`flight${index + 1}Total`}
                                  value={`${flightTotal}€`}
                                />
                              </>
                            )}
                            {flightType === 'vol-prive' && (
                              <input
                                type="hidden"
                                name={`flight${index + 1}Pricing`}
                                value="Prix sur demande"
                              />
                            )}
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <BookingSummary
                      flightType={flightType}
                      departure={departureTitle}
                      arrival={arrivalTitle}
                      date={date}
                      time={time}
                      isReturn={isReturn}
                      returnDate={returnDate}
                      returnTime={returnTime}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      flex={flex}
                      basePrice={adultPrice}
                      baggagePrice={baggagePrice}
                      cabinBaggagePrice={cabinBaggagePrice}
                      total={total}
                      multipleFlights={
                        isMultipleFlight
                          ? multipleFlights.map((flight) => ({
                              departure: getDestinationTitle(allDestinations, flight.departure),
                              destination: getDestinationTitle(allDestinations, flight.destination),
                              adults: flight.adults,
                              children: flight.children,
                              newborns: flight.newborns,
                              isReturn: flight.isReturn,
                              cabinLuggage: flight.cabinLuggage || 0,
                              checkedLuggage: flight.checkedLuggage || 0,
                              date: flight.date || '',
                              time: flight.time || '',
                              returnDate: flight.returnDate || '',
                              returnTime: flight.returnTime || '',
                            }))
                          : undefined
                      }
                    />
                    <CustomerSupport />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
