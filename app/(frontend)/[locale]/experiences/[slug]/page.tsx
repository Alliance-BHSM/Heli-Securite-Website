import { ContextProvider } from '@/context/experiences/experience'
import { redirect } from '@/i18n/navigation'

import { getExperience } from '@/app/(frontend)/[locale]/experiences/[slug]/actions'
import { getLocale } from 'next-intl/server'
import { Hero, Tabs } from '@/components/experiences/experience'
import dynamic from 'next/dynamic'

const Card = dynamic(() => import('@/components/experiences/experience').then((mod) => mod.Card))
const Footer = dynamic(() =>
  import('@/components/experiences/experience').then((mod) => mod.Footer),
)

const Experience = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return await getExperience((await params).slug, (await getLocale()) as 'en' | 'fr').then((res) =>
    res.status === 200 ? (
      <main className={'w-full flex flex-col justify-start items-start'}>
        <ContextProvider data={res}>
          <Hero data={res} />
          <article className="w-full bg-gray-50 mb-4">
            <div
              className={
                'w-full lg:w-2/3 lg:mx-auto flex flex-col lg:flex-row justify-start items-start'
              }
            >
              <div className={'absolute -translate-y-24'} id={'experience'} />
              <div className={'w-full h-full flex flex-col justify-start items-start'}>
                <div className={'w-full lg:w-2/3 pr-4'}>
                  <Tabs data={res} />
                </div>
                <Card data={res} />
              </div>
            </div>
          </article>
        </ContextProvider>
        <Footer />
      </main>
    ) : (
      redirect({ href: '/experiences', locale: res.locale })
    ),
  )
}

export default Experience
