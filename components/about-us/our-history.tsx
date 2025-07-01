import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function OurHistory() {
  const t = await getTranslations('AboutUs.our-history')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-6 text-lg font-brother">
              {t.rich('foundation', {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <p className="text-gray-600 mb-6 text-lg font-brother">
              {t.rich('services-intro', {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              {Array.from({ length: 7 }, (_, i) => (
                <li key={i}>
                  {t.rich(`services-list.item${i}`, {
                    b: (chunks) => <b>{chunks}</b>,
                  })}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 w-full h-[300px] md:h-[400px] relative mt-6 md:mt-0">
            <Image
              src="/images/index/hero.webp"
              alt="helicopter"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
