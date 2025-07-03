'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface TravelerCategory {
  id: string
  label: string
  description: string
  count: number
}

interface TravelersDropdownProps {
  maxAdults: number
  maxTotal: number
  onChange: (adults: number, children: number, newborns: number) => void
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
  noBorder?: boolean
}

export function TravelersDropdown({
  maxAdults = 6,
  maxTotal = 6,
  onChange,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
  noBorder = false,
}: TravelersDropdownProps) {
  const t = useTranslations('RegularLine.booking-form')
  const [isOpen, setIsOpen] = useState(false)
  const [travelers, setTravelers] = useState<TravelerCategory[]>([
    {
      id: 'adults',
      label: t('travelers.adults.label'),
      description: t('travelers.adults.description'),
      count: initialAdults,
    },
    {
      id: 'children',
      label: t('travelers.children.label'),
      description: t('travelers.children.description'),
      count: initialChildren,
    },
    {
      id: 'newborns',
      label: t('travelers.newborns.label'),
      description: t('travelers.newborns.description'),
      count: initialNewborns,
    },
  ])

  const totalTravelers = travelers.reduce((sum, traveler) => sum + traveler.count, 0)
  const adultsCount = travelers.find((t) => t.id === 'adults')?.count || 0
  const childrenCount = travelers.find((t) => t.id === 'children')?.count || 0
  const newbornsCount = travelers.find((t) => t.id === 'newborns')?.count || 0

  const handleIncrement = (id: string) => {
    const newTravelers = travelers.map((traveler) => {
      if (traveler.id !== id) return traveler

      if (id === 'adults') {
        if (traveler.count >= maxAdults) return traveler
        if (totalTravelers >= maxTotal) return traveler
      } else if (id === 'children') {
        if (adultsCount + childrenCount >= maxTotal) return traveler
      } else if (id === 'newborns') {
        if (traveler.count >= adultsCount) return traveler
      }

      return { ...traveler, count: traveler.count + 1 }
    })

    setTravelers(newTravelers)

    const newAdults = newTravelers.find((t) => t.id === 'adults')?.count || 0
    const newChildren = newTravelers.find((t) => t.id === 'children')?.count || 0
    const newNewborns = newTravelers.find((t) => t.id === 'newborns')?.count || 0
    onChange(newAdults, newChildren, newNewborns)
  }

  const handleDecrement = (id: string) => {
    const newTravelers = travelers.map((traveler) => {
      if (traveler.id !== id) return traveler

      if (id === 'adults') {
        if (traveler.count <= 1) return traveler

        const newborns = travelers.find((t) => t.id === 'newborns')?.count || 0
        if (traveler.count <= newborns) return traveler
      } else if (traveler.count <= 0) {
        return traveler
      }

      return { ...traveler, count: traveler.count - 1 }
    })

    setTravelers(newTravelers)

    const newAdults = newTravelers.find((t) => t.id === 'adults')?.count || 0
    const newChildren = newTravelers.find((t) => t.id === 'children')?.count || 0
    const newNewborns = newTravelers.find((t) => t.id === 'newborns')?.count || 0
    onChange(newAdults, newChildren, newNewborns)
  }

  const buttonClasses = `w-full justify-between ${noBorder ? '' : 'border-royalblue'} bg-white text-black hover:bg-white h-10`

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className={noBorder ? '' : 'border'}>
        <Button variant="white" className={buttonClasses}>
          <span>
            {totalTravelers}{' '}
            {totalTravelers === 1 ? t('form.passengers.single') : t('form.passengers.multiple')}
          </span>
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] sm:w-[300px] bg-white p-0" align="start">
        <div className="flex flex-col p-3 sm:p-4">
          <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">{t('travelers.title')}</h3>
          <div className="space-y-3 sm:space-y-4">
            {travelers.map((traveler) => (
              <div key={traveler.id} className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="font-medium text-sm sm:text-base">{traveler.label}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{traveler.description}</div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <Button
                    variant="white"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-sm border-gray-300 bg-white p-0"
                    onClick={() => handleDecrement(traveler.id)}
                    disabled={
                      (traveler.id === 'adults' && traveler.count <= 1) ||
                      (traveler.id !== 'adults' && traveler.count <= 0) ||
                      (traveler.id === 'adults' && traveler.count <= newbornsCount)
                    }
                  >
                    <Minus className="text-secondary-button h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Decrease {traveler.label}</span>
                  </Button>
                  <span className="w-4 text-center text-sm sm:text-base">{traveler.count}</span>
                  <Button
                    variant="white"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-sm border-gray-300 bg-white p-0"
                    onClick={() => handleIncrement(traveler.id)}
                    disabled={
                      (traveler.id === 'adults' &&
                        (traveler.count >= maxAdults || adultsCount + childrenCount >= maxTotal)) ||
                      (traveler.id === 'children' && adultsCount + childrenCount >= maxTotal) ||
                      (traveler.id === 'newborns' && traveler.count >= adultsCount)
                    }
                  >
                    <Plus className="text-secondary-button h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Increase {traveler.label}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
