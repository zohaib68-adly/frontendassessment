import React from 'react'
import { NavbarLogoButton } from '../../atoms/NavBar/NavbarLogoButton'
import { Navigations } from './Navigations'
import { NavBarActionButtons } from './NavBarActionButtons'

export const NavBar = () => {
    return (
        <div className='shadow-[0px_-0.5px_0px_0px_#00323533_inset] bg-secondary flex items-center h-[2.3rem] px-8'>
            <div className='w-full flex justify-between gap-4'>
                <NavbarLogoButton />
                <div className='flex items-center gap-6'>
                <Navigations />
                <NavBarActionButtons />
                </div>
            
            </div>
        </div>
    )
}
