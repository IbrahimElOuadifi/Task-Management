import { FC } from 'react'
import { Button } from '@components/ui/button'
import dayjs from 'dayjs'

interface DueDateSectionProps {
    date: string | null
}

const DueDateSection:FC<DueDateSectionProps> = ({ date }) => {

    return (
        <div className='flex flex-row gap-2'>
            <Button variant='outline' className='text-sm'>{dayjs(date).format('MMM DD, YYYY')} at {dayjs(date).format('hh:mm A')}</Button>
            {/* <Button variant='outline' className='text-sm'>Today at 12:00 PM</Button> */}
        </div>
    )
}

export default DueDateSection