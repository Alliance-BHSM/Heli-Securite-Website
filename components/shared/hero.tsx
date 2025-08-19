import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface HeroProps {
  title: string | React.ReactNode
  subtitle: string | React.ReactNode
  buttonText: string
  buttonLink: string
  imageSrc: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, buttonText, buttonLink, imageSrc }) => (
  <section
    className={`px-10 lg:px-40 h-screen flex items-center bg-cover bg-center relative`}
    style={{ backgroundImage: `url(${imageSrc})` }}
  >
    <div className={'absolute inset-0 bg-black/25 z-0'} />
    <div className="relative z-10">
      <h1 className={'text-white text-5xl lg:text-7xl font-brother pb-5'}>{title}</h1>
      <p className={'text-white text-sm lg:text-lg font-brother font-light pb-5 w-3/5'}>
        {subtitle}
      </p>
      <Link href={buttonLink}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  </section>
)

export default Hero
