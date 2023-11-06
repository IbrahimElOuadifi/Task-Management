import { useState, useEffect, FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ReactSortable } from 'react-sortablejs'
import { IList } from '@interfaces/List'
import { ITask } from '@interfaces/Task'
import { useForm, Controller } from 'react-hook-form'
import { useFetchData, usePOSTData } from 'hooks/index'
import { getTasks, createTask, updateManyTasks, createTaskParams, updateManyTasksParams } from 'api/task'

export interface iCard {
    id: number
    text: string
}

export interface iList {
    id: number
    name: string
    cards: iCard[]
}

export interface ListCardProps {
    list: IList
    projectId: string
}

const ListCard: FC<ListCardProps> = ({ list, projectId }) => {

    const [tasks, setTasks] = useState<ITask[]>([])

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const { handleSubmit, control, formState: { errors }, reset } = useForm<createTaskParams>({
        defaultValues: {
            text: ''
        }
    })

    const { data, refetch } = useFetchData<ITask>(getTasks, { id: list._id })
    const { postData: postCreateTasks } = usePOSTData<createTaskParams>(createTask, refetch, refetch)
    const { postData: postUpdateTasks } = usePOSTData<updateManyTasksParams>(updateManyTasks, refetch, refetch)

    useEffect(() => {
        if (data) {
            setTasks(data)
        }
    }, [data])

    const onSubmit = (data: createTaskParams) => {
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

    const handleUpdate = (newData: any) => {
        const newTask: ITask[] = newData.map(({ id, ...rest }: { id: string }) => (rest))
        if(JSON.stringify(newData.map(({ id }: { id: string }) => id)) == JSON.stringify(data.map(({_id}) => _id))) return null
        setTasks(newTask)
        postUpdateTasks({ tasks: newTask, listId: list._id })
    }

    return (
        <div>
            <Card className='mr-4 bg-gray-50'>
                <CardHeader className='px-1 py-2 handle'>
                    <CardTitle>
                        <Input className='text-sm border-none ring-0' value={list.title} readOnly />
                    </CardTitle>
                </CardHeader>
                <CardContent className='px-2 py-4 handle w-[280px]'>
                    <div className='flex flex-col'>
                        <ReactSortable list={tasks.map((props) => ({ id: props._id, ...props }))} setList={handleUpdate} group={{ name: projectId }} animation={150}>
                        {
                            tasks?.map((card) => (
                                <Card className='p-2 cursor-pointer hover:bg-gray-100 mb-2' key={card._id}>
                                    <CardContent className='p-0'>
                                        <p className='text-sm ring-0 px-1 break-words'>
                                            {/* {card.text.split('\n').map((text, index) => (<>{text}{index === card.text.length - 1 ? '' : <br />}</>))} */}
                                            {card.text}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        </ReactSortable>
                    </div>
                </CardContent>
                <CardFooter className='px-4 pb-2 handle'>


                    <Popover open={open} onOpenChange={open => setOpen(open)}>
                        <PopoverTrigger asChild>
                            {/* {
                                open ? <div className='h-0 w-full'></div> : <Button variant='ghost' className='text-sm w-full'>Add Another Task</Button>
                            } */}
                            <Button variant='ghost' className='text-sm w-full'>Add Task</Button>
                            {/* <Button className='text-sm' variant='outline'>Add Another List</Button> */}
                        </PopoverTrigger>
                        <PopoverContent className='bg-white shadow-lg rounded-md p-4 w-[280px]'>
                            <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-4'>
                                <Controller
                                    name='text'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder='List title' error={Boolean(errors.text)} />
                                    )}
                                />
                                <Button type='submit' disabled={submitting}>
                                {
                                    submitting ? 'Creating...' : 'Create Task'
                                }
                                </Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ListCard