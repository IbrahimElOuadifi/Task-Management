import { FC } from 'react'
import { ITask } from '@interfaces/Task'
import { IList } from '@interfaces/List'
import { IMember } from '@interfaces/User'
import { ILabel } from '@interfaces/Label'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@components/ui/dialog'
import { Separator } from '@components/ui/separator'
import MembersSection from './members-section'
import LabelsSection from './labels-section'
import DueDateSection from './due-date-section'
import DetailsSection from './details-section'
import MembersButton from './members-button'
import LabelsButton from './labels-button'
import DueDateButton from './due-date-button'
import MoveActionButton from './move-action-button'
import CopyActionButton from './copy-action-button'
import ArchiveActionButton from './archive-action-button'
import { useFetchData } from 'hooks/index'
import { getTaskLabels, getTaskMembers } from 'api/task'

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

    const labels = useFetchData<ILabel>(getTaskLabels, { id: task?._id })
    const members = useFetchData<IMember>(getTaskMembers, { id: task?._id })

    return (
        <Dialog open={Boolean(task)} onOpenChange={onOpenChange} >
            {
                task && task._id && (
                    <DialogContent className='w-11/12 max-w-4xl'>
                        <DialogTitle>
                            {task?.text}
                            <DialogDescription className='text-sm my-1'>
                                in list {list.title}
                                {/* in list <Button variant='link' className='text-sm px-0'>{list.title}</Button> */}
                            </DialogDescription>
                            <Separator />
                        </DialogTitle>
                        {/* grid */}
                        <div className='grid grid-cols-12 gap-4 pb-4'>
                                <div className='col-span-12 sm:col-span-8 max-h-[580px] overflow-y-auto custom-scrollbar p-1'>
                                    {
                                        members.data.length > 0 && (
                                            <>
                                                <h5 className='text-sm font-medium mb-2 mt-4'>Members</h5>
                                                <MembersSection members={members.data} loading={members.loading} error={members.error} />
                                            </>
                                        )
                                    }
                                    {
                                        labels.data.length > 0 && (
                                            <>
                                                <h5 className='text-sm font-medium mb-2 mt-4'>Labels</h5>
                                                <LabelsSection labels={labels.data} loading={labels.loading} error={labels.error} />
                                            </>
                                        )
                                    }
                                    <h5 className='text-sm font-medium mb-2 mt-4'>Due Date</h5>
                                    <DueDateSection />
                                    {/* <h5 className='text-sm font-medium mb-2 mt-4'>Attachment</h5>
                                    <AttachmentSection /> */}
                                    <h5 className='text-sm font-medium mb-2 mt-4'>Details</h5>
                                    <DetailsSection task={task} />
                                </div>
                                <div className='col-span-12 sm:col-span-4 px-1'>
                                    <h5 className='text-sm font-medium mb-2 mt-4'>Add to task</h5>
                                    <div className='flex flex-col gap-2'>
                                        <MembersButton taskId={task?._id} members={members.data} count={members.count} onUpdate={members.refetch} />
                                        <LabelsButton taskId={task?._id} labels={labels.data} count={labels.count} onUpdate={labels.refetch} />
                                        <DueDateButton />
                                        {/* <AttachmentButton /> */}
                                    </div>
                                    <h5 className='text-sm font-medium mb-2 mt-4'>Actions</h5>
                                    <div className='flex flex-col gap-2'>
                                        <MoveActionButton />
                                        <CopyActionButton />
                                        <ArchiveActionButton />                                  
                                    </div>
                                </div>
                        </div>
                    </DialogContent>
                )
            }
        </Dialog>
    )
}

export default TaskDialog