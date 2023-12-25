import { useState, useRef, FC, useEffect } from 'react'
import { Button } from '@components/ui/button'
import { Textarea } from '@components/ui/textarea'
import { useForm, Controller } from 'react-hook-form'
import { useOutsideAlerter, usePOSTData } from 'hooks/index'
import { ITask, updateTaskDescriptionOptions } from '@interfaces/Task'
import { updateTaskDescription } from 'api/task'

interface DetailsSectionProps {
    task: ITask | null,
    onSave?: (description: string) => void,
}

const DetailsSection:FC<DetailsSectionProps> = ({ task, onSave }) => {

        const [isEdit, setEdit] = useState<boolean>(false)

        const ref = useRef(null)

        const { handleSubmit, control, setValue } = useForm<{ description: string }>({
            defaultValues: {
                description: ''
            }
        })

        const { postData: postUpdateTaskDescription } = usePOSTData<updateTaskDescriptionOptions>(updateTaskDescription, onSave, onSave)

        const onSubmit = (data: { description: string }) => {
            postUpdateTaskDescription({ ...data, id: task?._id || '' })
            .then(() => setEdit(false))
            .catch((err) => console.log(err))
        }
        
        const handleClose = () => {
            setEdit(false)
            setValue('description', task?.description || '')
        }
        
        useOutsideAlerter(ref, handleClose)

        useEffect(() => {
            if(task) setValue('description', task.description)
        }, [task])

    return (
        <form className='flex flex-col gap-2' ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        className={`text-sm resize-none ${isEdit ? 'cursor-text' : 'cursor-pointer'}`}
                        rows={isEdit ? 5 : 3}
                        readOnly={!isEdit}
                        onClick={() => setEdit(true)}
                        placeholder='Add a more detailed description...' />
                )} />
                    
                {
                    isEdit &&
                    <div className='flex justify-end items-center space-x-1'>
                        <Button variant='outline' className='text-sm' type='button' onClick={handleClose}>Cancel</Button>
                        <Button variant='default' className='text-sm' type='submit'>Save</Button>
                    </div>
                }
        </form>
    )
}

export default DetailsSection