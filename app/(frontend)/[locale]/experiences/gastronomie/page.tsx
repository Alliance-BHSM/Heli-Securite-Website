import Hero from '@/components/shared/hero'
import IntroSection from '@/components/experiences/gastronomy/intro-section'
import FeaturesSection from '@/components/experiences/gastronomy/features-section'
import ExperiencesSection from '@/components/experiences/gastronomy/experiences-section'
import CtaSection from '@/components/experiences/gastronomy/cta-section'
import { getLocale, getTranslations } from 'next-intl/server'
import Footer from '@/components/shared/footer'
import TestimonialsSection from '@/components/experiences/gastronomy/testimonials-section'
import PricingSection from '@/components/experiences/gastronomy/pricing-section'
import BookingForm from '@/components/experiences/gastronomy/booking-form'
import { getPayloadClient } from '@/lib/payload'
import type { Experience } from '@/payload-types'

export default async function GastronomieExperiencePage() {
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const t = await getTranslations('Experiences.gastronomy')
  const payload = await getPayloadClient()

  const { docs: experiences } = (await payload.find({
    collection: 'experiences',
    where: {
      type: {
        equals: 'gastronomy',
      },
    },
    depth: 1,
    locale,
    fallbackLocale: 'fr',
  })) as { docs: Experience[] }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="#booking-form"
        imageSrc={'/images/experiences/gastronomy/hero.webp'}
      />
      <IntroSection />
      <FeaturesSection />
      <ExperiencesSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <BookingForm experiences={experiences} />
      <CtaSection />
      <Footer />
    </div>
  )
}
