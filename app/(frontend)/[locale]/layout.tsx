import { Suspense } from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/shared/navbar'
import { getPayloadClient } from '@/lib/payload'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const payload = await getPayloadClient()

  return (
    <html lang={locale} className={'bg-primary'}>
      <body className={'scroll-smooth'}>
        <NextIntlClientProvider>
          <Suspense>
            <Navbar
              data={{
                destinations: await payload.find({
                  collection: 'destinations',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
                events: await payload.find({
                  collection: 'Events',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
              }}
            />
          </Suspense>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
