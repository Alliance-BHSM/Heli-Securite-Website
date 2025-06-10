import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import type { Destination } from '@/payload-types'

interface DestinationSelectorProps {
  departure: string
  arrival: string
  onDepartureChange: (value: string) => void
  onArrivalChange: (value: string) => void
  availableDepartures: Destination[]
  availableDestinations: Destination[]
  loading?: boolean
  departureLabel?: string
  arrivalLabel?: string
  className?: string
}

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  departure,
  arrival,
  onDepartureChange,
  onArrivalChange,
  availableDepartures,
  availableDestinations,
  loading = false,
  departureLabel,
  arrivalLabel,
  className = '',
}) => {
  const t = useTranslations('RegularLine.booking-form')

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 ${className}`}>
      <div className="w-full">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-primary">
          {departureLabel || t('form.departure.label')}
        </label>
        <Select value={departure} onValueChange={onDepartureChange}>
          <SelectTrigger className="border-royalblue w-full h-10">
            <SelectValue placeholder={t('form.departure.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {availableDepartures.length > 0 ? (
              availableDepartures.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  {dest.title}
                </SelectItem>
              ))
            ) : loading ? (
              <SelectItem value="loading" disabled>
                {t('form.messages.loading-departures')}
              </SelectItem>
            ) : (
              <SelectItem value="no-departures" disabled>
                {t('form.messages.no-departures-available')}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-primary">
          {arrivalLabel || t('form.arrival.label')}
        </label>
        <Select value={arrival} onValueChange={onArrivalChange}>
          <SelectTrigger className="border-royalblue w-full h-10">
            <SelectValue placeholder={t('form.arrival.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {availableDestinations.length > 0 ? (
              availableDestinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  {dest.title}
                </SelectItem>
              ))
            ) : loading ? (
              <SelectItem value="loading" disabled>
                {t('form.messages.loading-destinations')}
              </SelectItem>
            ) : !departure ? (
              <SelectItem value="select-departure" disabled>
                {t('form.messages.select-departure-first')}
              </SelectItem>
            ) : (
              <SelectItem value="no-destinations" disabled>
                {t('form.messages.no-destinations-for-route')}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
