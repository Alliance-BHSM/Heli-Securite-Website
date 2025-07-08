import { Card, CardContent } from '@/components/ui/card'
import logo from '@/public/logos/Logo.png'
import Image from 'next/image'
import { IContext } from '@/context/experiences/experience'
import Dialog from './dialog'
import { getTranslations } from 'next-intl/server'

const Sidebar = async ({
  data,
}: {
  data: {
    details: IContext['experience']['details']
    departures: IContext['experience']['departures']
    experience: Pick<IContext['experience'], 'name' | 'guests'>
  }
}) => {
  const t = await getTranslations('Experiences.experience.sidebar')

  return (
    <div className="w-full lg:w-1/3 flex flex-col justify-start items-start gap-8 lg:sticky lg:top-32">
      <Card className="lg:sticky top-8 w-full">
        <CardContent className="p-0 w-full">
          <div className="text-white p-6 bg-black rounded-xl drop-shadow-xl">
            <div className="mb-6 flex flex-row">
              <h3 className="text-lg font-semibold mb-2">
                {t.rich('title', {
                  highlight: (chunks) => (
                    <span className={'font-bold text-redmonacair uppercase'}>{chunks}</span>
                  ),
                })}
              </h3>
              <Image
                src={logo}
                alt={'Monacair & Alliance BHSM logos'}
                className={'h-[1.5rem] w-auto'}
              />
            </div>

            {data.details && (
              <div className="space-y-4">
                {data.details.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-sm mb-2 text-redmonacair">{item.title}</h4>
                    <p className="text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-medium mb-3 uppercase">
                {t.rich('flights', {
                  highlight: (chunks) => <span className={'font-bold'}>{chunks}</span>,
                })}
              </h4>

              {data.departures && (
                <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
                  {data.departures.map(
                    (item, i) =>
                      typeof item.destination !== 'string' && (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-gray-200 bg-gray-50 text-center"
                        >
                          <div className="text-xs font-medium text-gray-600 mb-1">
                            {item.destination.title}
                          </div>
                          <div className="text-sm font-bold text-gray-800">
                            {item.price.toLocaleString('fr-FR')}&euro;
                          </div>
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
            <Dialog data={data.experience} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sidebar
