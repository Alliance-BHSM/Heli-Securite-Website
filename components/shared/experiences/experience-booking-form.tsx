'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from 'next-intl'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Experience } from '@/payload-types'

interface ExperienceBookingFormProps {
  experiences?: Experience[]
  experienceType: 'gastronomy' | 'lifestyle'
}

export const ExperienceBookingForm: React.FC<ExperienceBookingFormProps> = ({
  experiences = [],
  experienceType,
}) => {
  const t = useTranslations()

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [selectedExperienceId, setSelectedExperienceId] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('2')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Robust translation function with fallback
  const getLabel = (key: string, fallback: string): string => {
    try {
      // Map our keys to the actual JSON structure
      const keyMapping: Record<string, string> = {
        'fields.name': 'fields.name',
        'fields.phone': 'fields.phone',
        'fields.email': 'fields.email',
        'fields.experience': 'fields.experience',
        'fields.date': 'fields.date',
        'fields.passengers': 'fields.passengers',
        'fields.company': 'fields.companyLabel',
        'fields.companyName': 'fields.companyName',
        'placeholders.name': 'placeholders.name',
        'placeholders.phone': 'placeholders.phone',
        'placeholders.email': 'placeholders.email',
        'placeholders.experience': 'placeholders.experience',
        'placeholders.passengers': 'placeholders.passengers',
        'placeholders.companyName': 'placeholders.companyName',
        'passengers.one': 'passengers.one',
        'passengers.many': 'passengers.many',
        'validation.nameRequired': 'validation.name',
        'validation.phoneRequired': 'validation.phone',
        'validation.emailRequired': 'validation.email',
        'validation.experienceRequired': 'validation.experience',
        'validation.dateRequired': 'validation.date',
        'validation.companyNameRequired': 'validation.companyName',
        submit: 'button.submit',
        title: 'title',
      }

      const mappedKey = keyMapping[key] || key
      const fullKey = `Experiences.${experienceType}.Reservation.${mappedKey}`
      const translated = t(fullKey, { defaultValue: fallback })
      return translated === fullKey ? fallback : translated
    } catch {
      return fallback
    }
  }

  const getPassengerOptions = () => {
    if (!selectedExperience) return []

    const options = []
    for (let i = selectedExperience.guests.minimum; i <= selectedExperience.guests.maximum; i++) {
      options.push({
        value: i.toString(),
        label: `${i} ${i === 1 ? getLabel('passengers.one', 'passenger') : getLabel('passengers.many', 'passengers')}`,
      })
    }
    return options
  }

  const handleExperienceChange = (experienceId: string) => {
    setSelectedExperienceId(experienceId)
    const experience = experiences.find((exp) => exp.id === experienceId)
    setSelectedExperience(experience || null)

    setDate('')
    if (experience) {
      setPassengers(experience.guests.minimum.toString())
    }
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = getLabel('validation.name', 'Le nom est requis')
    if (!phone.trim()) newErrors.phone = getLabel('validation.phone', 'Le téléphone est requis')
    if (!email.trim()) newErrors.email = getLabel('validation.email', "L'email est requis")
    if (!selectedExperienceId)
      newErrors.experience = getLabel('validation.experience', 'Sélectionnez une expérience')
    if (!date) newErrors.date = getLabel('validation.date', 'La date est requise')
    if (isCompany && !companyName.trim())
      newErrors.companyName = getLabel(
        'validation.companyName',
        "Le nom de l'entreprise est requis",
      )

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    ;(e.target as HTMLFormElement).submit()
  }

  const getMinDate = (): string => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getFormTitle = () => {
    if (experienceType === 'gastronomy') {
      return getLabel('title', 'Réservez votre expérience gastronomique')
    }
    return getLabel('title', 'Réservez votre expérience lifestyle')
  }

  return (
    <section className="bg-tertiary py-16" id="booking-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-brother text-white">
            {getFormTitle()}
          </h2>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <form
                action="https://formsubmit.co/booking@monacair.mc"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={`Nouvelle réservation d'expérience ${experienceType} - Monacair`}
                />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value={`Merci pour votre réservation d'expérience ${experienceType} avec Monacair !`}
                />
                <input type="hidden" name="experienceName" value={selectedExperience?.name || ''} />
                <input type="hidden" name="experienceType" value={experienceType} />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-primary mb-2">
                        {getLabel('fields.name', 'Nom complet')} *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                          'w-full border-gray-300 focus:border-royalblue focus:ring-royalblue',
                          errors.name && 'border-red-500',
                        )}
                        placeholder={getLabel('placeholders.name', 'Votre nom complet')}
                      />
                      {errors.name && (
                        <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-primary mb-2">
                        {getLabel('fields.phone', 'Téléphone')} *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={cn(
                          'w-full border-gray-300 focus:border-royalblue focus:ring-royalblue',
                          errors.phone && 'border-red-500',
                        )}
                        placeholder={getLabel('placeholders.phone', '+33 1 23 45 67 89')}
                      />
                      {errors.phone && (
                        <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-primary mb-2">
                      {getLabel('fields.email', 'Email')} *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        'w-full border-gray-300 focus:border-royalblue focus:ring-royalblue',
                        errors.email && 'border-red-500',
                      )}
                      placeholder={getLabel('placeholders.email', 'votre.email@exemple.com')}
                    />
                    {errors.email && (
                      <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-primary mb-2">
                        {getLabel('fields.experience', 'Expérience')} *
                      </label>
                      <Select value={selectedExperienceId} onValueChange={handleExperienceChange}>
                        <SelectTrigger
                          className={cn(
                            'w-full border-gray-300 focus:ring-royalblue',
                            errors.experience && 'border-red-500',
                          )}
                        >
                          <SelectValue
                            placeholder={getLabel(
                              'placeholders.experience',
                              'Sélectionnez une expérience',
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {experiences.map((experience) => (
                            <SelectItem key={experience.id} value={experience.id}>
                              {experience.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.experience && (
                        <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-primary mb-2">
                        {getLabel('fields.date', 'Date souhaitée')} *
                      </label>
                      <Input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={getMinDate()}
                        className={cn(
                          'w-full border-gray-300 focus:border-royalblue focus:ring-royalblue',
                          errors.date && 'border-red-500',
                        )}
                      />
                      {errors.date && (
                        <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-primary mb-2">
                        {getLabel('fields.passengers', 'Nombre de personnes')} *
                      </label>
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger className="w-full border-gray-300 focus:ring-royalblue">
                          <SelectValue
                            placeholder={getLabel('placeholders.passengers', 'Nombre de personnes')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {getPassengerOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Checkbox
                        id="isCompany"
                        checked={isCompany}
                        onCheckedChange={(checked) => setIsCompany(!!checked)}
                      />
                      <label htmlFor="isCompany" className="text-sm font-medium text-primary">
                        {getLabel('fields.companyLabel', 'Réservation entreprise')}
                      </label>
                    </div>
                    {isCompany && (
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary mb-2">
                          Nom de l&apos;entreprise *
                        </label>
                        <Input
                          type="text"
                          name="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className={cn(
                            'w-full border-gray-300 focus:border-royalblue focus:ring-royalblue',
                            errors.companyName && 'border-red-500',
                          )}
                          placeholder={getLabel(
                            'placeholders.companyName',
                            'Nom de votre entreprise',
                          )}
                        />
                        {errors.companyName && (
                          <p className="text-primary-button text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-primary-button hover:bg-primary-button/90 text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-200"
                      size="lg"
                    >
                      {getLabel('submit', 'Réserver maintenant')}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
