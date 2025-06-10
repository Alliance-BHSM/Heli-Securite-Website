import React from 'react'
import { TravelersDropdown } from '@/components/regular-line/travelers-dropdown'
import { useTranslations } from 'next-intl'

interface PassengerSelectorProps {
  adults: number
  childrenCount: number
  newborns: number
  maxPassengers: number
  maxTotal?: number
  onChange: (adults: number, children: number, newborns: number) => void
  label?: string
  className?: string
}

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  adults,
  childrenCount,
  newborns,
  maxPassengers,
  maxTotal,
  onChange,
  label,
  className = '',
}) => {
  const t = useTranslations('RegularLine.booking-form')

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-primary">
        {label || t('form.passengers.label')}
      </label>
      <TravelersDropdown
        maxAdults={maxPassengers}
        maxTotal={maxTotal || maxPassengers}
        onChange={onChange}
        initialAdults={adults}
        initialChildren={childrenCount}
        initialNewborns={newborns}
      />
    </div>
  )
}
