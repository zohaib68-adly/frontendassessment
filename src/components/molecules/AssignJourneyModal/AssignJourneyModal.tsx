import { Button } from '@/components/atoms/Reusable/Button'
import { Dialog, DialogHeader } from '@/components/atoms/Reusable/Modal'
import { DialogContent } from '@/components/atoms/Reusable/Modal'
import { Step, StepsProgress } from '@/components/atoms/Reusable/StepsProgess'
import { DialogProps, DialogTitle } from '@radix-ui/react-dialog'
import React, { useMemo, useState } from 'react'
import { AssignUsers } from './AssignUsers'
import { NotificationPreference } from './NotificationPreference'
import { ResultScreen } from './ResultScreen'



export interface AssignJourneyModalProps extends DialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const manualSteps: Step[] = [
    {
        id: "1",
        label: "Assign Learning Journey",
        description: "Choose your target audience"
    },
    {
        id: "2",
        label: "Notification Preferences",
        description: "Set up your ad groups",
    },
  
]


export const AssignJourneyModal = ({ isOpen, setIsOpen, ...props }: AssignJourneyModalProps) => {
    const [currentStep, setCurrentStep] = useState(0)

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])


    const [isFinished, setisFinished] = useState(false)


    const activeStep = useMemo(() => {
        return manualSteps[currentStep]
    }, [currentStep])

    const handleAssign = () => {
        console.log(selectedUserIds)

        if (selectedUserIds.length && currentStep === 0) setCurrentStep(currentStep + 1)
        else if (selectedUserIds.length && currentStep === 1) setisFinished(true)
    }

const resetState = () => {
    setCurrentStep(0)

    setSelectedUserIds([])

    setisFinished(false)

    setIsOpen(false)
}

    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => {

            setIsOpen(isOpen)

            if (!isOpen) resetState()
        }} {...props} >
            <DialogContent className='w-fit'>
                <DialogHeader>
                    <DialogTitle className='text-center font-serif font-normal text-xl  flex flex-col gap-2 pt-2'>
                        {isFinished ? 'Learning Journey Is Assigned' : activeStep?.label}

                        {isFinished ? null
                            : <div className='flex justify-center'>
                                <StepsProgress className='w-24' steps={manualSteps} currentStep={currentStep} />
                            </div>}



                    </DialogTitle>
                </DialogHeader>

                {isFinished ? <ResultScreen onSetUpAnotherJourney={() => {
                    resetState()

                    setIsOpen(true)
                }
                
                } onGoToMyJourneys={resetState} /> : <>

                    {currentStep === 0 ?
                        <AssignUsers selectedUserIds={selectedUserIds} setSelectedUserIds={setSelectedUserIds} /> :

                        <NotificationPreference trainingCount={selectedUserIds.length} />
                    }
                    <>

                        <div className='flex flex-col gap-4 justify-center items-center'>
                            <div className='flex justify-center w-full'>
                                <Button variant='accent' size={'lg'} onClick={handleAssign}>
                                    Assign
                                </Button>
                            </div>

                            {currentStep === 0 ? (
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm text-secondary/70'>
                                        Or use <span className='text-accent underline'>{`learner's tab `}</span>  to assign custom group of learners
                                    </p>
                                    <p className='text-sm text-center text-secondary/70'>
                                        Use  <span className='text-accent underline'>{`automation`}</span> to make auto-assign rule
                                    </p>
                                </div>
                            ) : null}


                        </div>


                    </></>}

                
            </DialogContent>

        </Dialog>
    )
}
