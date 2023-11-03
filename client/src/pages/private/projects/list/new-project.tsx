import { FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'
import { createProject } from 'api/project'
import { useSelector } from 'react-redux'

export interface NewProjectProps {
    onSuccessfulCreate?: () => void,
    onFailedCreate?: () => void
}

const NewProject: FC<NewProjectProps> = ({ onSuccessfulCreate }) => {

    const { token } = useSelector((state: any) => state.auth)

    const handleClick = async () => {
        try {
            const name = prompt('Enter project name') as string
            if (name) {
                const resp = await createProject({ name, token })
                if (resp) {
                    onSuccessfulCreate && onSuccessfulCreate()
                }
            }
        } catch (error) {
            console.log(error)
        }
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