import { FC, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import { Controller, useForm } from 'react-hook-form'
import {  usePOSTData } from 'hooks/index'
import { updateProfile } from 'api/auth'
import { User } from '@interfaces/User'

interface Props {
    isOpen: boolean
    user: User | undefined
    onOpenChange: (open: boolean) => void,
    onSuccess: () => void
}

interface IForm {
    confirmPassword: string
}

const ConfirmDialog: FC<Props> = ({ isOpen, user, onOpenChange, onSuccess }) => {

    const { postData } = usePOSTData<User>(updateProfile, onSuccess, console.error)
    
    const { handleSubmit, control, reset } = useForm<IForm>({
        defaultValues: {
            confirmPassword: ''
        }
    })
    
    const onSubmit = (data: IForm) => {
        if(user) postData({...user, ...data})
        onOpenChange(false)
    }
    
    const onError = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        reset()
    }, [isOpen])
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* <DialogTrigger asChild>
                <Button type='button' variant='default'>
                    Edit Profile
                </Button>
            </DialogTrigger> */}
            <DialogContent className='w-11/12 max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>
                        Confirm Password
                    </DialogTitle>
                    <DialogDescription className='text-sm'>
                        Please enter your password to confirm your changes.
                    </DialogDescription>
                </DialogHeader>
                {/* divider */}
                <Separator />
                <form className='container grid grid-cols-12 gap-4' onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className='col-span-12'>
                        <Label htmlFor='confirm-password'>Confirm Your Password</Label>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='confirm-password' {...field} error={Boolean(error)} type='password' autoComplete='password' />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12 py-2 flex justify-end items-center'>
                        <Button type='button' variant='outline' className='mr-2' onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='default'>
                            Confirm
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDialog