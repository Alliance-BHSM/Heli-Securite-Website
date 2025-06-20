import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import Maintenance from '@/components/management/maintenance'

export default async function MaintenancePage() {
  const t = await getTranslations('Management.maintenance')
  return (
    <div>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('CTA')}
        buttonLink={'/contact'}
        imageSrc={'/images/fleet/hero.webp'}
      />
      <Maintenance />
      <Footer />
    </div>
  )
}
