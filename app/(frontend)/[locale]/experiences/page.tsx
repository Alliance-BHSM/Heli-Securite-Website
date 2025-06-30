import { getLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import IntroSection from '@/components/experiences/intro-section'
import ExperiencesListing from '@/components/experiences/listing'
import CustomSection from '@/components/experiences/custom-section'
import CTASection from '@/components/experiences/cta-section'
import FeaturesSection from '@/components/experiences/gastronomy/features-section'
import FeaturesSectionLifestyle from '@/components/experiences/lifestyle/features-section'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'

export default async function ExperiencesPage() {
  const t = await getTranslations('Experiences.page')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="#gastronomy-section"
        imageSrc="/images/index/culture.webp"
      />
      <IntroSection />
      <ExperiencesListing
        data={{
          experience: await payload.find({
            collection: 'experiences',
            locale,
            fallbackLocale: 'fr',
            limit: 0,
          }),
        }}
      />
      <FeaturesSection />
      <FeaturesSectionLifestyle />
      <CustomSection />
      <CTASection />
      <Footer />
    </div>
  )
}
