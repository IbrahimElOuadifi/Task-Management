import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { useFetchData, useDebounceState, usePOSTData } from 'hooks/index'
import { getLabels } from 'api/labels'
import { ILabel } from '@interfaces/Label'
import { updateTaskLabelOptions } from '@interfaces/Task'
import { updateTaskLabel } from 'api/task'

interface LabelsButtonProps {
    labels: ILabel[]
    count: number
    taskId?: string
    onUpdate: () => Promise<void>
}

const LabelsButton:FC<LabelsButtonProps> = ({ labels, taskId, onUpdate }) => {

    const { value: searchValue, setValue: setQuery, debouncedValue: query } = useDebounceState<string>('', 200)

    const { data, loading, error } = useFetchData<ILabel>(getLabels, { query: JSON.stringify({ query }), limit: 6, page: 1 })

    const { postData } = usePOSTData<updateTaskLabelOptions>(updateTaskLabel, onUpdate)

    const handleUpdate = (labelId: string) => {
        if(taskId) {
            postData({ id: taskId, labelId })
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='text-sm w-full'>Labels</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Input placeholder='Search labels' className='w-full' value={searchValue} onChange={({ target }) => setQuery(target.value)} />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {
                            loading ? (<h5>loading...</h5>) :
                            error? (<h5>{error.message}</h5>) :
                            data.length === 0 ? (<h5>No labels found</h5>) :
                            (
                                data.map((label) => (
                                    <div key={label._id} className='flex items-center justify-between space-x-2'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <div className={`w-9 h-9 rounded-sm border`} style={{ backgroundColor: label.color }}></div>
                                            <span>{label.name}</span>
                                        </div>
                                        <div className='flex items-center justify-end gap-2'>
                                            <Button variant={labels.find(l => l._id === label._id) ? 'destructive' : 'outline'} size='icon' onClick={handleUpdate.bind(this, label._id)}>
                                                {labels.find(l => l._id === label._id) ? <MinusIcon /> : <PlusIcon />}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default LabelsButton