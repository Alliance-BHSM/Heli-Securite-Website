import React from 'react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Regular from '@/public/images/index/regular.webp'
import Panoramique from '@/public/images/index/panoramique.webp'
import Private from '@/public/images/index/private.webp'
import Jet from '@/public/images/index/jet.webp'
import { Link } from '@/i18n/navigation'

const OurFlights = async () => {
  const t = await getTranslations('Index.our-flights')
  return (
    <section
      className={'px-6 sm:px-10 md:px-20 text-white lg:px-40 py-10 md:py-20 bg-black h-full'}
    >
      <header className={'pb-8 md:pb-16'}>
        <p className={'font-brother font-normal text-white text-lg md:text-xl'}>{t('subtitle')}</p>
        <h1 className={'font-brother font-normal text-white text-3xl md:text-5xl'}>
          {t.rich('title', {
            span: (chunks) => (
              <span className={'font-caslon font-extrabold text-white'}>
                {chunks}
                <br />
              </span>
            ),
          })}
        </h1>
      </header>

      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-5'}>
        <article>
          <Link href={'/flights'}>
            <Image
              src={Private}
              alt={'Private flight'}
              className={
                'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-md my-5'
              }
            />
            <div className={'h-[200px] md:h-[250px] lg:h-[300px]'}>
              <h3 className={'font-brother font-bold text-2xl md:text-3xl'}>
                {t('private.title')}
              </h3>
              <p className={'font-brother text-sm md:text-base'}>{t('private.description')}</p>
            </div>
          </Link>
        </article>

        <article>
          <Link href={'/flights'}>
            <Image
              src={Regular}
              alt={'Regular flight'}
              className={
                'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-md my-5'
              }
            />
            <div className={'h-[200px] md:h-[250px] lg:h-[300px]'}>
              <h3 className={'font-brother font-bold text-2xl md:text-3xl'}>
                {t('regular.title')}
              </h3>
              <p className={'font-brother text-sm md:text-base'}>{t('regular.description')}</p>
            </div>
          </Link>
        </article>

        <article>
          <Link href={'/flights'}>
            <Image
              src={Panoramique}
              alt={'Panoramic flight'}
              className={
                'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-md my-5'
              }
            />
            <div className={'h-[200px] md:h-[250px] lg:h-[300px]'}>
              <h3 className={'font-brother font-bold text-2xl md:text-3xl'}>{t('pano.title')}</h3>
              <p className={'font-brother text-sm md:text-base'}>{t('pano.description')}</p>
            </div>
          </Link>
        </article>

        <article>
          <Link href={'/private-jet'}>
            <Image
              src={Jet}
              alt={'Private jet'}
              className={
                'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-md my-5'
              }
            />
            <div className={'h-[200px] md:h-[250px] lg:h-[300px]'}>
              <h3 className={'font-brother font-bold text-2xl md:text-3xl'}>{t('jet.title')}</h3>
              <p className={'font-brother text-sm md:text-base'}>{t('jet.description')}</p>
            </div>
          </Link>
        </article>
      </div>
    </section>
  )
}

export default OurFlights
