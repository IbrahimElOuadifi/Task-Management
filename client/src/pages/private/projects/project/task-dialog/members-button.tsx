import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Toggle } from '@components/ui/toggle'

const members = [
    { _id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { _id: 2, firstName: 'Susan', lastName: 'Brady', username: 'burn' },
    { _id: 3, firstName: 'Eula', lastName: 'Gordon', username: 'somehow' },
    { _id: 4, firstName: 'Leona', lastName: 'Young', username: 'mix' },
    { _id: 5, firstName: 'Landon', lastName: 'Wood', username: 'or' },
    { _id: 6, firstName: 'Martha', lastName: 'Roberson', username: 'properly' },
    { _id: 7, firstName: 'Rhoda', lastName: 'Freeman', username: 'left' },
    { _id: 8, firstName: 'Ronnie', lastName: 'Obrien', username: 'themselves' },
    { _id: 9, firstName: 'Mittie', lastName: 'Reynolds', username: 'swimming' },
    { _id: 10, firstName: 'Louisa', lastName: 'Norman', username: 'met' },
    { _id: 11, firstName: 'Gertrude', lastName: 'Paul', username: 'ring' },
    { _id: 12, firstName: 'Hester', lastName: 'Townsend', username: 'branch' },
    { _id: 13, firstName: 'Jack', lastName: 'Bryan', username: 'camp' },
    { _id: 14, firstName: 'Keith', lastName: 'Atkins', username: 'worth' },
    { _id: 15, firstName: 'Ollie', lastName: 'Williams', username: 'audience' },
    { _id: 16, firstName: 'Marvin', lastName: 'Fernandez', username: 'cool' },
    { _id: 17, firstName: 'Willie', lastName: 'Ramos', username: 'teethe' },
]

const MembersButton:FC = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant='outline' className='text-sm w-full'>Members</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Input placeholder='Search members' className='w-full' />
                        <Button variant='outline' className='text-sm'>Invite</Button>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {members.map(member => (
                            <div key={member._id} className='flex items-center justify-between space-x-2'>
                                <Avatar className='flex-shrink-0'>
                                    <AvatarImage src='/images/avatars/avatar-1.jpg' />
                                    <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='text-sm font-semibold'>{member.firstName}</span>
                                    <span className='text-xs text-gray-500'>{member.username}</span>
                                </div>
                                <Toggle variant='outline'>
                                    <span className='text-xs'>Member</span>
                                </Toggle>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MembersButton