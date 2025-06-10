import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

interface HeroBannerProps {
  title: string
  subtitle: string
  buttonText?: string
  buttonHref?: string
  imageUrl?: string
  imageAlt?: string
  imageSrc?: string
}

export function HeroBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
  imageUrl,
  imageAlt = 'Monacair image',
  imageSrc,
}: HeroBannerProps) {
  const imgSrc = imageUrl || imageSrc || '/images/index/hero.webp'

  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0 z-0">
        <Image src={imgSrc} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full text-white px-4 sm:px-6">
        <div className="max-w-4xl container mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-brother text-left">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl font-brother text-left">
            {subtitle}
          </p>
          {buttonText && buttonHref && (
            <Link href={buttonHref} className="inline-block">
              <Button
                size="lg"
                variant="primary"
                className="font-brother px-8 py-3 rounded-md font-bold text-lg"
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
