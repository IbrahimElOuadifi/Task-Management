import { FC } from 'react'
import { Button } from '@components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

const LabelsSection:FC = () => {
    return (
        <div className='flex flex-row gap-2'>
            <div className='w-9 h-9 rounded-sm bg-red-500'></div>
            <div className='w-9 h-9 rounded-sm bg-blue-500'></div>
            <div className='w-9 h-9 rounded-sm bg-green-500'></div>
            <div className='w-9 h-9 rounded-sm bg-yellow-500'></div>
            <div className='w-9 h-9 rounded-sm bg-purple-500'></div>
            <Button variant='outline' size='icon'>
                <PlusIcon />
            </Button>
        </div>
    )
}

export default LabelsSection