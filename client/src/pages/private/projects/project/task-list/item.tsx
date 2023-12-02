import { FC } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ITask } from '@interfaces/Task'
import { ILabel } from '@interfaces/Label'
import { IMember } from '@interfaces/User'
import { useFetchData } from 'hooks/index'
import { getTaskMembers, getTaskLabels } from 'api/task'

export interface ItemProps {
    task: ITask
    handleClick?: (task: ITask | null) => void
}

const Item: FC<ItemProps> = ({ task, handleClick }) => {

    const labels = useFetchData<ILabel>(getTaskLabels, { id: task?._id })
    const members = useFetchData<IMember>(getTaskMembers, { id: task?._id })
       
    return (
        <Card className='p-2 cursor-pointer hover:bg-gray-100 mb-3' key={task._id} onClick={handleClick?.bind(this, task)}>
            <CardContent className='p-0'>
                <div className='flex gap-1 overflow-hidden'>
                    {
                        labels.data?.map((label) => (
                            <div key={label._id} className={`w-8 h-2 bg-${label.color} rounded-sm border-black ${label.name === 'white' ? 'border' : 'border-0'}`}></div>
                        ))
                    }
                </div>
                <p className='text-sm font-bold ring-0 px-1 break-words py-2'>
                    {/* {task.text.split('\n').map((text, index) => (<>{text}{index === task.text.length - 1 ? '' : <br />}</>))} */}
                    {task.text}
                </p>
                <p>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}
                    {/* {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'} */}
                </p>
            </CardContent>
        </Card>                       
    )
}

export default Item