import { SelectValue } from '@/components/atoms/Reusable/Select'
import { SelectTrigger } from '@/components/atoms/Reusable/Select'
import { Select, SelectContent, SelectItem } from '@/components/atoms/Reusable/Select'
import Spinner from '@/components/atoms/Reusable/Spinner'
import useDebounce from '@/lib/hooks/useDebounce'
import useFetchData from '@/lib/hooks/useFetchData'
import { IUsersApiResponse } from '@/types/users'
import React, { useEffect } from 'react'


export interface AssignUsersProps {
    selectedUserIds: string[]
    setSelectedUserIds: (userIds: string[]) => void
}

export const AssignUsers = ({ selectedUserIds, setSelectedUserIds }: AssignUsersProps) => {


    const { data, loading, fetchData } = useFetchData<IUsersApiResponse>()

    const debouncedSearch = useDebounce()

    useEffect(() => {
        fetchData('https://dummyjson.com/users')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const users = data?.users || []

    const handleSearch = (value: string) => {

        debouncedSearch({
            delay: 500, callback: () => fetchData(`https://dummyjson.com/users/search?q=${value}`)
        })
    }




    return (
        <>

            <div className='flex flex-col gap-1'>
                <span className='font-bold text-sm'>Please select learners or learner groups to assign to assign this journey</span>
                <Select value={selectedUserIds} searchable multiple onSearch={handleSearch} onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        fetchData('https://dummyjson.com/users')
                    }
                }} onValueChange={(value) => setSelectedUserIds(value as string[])}>
                    <SelectTrigger variant={'filled'} className="w-full">
                        <SelectValue placeholder="Start Typing here..." />
                    </SelectTrigger>
                    <SelectContent>
                        {loading ? <div className='flex justify-center p-lg'> <Spinner /></div> : <>

                            {users.length === 0 && !loading && <p className='text-sm text-secondary/70 text-center w-full p-lg'>No users found</p>}

                            {users.map((user) => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                    {user.firstName} {user.lastName}
                                </SelectItem>
                            ))}

                        </>
                        }
                    </SelectContent>
                </Select>
            </div>

            <p className='flex flex-col gap-2 text-sm text-secondary/70'>
                Assigning the courser will use to seat one
                depending on the yours subscription plan.
                the seat will be refunded
                if the learner has not started
                and you later decide to unassign it.
                Language selection will be offered to the
                learner at the beginning of the course
            </p>
        </>



    )
}
