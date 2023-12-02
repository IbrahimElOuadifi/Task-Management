import { FC } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import { IProject } from '@interfaces/Project'
import { useFetchData } from 'hooks/index'
import { getProject } from 'api/project'
import { Separator } from '@components/ui/separator'

const Project: FC = () => {

    const { projectId } = useParams() as { projectId: string }


    const { data: [projectData], loading: projectLoading, error: projectError } = useFetchData<IProject>(getProject, { id: projectId })

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>
                    {projectLoading ? 'Loading...' : projectError ? projectError.message : projectData?.name || 'Project'}
                </h1>
                <Link to='/projects' className='text-blue-500 hover:text-blue-600'>Back to Projects</Link>
            </div>
            {/* divider */}
            <Separator className='my-4' />
            {/* project */}
            <Outlet />
        </>
    )
}

export default Project