'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { Locale } from 'next-intl'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <label
      className={clsx(
        'relative text-white font-brother font-bold',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <p className="sr-only text-white">{label}</p>
      <select
        className="inline-flex text-white appearance-none bg-black py-3 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none text-white absolute right-2 md:top-[8px]">⌄</span>
    </label>
  )
}
