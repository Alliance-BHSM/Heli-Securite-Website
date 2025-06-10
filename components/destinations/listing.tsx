'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Destination, Region } from '@/payload-types'
import { PaginatedDocs } from 'payload'

const Listing = ({
  data,
}: {
  data: { destinations: PaginatedDocs<Destination>; regions: PaginatedDocs<Region> }
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const filteredDestinations = selectedRegion
    ? data.destinations.docs.filter(
        (destination) =>
          destination.region &&
          typeof destination.region === 'object' &&
          'id' in destination.region &&
          destination.region.id === selectedRegion,
      )
    : data.destinations.docs

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion((prevRegion) => (prevRegion === regionId ? null : regionId))
  }

  return (
    <div className={'px-6 sm:px-10 md:px-20 lg:px-40'}>
      <div className={'flex flex-wrap items-center justify-center gap-3 mb-5'}>
        {data.regions.docs.map((region) => (
          <div
            key={region.id}
            className={`relative w-64 h-24 rounded-4xl border ${selectedRegion === region.id ? 'border-2 border-royalblue' : 'border-black'} overflow-hidden cursor-pointer hover:opacity-90 transition-all`}
            onClick={() => handleRegionClick(region.id)}
          >
            {region.image && typeof region.image !== 'string' && (
              <Image
                src={region.image.url || '/images/placeholder.png'}
                alt={region.image.alt || `${region.name} region`}
                width={region.image.width || 200}
                height={region.image.height || 150}
                className="absolute w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-start">
              <span className="text-white font-brother text-2xl font-medium px-3 text-center">
                {region.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedRegion && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setSelectedRegion(null)}
            className="text-xs font-brother text-primary hover:underline"
          >
            Show all destinations
          </button>
        </div>
      )}
      <hr className="h-[2px] bg-black my-5 w-full" />
      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-20'}>
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((card) => (
            <Link href={`/destinations/${card.slug}`} className="block" key={card.id}>
              <div className={'w-full rounded-lg'}>
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px]">
                  <Image
                    src={
                      typeof card.image === 'string'
                        ? card.image
                        : card.image?.url || '/images/placeholder.png'
                    }
                    alt={
                      typeof card.image === 'string'
                        ? 'Destination image'
                        : card.image?.alt || 'Destination image'
                    }
                    width={typeof card.image === 'string' ? 500 : card.image?.width || 500}
                    height={typeof card.image === 'string' ? 500 : card.image?.height || 500}
                    className="rounded-lg h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <h2 className="font-brother text-lg sm:text-xl md:text-2xl text-white">
                      {card.title}
                    </h2>
                    <h3
                      className={
                        'text-white font-brother text-sm sm:text-base md:text-lg font-light'
                      }
                    >
                      {card.country}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="font-brother text-lg">No destinations found for this region.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listing
