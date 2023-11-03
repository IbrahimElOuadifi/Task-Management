import { FC } from 'react'
import ProjectCard from './project-card'
import NewProject from './new-project'
import { useFetchData } from 'hooks/index'
import { getProjects } from 'api/project'
import { IProject } from '@interfaces/Project'

const ProjectList: FC = () => {

    const { data, loading, error, refetch } = useFetchData(getProjects)

    return (
        <>
            <h1 className='text-2xl font-bold'>YOUR PROJECTS</h1>
            {/* divider */}
            <hr className='my-4' />
            {/* projects */}
            <div className='flex flex-wrap'>
                {
                    loading ? <h2>is loading ...</h2> :
                    error ? <h2 className='text-red-500'>{error.message}</h2> :
                    (data as IProject[]).map(project => (<ProjectCard key={project._id} id={project._id.toString()} name={project.name} />))
                }
                <NewProject onSuccessfulCreate={refetch} />
            </div>
        </>
    )
}

export default ProjectList