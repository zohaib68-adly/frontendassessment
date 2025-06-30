
import React from 'react'
import Image from 'next/image'


export const ViewReportDrawer = () => {
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='w-full h-full'>
                <Image src={'/bacgrounds/graph1.png'} alt='view-report-drawer-top-section' width={222} className='w-full h-full' height={156} />
            </div>
            <div className='w-full h-full'>
                <Image src={'/bacgrounds/graph2.png'} alt='view-report-drawer-top-section' width={222} className='w-full h-full' height={234} />
            </div>

            <div className='w-full h-full'>
                <Image src={'/bacgrounds/graph3.png'} alt='view-report-drawer-top-section' width={222} className='w-full h-full' height={122} />
            </div>


        </div>
    )
}
