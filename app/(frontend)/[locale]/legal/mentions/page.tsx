import { getTranslations } from 'next-intl/server'
import Footer from '@/components/shared/footer'

export default async function LegalMentionsPage() {
  const t = await getTranslations('legalMentions')
  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600">MONACAIR S.A.M. - www.monacair.mc</p>
        </header>

        {/* Table of Contents */}
        <nav className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sommaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a href="#publisher" className="text-blue-600 hover:text-blue-800 transition-colors">
              1. {t('publisher.title')}
            </a>
            <a href="#hosting" className="text-blue-600 hover:text-blue-800 transition-colors">
              2. {t('hosting.title')}
            </a>
            <a
              href="#intellectual-property"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              3. {t('intellectualProperty.title')}
            </a>
            <a
              href="#personal-data"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              4. {t('personalData.title')}
            </a>
            <a
              href="#responsibility"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              5. {t('responsibility.title')}
            </a>
            <a href="#hyperlinks" className="text-blue-600 hover:text-blue-800 transition-colors">
              6. {t('hyperlinks.title')}
            </a>
            <a
              href="#applicable-law"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              7. {t('applicableLaw.title')}
            </a>
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1: Publisher */}
          <section id="publisher" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. {t('publisher.title')}</h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">{t('publisher.companyName')}</h3>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">🏢</span>
                  <span>{t('publisher.address')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">📞</span>
                  <span>{t('publisher.phone')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">📧</span>
                  <span>{t('publisher.email')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">📄</span>
                  <span>{t('publisher.rcs')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">💰</span>
                  <span>{t('publisher.vat')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">👤</span>
                  <span>{t('publisher.director')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Hosting */}
          <section id="hosting" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. {t('hosting.title')}</h2>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-gray-600 mr-3">🏢</span>
                  <span className="font-semibold">{t('hosting.name')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-600 mr-3">📍</span>
                  <span>{t('hosting.address')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-600 mr-3">📞</span>
                  <span>{t('hosting.phone')}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-600 mr-3">🌐</span>
                  <span>{t('hosting.website')}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 italic">
              * Les informations dhébergement seront complétées avec les données du prestataire
              choisi.
            </div>
          </section>

          {/* Section 3: Intellectual Property */}
          <section id="intellectual-property" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. {t('intellectualProperty.title')}
            </h2>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('intellectualProperty.description')}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <span className="text-primary-button mr-3">⚠️</span>
                <p className="text-red-800 font-medium">{t('intellectualProperty.prohibition')}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-600">Textes</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🖼️</div>
                <div className="text-sm text-gray-600">Images</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm text-gray-600">Graphismes</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-sm text-gray-600">Logiciels</div>
              </div>
            </div>
          </section>

          {/* Section 4: Personal Data */}
          <section id="personal-data" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. {t('personalData.title')}</h2>

            <p className="text-gray-700 leading-relaxed mb-6">{t('personalData.introduction')}</p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('personalData.responsibleTitle')}
                </h3>
                <p className="text-gray-700 mb-2">{t('personalData.responsible')}</p>
                <p className="text-gray-700">{t('personalData.dpoContact')}</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('personalData.purposesTitle')}
                </h3>
                <p className="text-gray-700">{t('personalData.purposes')}</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('personalData.rightsTitle')}
                </h3>
                <p className="text-gray-700">{t('personalData.rights')}</p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('personalData.cookiesTitle')}
                </h3>
                <p className="text-gray-700">{t('personalData.cookies')}</p>
              </div>
            </div>
          </section>

          {/* Section 5: Responsibility */}
          <section id="responsibility" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. {t('responsibility.title')}
            </h2>

            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-gray-700 leading-relaxed">{t('responsibility.disclaimer')}</p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                <p className="text-gray-700 leading-relaxed">
                  {t('responsibility.userResponsibility')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Hyperlinks */}
          <section id="hyperlinks" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. {t('hyperlinks.title')}</h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🔗</span>
                <p className="text-gray-700 leading-relaxed">{t('hyperlinks.description')}</p>
              </div>
            </div>
          </section>

          {/* Section 7: Applicable Law */}
          <section id="applicable-law" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. {t('applicableLaw.title')}</h2>

            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-start">
                <span className="text-primary-button mr-3 text-xl">⚖️</span>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {t('applicableLaw.description')}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🇲🇨</div>
                <div className="text-sm text-gray-600 font-medium">Juridiction de Monaco</div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Contact</h2>
          <div className="text-center text-gray-700">
            <p className="mb-2">Pour toute question concernant ces mentions légales :</p>
            <p className="font-semibold">📧 contact@monacair.mc</p>
            <p className="font-semibold">📞 +377 97 97 39 00</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center py-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} MONACAIR S.A.M. - Tous droits réservés
          </p>
        </footer>
      </div>
      <Footer />
    </div>
  )
}
