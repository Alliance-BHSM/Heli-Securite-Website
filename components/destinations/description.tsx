import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Description = () => {
  const t = useTranslations('Destinations.description')
  return (
    <section
      className={
        'bg-black text-white grid grid-cols-1 md:grid-cols-2 gap-5 px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20'
      }
    >
      <div>
        <h1 className={'font-brother font-normal text-3xl sm:text-4xl md:text-5xl'}>
          {t.rich('title', {
            span: (chunks) => (
              <span className={'font-caslon text-primary-button'}>
                <br />
                {chunks}
              </span>
            ),
          })}
        </h1>
        <h3
          className={'font-brother text-sm sm:text-base md:text-lg lg:text-xl w-full md:w-1/2 py-2'}
        >
          {t('subtitle')}
        </h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className={'text-lg sm:text-xl md:text-2xl font-brother'}>
            {t('accordion.item1.title')}
          </AccordionTrigger>
          <AccordionContent className={'font-brother text-sm sm:text-base md:text-lg'}>
            {t('accordion.item1.description')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={'text-lg sm:text-xl md:text-2xl font-brother'}>
            {t('accordion.item2.title')}
          </AccordionTrigger>
          <AccordionContent className={'font-brother text-sm sm:text-base md:text-lg'}>
            {t('accordion.item2.description')}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className={'text-lg sm:text-xl md:text-2xl font-brother'}>
            {t('accordion.item3.title')}
          </AccordionTrigger>
          <AccordionContent className={'font-brother text-sm sm:text-base md:text-lg'}>
            {t('accordion.item3.description')}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default Description
