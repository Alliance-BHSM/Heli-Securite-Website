import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function Alliance() {
  const t = await getTranslations('AboutUs.alliance')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-brother">{t('title')}</h2>
        <p className="text-xl font-semibold text-gray-700 mb-8 font-brother">{t('subtitle')}</p>

        <div className="flex justify-center mb-10">
          <div className="w-80 h-24 sm:w-96 sm:h-36 md:w-128 md:h-48 relative">
            <Image
              src="/logos/primary.png"
              alt={t('logo-alt')}
              fill
              sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 512px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 font-brother">
          <p>{t('description.intro')}</p>
          <p>{t('description.destinations')}</p>
          <p>{t('description.alps')}</p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="bg-primary-button hover:bg-primary-button text-white px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
