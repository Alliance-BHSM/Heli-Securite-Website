'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

const CorporateField = () => {
  const [isCorporate, setCorporate] = useState(false)
  const t = useTranslations('Experiences.experience.sidebar.dialog.fields')

  return (
    <div className={'w-full flex flex-col justify-start items-start gap-4'}>
      <div className="w-full flex justify-start items-center gap-2">
        <Checkbox id="isCompany" checked={isCorporate} onClick={() => setCorporate(!isCorporate)} />
        <Label htmlFor="isCompany">{t('corporate.checkbox')}</Label>
      </div>

      {isCorporate && (
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <Label htmlFor="companyReservation" className={'w-full'}>
            {t('corporate.label')}
          </Label>
          <Input id="companyReservation" name="companyReservation" type={'text'} />
        </div>
      )}
    </div>
  )
}

export default CorporateField
