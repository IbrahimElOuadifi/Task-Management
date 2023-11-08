import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

const MembersButton:FC = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant='outline' className='text-sm w-full'>Members</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Avatar>
                            <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Input placeholder='Search members' />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <Avatar>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>John Doe</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Avatar>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>John Doe</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Avatar>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>John Doe</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Avatar>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>John Doe</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Avatar>
                                <AvatarImage src='https://avatars.githubusercontent.com/u/12592949?v=4' />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>John Doe</span>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MembersButton