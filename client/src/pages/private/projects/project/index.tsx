import { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IList } from '@interfaces/List'
import { useFetchData } from 'hooks/index'
import { getLists } from 'api/list'
import ListCard from './list-card'
import CreateNewCardList from './create-list-card'

const Project: FC = () => {

    const { id } = useParams() as { id: string }

    const { data, loading, error, refetch } = useFetchData<IList>(getLists, { id })

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>PROJECT {id}</h1>
                <Link to='/projects' className='text-blue-500 hover:text-blue-600'>Back to Projects</Link>
            </div>
            {/* divider */}
            <hr className='my-4' />
            {/* project */}
            <div className='overflow-x-auto -mr-4 h-[calc(100%-64px)] justify-start align-top'>
                <div className='flex flex-nowrap justify-start align-top'>
                {
                    loading ? <p>Loading...</p> :
                    error ? <p>{error.message}</p> :
                    data.map((list) => (<ListCard list={list} key={list._id} projectId={id} />))
                }
                    <CreateNewCardList onSuccessfulSubmit={refetch} />
                </div>
            </div>
        </>
    )
}

export default Project