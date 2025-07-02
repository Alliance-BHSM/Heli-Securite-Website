import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Mail } from 'lucide-react'

const BookingCta = () => {
  const t = useTranslations('PrivateJet.booking')

  return (
    <section className="w-full py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-button/20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-button/10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-white mb-6">
            {t.rich('title', {
              span: (chunks) => <span className="font-caslon text-primary-button">{chunks}</span>,
            })}
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-10 font-brother">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
            <Link href="/contact" className="w-full sm:w-auto uppercase">
              <Button
                variant="red"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 h-auto font-medium transition-transform hover:scale-105 uppercase"
              >
                {t('book_button')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="blue"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 h-auto font-medium transition-transform hover:text-black hover:scale-105 border border-white/30 bg-secondary-button hover:bg-white uppercase"
              >
                {t('contact_button')}
                <Mail className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingCta
