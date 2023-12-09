import { useState, useEffect, FC } from 'react'
import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Calendar } from '@components/ui/calendar'
import { usePOSTData } from 'hooks/index'
import { updateTaskDueDate } from 'api/task'

interface DueDateButtonProps {
    date: string | null
    taskId: string
    onSuccessChange?: (date: String) => void
}

const DueDateButton:FC<DueDateButtonProps> = ({ date, onSuccessChange, taskId }) => {

    const [dueDate, setDueDate] = useState<Date | undefined>(date ? new Date(date) : undefined)

    const { postData } = usePOSTData(updateTaskDueDate, onSuccessChange)

    const handleDateChange = (dueDate: Date | null) => {
        postData({ dueDate, id: taskId })
        console.log(dueDate, date)
    }

    useEffect(() => {
        setDueDate(date ? new Date(date) : undefined)
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='text-sm'>Due Date</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode='single'
                    selected={dueDate}
                    onSelect={date => handleDateChange(date || null)}
                    // disable all past dates
                    // disabled={(date) => date < new Date()}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DueDateButton