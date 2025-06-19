'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { RegularFlight, Destination } from '@/payload-types'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { useBookingForm } from '@/hooks/use-booking-form'
import { DestinationSelector } from '@/components/shared/booking/destination-selector'
import { DateTimeSelector } from '@/components/shared/booking/date-time-selector'
import { PassengerSelector } from '@/components/shared/booking/passenger-selector'

interface BookingFormProps {
  initialRouteData?: RegularFlight | null
  initialStartPoint?: Destination | null
  initialEndPoint?: Destination | null
  initialIsReversed?: boolean
  initialIsReturn?: boolean
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
}

export default function BookingForm({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
  initialIsReturn,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.booking-form')

  const {
    departure,
    setDeparture,
    arrival,
    setArrival,
    date,
    setDate,
    time,
    setTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    isReturn,
    setIsReturn,
    isFlex,
    setIsFlex,
    adults,
    children,
    newborns,
    availableTimeSlots,
    availableReturnTimeSlots,
    availableDepartures,
    availableDestinations,
    loading,
    todayDate,
    getBookingUrl,
    handleTravelersChange,
    maxPassengers,
  } = useBookingForm({
    initialRouteData,
    initialStartPoint,
    initialEndPoint,
    initialIsReversed,
    initialIsReturn,
    initialAdults,
    initialChildren,
    initialNewborns,
  })

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-primary transform -skew-y-3 origin-top-right z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-6 md:pt-12">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 font-brother">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto font-brother">{t('subtitle')}</p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 font-brother text-primary">
                {t('form.title')}
              </h3>
              <div className="grid gap-3 sm:gap-4 md:gap-6">
                <DestinationSelector
                  departure={departure}
                  arrival={arrival}
                  onDepartureChange={setDeparture}
                  onArrivalChange={setArrival}
                  availableDepartures={availableDepartures}
                  availableDestinations={availableDestinations}
                  loading={loading}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <DateTimeSelector
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                    availableTimeSlots={availableTimeSlots}
                    minDate={todayDate}
                  />
                  <PassengerSelector
                    adults={adults}
                    childrenCount={children}
                    newborns={newborns}
                    maxPassengers={maxPassengers}
                    onChange={handleTravelersChange}
                    className="sm:col-span-2 md:col-span-1"
                  />
                </div>

                {isReturn && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 border-t border-gray-200 pt-4">
                    <DateTimeSelector
                      date={returnDate}
                      time={returnTime}
                      onDateChange={setReturnDate}
                      onTimeChange={setReturnTime}
                      availableTimeSlots={availableReturnTimeSlots}
                      minDate={date || todayDate}
                      isReturn={true}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-2">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-sm font-brother text-primary">
                        {isReturn ? t('form.flight-type.return') : t('form.flight-type.one-way')}
                      </h4>
                    </div>
                    <Switch checked={isReturn} onCheckedChange={setIsReturn} />
                  </div>

                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-md">
                    <Checkbox
                      id="flex"
                      checked={isFlex}
                      onCheckedChange={(checked) => setIsFlex(!!checked)}
                    />
                    <div>
                      <label
                        htmlFor="flex"
                        className="font-medium text-sm font-brother text-primary cursor-pointer"
                      >
                        {t('form.flex.label')}
                      </label>
                      <p className="text-xs text-gray-600">{t('form.flex.description')}</p>
                    </div>
                  </div>
                </div>

                <Link href={getBookingUrl()} className="inline-block w-full">
                  <Button
                    size="lg"
                    className="bg-primary-button hover:bg-primary-button/90 text-white font-brother w-full mt-2 sm:mt-4 h-12"
                    disabled={loading || !departure || !arrival}
                  >
                    {t('form.bookNow')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
