import { useTranslations } from 'next-intl'
import { Slider } from '@/components/ui/slider'

interface DurationSelectorProps {
  duration: number
  availableDurations: number[]
  onDurationChange: (newValue: number[]) => void
}

export const DurationSelector = ({
  duration,
  availableDurations,
  onDurationChange,
}: DurationSelectorProps) => {
  const t = useTranslations('Panoramic.booking')
  const hasDurations = availableDurations.length > 0

  return (
    <div className="bg-primary/80 rounded-2xl p-3 sm:p-4 lg:p-5 flex-1">
      <div className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-5">
        <div className="bg-primary-button rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold text-sm sm:text-base">
          2
        </div>
        <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-medium font-brother">
          {t('duration')}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100%-3.5rem)] min-h-[160px] sm:min-h-[180px]">
        <div className="flex items-end gap-2 mb-4 sm:mb-6">
          <span className="text-primary-button text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-brother">
            {duration}
          </span>
          <span className="text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2 font-brother">
            {t('minutes')}
          </span>
        </div>

        {hasDurations && (
          <div className="w-full px-2">
            <Slider
              value={[duration]}
              max={Math.max(...availableDurations)}
              min={Math.min(...availableDurations)}
              step={1}
              onValueChange={onDurationChange}
              disabled={availableDurations.length <= 1}
              className="w-full [&_[data-slot=slider-range]]:bg-primary-button [&_[data-slot=slider-thumb]]:border-primary-button"
            />
          </div>
        )}
      </div>
    </div>
  )
}
