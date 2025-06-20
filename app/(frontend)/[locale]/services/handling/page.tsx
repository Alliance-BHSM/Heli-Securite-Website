import Footer from '@/components/shared/footer'
import Hero from '@/components/shared/hero'
import Handling from '@/components/management/handling'
import HandlingGeneral from '@/components/management/handling-general'
import { getTranslations } from 'next-intl/server'

export default async function HandlingPage() {
  const t = await getTranslations('Handling')
  return (
    <div>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.CTA')}
        buttonLink={'/contact'}
        imageSrc={'/images/fleet/hero.webp'}
      />
      <Handling />
      <HandlingGeneral />
      <Footer />
    </div>
  )
}
