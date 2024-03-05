import { useState, useEffect, FC } from 'react'
import { useParams } from 'react-router-dom'
import { ReactSortable } from 'react-sortablejs'
import { IList, updateManyListsOptions } from '@interfaces/List'
import { useFetchData, usePOSTData } from 'hooks/index'
import { getLists, updateManyLists } from 'api/list'
import ListCard from './list-card'
import CreateNewCardList from './create-list-card'

const Project: FC = () => {

    const { projectId } = useParams() as { projectId: string }

    const { data, loading, error, refetch } = useFetchData<IList>(getLists, { query: JSON.stringify({ projectId }) })

    const { postData } = usePOSTData<updateManyListsOptions>(updateManyLists, refetch, refetch)

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
        postData({ lists: newList, projectId })
    }

    return (
        <div className='overflow-x-auto -mr-4 h-[calc(100%-64px)] justify-start align-top'>
            <div className='flex justify-start align-top flex-nowrap'>
                <ReactSortable list={lists.map((props) => ({ id: props._id, ...props }))} setList={handleUpdate} className='flex justify-start align-top flex-nowrap' animation={150} handle='.handle'>
                    {
                        loading && !lists.length ? <p>Loading...</p> :
                        error ? <p>{error.message}</p> :
                        lists.map((list) => (<ListCard list={list} key={list._id} projectId={projectId} />))
                    }
                </ReactSortable>
                <CreateNewCardList onSuccessfulSubmit={refetch} />
            </div>
        </div>
    )
}

export default Project