import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/Reusable/Select'
import React from 'react'

export const ViewReportTopSection = () => {
    return (
        <div className='flex justify-between'>
            <div className='flex-grow'>
            <p className='font-bold text-sm leading-5'>
                Your organization risk compared to the industry benchmark
            </p>
            </div>
          

            <Select >
                <SelectTrigger className='w-28' size={'sm'} variant={'outlined'}>
                    <SelectValue placeholder='All Time' className='text-sm' />
                    <SelectContent>
                        <SelectItem value='1'>
                            <span>
                                All Time
                            </span>
                        </SelectItem>
                    </SelectContent>
                </SelectTrigger>
            </Select>
        </div>
    )
}
