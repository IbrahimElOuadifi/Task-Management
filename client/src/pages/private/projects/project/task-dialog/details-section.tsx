import { FC } from 'react'
import { Textarea } from '@components/ui/textarea'
import { ITask } from '@interfaces/Task'

interface DetailsSectionProps {
    task: ITask | null
}

const DetailsSection:FC<DetailsSectionProps> = ({ task }) => {
    return (
        <div className='flex flex-row gap-2'>
            <Textarea className='text-sm resize-none cursor-pointer' rows={4} value={task?.description || ''} readOnly placeholder='Add a more detailed description...' />
        </div>
    )
}

export default DetailsSection