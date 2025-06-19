import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

export default async function PricingSection() {
  const t = await getTranslations('Experiences.lifestyle.pricing')

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 font-brother text-primary">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-brother">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg shadow-lg overflow-hidden bg-white border">
          <div className="p-6 bg-secondary-button text-primary">
            <h3 className="text-xl font-bold mb-1 font-brother">{t('packages.comfort.title')}</h3>
            <p className="text-sm text-primary/70 font-brother">{t('packages.comfort.subtitle')}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <span className="text-4xl font-bold font-brother text-primary">
                {t('packages.comfort.price')}€
              </span>
              <span className="text-gray-500 ml-1 font-brother">{t('packages.comfort.per')}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {t.raw('packages.comfort.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="font-brother text-primary">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              asChild
            >
              <Link href="#booking-form">{t('cta')}</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg shadow-lg overflow-hidden bg-white border border-primary-button transform md:scale-105">
          <div className="p-6 bg-primary-button text-white">
            <h3 className="text-xl font-bold mb-1 font-brother">{t('packages.luxury.title')}</h3>
            <p className="text-sm text-gray-100 font-brother">{t('packages.luxury.subtitle')}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <span className="text-4xl font-bold font-brother text-primary">
                {t('packages.luxury.price')}€
              </span>
              <span className="text-gray-500 ml-1 font-brother">{t('packages.luxury.per')}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {t.raw('packages.luxury.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="font-brother text-primary">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              asChild
            >
              <Link href="#booking-form">{t('cta')}</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg shadow-lg overflow-hidden bg-white border">
          <div className="p-6 bg-secondary-button text-primary">
            <h3 className="text-xl font-bold mb-1 font-brother">{t('packages.exclusive.title')}</h3>
            <p className="text-sm text-primary/70 font-brother">
              {t('packages.exclusive.subtitle')}
            </p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <span className="text-4xl font-bold font-brother text-primary">
                {t('packages.exclusive.price')}€
              </span>
              <span className="text-gray-500 ml-1 font-brother">{t('packages.exclusive.per')}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {t.raw('packages.exclusive.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary-button mr-2 flex-shrink-0 mt-0.5" />
                  <span className="font-brother text-primary">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-brother"
              asChild
            >
              <Link href="#booking-form">{t('cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
