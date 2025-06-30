'use client'

import React, { createContext } from 'react'
import { Experience } from '@/payload-types'

export interface IContext {
  experience: Experience
  experiences: Pick<Experience, 'id' | 'name' | 'slug'>[]
}

const Context = createContext<IContext | undefined>(undefined)

export const ContextProvider = ({
  data,
  children,
}: {
  data: IContext
  children: React.ReactNode
}) => <Context.Provider value={data}>{children}</Context.Provider>

export const useContext = (): IContext => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useContext must be used within a ContextProvider')
  }
  return context
}
