import { FC } from 'react'
import { Card, CardContent } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar' 
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@components/ui/dropdown-menu'
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
                            <div
                                key={label._id}
                                className='w-8 h-2 rounded-sm border'
                                // className={`w-8 h-2 rounded-sm  ${label.name === 'white' ? 'border' : 'border-0'}` }
                                style={{ backgroundColor: label.color }}></div>
                        ))
                    }
                </div>
                <p className='text-sm font-bold ring-0 px-1 break-words py-2'>
                    {/* {task.text.split('\n').map((text, index) => (<>{text}{index === task.text.length - 1 ? '' : <br />}</>))} */}
                    {task.text}
                </p>
                <div className='flex justify-between items-center'>
                    <p>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}
                        {/* {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'} */}
                    </p>
                    <div>
                        {
                            !members.data?.length ? '' :
                            members.data?.length === 1 ?
                                <Avatar className='mr-2' onClick={e => e.stopPropagation()}>
                                    <AvatarImage src={''} />
                                    <AvatarFallback>{members.data[0].firstName.charAt(0)}{members.data[0].lastName.charAt(0)}</AvatarFallback>
                                </Avatar>
                            :
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className='mr-2'>
                                        <AvatarImage src={''} />
                                        <AvatarFallback>+{members.data?.length}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-52'>
                                    {
                                        members.data?.map((member) => (
                                            <DropdownMenuItem key={member._id} onClick={e => e.stopPropagation()}>
                                                <Avatar className='mr-2'>
                                                    <AvatarImage src={''} />
                                                    <AvatarFallback>{member.firstName.charAt(0)}{member.lastName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <h2 className='text-sm'>
                                                    {member.firstName} {member.lastName}
                                                </h2>
                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Item