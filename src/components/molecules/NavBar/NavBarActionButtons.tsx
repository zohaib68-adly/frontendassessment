import React from 'react'
import { Button } from '@/components/atoms/Reusable/Button'



export const NavBarActionButtons = () => {
  return (
    <div className='flex flex-row gap-2'>
      <Button variant="outline" rounded="full" size="default">
        Takl to an expert
      </Button>
      <Button variant="default" rounded="full" size="default">
        Download the app
      </Button>
    </div>
  )
}
