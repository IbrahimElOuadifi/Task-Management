import { FC } from 'react'
import { useParams, Link } from 'react-router-dom'

const Project: FC = () => {

    const { id } = useParams() as { id: string }

    return (
        <>
            <h1 className='text-2xl font-bold'>PROJECT {id}</h1>
            {/* divider */}
            <hr className='my-4' />
            {/* project */}
            <div className='flex flex-nowrap overflow-x-auto'>
                details for project {id}
            </div>
            <Link to={`/projects`} >
                <button className='px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500'>Back to Projects</button>
            </Link>
        </>
    )
}

export default Project