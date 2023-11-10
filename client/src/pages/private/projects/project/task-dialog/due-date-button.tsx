import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Calendar } from '@components/ui/calendar'
import { usePOSTData } from 'hooks/index'
import { updateTaskDueDate } from 'api/task'

interface DueDateButtonProps {
    date: Date | null
    taskId: string
    onSuccessChange?: (date: Date) => void
}

const DueDateButton:FC<DueDateButtonProps> = ({ date, onSuccessChange, taskId }) => {

    const { postData } = usePOSTData(updateTaskDueDate, onSuccessChange)

    const handleDateChange = (dueDate: Date | null) => {
        postData({ dueDate, id: taskId })
        console.log(dueDate, date)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='text-sm'>Due Date</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode='single'
                    selected={date || undefined}
                    onSelect={date => handleDateChange(date || null)}
                    // disable all past dates
                    // disabled={(date) => date < new Date()}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DueDateButton