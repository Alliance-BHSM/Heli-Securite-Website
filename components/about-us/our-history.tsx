import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function OurHistory() {
  const t = await getTranslations('AboutUs.our-history')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-6 text-lg font-brother">{t('foundation')}</p>
            <p className="text-gray-600 mb-6 text-xl font-bold font-brother">
              {t('services-intro')}
            </p>
            <h4 className={'text-gray-600 mb-6 text-xl font-extrabold font-brother'}>
              {t('services-list.ateliers')}
            </h4>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              <li>{t('services-list.visite')}</li>
              <li>{t('services-list.management')}</li>
              <li>{t('services-list.charter')}</li>
            </ul>
            <p className="text-gray-600 mb-6 font-brother">{t('official-provider')}</p>
          </div>
          <div className="md:w-1/2 w-full h-[300px] md:h-[400px] relative mt-6 md:mt-0">
            <Image
              src="/images/index/hero.webp"
              alt="helicopter"
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
