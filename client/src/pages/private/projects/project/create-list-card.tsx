import { FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { createList } from 'api/list'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AuthSession } from '@interfaces/User'

export interface CardProps {
    onSuccessfulSubmit?: () => void
    onFailedSubmit?: () => void
}


const CreateNewCardList: FC<CardProps> = ({ onSuccessfulSubmit }) => {

    const { id } = useParams() as { id: string }
    const { token } = useSelector((state: { auth: AuthSession }) => state.auth)
    
    const handleCreate = async () => {
        const title = prompt('Enter list title') as string
        if (title) {
            const resp = await createList({ title, projectId: id, token: token as string })
            if (resp) {
                if (onSuccessfulSubmit) {
                    onSuccessfulSubmit()
                }
            }
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