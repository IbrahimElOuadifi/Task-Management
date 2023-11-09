import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { useFetchData, useDebounceState, usePOSTData } from 'hooks/index'
import { getMembers } from 'api/members'
import { updateTaskMember } from 'api/task'
import { IMember } from '@interfaces/User'
import { updateTaskMemberOptions } from '@interfaces/Task'

interface MembersButtonProps {
    members: IMember[]
    count: number
    taskId?: string
    onUpdate: () => Promise<void>
}

const MembersButton:FC<MembersButtonProps> = ({ members, taskId, onUpdate }) => {

    const { value: searchValue, setValue: setQuery, debouncedValue: query } = useDebounceState<string>('', 200)

    const { data, loading, error } = useFetchData<IMember>(getMembers, { query: JSON.stringify({ query }), limit: 5, page: 1 })

    const { postData } = usePOSTData<updateTaskMemberOptions>(updateTaskMember, onUpdate)

    const handleUpdate = (memberId: string) => {
        if(taskId) {
            postData({ id: taskId, memberId })
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='text-sm w-full'>Members</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Input placeholder='Search members' className='w-full' value={searchValue} onChange={({ target }) => setQuery(target.value)} />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {
                            loading ? (<h5>loading...</h5>) :
                            error? (<h5>{error.message}</h5>) :
                            data.length === 0 ? (<h5>No members found</h5>) :
                            (
                                data.map(member => (
                                    <div key={member._id} className='flex items-center justify-between space-x-2'>
                                        <div className='flex gap-2'>
                                            <Avatar className='flex-shrink-0'>
                                                <AvatarImage src='' />
                                                <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col'>
                                                <span className='text-sm font-semibold'>{member.firstName}</span>
                                                <span className='text-xs text-gray-500'>{member.username}</span>
                                            </div>
                                        </div>
                                        <Button variant={members.find(m => m._id === member._id) ? 'destructive' : 'outline'} size='icon' onClick={handleUpdate.bind(this, member._id)}>
                                            {members.find(m => m._id === member._id) ? <MinusIcon /> : <PlusIcon />}
                                        </Button>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MembersButton