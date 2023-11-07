import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

const MembersSection:FC = () => {
    return (
        <div className='flex flex-row gap-2'>
            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>
                    JD
                </AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>
                    JD
                </AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>
                    JD
                </AvatarFallback>
            </Avatar>
            <Button variant='outline' size='icon' className='rounded-full'>
                <PlusIcon />
            </Button>
        </div>
    )
}

export default MembersSection