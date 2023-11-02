import { useState, FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardHeader } from '@components/ui/card'
import { Button } from '@components/ui/button'
import ListCard from './list-card'

const listData = [
    { id: 1, name: 'List 1', cards: [{ id: 73, text: 'Card 1 A' }, { id: 1, text: 'Card 2 A' }] },
    { id: 2, name: 'List 2', cards: [{ id: 12, text: 'Card 1 B' }, { id: 10, text: 'Card 2 B' }] },
    { id: 3, name: 'List 3', cards: [{ id: 74, text: 'Card 1 C' }, { id: 64, text: 'Card 2 C' }] }
]

const Project: FC = () => {

    const { id } = useParams() as { id: string }

    const [lists, setLists] = useState(listData)

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>PROJECT {id}</h1>
                <Link to='/projects' className='text-blue-500 hover:text-blue-600'>Back to Projects</Link>
            </div>
            {/* divider */}
            <hr className='my-4' />
            {/* project */}
            <div className='overflow-x-auto -mr-4 h-[calc(100%-64px)] justify-start align-top'>
                <div className='flex flex-nowrap justify-start align-top'>
                {
                    lists.map((list) => (
                        <ListCard list={list} key={list.id} projectId={id} />
                    ))
                    
                }
                    <div>
                        <Card className='min-w-[280px] mr-4 p-0 shadow-none'>
                            <CardHeader className='p-0'>
                                <Button className='text-sm' variant='outline'>Add Another List</Button>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project