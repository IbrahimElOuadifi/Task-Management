import { FC } from 'react'
import { ITask } from '@interfaces/Task'
import { IList } from '@interfaces/List'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { Textarea } from '@components/ui/textarea'
import { PlusIcon } from '@radix-ui/react-icons'

interface TaskDialogProps {
    handleClose?: () => void
    task: ITask | null
    list: IList
    onSuccessful?: () => void
    onFailed?: () => void
}

const TaskDialog: FC<TaskDialogProps> = ({ handleClose, task, list }) => {

    const onOpenChange = (open: boolean) => {
        // task: ITask | null
        if (handleClose && !open) {
            handleClose()
        }
    }

    return (
        <Dialog open={Boolean(task)} onOpenChange={onOpenChange} >
            <DialogContent className='w-11/12 max-w-4xl'>
                <DialogTitle>
                    {task?.text}
                    <DialogDescription className='text-sm my-1'>
                        in list <Button variant='link' className='text-sm px-0'>{list.title}</Button>
                    </DialogDescription>
                    <Separator />
                </DialogTitle>
                {/* grid */}
                <div className='grid grid-cols-12 gap-4 pb-4'>
                        <div className='col-span-12 sm:col-span-8'>

                            <h5 className='text-sm font-medium mb-2 mt-4'>Members</h5>
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

                            <h5 className='text-sm font-medium mb-2 mt-4'>Labels</h5>
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

                            <h5 className='text-sm font-medium mb-2 mt-4'>Due Date</h5>
                            <div className='flex flex-row gap-2'>
                                <Button variant='outline' className='text-sm'>Today at 12:00 PM</Button>
                            </div>

                            <h5 className='text-sm font-medium mb-2 mt-4'>Add to task</h5>
                            <Textarea className='text-sm resize-none' rows={4} value={task?.description || ''} readOnly placeholder='Add a more detailed description...' />

                        </div>
                        <div className='col-span-12 sm:col-span-4'>
                            <h5 className='text-sm font-medium mb-2 mt-4'>Add to task</h5>
                            <div className='flex flex-col gap-2'>
                                <Button variant='outline' className='text-sm'>Members</Button>
                                <Button variant='outline' className='text-sm'>Labels</Button>
                                <Button variant='outline' className='text-sm'>Due Date</Button>
                                <Button variant='outline' className='text-sm'>Checklist</Button>
                                <Button variant='outline' className='text-sm'>Attachment</Button>
                            </div>
                            <h5 className='text-sm font-medium mb-2 mt-4'>Actions</h5>
                            <div className='flex flex-col gap-2'>
                                <Button variant='outline' className='text-sm'>Move</Button>
                                <Button variant='outline' className='text-sm'>Copy</Button>
                                <Button variant='outline' className='text-sm'>Archive</Button>                                   
                            </div>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog