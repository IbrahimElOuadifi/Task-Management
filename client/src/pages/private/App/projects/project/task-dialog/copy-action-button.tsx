import { useState, FC } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@components/ui/button'
// import { Input } from '@components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/popover'
import { useFetchData, usePOSTData } from 'hooks/index'
import { getLists } from 'api/list'
import { copyTask } from 'api/task'
import { IList } from '@interfaces/List'

interface CopyActionButtonProps {
    taskId: string
    listId: string
    onSuccessful?: () => void
}

const CopyActionButton:FC<CopyActionButtonProps> = ({ taskId, onSuccessful }) => {

    const { projectId } = useParams<{ projectId: string }>()

    const [open, setOpen] = useState(false)

    const { data, loading, error } = useFetchData<IList>(getLists, { query: JSON.stringify({ projectId }) }, console.log)

    const { postData } = usePOSTData(copyTask, onSuccessful)

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    const handleMoveTask = (listId: string) => {
        postData({ id: taskId, listId }).then(() => {
            handleOpenChange(false)
            if (onSuccessful) {
                onSuccessful()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
            <Button variant='outline' className='text-sm'>Copy</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    {/* <div className='flex items-center space-x-2'>
                        <Input placeholder='Search members' className='w-full' value={searchValue} onChange={({ target }) => setQuery(target.value)} />
                    </div> */}
                    <div className='flex flex-col space-y-2'>
                        {
                            loading ? (<h5>loading...</h5>) :
                            error? (<h5>{error.message}</h5>) :
                            data.length === 0 ? (<h5>No list found</h5>) :
                            data.map(list => (
                                <Button
                                    // variant={list._id === listId ? 'default' : 'outline'}
                                    variant='outline'
                                    key={list._id}
                                    onClick={handleMoveTask.bind(this, list._id)}>
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

export default CopyActionButton