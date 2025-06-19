'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

interface ContactInformationProps {
  isCompany: boolean
  setIsCompany: (isCompany: boolean) => void
  firstName: string
  setFirstName: (name: string) => void
  lastName: string
  setLastName: (name: string) => void
  companyName: string
  setCompanyName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  phone: string
  setPhone: (phone: string) => void
  acceptTerms: boolean
  setAcceptTerms: (accept: boolean) => void
}

export default function ContactInformation({
  isCompany,
  setIsCompany,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  companyName,
  setCompanyName,
  email,
  setEmail,
  phone,
  setPhone,
  acceptTerms,
  setAcceptTerms,
}: ContactInformationProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('contactInformation.title')}</CardTitle>
        <CardDescription>{t('contactInformation.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroup
              defaultValue={isCompany ? 'company' : 'individual'}
              onValueChange={(value) => setIsCompany(value === 'company')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">{t('contactInformation.individual')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">{t('contactInformation.company')}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">{t('contactInformation.firstName')}</Label>
            <Input
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">{t('contactInformation.lastName')}</Label>
            <Input
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {isCompany && (
          <div>
            <Label htmlFor="companyName">{t('contactInformation.companyName')}</Label>
            <Input
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t('contactInformation.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="hidden" name="_replyto" value={email} />
          </div>
          <div>
            <Label htmlFor="phone">{t('contactInformation.phone')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              name="acceptTerms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              required
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('contactInformation.termsAgreement')}
              </label>
              <p className="text-sm text-muted-foreground">
                <Link href="#" className="text-primary hover:underline">
                  {t('contactInformation.viewTerms')}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
          <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">{t('contactInformation.idRequired')}</p>
          </div>
        </div>

        <div className="hidden">
          <input type="text" name="_honey" style={{ display: 'none' }} />
        </div>
      </CardContent>
    </Card>
  )
}
