import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function CTASection() {
  const t = await getTranslations('AboutUs.cta-section')

  return (
    <section className="py-16 bg-primary-button text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 font-brother">{t('title')}</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto font-brother">{t('description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/flights"
            className="bg-white text-primary-button hover:bg-gray-100 px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            {t('book-flight')}
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-button px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            {t('contact-us')}
          </Link>
        </div>
      </div>
    </section>
  )
}
