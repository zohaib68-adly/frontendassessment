import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Reusable/card'
import { Icon } from '@/components/atoms/Reusable/Icon'
import React from 'react'
import Image from 'next/image'

const commonProps = {
    style: {
        width: '25px',
        height: '25px',
    },
    width: 25,
    height: 25,
    alt: 'banner-icon',
    unoptimized: true,
}

export const LandingPageFeatureCardSection = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <Card className='w-72.5 flex flex-col gap-4'>
                <CardHeader>
                    <div className='flex flex-col items-start gap-2'>
                        <Icon {...commonProps} src='/icons/cardIcon.png' />
                        <CardTitle>

                            Analytics Dashboard
                        </CardTitle>
                    </div>

                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Our Analytics Dashboard provides a clear and intuitive interface for you to easily track and analyze your data.
                        From customizable graphs and charts to real-time data updates, our dashboard offers everything you need
                        to gain valuable insights and make data-driven decisions.
                    </CardDescription>
                    <span className='underline text-sm'>
                        View Dashboard
                    </span>
                </CardContent>
            </Card>
            <Card className='w-72.5 flex flex-col gap-4'>
                <CardHeader>
                    <div className='flex flex-col items-start gap-2'>
                        <Icon {...commonProps} src='/icons/analyticsIcon.png' />
                        <CardTitle>
                            Digital Credit Tokens
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Reward your customers and incentivize engagement with our innovative digital credit tokens.
                        Our tokens can be customized to match your branding, and are a flexible and scalable way to drive customer loyalty and encourage repeat business.
                    </CardDescription>
                    <span className='underline text-sm'>
                        View Token
                    </span>
                </CardContent>

            </Card>
            <Card className='w-[600px] col-span-2 flex flex-col gap-4'>
                <CardHeader>
                    <div className='flex flex-col items-start gap-2'>
                        <Icon {...commonProps} src='/icons/codeIcon.png' />
                        <CardTitle>
                            Code collaboration
                        </CardTitle>
                    </div>

                </CardHeader>
                <CardContent className='px-6 flex flex-col gap-4'>
                    <CardDescription>
                        <div className='flex justify-between'>
                            <span>
                                Reward your customers and incentivize engagement with our innovative digital credit tokens.
                                Our tokens can be customized to match your branding, and are a flexible and scalable way to drive customer loyalty and encourage repeat business.
                            </span>
                            <Image src='/icons/piecoFCodeIcon.png' alt='code collaboration' width={235} height={150} className='rounded-lg' style={{
                                width: '235px',
                                height: '150px',
                            }} />

                        </div>

                    </CardDescription>
                    <span className='underline text-sm'>
                        View Code Collaboration
                    </span>
                </CardContent>


            </Card>
        </div>
    )
}
