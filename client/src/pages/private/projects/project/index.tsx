import { useState, useEffect, FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ReactSortable } from 'react-sortablejs'
import { AxiosResponse } from 'axios'
import { IProject } from '@interfaces/Project'
import { IList } from '@interfaces/List'
import { useFetchData, usePOSTData } from 'hooks/index'
import { getLists, updateManyLists, updateManyListsParams } from 'api/list'
import { getProject } from 'api/project'
import ListCard from './list-card'
import CreateNewCardList from './create-list-card'

const Project: FC = () => {

    const { id } = useParams() as { id: string }


    const { data: [projectData], loading: projectLoading, error: projectError } = useFetchData<IProject>(getProject, { id })

    const { data, loading, error, refetch } = useFetchData<IList>(getLists, { id })

    const { postData } = usePOSTData<updateManyListsParams>(updateManyLists, (resp: AxiosResponse) => console.log('updated list', resp), refetch)

    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        if (data) {
            setLists(data)
        }
    }, [data])

    const handleUpdate = (newData: any) => {
        const newList: IList[] = newData.map(({ id, ...rest }: { id: string }) => (rest))
        if(JSON.stringify(newList.map(({ _id }) => _id)) == JSON.stringify(data.map(({_id}) => _id))) return null
        setLists(newList)
        postData({ lists: newList, projectId: id })
    }

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold'>
                    {projectLoading ? 'Loading...' : projectError ? projectError.message : `PROJECT ${projectData?.name}` || 'Project'}
                </h1>
                <Link to='/projects' className='text-blue-500 hover:text-blue-600'>Back to Projects</Link>
            </div>
            {/* divider */}
            <hr className='my-4' />
            {/* project */}
            <div className='overflow-x-auto -mr-4 h-[calc(100%-64px)] justify-start align-top'>
                <div className='flex flex-nowrap justify-start align-top'>
                    <ReactSortable list={lists.map((props) => ({ id: props._id, ...props }))} setList={handleUpdate} className='flex flex-nowrap justify-start align-top' animation={150} handle='.handle'>
                        {
                            loading ? <p>Loading...</p> :
                            error ? <p>{error.message}</p> :
                            lists.map((list) => (<ListCard list={list} key={list._id} projectId={id} />))
                        }
                    </ReactSortable>
                    <CreateNewCardList onSuccessfulSubmit={refetch} />
                </div>
            </div>
        </>
    )
}

export default Project