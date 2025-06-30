import { IContext } from '@/context/experiences/experience'
import { getTranslations } from 'next-intl/server'

const Hero = async ({ data }: { data: IContext }) => {
  const t = await getTranslations('Experiences')
  return import('@/components/shared/hero').then((hero) => (
    <header className={'w-full'}>
      <hero.default
        title={t(
          data.experience.type === 'gastronomy' ? 'gastronomy.hero.title' : 'lifestyle.hero.title',
        )}
        subtitle={t(
          data.experience.type === 'gastronomy'
            ? 'gastronomy.hero.subtitle'
            : 'lifestyle.hero.subtitle',
        )}
        imageSrc={
          data.experience.type === 'gastronomy'
            ? '/images/experiences/gastronomy.webp'
            : '/images/index/helicopter.webp'
        }
        buttonText={t('page.cta')}
        buttonLink={'#experience'}
      />
    </header>
  ))
}
export default Hero
