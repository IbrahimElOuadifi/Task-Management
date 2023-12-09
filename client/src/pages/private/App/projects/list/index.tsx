import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@components/ui/separator'
import ProjectCard from './project-card'
import NewProject from './new-project'
import { useFetchData } from 'hooks/index'
import { getProjects } from 'api/project'
import { IProject } from '@interfaces/Project'

const ProjectList: FC = () => {

    const navigate = useNavigate()

    const { data, loading, error } = useFetchData(getProjects)

    const handleCreate = ({ data: { _id } }: { data: IProject }) => {
        navigate(`/projects/${_id}`)
        // refetch()
    }

    return (
        <>
            <h1 className='text-2xl font-bold'>YOUR PROJECTS</h1>
            {/* divider */}
            <Separator className='my-4' />
            {/* projects */}
            <div className='flex flex-wrap'>
                {
                    loading ? <h2>is loading ...</h2> :
                    error ? <h2 className='text-red-500'>{error.message}</h2> :
                    (data as IProject[]).map(project => (<ProjectCard key={project._id} id={project._id.toString()} name={project.name} />))
                }
                <NewProject onSuccessfulCreate={handleCreate} />
            </div>
        </>
    )
}

export default ProjectList