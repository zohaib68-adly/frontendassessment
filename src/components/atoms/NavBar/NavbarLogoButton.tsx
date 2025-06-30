
import React from 'react'
import { Icon } from '../Reusable/Icon'


export const NavbarLogoButton = () => {
    return (
        <div className='flex items-center gap-1'>
            <Icon src='/icons/navbarLogo.png' alt='logo' width={11} height={11} />
            <span className='font-bold text-[11px]'>Vaultflow</span>
        </div>
    )
}