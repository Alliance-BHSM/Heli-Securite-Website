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

        <div className="flex flex-col justify-center items-center mb-10">
          <a
            href={'https://blade.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-80 h-24 sm:w-96 sm:h-36 md:w-128 md:h-48 relative"
          >
            <Image
              src="/logos/logo-blade.png"
              alt={'Logo of Blade'}
              fill
              sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 512px"
              priority
              className="object-contain"
            />
          </a>
          <a
            href={'https://monacair.mc'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-80 h-24 sm:w-96 sm:h-36 md:w-128 md:h-48 relative"
          >
            <Image
              src="/logos/monacair.png"
              alt={'Logo of Monacair'}
              fill
              sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 512px"
              priority
              className="object-contain"
            />
          </a>
          <a
            href={'https://helisecurite.fr'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-80 h-24 sm:w-96 sm:h-36 md:w-128 md:h-48 relative"
          >
            <Image
              src="/logos/LogoOld.webp"
              alt={'Logo of Heli Securite'}
              fill
              sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 512px"
              priority
              className="object-contain filter invert"
            />
          </a>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 font-brother">
          <p>
            {t.rich('description.intro', {
              b: (chunks) => <b>{chunks}</b>,
            })}
          </p>
          <p>{t('description.advantages.title')}</p>
          <ul>
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                {t.rich(`description.advantages.item${i}`, {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </li>
            ))}
          </ul>
          <p>{t('description.outro')}</p>
        </div>
      </div>
    </section>
  )
}
