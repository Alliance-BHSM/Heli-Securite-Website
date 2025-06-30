'use client'

import * as React from 'react'
import { Experience } from '@/payload-types'

export interface IContext {
  states: {
    photo: Experience['gallery'][number]
    setPhoto: React.Dispatch<React.SetStateAction<Experience['gallery'][number]>>
  }
}

const Context = React.createContext<IContext | undefined>(undefined)

export const ContextProvider = ({
  data,
  children,
}: {
  data: { photo: Experience['gallery'][number] }
  children: React.ReactNode
}) => {
  const [photo, setPhoto] = React.useState<typeof data.photo>(data.photo)

  const values = {
    states: {
      photo,
      setPhoto,
    },
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useContext = (): IContext => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useContext must be used within a ContextProvider')
  }
  return context
}
