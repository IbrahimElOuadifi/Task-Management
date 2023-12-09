import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@components/ui/button'
// import { Input } from '@components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/popover'
import { useFetchData, usePOSTData } from 'hooks/index'
import { getLists } from 'api/list'
import { moveTask } from 'api/task'
import { IList } from '@interfaces/List'

interface MoveActionButtonProps {
    taskId: string
    listId: string
    onSuccessful?: () => void
}

const MoveActionButton:FC<MoveActionButtonProps> = ({ listId, taskId, onSuccessful }) => {

    const { projectId } = useParams<{ projectId: string }>()

    const { data, loading, error } = useFetchData<IList>(getLists, { query: JSON.stringify({ projectId }) })

    const { postData } = usePOSTData(moveTask, onSuccessful)

    const handleMoveTask = (listId: string) => {
        postData({ id: taskId, listId }).then(() => {
            if (onSuccessful) {
                onSuccessful()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
            <Button variant='outline' className='text-sm'>Move</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex flex-col space-y-2'>
                        {
                            loading ? (<h5>loading...</h5>) :
                            error? (<h5>{error.message}</h5>) :
                            data.length === 0 ? (<h5>No list found</h5>) :
                            data.map((list) => (
                                <Button
                                    variant='outline'
                                    key={list._id}
                                    disabled={list._id === listId}
                                    onClick={handleMoveTask.bind(this, list._id)}
                                >
                                    {list.title}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MoveActionButton