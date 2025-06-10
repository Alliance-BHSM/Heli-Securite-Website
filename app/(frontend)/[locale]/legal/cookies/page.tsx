import { getTranslations } from 'next-intl/server'
import Footer from '@/components/shared/footer'

export default async function CookiesPage() {
  const t = await getTranslations('cookiePolicy')
  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="text-6xl mb-4">🍪</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600">{t('lastUpdate')}</p>
        </header>

        {/* Quick Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <span className="text-blue-600 text-2xl mr-4">ℹ️</span>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Information importante</h2>
              <p className="text-blue-800">
                Cette page explique comment nous utilisons les cookies sur monacair.mc et comment
                vous pouvez gérer vos préférences.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sommaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a
              href="#what-is-cookie"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              1. {t('whatIsCookie.title')}
            </a>
            <a href="#purposes" className="text-blue-600 hover:text-blue-800 transition-colors">
              2. {t('purposes.title')}
            </a>
            <a href="#management" className="text-blue-600 hover:text-blue-800 transition-colors">
              3. {t('management.title')}
            </a>
            <a href="#retention" className="text-blue-600 hover:text-blue-800 transition-colors">
              4. {t('retention.title')}
            </a>
            <a href="#contact" className="text-blue-600 hover:text-blue-800 transition-colors">
              5. {t('contact.title')}
            </a>
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1: What is a Cookie */}
          <section id="what-is-cookie" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. {t('whatIsCookie.title')}</h2>

            <div className="flex items-start mb-6">
              <div className="mr-6 flex-shrink-0">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🍪</span>
                </div>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('whatIsCookie.description')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-sm text-gray-600 font-medium">Ordinateur</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm text-gray-600 font-medium">Smartphone</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm text-gray-600 font-medium">Tablette</div>
              </div>
            </div>
          </section>

          {/* Section 2: Purposes */}
          <section id="purposes" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. {t('purposes.title')}</h2>

            <p className="text-gray-700 mb-8 text-lg">{t('purposes.description')}</p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-start">
                  <span className="text-green-600 text-2xl mr-4">✅</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      a) {t('purposes.necessary.title')}
                    </h3>
                    <p className="text-green-800 leading-relaxed">
                      {t('purposes.necessary.description')}
                    </p>
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Pas de consentement requis
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-start">
                  <span className="text-blue-600 text-2xl mr-4">📊</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      b) {t('purposes.analytics.title')}
                    </h3>
                    <p className="text-blue-800 leading-relaxed mb-3">
                      {t('purposes.analytics.description')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Consentement requis
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Google Analytics
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                <div className="flex items-start">
                  <span className="text-purple-600 text-2xl mr-4">🎯</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">
                      c) {t('purposes.advertising.title')}
                    </h3>
                    <p className="text-purple-800 leading-relaxed">
                      {t('purposes.advertising.description')}
                    </p>
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Consentement explicite requis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Management */}
          <section id="management" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. {t('management.title')}</h2>

            {/* Cookie Banner Info */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">🍪 Bandeau de cookies</h3>
              <p className="text-amber-800 mb-4">{t('management.bannerDescription')}</p>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>{t('management.option1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>{t('management.option2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>{t('management.option3')}</span>
                </li>
              </ul>
            </div>

            {/* Modify Preferences */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                ⚙️ Modification des préférences
              </h3>
              <p className="text-blue-800">{t('management.modifyPreferences')}</p>
            </div>

            {/* Browser Configuration */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🌐 Configuration du navigateur
              </h3>
              <p className="text-gray-700 mb-4">{t('management.browserConfig')}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded border">
                  <span className="text-xl">🟢</span>
                  <span className="text-gray-700">{t('management.chrome')}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded border">
                  <span className="text-xl">🦊</span>
                  <span className="text-gray-700">{t('management.firefox')}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded border">
                  <span className="text-xl">🧭</span>
                  <span className="text-gray-700">{t('management.safari')}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded border">
                  <span className="text-xl">🔷</span>
                  <span className="text-gray-700">{t('management.edge')}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-start">
                <span className="text-primary-button mr-3">⚠️</span>
                <p className="text-red-800 font-medium">{t('management.warning')}</p>
              </div>
            </div>
          </section>

          {/* Section 4: Retention */}
          <section id="retention" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. {t('retention.title')}</h2>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">⏱️</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Durée maximale : 13 mois</h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{t('retention.description')}</p>

              <div className="mt-6 flex items-center justify-between bg-white rounded-lg p-4 border">
                <div className="text-center">
                  <div className="text-2xl text-blue-600 mb-1">📅</div>
                  <div className="text-sm text-gray-600">Dépôt du cookie</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">13 mois maximum</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-green-600 mb-1">🔄</div>
                  <div className="text-sm text-gray-600">Nouveau consentement</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Contact */}
          <section id="contact" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. {t('contact.title')}</h2>

            <p className="text-gray-700 mb-6">{t('contact.description')}</p>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('contact.dpoTitle')}</h3>
              <div className="flex items-center">
                <span className="text-blue-600 text-xl mr-3">📧</span>
                <span className="text-blue-800 font-medium">{t('contact.email')}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center py-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Cette politique fait partie intégrante de nos mentions légales et de notre politique de
            confidentialité.
          </p>
        </footer>
      </div>
      <Footer />
    </div>
  )
}
