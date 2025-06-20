import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import CostControl from '@/components/management/cost-control'
import HelicopterSales from '@/components/management/helicopter-sales'
import CrewManagement from '@/components/management/crew-management'
import Charter from '@/components/management/charter'

export default async function Management() {
  const t = await getTranslations('Management')
  return (
    <div>
      <Hero
        title={t('Management.hero.title')}
        subtitle={t('Management.hero.subtitle')}
        buttonText={t('Management.hero.CTA')}
        buttonLink={'/contact'}
        imageSrc={'/images/fleet/hero.webp'}
      />
      <CostControl />
      <HelicopterSales />
      <CrewManagement />
      <Charter />
      <Footer />
    </div>
  )
}
