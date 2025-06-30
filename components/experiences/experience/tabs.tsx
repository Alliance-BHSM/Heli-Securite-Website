import { Link } from '@/i18n/navigation'
import type { IContext } from '@/context/experiences/experience'

const Tabs = ({ data }: { data: IContext }) => (
  <div className="w-10/12 px-4 mx-auto overflow-auto flex justify-start items-center overflow-x-auto scrollbar-hide gap-1 pt-4">
    {data.experiences.map((tab, i) => {
      const className = `flex-shrink-0 px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${i === 0 ? 'rounded-tl-xl rounded-tr-sm' : ''} ${
        i === data.experiences.length - 1 ? 'rounded-tr-xl rounded-tl-sm' : 'rounded-t-sm'
      }`
      return data.experience.id === tab.id ? (
        <div key={i} className={`${className} bg-primary-button text-white cursor-default`}>
          {tab.name}
        </div>
      ) : (
        <Link
          href={`/experiences/${tab.slug}#experience`}
          className={`${className} bg-gray-200 text-gray-700 hover:bg-gray-300`}
        >
          {tab.name}
        </Link>
      )
    })}
  </div>
)

export default Tabs
