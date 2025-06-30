"use client"
import { Button } from '@/components/atoms/Reusable/Button'
import React, { useState } from 'react'
import { AssignJourneyModal } from '../AssignJourneyModal/AssignJourneyModal'
import { ViewReportDrawer } from '../ViewReportDrawer/ViewReportDrawer'
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/atoms/Reusable/Drawer'

export const LandingPageActionButtons = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <div className='flex flex-row gap-2'>
            <Button onClick={() => setIsOpen(true)} variant="default" rounded="full" size="default">
                Assign Journey
            </Button>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger >
                    <Button variant="outline" rounded="full" size="default" onClick={() => setIsDrawerOpen(true)}>
                        View Report
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className='text-secondary font-bold'>View Report</DrawerTitle>
                    </DrawerHeader>
                    <ViewReportDrawer />
                </DrawerContent>
            </Drawer>

            <AssignJourneyModal isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}
