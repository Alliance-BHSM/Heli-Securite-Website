import { getTranslations } from 'next-intl/server'

export default async function HandlingGeneral() {
  const t = await getTranslations('Handling')

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-6 mb-10">
          <p>{t('description.intro')}</p>
          <p>{t('description.location')}</p>
          <p>{t('description.services')}</p>
          <p>{t('description.facilities')}</p>
          <p>{t('description.team')}</p>
          <p>{t('description.quality')}</p>
          <p>{t('description.logistics')}</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-10">
          <p className="font-semibold mb-4">{t('hangar')}</p>
          <p className="italic">
            {t('contact.prefix')}{' '}
            <a href="mailto:booking@monacair.mc" className="text-blue-600 hover:underline">
              booking@monacair.mc
            </a>
          </p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-2xl font-bold mb-4">{t('servicesRecap.title')}</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('servicesRecap.hangarage')}</li>
            <li>{t('servicesRecap.fuel')}</li>
            <li>{t('servicesRecap.technical')}</li>
            <li>{t('servicesRecap.coordination')}</li>
            <li>{t('servicesRecap.driver')}</li>
            <li>{t('servicesRecap.lounge')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
