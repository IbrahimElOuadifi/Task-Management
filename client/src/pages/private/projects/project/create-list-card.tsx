import { FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { createList, createListParams } from 'api/list'
import { useParams } from 'react-router-dom'
import { usePOSTData } from 'hooks/index'

export interface CardProps {
    onSuccessfulSubmit?: () => void
    onFailedSubmit?: () => void
}

const CreateNewCardList: FC<CardProps> = ({ onSuccessfulSubmit }) => {

    const { id } = useParams() as { id: string }

    const { postData } = usePOSTData<createListParams>(createList, onSuccessfulSubmit)
    
    const handleCreate = () => {
        const title = prompt('Enter list title') as string
        if (title) {
            postData({ title, projectId: id })
        }
    }

    return (
        <div>
            <Card className='min-w-[280px] mr-4 p-0 shadow-none' onClick={handleCreate}>
                <CardHeader className='p-0'>
                    <Button className='text-sm' variant='outline'>Add Another List</Button>
                </CardHeader>
            </Card>
        </div>
    )
}

export default CreateNewCardList