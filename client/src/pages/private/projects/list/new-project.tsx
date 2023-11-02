import { FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'

export interface NewProjectProps {
    onSuccessfulCreate?: () => void,
    onFailedCreate?: () => void
}

const NewProject: FC<NewProjectProps> = ({  }) => {

    const handleClick = () => {
        console.log('New workspace clicked')
    }

    return (
        <div className='w-full h-28 md:px-2 mb-4 lg:w-1/3 xl:w-1/4 2xl:w-1/5'>
            <Card className='h-full rounded-sm mb-4 cursor-pointer hover:bg-gray-50 hover:shadow-md' onClick={handleClick}>
                <CardHeader className='flex justify-center align-middle h-full text-center'>
                    <h2>CREATE NEW</h2>
                </CardHeader>
            </Card>
        </div>
    )
}

export default NewProject