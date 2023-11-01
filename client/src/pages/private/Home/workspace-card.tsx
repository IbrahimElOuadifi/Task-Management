import { FC } from 'react'
import { Card, CardContent, CardTitle } from '@components/ui/card'

export interface WorkspaceCardProps {
    id: string,
    title: string
}

const WorkspaceCard: FC<WorkspaceCardProps> = ({ id, title }) => {

    const handleClick = () => {
        console.log(`Workspace ${id} clicked`)
    }

    return (
        <div className='w-full h-28 md:px-2 mb-4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5'>
            <Card className='rounded-sm p-2 h-full pt-8 cursor-pointer hover:bg-gray-50 hover:shadow-md' onClick={handleClick}>
                <CardContent>
                    <CardTitle>{title}</CardTitle>
                </CardContent>
            </Card>
        </div>
    )
}

export default WorkspaceCard