import { FC } from 'react'
import { Button } from '@components/ui/button'

const DueDateSection:FC = () => {
    return (
        <div className='flex flex-row gap-2'>
            <Button variant='outline' className='text-sm'>Today at 12:00 PM</Button>
        </div>
    )
}

export default DueDateSection