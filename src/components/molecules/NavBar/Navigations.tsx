
import { Icon } from '@/components/atoms/Reusable/Icon'
import React from 'react'

export const Navigations = () => {
    return (
        <div className='text-sm flex gap-4 items-center'>
            <span>Features</span>
            <span>Pricing</span>
            <span>Blog</span>
            <span className='flex items-center gap-1'>
                About
                <Icon src='/icons/Chevron Down.png' alt='' />
            </span>
        </div>
    )
}
