'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

interface ProgressStepsProps {
  currentStep: number
  steps?: string[]
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  const t = useTranslations('RegularLine.Reservation')

  const defaultSteps = [t('steps.flightDetails'), t('steps.helicopter'), t('steps.contact')]
  const displaySteps = steps || defaultSteps

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {displaySteps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col items-center ${currentStep >= index + 1 ? 'text-primary-button' : 'text-gray-400'}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= index + 1 ? 'bg-primary-button text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium">{step}</span>
            </div>

            {index < displaySteps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${currentStep > index + 1 ? 'bg-primary-button' : 'bg-gray-200'}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
