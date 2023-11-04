import { useState, useEffect, FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ReactSortable } from 'react-sortablejs'
import { IList } from '@interfaces/List'
import { ITask } from '@interfaces/Task'
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

    const { data, refetch } = useFetchData<ITask>(getTasks, { id: list._id })
    const { postData: postCreateTasks } = usePOSTData<createTaskParams>(createTask, refetch, refetch)
    const { postData: postUpdateTasks } = usePOSTData<updateManyTasksParams>(updateManyTasks, refetch, refetch)

    useEffect(() => {
        if (data) {
            setTasks(data)
        }
    }, [data])

    const handleCreate = () => {
        const text = prompt('Enter card text') as string
        if (text) {
            postCreateTasks({ text, listId: list._id })
        }
    }

    const handleUpdate = (newData: any) => {
        const newTask: ITask[] = newData.map(({ id, ...rest }: { id: string }) => ({ _id: id, ...rest }))
        if(JSON.stringify(newData.map(({ id }: { id: string }) => id)) == JSON.stringify(data.map(({_id}) => _id))) return console.log('same')
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
                        <ReactSortable list={tasks.map(({ _id, ...rest}) => ({ id: _id, ...rest }))} setList={handleUpdate} group={{ name: projectId }} animation={150}>
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
                    <Button variant='ghost' className='text-sm w-full' onClick={handleCreate}>Add Card</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ListCard