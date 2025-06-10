import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import Logo from '@/public/logos/primary.png'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer className="bg-tertiary text-secondary font-brother font-light px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8 sm:py-10">
      <div className="flex flex-row items-center justify-between gap-6 sm:gap-0">
        <div className="w-48 sm:w-56 md:w-64 xl:w-72">
          <Image src={Logo} alt="Logo Monacair White" width={300} className="w-full h-auto" />
        </div>
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="https://www.instagram.com/monacair/">
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
                <g transform="scale(5.33333,5.33333)">
                  <path d="M15,4c-6.06341,0 -11,4.93659 -11,11v18c0,6.06341 4.93659,11 11,11h18c6.06341,0 11,-4.93659 11,-11v-18c0,-6.06341 -4.93659,-11 -11,-11zM15,6h18c4.98259,0 9,4.01741 9,9v18c0,4.98259 -4.01741,9 -9,9h-18c-4.98259,0 -9,-4.01741 -9,-9v-18c0,-4.98259 4.01741,-9 9,-9zM35,11c-1.105,0 -2,0.895 -2,2c0,1.105 0.895,2 2,2c1.105,0 2,-0.895 2,-2c0,-1.105 -0.895,-2 -2,-2zM24,14c-5.51133,0 -10,4.48867 -10,10c0,5.51133 4.48867,10 10,10c5.51133,0 10,-4.48867 10,-10c0,-5.51133 -4.48867,-10 -10,-10zM24,16c4.43067,0 8,3.56933 8,8c0,4.43067 -3.56933,8 -8,8c-4.43067,0 -8,-3.56933 -8,-8c0,-4.43067 3.56933,-8 8,-8z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <Link href="https://www.facebook.com/MonacairMonacoDesk" target="_blank">
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
          <Link href="https://www.linkedin.com/company/monacair/">
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
      <hr className="h-px bg-white my-5" />
      <div className="flex flex-row items-center justify-between gap-6 md:gap-0">
        <div className="flex flex-wrap justify-start items-center gap-4 sm:gap-5 md:gap-7">
          <Link href={'/flights'} className="text-xs md:text-sm">
            {t('pages-links.reserve')}
          </Link>
          <Link href={'/flights'} className="text-xs md:text-sm">
            {t('pages-links.pano')}
          </Link>
          <Link href={'/flights'} className="text-xs md:text-sm">
            {t('pages-links.private')}
          </Link>
          <Link href={'/services'} className="text-xs md:text-sm">
            {t('pages-links.services')}
          </Link>
          <Link href={'/contact'} className="text-xs md:text-sm">
            {t('pages-links.contact')}
          </Link>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-4 sm:gap-5 md:gap-7">
          <Link href={'/legal/cookies'} className="text-xs md:text-sm">
            {t('mentions.cookies')}
          </Link>
          <Link href={'/legal/mentions'} className="text-xs md:text-sm">
            {t('mentions.legal')}
          </Link>
          <Link href={'/legal/confidentiality'} className="text-xs md:text-sm">
            {t('mentions.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
