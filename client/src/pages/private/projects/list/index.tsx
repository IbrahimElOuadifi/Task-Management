import { FC } from 'react'
import ProjectCard from './project-card'
import NewProject from './new-project'

const ProjectsData = [
    { _id: 1, title: 'Project 1' },
    { _id: 2, title: 'Project 2' },
    { _id: 3, title: 'Project 3' },
    { _id: 4, title: 'Project 4' },
    { _id: 5, title: 'Project 5' },
    { _id: 6, title: 'Project 6' },
    { _id: 7, title: 'Project 7' },
    { _id: 8, title: 'Project 8' },
    { _id: 9, title: 'Project 9' },
    { _id: 10, title: 'Project 10' },
    { _id: 11, title: 'Project 11' },
    { _id: 12, title: 'Project 12' },
]

const ProjectList: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>YOUR PROJECTS</h1>
            {/* divider */}
            <hr className='my-4' />
            {/* projects */}
            <div className='flex flex-wrap'>
                {ProjectsData.map(project => (<ProjectCard key={project._id} id={project._id.toString()} title={project.title} />))}
                <NewProject />
            </div>
        </>
    )
}

export default ProjectList