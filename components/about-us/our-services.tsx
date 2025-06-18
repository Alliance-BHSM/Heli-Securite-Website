import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function OurServices() {
  const t = useTranslations('AboutUs.our-services')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">{t('title')}</h2>

            <p className="text-gray-600 mb-6 font-brother">{t('regular-line')}</p>
            <p className="text-gray-600 mb-6 font-brother">{t('daily-flights')}</p>

            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              <li>{t('services-list.passenger')}</li>
              <li>{t('services-list.crew')}</li>
              <li>{t('services-list.maintenance')}</li>
            </ul>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">{t('expertise')}</h2>

            <p className="text-gray-600 mb-6 font-brother">{t('expertise-description')}</p>

            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              <li>{t('expertise-list.operational')}</li>
              <li>{t('expertise-list.regulatory')}</li>
              <li>{t('expertise-list.aircraft')}</li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full h-[300px] md:h-[500px] relative mt-6 md:mt-0">
            <Image
              src="/images/index/regular.webp"
              alt="Helicopter"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
