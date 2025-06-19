'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Info, Phone, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function CustomerSupport() {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">{t('customerSupport.title')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('customerSupport.description')}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+33 4 94 55 59 99</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>booking@helisecurite.fr</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
