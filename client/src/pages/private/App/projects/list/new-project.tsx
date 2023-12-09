import { useState, FC } from 'react'
import { Card, CardHeader } from '@components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Separator } from '@components/ui/separator'
import { createProject } from 'api/project'
import { usePOSTData } from 'hooks/index'
import { useForm, Controller } from 'react-hook-form'
import { IProject } from '@interfaces/Project'

export interface NewProjectProps {
    onSuccessfulCreate?: ({ data: { _id } }: { data: IProject }) => void,
    onFailedCreate?: () => void
}

const NewProject: FC<NewProjectProps> = ({ onSuccessfulCreate, onFailedCreate }) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: ''
        }
    })

    const { postData } = usePOSTData<{ name: string }>(createProject, onSuccessfulCreate, onFailedCreate)

    const handleDialog = (open: boolean) => {
        reset()
        setDialogOpen(open)
    }

    const onSubmit = ({ name }: { name: string }) => {
        setSubmitting(true)
        postData({ name }).then(() => {
            setSubmitting(false)
            handleDialog(false)
        })
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    return (
        <div className='w-full h-28 md:px-2 mb-4 lg:w-1/3 xl:w-1/4 2xl:w-1/5'>
            <Dialog open={dialogOpen} onOpenChange={handleDialog}>
                <DialogTrigger asChild>
                    <Card className='h-full rounded-sm mb-4 cursor-pointer hover:bg-gray-50 hover:shadow-md'>
                        <CardHeader className='flex justify-center align-middle h-full text-center'>
                            <h2>CREATE NEW</h2>
                        </CardHeader>
                    </Card>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>New Project</DialogTitle>
                        <Separator className='my-2' />
                    </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-4'>
                            <Controller
                                name='name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input {...field} placeholder='Project name' error={Boolean(errors.name)} />
                                )}
                            />
                            <Button type='submit' disabled={submitting}>
                                {
                                    submitting ? 'Creating...' : 'Create'
                                }
                            </Button>
                        </form>
                    <DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewProject