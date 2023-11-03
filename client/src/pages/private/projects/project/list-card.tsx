import { useState, useEffect, FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReactSortable } from 'react-sortablejs'
import { IList } from '@interfaces/List'
import { ITask } from '@interfaces/Task'
import { useSelector } from 'react-redux'
import { useFetchData } from 'hooks/index'
import { getTasks, createTask } from 'api/task'

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

    const [cards, setCards] = useState<ITask[]>([])

    const { token } = useSelector((state: { auth: { token: string } }) => state.auth)
    const { data, refetch } = useFetchData<ITask>(getTasks, { id: list._id })

    useEffect(() => {
       setCards(data)
    }, [data])

    const handleCreate = async () => {
        const text = prompt('Enter card text') as string
        if (text) {
            const resp = await createTask({ text, listId: list._id, token: token as string })
            if (resp) {
                refetch()
            }
        }
    }

    const handleUpdate = async (data: any) => {
        const newTask: ITask[] = data.map(({ id, ...rest }: { id: string }) => ({ _id: id, ...rest }))
        if(JSON.stringify(data.map(({ id }: { id: string }) => id)) == JSON.stringify(cards.map(({_id}) => _id))) return console.log('same')
        try {
            console.log(newTask, list._id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className='min-w-[280px] mr-4 bg-gray-50'>
            <CardHeader className='px-1 py-2'>
                <CardTitle>
                    <Input className='text-sm border-none ring-0' value={list.title} readOnly />
                </CardTitle>
            </CardHeader>
            <CardContent className='px-1 py-4'>
                <div className='flex flex-col gap-2'>
                    <ReactSortable list={cards.map(({ _id, ...rest}) => ({ id: _id, ...rest }))} setList={handleUpdate} group={{ name: projectId }} animation={150}>
                    {
                        cards?.map((card) => (
                            <Card className='p-2 cursor-pointer hover:bg-gray-100 mb-2' key={card._id}>
                                <CardContent className='p-0'>
                                    <p className='text-sm ring-0 px-1'>
                                        {card.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    }
                    </ReactSortable>
                </div>
            </CardContent>
            <CardFooter className='px-1 pb-2'>
                <Button variant='ghost' className='text-sm w-full' onClick={handleCreate}>Add Card</Button>
            </CardFooter>
        </Card>
    )
}

export default ListCard