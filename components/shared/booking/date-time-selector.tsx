import React from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'

interface DateTimeSelectorProps {
  date: string
  time: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  availableTimeSlots: string[]
  minDate: string
  dateLabel?: string
  timeLabel?: string
  dateClassName?: string
  timeClassName?: string
  isReturn?: boolean
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  availableTimeSlots,
  minDate,
  dateLabel,
  timeLabel,
  dateClassName = '',
  timeClassName = '',
  isReturn = false,
}) => {
  const t = useTranslations('RegularLine.booking-form')

  const defaultDateLabel = isReturn
    ? t('form.returnDate.label') || 'Date de retour'
    : t('form.date.label')

  const defaultTimeLabel = isReturn
    ? t('form.returnTime.label') || 'Heure de retour'
    : t('form.time.label')

  return (
    <>
      <div className={`w-full ${dateClassName}`}>
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-primary">
          {dateLabel || defaultDateLabel}
        </label>
        <Input
          type="date"
          className="border-royalblue w-full h-10"
          min={minDate}
          onChange={(e) => onDateChange(e.target.value)}
          value={date}
        />
      </div>
      <div className={`w-full ${timeClassName}`}>
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-primary">
          {timeLabel || defaultTimeLabel}
        </label>
        <Select value={time} onValueChange={onTimeChange}>
          <SelectTrigger className="border-royalblue w-full h-10">
            <SelectValue placeholder={t('form.time.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {availableTimeSlots.map((timeSlot) => (
              <SelectItem key={timeSlot} value={timeSlot}>
                {timeSlot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
