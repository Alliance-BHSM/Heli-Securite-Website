import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Maintenance from '@/components/management/maintenance'
import Management from '@/components/management/management'
import Handling from '@/components/management/handling'
import CTASection from '@/components/management/cta-section'
import Footer from '@/components/shared/footer'

export default async function ServicesPage() {
  const t = await getTranslations('Management.hero')

  return (
    <main>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('CTA')}
        buttonLink="/contact"
        imageSrc="/images/index/services.webp"
      />
      <Management />
      <Maintenance />
      <Handling />
      <CTASection />
      <Footer />
    </main>
  )
}
