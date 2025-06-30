import { LandingPageFeaturesView } from '@/components/organisms/LandingPage/LandingPageFeaturesView'
import { LandingPageMainView } from '@/components/organisms/LandingPage/LandingPageMainView'
import React from 'react'

export const LandingPageTemplate = () => {
    return (
        <div className='flex flex-col gap-10 py-16'>
            <LandingPageMainView />
            <LandingPageFeaturesView />
        </div>
    )
}
