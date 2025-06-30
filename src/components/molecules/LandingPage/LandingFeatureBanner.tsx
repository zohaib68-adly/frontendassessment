import { Icon } from '@/components/atoms/Reusable/Icon'
import React, { CSSProperties } from 'react'


const imageProps = {
  unoptimized: true,
  style: {
    width: 60, height: 11,
    objectFit: 'contain' as CSSProperties['objectFit']
  },
  width: 60,
  height: 11,
}

export const LandingFeatureBanner = () => {
  return (
    <div className='px-20 py-7.5 flex flex-col gap-6 text-center'
    >
      <span className='text-sm'>Trusted by teams at over 1,000 of the world’s leading organizations</span>
      <div className='flex gap-10 justify-center items-center'>
        <Icon {...imageProps} src='/icons/logo-dell.png' alt='icon' />
        <Icon {...imageProps} src="/icons/logo-zendesk.png" alt="icon" />
        <Icon {...imageProps} src="/icons/logo-rakuten.png" alt="icon" />
        <Icon {...imageProps} src="/icons/logo-pacific-funds.png" alt="icon" />
        <Icon {...imageProps} src="/icons/logo-ncr.png" alt="icon" />
        <Icon {...imageProps} src="/icons/lattice.png" alt="icon" />
        <Icon {...imageProps} src="/icons/Ted.png" alt="icon" />
      </div>
    </div>
  )
}
