'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Phone, Menu, X, MoveDown } from 'lucide-react'
import Flamme from '@/public/logos/flamme.webp'
import Pano from '@/public/images/index/panoramique.webp'
import Private from '@/public/images/index/private.webp'
import Regular from '@/public/images/index/regular.webp'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DestinationsCarousel, EventsCarousel } from '@/components/nav/carousel'
import { PaginatedDocs } from 'payload'
import { Destination, Event } from '@/payload-types'
import LocaleSwitcher from '@/components/nav/LocaleSwitcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar({
  data,
}: {
  data: { destinations: PaginatedDocs<Destination>; events: PaginatedDocs<Event> }
}) {
  const t = useTranslations('Nav')
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsDestinationsOpen(false)
        setIsEventsOpen(false)
        setIsBookingOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDestinations = () => {
    if (isEventsOpen) setIsEventsOpen(false)
    if (isBookingOpen) setIsBookingOpen(false)
    setIsDestinationsOpen((prev) => !prev)
  }

  const toggleEvents = () => {
    if (isDestinationsOpen) setIsDestinationsOpen(false)
    if (isBookingOpen) setIsBookingOpen(false)
    setIsEventsOpen((prev) => !prev)
  }

  const toggleBooking = () => {
    if (isDestinationsOpen) setIsDestinationsOpen(false)
    if (isEventsOpen) setIsEventsOpen(false)
    setIsBookingOpen((prev) => !prev)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <nav ref={navbarRef} className={'top-5 fixed left-0 right-0 z-50'}>
      {/* Desktop navbar */}
      <div
        className={
          'bg-black text-white hidden lg:block rounded-xl top-5 shadow-md lg:mx-15 xl:mx-30 h-18'
        }
      >
        <div className={'flex h-full items-center justify-between px-5'}>
          <Link href={'/'}>
            <Image src={Flamme} alt={'logo'} width={80} height={80} />
          </Link>
          <menu className={'flex gap-5 xl:gap-6 2xl:gap-7 font-brother text-sm xl:text-base'}>
            <div className="relative">
              <button
                onClick={toggleBooking}
                className="cursor-pointer flex items-center justify-center"
              >
                {t('book')}
                <MoveDown size={14} />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleDestinations}
                className="cursor-pointer flex items-center justify-center"
              >
                {t('destinations')}
                <MoveDown size={14} />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleEvents}
                className="cursor-pointer flex items-center justify-center"
              >
                {t('events')}
                <MoveDown size={14} />
              </button>
            </div>
            <Link href="/experiences">{t('experience')}</Link>
            <Link href="/private-jet">{t('jet')}</Link>
            <Link href="/fleet">{t('fleet')}</Link>
            <Link href="/services">{t('services')}</Link>
            <Link href="/about">{t('about')}</Link>
          </menu>
          <div className={'flex items-center justify-center gap-4'}>
            <LocaleSwitcher />
            <Link href="/contact">
              <Button size={'sm'} variant={'secondary'} className={'font-brother font-light '}>
                {t('CTA')}
              </Button>
            </Link>
            <a href={'https://wa.me/33670784966'} className={'font-brother flex items-center'}>
              <svg
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
              </svg>
            </a>
            <Dropdown />
          </div>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className={'bg-black text-white rounded-lg shadow-2xl mx-5 h-16 lg:hidden'}>
        <div className={'flex h-full items-center justify-between px-4'}>
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href={'/'}>
            <Image src={Flamme} alt={'logo'} width={96} />
          </Link>
          <div className={'flex items-center justify-center gap-2'}>
            <Link href="/contact">
              <Button
                size={'sm'}
                variant={'secondary'}
                className={'font-brother font-light text-xs'}
              >
                {t('CTA')}
              </Button>
            </Link>
            <a href={'https://wa.me/33614744720'} className={'font-brother flex items-center'}>
              <svg
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
              </svg>
            </a>
            <Dropdown />
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`bg-black text-white mx-5 shadow-2xl fixed rounded-b-xl -translate-y-2 left-0 right-0 overflow-hidden z-40 transition-all duration-1000 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'} lg:hidden`}
      >
        <div className="p-5 flex flex-col gap-2 font-brother">
          <Link href="/flights" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('book')}
          </Link>
          <Link href="/destinations" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('destinations')}
          </Link>
          <Link href="/events" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('events')}
          </Link>
          <Link href="/experiences" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('experience')}
          </Link>
          <Link href="/private-jet" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('jet')}
          </Link>
          <Link href="/fleet" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('fleet')}
          </Link>
          <Link href="/services" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('services')}
          </Link>
          <Link href="/about" onClick={toggleMobileMenu} className="py-1 border-b">
            {t('about')}
          </Link>
          <div className="mt-auto pt-3 flex items-start justify-between">
            <div>
              <a
                href={'https://maps.app.goo.gl/xtwwcSQkwBmqowdY6'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <address className={'font-brother text-base not-italic font-light'}>
                  <br />
                  195 Av. de l`Héliport,
                  <br /> 83310 Grimaud
                </address>
              </a>
              <div className="flex items-center  mt-4 mb-3 gap-2">
                <Link href="https://www.instagram.com/helisecurite/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    className="w-7  h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      className="mix-blend-mode: normal"
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M15,4c-6.06341,0 -11,4.93659 -11,11v18c0,6.06341 4.93659,11 11,11h18c6.06341,0 11,-4.93659 11,-11v-18c0,-6.06341 -4.93659,-11 -11,-11zM15,6h18c4.98259,0 9,4.01741 9,9v18c0,4.98259 -4.01741,9 -9,9h-18c-4.98259,0 -9,-4.01741 -9,-9v-18c0,-4.98259 4.01741,-9 9,-9zM35,11c-1.105,0 -2,0.895 -2,2c0,1.105 0.895,2 2,2c1.105,0 2,-0.895 2,-2c0,-1.105 -0.895,-2 -2,-2zM24,14c-5.51133,0 -10,4.48867 -10,10c0,5.51133 4.48867,10 10,10c5.51133,0 10,-4.48867 10,-10c0,-5.51133 -4.48867,-10 -10,-10zM24,16c4.43067,0 8,3.56933 8,8c0,4.43067 -3.56933,8 -8,8c-4.43067,0 -8,-3.56933 -8,-8c0,-4.43067 3.56933,-8 8,-8z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/Helisecuritehelicopterairline/?locale=fr_FR"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      className="mix-blend-mode: normal"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M9,4c-2.74952,0 -5,2.25048 -5,5v32c0,2.74952 2.25048,5 5,5h16.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h5.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h8.8418c2.74952,0 5,-2.25048 5,-5v-32c0,-2.74952 -2.25048,-5 -5,-5zM9,6h32c1.66848,0 3,1.33152 3,3v32c0,1.66848 -1.33152,3 -3,3h-8v-14h3.82031l1.40039,-7h-5.2207v-2c0,-0.55749 0.05305,-0.60107 0.24023,-0.72266c0.18718,-0.12159 0.76559,-0.27734 1.75977,-0.27734h3v-5.63086l-0.57031,-0.27149c0,0 -2.29704,-1.09766 -5.42969,-1.09766c-2.25,0 -4.09841,0.89645 -5.28125,2.375c-1.18284,1.47855 -1.71875,3.45833 -1.71875,5.625v2h-3v7h3v14h-16c-1.66848,0 -3,-1.33152 -3,-3v-32c0,-1.66848 1.33152,-3 3,-3zM32,15c2.07906,0 3.38736,0.45846 4,0.70117v2.29883h-1c-1.15082,0 -2.07304,0.0952 -2.84961,0.59961c-0.77656,0.50441 -1.15039,1.46188 -1.15039,2.40039v4h4.7793l-0.59961,3h-4.17969v16h-4v-16h-3v-3h3v-4c0,-1.83333 0.46409,-3.35355 1.28125,-4.375c0.81716,-1.02145 1.96875,-1.625 3.71875,-1.625z"></path>
                      </g>
                    </g>
                  </svg>{' '}
                </Link>
                <Link href="https://www.linkedin.com/company/heli-securite/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      className="mix-blend-mode: normal"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M9,4c-2.74952,0 -5,2.25048 -5,5v32c0,2.74952 2.25048,5 5,5h32c2.74952,0 5,-2.25048 5,-5v-32c0,-2.74952 -2.25048,-5 -5,-5zM9,6h32c1.66848,0 3,1.33152 3,3v32c0,1.66848 -1.33152,3 -3,3h-32c-1.66848,0 -3,-1.33152 -3,-3v-32c0,-1.66848 1.33152,-3 3,-3zM14,11.01172c-1.09522,0 -2.08078,0.32736 -2.81055,0.94141c-0.72977,0.61405 -1.17773,1.53139 -1.17773,2.51367c0,1.86718 1.61957,3.32281 3.67969,3.4668c0.0013,0.00065 0.0026,0.0013 0.00391,0.00195c0.09817,0.03346 0.20099,0.05126 0.30469,0.05273c2.27301,0 3.98828,-1.5922 3.98828,-3.52148c-0.00018,-0.01759 -0.00083,-0.03518 -0.00195,-0.05274c-0.10175,-1.90023 -1.79589,-3.40234 -3.98633,-3.40234zM14,12.98828c1.39223,0 1.94197,0.62176 2.00195,1.50391c-0.01215,0.85625 -0.54186,1.51953 -2.00195,1.51953c-1.38541,0 -2.01172,-0.70949 -2.01172,-1.54492c0,-0.41771 0.15242,-0.7325 0.47266,-1.00195c0.32023,-0.26945 0.83428,-0.47656 1.53906,-0.47656zM11,19c-0.55226,0.00006 -0.99994,0.44774 -1,1v19c0.00006,0.55226 0.44774,0.99994 1,1h6c0.55226,-0.00006 0.99994,-0.44774 1,-1v-5.86523v-13.13477c-0.00006,-0.55226 -0.44774,-0.99994 -1,-1zM20,19c-0.55226,0.00006 -0.99994,0.44774 -1,1v19c0.00006,0.55226 0.44774,0.99994 1,1h6c0.55226,-0.00006 0.99994,-0.44774 1,-1v-10c0,-0.82967 0.22639,-1.65497 0.625,-2.19531c0.39861,-0.54035 0.90147,-0.86463 1.85742,-0.84766c0.98574,0.01695 1.50758,0.35464 1.90234,0.88477c0.39477,0.53013 0.61523,1.32487 0.61523,2.1582v10c0.00006,0.55226 0.44774,0.99994 1,1h6c0.55226,-0.00006 0.99994,-0.44774 1,-1v-10.73828c0,-2.96154 -0.87721,-5.30739 -2.38086,-6.89453c-1.50365,-1.58714 -3.59497,-2.36719 -5.80664,-2.36719c-2.10202,0 -3.70165,0.70489 -4.8125,1.42383v-0.42383c-0.00006,-0.55226 -0.44774,-0.99994 -1,-1zM12,21h4v12.13477v4.86523h-4zM21,21h4v1.56055c0.00013,0.43 0.27511,0.81179 0.68291,0.94817c0.40781,0.13638 0.85714,-0.00319 1.11591,-0.34661c0,0 1.57037,-2.16211 5.01367,-2.16211c1.75333,0 3.25687,0.58258 4.35547,1.74219c1.0986,1.15961 1.83203,2.94607 1.83203,5.51953v9.73828h-4v-9c0,-1.16667 -0.27953,-2.37289 -1.00977,-3.35352c-0.73023,-0.98062 -1.9584,-1.66341 -3.47266,-1.68945c-1.52204,-0.02703 -2.77006,0.66996 -3.50195,1.66211c-0.73189,0.99215 -1.01562,2.21053 -1.01562,3.38086v9h-4z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      {/* Dropdown panel for Booking with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-500 ease-in-out left-0 right-0 bg-black text-white shadow-md -translate-y-3 z-40 lg:mx-15 xl:mx-30 ${
          isBookingOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="pt-10 px-10">
          <div className="h-[600px] flex flex-col ">
            <div className="flex items-center justify-center gap-5">
              <Link
                href="/flights#private-flights"
                className="flex items-center justify-center gap-5"
                onClick={() => setIsBookingOpen(false)}
              >
                <div className="relative">
                  <Image
                    src={Private}
                    alt={'Private flight Helicopter'}
                    className={'object-center object-cover w-[300px] h-[450px] rounded-md'}
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-md" />
                  <div className="absolute bottom-5 left-5">
                    <h2 className="font-brother text-2xl text-white">
                      {t('booking.private.title')}
                    </h2>
                  </div>
                </div>
              </Link>
              <Link
                href="/flights#regular-line"
                className="flex items-center justify-center gap-5"
                onClick={() => setIsBookingOpen(false)}
              >
                <div className="relative">
                  <Image
                    src={Regular}
                    alt={'Regular flight Helicopter'}
                    className={'object-center object-cover w-[300px] h-[450px] rounded-md'}
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-md" />
                  <div className="absolute bottom-5 left-5">
                    <h2 className="font-brother text-2xl text-white">
                      {t('booking.regular.title')}
                    </h2>
                  </div>
                </div>
              </Link>
              <Link
                href="/flights#panoramic-flights"
                className="flex items-center justify-center gap-5"
                onClick={() => setIsBookingOpen(false)}
              >
                <div className="relative">
                  <Image
                    src={Pano}
                    alt={'Panoramic flight Helicopter'}
                    className={'object-center object-cover w-[300px] h-[450px] rounded-md'}
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-md" />
                  <div className="absolute bottom-5 left-5">
                    <h2 className="font-brother text-2xl text-white">{t('booking.pano.title')}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <hr className="h-[2px] bg-black mt-5 mb-2 w-full" />
            <div className={'flex justify-between items-center w-full'}>
              <Link
                href={'/contact'}
                className={'font-brother text-xs '}
                onClick={() => setIsBookingOpen(false)}
              >
                {t('CTA')}
              </Link>
              <div className={'flex gap-3'}>
                <a
                  href={'https://www.instagram.com/helisecurite/'}
                  className={'font-brother text-xs '}
                >
                  Instagram
                </a>
                <a
                  href={'https://www.facebook.com/Helisecuritehelicopterairline/?locale=fr_FR'}
                  className={'font-brother text-xs '}
                >
                  Facebook
                </a>
                <a
                  href={'https://www.linkedin.com/company/heli-securite/'}
                  className={'font-brother text-xs '}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown panel for Destinations with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-500 ease-in-out left-0 right-0 bg-black text-white shadow-md -translate-y-3 z-40 lg:mx-15 xl:mx-30 ${
          isDestinationsOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="pt-10 px-10">
          <div className="h-[600px] flex flex-col items-start justify-items-start">
            {isDestinationsOpen && (
              <DestinationsCarousel
                data={data.destinations}
                onItemClick={() => setIsDestinationsOpen(false)}
              />
            )}
            <hr className="h-[2px] bg-black mt-5 mb-2 w-full" />
            <div className={'flex justify-between items-center w-full'}>
              <Link
                href={'/contact'}
                className={'font-brother text-xs '}
                onClick={() => setIsDestinationsOpen(false)}
              >
                {t('CTA')}
              </Link>
              <div className={'flex gap-3'}>
                <a
                  href={'https://www.instagram.com/helisecurite/'}
                  className={'font-brother text-xs '}
                >
                  Instagram
                </a>
                <a
                  href={'https://www.facebook.com/Helisecuritehelicopterairline/?locale=fr_FR'}
                  className={'font-brother text-xs '}
                >
                  Facebook
                </a>
                <a
                  href={'https://www.linkedin.com/company/heli-securite/'}
                  className={'font-brother text-xs '}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown panel for Events with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-500 ease-in-out left-0 right-0 bg-black text-white shadow-md -translate-y-3 z-40 lg:mx-15 xl:mx-30 ${
          isEventsOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="pt-10 px-10">
          <div className="h-[600px] flex flex-col items-start justify-items-start">
            {isEventsOpen && (
              <EventsCarousel data={data.events} onItemClick={() => setIsEventsOpen(false)} />
            )}
            <hr className="h-[2px] bg-black mt-5 mb-2 w-full" />
            <div className={'flex justify-between items-center w-full'}>
              <Link
                href={'/contact'}
                className={'font-brother text-xs '}
                onClick={() => setIsEventsOpen(false)}
              >
                {t('CTA')}
              </Link>
              <div className={'flex gap-3'}>
                <a
                  href={'https://www.instagram.com/helisecurite/'}
                  className={'font-brother text-xs '}
                >
                  Instagram
                </a>
                <a
                  href={'https://www.facebook.com/Helisecuritehelicopterairline/?locale=fr_FR'}
                  className={'font-brother text-xs '}
                >
                  Facebook
                </a>
                <a
                  href={'https://www.linkedin.com/company/heli-securite/'}
                  className={'font-brother text-xs '}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const Dropdown = () => {
  const t = useTranslations('Nav')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Phone />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={'font-brother font-normal text-lg'}>
          {t('call')}
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <a href={'tel:+33 4 94 55 59 99'} className={'font-brother'}>
            +33 4 94 55 59 99
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href={'https://wa.me/33670784966'} className={'font-brother flex items-center'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
            </svg>
            +33 6 70 78 49 66
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
