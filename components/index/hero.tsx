import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Logo from '@/public/logos/LogoOld.webp'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const Hero = () => {
  const t = useTranslations('Index.hero')

  return (
    <div className="px-10 lg:px-40 h-screen flex items-center relative overflow-hidden">
      <video
        src={
          Math.random() < 0.5
            ? 'https://monacair.mc/api/media/file/Hero%20video%201.webm'
            : 'https://monacair.mc/api/media/file/Hero%20video%202.webm'
        }
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full  object-cover z-0"
      />
      <div className={'absolute top-0 left-0 w-full h-full bg-black/50 z-10'} />
      <div className="relative z-10">
        <Image src={Logo} alt={'Logo of Monacair and Alliance'} width={800} className={'pb-6'} />
        <Link href="/booking">
          <Button variant={'white'}>{t('CTA')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
