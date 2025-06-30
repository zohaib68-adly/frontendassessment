import { LandingPageActionButtons } from '@/components/molecules/LandingPage/LandingPageActionButtons'
import { LandingPageTopText } from '@/components/molecules/LandingPage/LandingPageTopText'
import Image from 'next/image'
import React from 'react'

export const LandingPageMainView = () => {
    return (
        <section className='flex flex-col gap-4 justify-center items-center'>
            <div className='flex flex-col gap-8 p-8 justify-center items-center'>
                <LandingPageTopText />
                <LandingPageActionButtons />
            </div>
            <div className='w-[480px] h-[236px]'
            >
                <Image style={{
                    boxShadow: '0px -1px 20px 0px #BB9BFF26, 0px -1px 5px 0px #E9DFFF4D, 0px 0.25px 0px 0px #FFFFFF80 inset'
                }} className='w-ful h-full rounded-xl' src='/bacgrounds/widgetBackground.png' alt='landing page main view' width={480} height={236} />
            </div>
        </section>
    )
}
