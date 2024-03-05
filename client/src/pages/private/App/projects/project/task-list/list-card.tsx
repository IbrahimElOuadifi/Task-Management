import { useState, useEffect, useRef, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ReactSortable } from 'react-sortablejs'
import { IList, updateListTitleOptions } from '@interfaces/List'
import { ITask, createTaskOptions, updateManyTasksOptions } from '@interfaces/Task'
import { useForm, Controller } from 'react-hook-form'
import { useFetchData, usePOSTData, useOutsideAlerter, useDebounceValue } from 'hooks/index'
import { getTasks, createTask, updateManyTasks } from 'api/task'
import { updateListTitle } from 'api/list'
import Item from './item'

export interface ListCardProps {
    list: IList
    projectId: string
    onSuccessful?: () => void
}

const ListCard: FC<ListCardProps> = ({ list, projectId, onSuccessful }) => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState<ITask[]>([])
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const cardRef = useRef(null)
    const inputRef = useRef(null)

    const { handleSubmit, control, reset } = useForm<createTaskOptions>({
        defaultValues: {
            text: ''
        }
    })

    const listTitleForm = useForm<{ title: string  }>({
        defaultValues: {
            title: ''
        }
    })

    const [title] = useDebounceValue<string>((listTitleForm.watch('title') as string), 500)

    const { data, refetch } = useFetchData<ITask>(getTasks, { query: JSON.stringify({ listId: list._id }) })
    const { postData: postCreateTasks } = usePOSTData<createTaskOptions>(createTask, refetch, refetch)
    const { postData: postUpdateTasks } = usePOSTData<updateManyTasksOptions>(updateManyTasks, refetch, refetch)
    const { postData: postUpdateListTitle } = usePOSTData<updateListTitleOptions>(updateListTitle, onSuccessful, onSuccessful)
    
    const onSubmit = (data: createTaskOptions) => {
        setSubmitting(true)
        postCreateTasks({ ...data, listId: list._id }).then(() => {
            reset()
            setOpen(false)
            setSubmitting(false)
        })
    }
    
    const onError = (errors: any) => {
        console.log(errors)
    }
    
    const handleCancel = () => {
        setOpen(false)
        reset()
    }
    
    const handleUpdate = (newData: any) => {
        const newTask: ITask[] = newData.map(({ id, ...rest }: { id: string }) => (rest))
        if(JSON.stringify(newData.map(({ id }: { id: string }) => id)) == JSON.stringify(data.map(({_id}) => _id))) return null
        setTasks(newTask)
        postUpdateTasks({ tasks: newTask, listId: list._id })
    }
    
    const handleClick = (task: ITask | null) => {
        if(task) {
            navigate(`/projects/${projectId}/${task._id}`)
        }
    }
    
    useEffect(() => {
        if (data) {
            setTasks(data)
        }
    }, [data])

    useEffect(() => {
        listTitleForm.setValue('title', list.title)
    }, [list])

    useEffect(() => {
        if(title)
            postUpdateListTitle({ title, id: list._id })
    }, [title])
    
    useOutsideAlerter(cardRef, handleCancel)
    useOutsideAlerter(inputRef, () => setIsEdit(false))
    
    return (
        <div>
            <Card className='mr-4 bg-gray-50'>
                <CardHeader className='px-1 py-2 handle'>
                    <CardTitle>
                        <Controller
                            name='title'
                            control={listTitleForm.control}
                            render={({ field: { ref, disabled, ...field } }) => (
                                <Input className='text-sm border-none ring-0' readOnly={!isEdit} ref={inputRef} onClick={() => setIsEdit(true)} {...field} />
                            )} />
                    </CardTitle>
                </CardHeader>
                <CardContent className='px-2 py-4 handle w-[280px]'>
                    <div className='flex flex-col'>
                        <ReactSortable list={tasks.map((props) => ({ id: props._id, ...props }))} setList={handleUpdate} group={{ name: projectId }} animation={150}>
                        {
                            tasks?.map((task) => <Item key={task._id} task={task} handleClick={handleClick} />)
                        }
                        </ReactSortable>
                    </div>
                </CardContent>
                <CardFooter className='px-4 pb-2 handle' ref={cardRef}>
                    {
                        open ?
                        (
                            <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col w-full gap-4'>
                                <Separator />
                                <Controller
                                    name='text'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input {...field} placeholder='List title' error={Boolean(error)} />
                                    )}
                                />
                                <div className='flex flex-row items-center justify-between gap-1'>
                                    <Button type='submit' className='flex-1' disabled={submitting}>
                                        {submitting ? 'Creating...' : 'Create Task'}
                                    </Button>
                                    <Button type='button' variant='outline' className='flex-1' onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )
                        : 
                        (
                            <Button variant='outline' className='w-full text-sm' onClick={() => setOpen(true)}>Add Task</Button>
                        )
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ListCard