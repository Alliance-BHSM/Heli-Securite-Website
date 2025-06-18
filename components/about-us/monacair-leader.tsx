import { getTranslations } from 'next-intl/server'

export default async function MonacairLeader() {
  const t = await getTranslations('AboutUs.monacair-leader')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">{t('title')}</h2>

        <div className="space-y-6 text-gray-600 font-brother">
          <h4 className={'text-xl'}>{t('operational-bases')}</h4>
          <ul>
            <li>{t('team-goal')}</li>
            <li>{t('services')}</li>
            <li>{t('maintenance')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
