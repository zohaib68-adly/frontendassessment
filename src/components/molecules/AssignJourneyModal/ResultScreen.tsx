import { Button } from '@/components/atoms/Reusable/Button'
import React from 'react'
import Image from 'next/image'

export interface ResultScreenProps {
    onSetUpAnotherJourney: () => void
    onGoToMyJourneys: () => void
}

export const ResultScreen = ({ onSetUpAnotherJourney, onGoToMyJourneys }: ResultScreenProps) => {
    return (

        <div className='flex flex-col gap-8' >
            <div className='flex justify-center items-center'>
                <Image src={'/icons/congratsIcon.jpg'} alt='result-screen' width={100} height={100} className='w-36 h-36 rounded-full' />
            </div>
            <div className='flex flex-col gap-3'>
            <Button variant={'accent'} size={'lg'} onClick={onSetUpAnotherJourney}>
                Set up another Journey
            </Button>

            <Button variant={'outline'} size={'lg'} className='bg-transparent text-accent border-accent hover:bg-accent hover:text-primary' onClick={onGoToMyJourneys}>
                Go to my journeys
            </Button>
            </div>
           
        </div>
    )
}
