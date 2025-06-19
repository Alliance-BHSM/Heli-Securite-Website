'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'

interface TermsValidationProps {
  acceptTerms: boolean
  setAcceptTerms: (value: boolean) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function TermsValidation({
  acceptTerms,
  setAcceptTerms,
  onSubmit,
}: TermsValidationProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('termsValidation.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(!!checked)}
            required
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('termsValidation.acceptTerms')}
            </label>
            <p className="text-sm text-muted-foreground">
              <Link href="#" className="text-primary hover:underline">
                {t('termsValidation.viewTerms')}
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
          <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">{t('termsValidation.paymentInfo')}</p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-button text-white"
          disabled={!acceptTerms}
          onClick={onSubmit}
        >
          {t('termsValidation.submit')}
        </Button>
      </CardContent>
    </Card>
  )
}
