import { LandingPageTopBanner } from '@/components/atoms/LandingPage/LandingPageTopBanner'
import { LandingPageLastTypography } from '@/components/atoms/LandingPage/LandingPageLastTypography'
import React from 'react'
import { LandingPageTopIntroTypography } from '@/components/atoms/LandingPage/LandingPageTopIntroTypography'

export const LandingPageTopText = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center'>
            <LandingPageTopBanner />
            <LandingPageTopIntroTypography />
            <LandingPageLastTypography />
        </div>
    )
}


