import { getPayloadClient } from '@/lib/payload'
import { IContext } from '@/context/experiences/experience'

export const getExperience = async (
  slug: string,
  locale: 'en' | 'fr',
): Promise<
  | { status: 200; experience: IContext['experience']; experiences: IContext['experiences'] }
  | { status: 404; locale: 'en' | 'fr' }
> => {
  const payload = await getPayloadClient()

  const experience = (
    await payload.find({
      collection: 'experiences',
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0]

  if (!experience)
    return {
      status: 404,
      locale,
    }

  return {
    status: 200,
    experience,
    experiences: (
      await payload.find({
        collection: 'experiences',
        locale,
        where: {
          type: {
            equals: experience.type,
          },
        },
        select: {
          name: true,
          slug: true,
        },
      })
    ).docs,
  }
}
