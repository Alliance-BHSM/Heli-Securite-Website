import React from 'react'
import { useTranslations } from 'next-intl'

const Bases = () => {
  const t = useTranslations('Destinations.description.bases')
  return (
    <section
      className={
        'bg-white flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 lg:px-40 pt-10 md:pt-20'
      }
    >
      <h1 className={'font-brother text-3xl sm:text-4xl md:text-5xl text-center'}>
        {t.rich('title', {
          span: (chunks) => <span className={'font-caslon text-primary-button'}>{chunks}</span>,
        })}
      </h1>
      <h3 className={'font-brother text-sm sm:text-base md:text-lg text-center py-3'}>
        {t('description')}
      </h3>
    </section>
  )
}

export default Bases
