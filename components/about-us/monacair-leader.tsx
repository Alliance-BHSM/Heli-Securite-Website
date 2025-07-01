import { getTranslations } from 'next-intl/server'

export default async function MonacairLeader() {
  const t = await getTranslations('AboutUs.monacair-leader')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className={'space-y-4'}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">{t(`title${i}`)}</h2>
            <p className={'text-gray-600 font-brother'}>
              {t.rich(`text${i}`, {
                br: (chunks) => <br />,
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
