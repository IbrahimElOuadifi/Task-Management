import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { IMember } from '@interfaces/User'

interface MembersSectionProps {
    members: IMember[]
    loading: boolean
    error?: any
}

const MembersSection:FC<MembersSectionProps> = ({ members }) => {
    return (
        <div className='flex flex-row gap-2'>
            {
                members.map(member => (
                    <Avatar key={member._id}>
                        <AvatarImage src={''} />
                        <AvatarFallback>
                            {member.firstName[0]}{member.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                ))
            }
            <Button variant='outline' size='icon' className='rounded-full'>
                <PlusIcon />
            </Button>
        </div>
    )
}

export default MembersSection