import { useState, useEffect, FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReactSortable } from 'react-sortablejs'

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
    list: iList,
    projectId: string
}

const ListCard: FC<ListCardProps> = ({ list: defaultList, projectId }) => {

    const [list, setList] = useState(defaultList)
    const [cards, setCards] = useState<iCard[]>(list.cards)

    const updateList = (): void => {
        setList({ ...list, cards })
    }

    useEffect(() => {
        updateList()
    }, [cards])

    return (
        <Card className='min-w-[280px] mr-4 bg-gray-50'>
            <CardHeader className='px-1 py-2'>
                <CardTitle>
                    <Input className='text-sm border-none ring-0' value={list.name} readOnly />
                </CardTitle>
            </CardHeader>
            <CardContent className='px-1 py-4'>
                <div className='flex flex-col gap-2'>
                    <ReactSortable list={cards} setList={setCards} group={{ name: projectId }}>
                    {
                        cards.map((card) => (
                            <Card className='p-2 cursor-pointer hover:bg-gray-100 mb-2' key={card.id}>
                                <CardContent className='p-0'>
                                    <p className='text-sm ring-0 px-1'>
                                        Card {card.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    }
                    </ReactSortable>
                </div>
            </CardContent>
            <CardFooter className='px-1 pb-2'>
                <Button variant='ghost' className='text-sm w-full'>Add Card</Button>
            </CardFooter>
        </Card>
    )
}

export default ListCard