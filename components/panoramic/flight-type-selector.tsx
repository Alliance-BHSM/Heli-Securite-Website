import { useTranslations } from 'next-intl'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface FlightOption {
  type: 'shared' | 'private'
  minPrice: number
  availableDurations: number[]
}

interface FlightTypeSelectorProps {
  flightType: 'shared' | 'private'
  onFlightTypeChange: (value: 'shared' | 'private') => void
  sharedOption: FlightOption | null
  privateOption: FlightOption | null
}

export const FlightTypeSelector = ({
  flightType,
  onFlightTypeChange,
  sharedOption,
  privateOption,
}: FlightTypeSelectorProps) => {
  const t = useTranslations('Panoramic.booking')

  const hasSharedOption = sharedOption !== null
  const hasPrivateOption = privateOption !== null

  return (
    <div className="bg-primary/80 rounded-2xl p-3 sm:p-4 lg:p-5 flex-1">
      <div className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-5">
        <div className="bg-primary-button rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold text-sm sm:text-base">
          1
        </div>
        <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-medium font-brother">
          {t('flightType')}
        </h2>
      </div>

      <RadioGroup
        value={flightType}
        onValueChange={onFlightTypeChange}
        className="space-y-2 sm:space-y-3"
      >
        {hasSharedOption && (
          <label
            className={`flex items-center justify-between bg-primary/80 rounded-xl p-3 sm:p-4 cursor-pointer border ${
              flightType === 'shared'
                ? 'border-primary-button'
                : 'border-primary/50'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <RadioGroupItem
                value="shared"
                className="border-primary-button data-[state=checked]:bg-primary-button"
              />
              <span className="text-white text-base sm:text-lg lg:text-xl font-brother">
                {t('sharedTour')}
              </span>
            </div>
            <span className="text-gray-400 font-brother text-sm sm:text-base">
              {t('startingFrom')} {sharedOption?.minPrice}€
            </span>
          </label>
        )}

        {hasPrivateOption && (
          <label
            className={`flex items-center justify-between bg-primary/80 rounded-xl p-3 sm:p-4 cursor-pointer border ${
              flightType === 'private'
                ? 'border-primary-button'
                : 'border-primary/50'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <RadioGroupItem
                value="private"
                className="border-primary-button data-[state=checked]:bg-primary-button"
              />
              <span className="text-white text-base sm:text-lg lg:text-xl font-brother">
                {t('privateTour')}
              </span>
            </div>
            <span className="text-gray-400 font-brother text-sm sm:text-base">
              {t('startingFrom')} {privateOption?.minPrice}€
            </span>
          </label>
        )}
      </RadioGroup>
    </div>
  )
}
