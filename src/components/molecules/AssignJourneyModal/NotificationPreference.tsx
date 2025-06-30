import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/Reusable/Select'
import React from 'react'

export const NotificationPreference = ({ trainingCount }: { trainingCount: number }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-center gap-2 items-center border-b border-secondary/20 pb-4'>
                <div className='text-sm  flex flex-col gap-1'>
                    <span className='font-bold'>Notifications</span>
                    <span className='text-secondary/70'>
                        When to notifiy learners via email, slack ot text (while enabled)
                    </span>
                </div>
                <Select>
                    <SelectTrigger variant='filled' className='w-full'>
                        <SelectValue placeholder='Select Notification Preference' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='email'>1 Month</SelectItem>
                        <SelectItem value='slack'>2 Months</SelectItem>
                        <SelectItem value='text'>3 Months</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='flex justify-end text-sm'>
                <span>{trainingCount} training are going to be assigned</span>
            </div>
        </div>
    )
}
