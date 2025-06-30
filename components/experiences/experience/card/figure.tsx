'use client'

import { IContext } from '@/context/experiences/experience/card'

const Figure = ({ context, children }: { context: () => IContext; children: React.ReactNode }) => {
  const { states } = context()

  return (
    <figure
      className="relative h-64 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${typeof states.photo === 'string' ? '/placeholder.svg' : states.photo.url})`,
      }}
    >
      {children}
    </figure>
  )
}

export default Figure
