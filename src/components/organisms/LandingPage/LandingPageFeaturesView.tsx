import { LandingFeatureBanner } from '@/components/molecules/LandingPage/LandingFeatureBanner'
import { LandingPageFeatureCardSection } from '@/components/molecules/LandingPage/LandingPageFeatureCardSection'
import { LandingPageFeatureTypoGraphy } from '@/components/molecules/LandingPage/LandingPageFeatureTypoGraphy'
import React from 'react'

export const LandingPageFeaturesView = () => {
    return (
        <section className='flex flex-col justify-center items-center gap-10'>
            <LandingFeatureBanner />
            <LandingPageFeatureTypoGraphy />
            <LandingPageFeatureCardSection />
        </section>
    )
}
