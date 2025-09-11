import { Suspense } from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/shared/navbar'
import { getPayloadClient } from '@/lib/payload'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  metadataBase: new URL('https://helisecurite.fr'),
}

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
                  sort: 'order',
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
                events: await payload.find({
                  collection: 'Events',
                  locale,
                  sort: 'order',
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
              }}
            />
          </Suspense>
          {children}
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={'G-34DSLBHZDL'} />
      <GoogleTagManager gtmId={'GTM-WZG9MFRX'} />
    </html>
  )
}
