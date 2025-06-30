import * as ui from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IContext } from '@/context/experiences/experience'
import CorporateField from '@/components/experiences/experience/card/sidebar/corporateField'
import { getTranslations } from 'next-intl/server'

const Dialog = async ({ data }: { data: Pick<IContext['experience'], 'name' | 'guests'> }) => {
  const t = await getTranslations('Experiences.experience.sidebar.dialog')
  return (
    <ui.Dialog>
      <ui.DialogTrigger asChild>
        <Button className="w-full bg-primary-button hover:bg-primary-button/90 text-white font-semibold py-3">
          {t('reserve')}
        </Button>
      </ui.DialogTrigger>
      <ui.DialogContent
        className={'w-[90vw] lg:w-[56vh] flex flex-col justify-start items-start gap-8'}
      >
        <ui.DialogHeader className={'w-full'}>
          <ui.DialogTitle className={'w-full'}>
            {t('title', {
              experience: data.name,
            })}
          </ui.DialogTitle>
        </ui.DialogHeader>
        <form
          action={'https://formsubmit.co/booking@monacair.mc'}
          method={'POST'}
          className="w-full flex flex-col justify-start items-start gap-8"
        >
          <Input type={'hidden'} name={'experience'} value={data.name} />
          {[
            {
              id: 'fullName',
              label: t('fields.fullName'),
              type: 'text',
            },
            {
              id: 'phone',
              label: t('fields.phone'),
              type: 'tel',
            },
            {
              id: 'email',
              label: t('fields.email'),
              type: 'email',
            },
            {
              id: 'date',
              label: t('fields.date'),
              type: 'date',
            },
          ].map((field, i) => (
            <div key={i} className="w-full flex flex-col justify-start items-start gap-2">
              <Label htmlFor={field.id} className={'w-full'}>
                {field.label}
              </Label>
              <Input
                type={field.type}
                id={field.id}
                name={field.id}
                required
                className={'w-full'}
              />
            </div>
          ))}

          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label htmlFor="attendees">{t('fields.participants.label')}</Label>
            <Input
              id="attendees"
              name="attendees"
              type="number"
              min={data.guests.minimum}
              max={data.guests.maximum}
              required
              className={'w-full'}
            />
            <small className="text-xs text-gray-500 w-full">
              {t('fields.participants.note', {
                min: data.guests.minimum,
                max: data.guests.maximum,
              })}
            </small>
          </div>

          <CorporateField />

          <div className="w-full flex justify-end items-center gap-4">
            <ui.DialogClose>
              <Button
                className={
                  'bg-black text-white hover:bg-secondary-button transition-colors duration-200 ease-in-out'
                }
              >
                {t('cancel')}
              </Button>
            </ui.DialogClose>
            <Button variant={'red'} type="submit">
              {t('submit')}
            </Button>
          </div>
        </form>
      </ui.DialogContent>
    </ui.Dialog>
  )
}
export default Dialog
