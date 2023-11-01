import { FC } from 'react'
import { Card, CardContent, CardTitle } from '@components/ui/card'

export interface WorkspaceCardProps {
    title: string        
}

const WorkspaceCard: FC<WorkspaceCardProps> = ({ title }) => {
    return (
        <Card className='rounded-sm p-2 mr-2 mb-2 w-72 h-28 pt-8 cursor-default hover:bg-gray-50 hover:shadow-md'>
            <CardContent>
                <CardTitle>{title}</CardTitle>
            </CardContent>
        </Card>
    )
}

export default WorkspaceCard