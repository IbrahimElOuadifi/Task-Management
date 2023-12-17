import { useState, FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { createList } from 'api/list'
import { createListOptions } from '@interfaces/List'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { usePOSTData } from 'hooks/index'

export interface CardProps {
    onSuccessfulSubmit?: () => void
    onFailedSubmit?: () => void
}

const CreateNewCardList: FC<CardProps> = ({ onSuccessfulSubmit, onFailedSubmit }) => {

    const { projectId } = useParams() as { projectId: string }

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const { postData } = usePOSTData<createListOptions>(createList, onSuccessfulSubmit, onFailedSubmit)

    const { handleSubmit, control, formState: { errors }, reset } = useForm<createListOptions>({
        defaultValues: {
            title: ''
        }
    })

    const handlePopover = (open: boolean) => {
        reset()
        setOpen(open)
    }
    
    const onSubmit = (data: createListOptions) => {
        setSubmitting(true)
        postData({ ...data, projectId }).then(() => {
            setSubmitting(false)
            handlePopover(false)
        })
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    return (
        <div>
            <Card className='min-w-[280px] mr-4 p-0 shadow-none'>
                <CardHeader className='p-0'>
                    <Popover open={open} onOpenChange={handlePopover}>
                        <PopoverTrigger asChild>
                            <Button className='text-sm' variant='outline'>Add Another List</Button>
                        </PopoverTrigger>
                        <PopoverContent className='bg-white shadow-lg rounded-md p-4 w-[280px]'>
                            <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-4'>
                            <Controller
                                name='title'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input {...field} placeholder='List title' error={Boolean(errors.title)} />
                                )}
                            />
                            <Button type='submit' disabled={submitting}>
                                {
                                    submitting ? 'Creating...' : 'Create List'
                                }
                            </Button>
                        </form>
                        </PopoverContent>
                    </Popover>
                </CardHeader>
            </Card>
        </div>
    )
}

export default CreateNewCardList