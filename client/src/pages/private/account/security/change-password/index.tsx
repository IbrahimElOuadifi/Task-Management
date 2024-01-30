import { FC, useRef } from 'react'
import { usePOSTData } from 'hooks/index'
import { updatePassword } from 'api/auth'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Controller, useForm } from 'react-hook-form'

interface IForm {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

const ChangePassword: FC = () => {

    const submitRef = useRef<HTMLButtonElement>(null)

    const { handleSubmit, control, reset } = useForm<IForm>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const { postData } = usePOSTData(updatePassword, console.log, console.log)

    const onSubmit = (fields: IForm) => {
        console.log(fields)
        postData(fields).then(() => reset())
    }
    
    const onError = (error: any) => {
        console.log(error)
    }

    return (
        <div>
            <form className='container max-w-4xl grid grid-cols-12 gap-4' onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='col-span-12'>
                    <Label htmlFor='old-password'>Old Password</Label>
                    <Controller
                        name='oldPassword'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='old-password' {...field} error={Boolean(error)} type='password' autoComplete='old-password' />}
                        rules={{ required: true }} />
                </div>
                <div className='col-span-12'>
                    <Label htmlFor='new-password'>New Password</Label>
                    <Controller
                        name='newPassword'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='new-password' {...field} error={Boolean(error)} type='password' autoComplete='new-password' />}
                        rules={{ required: true }} />
                </div>
                <div className='col-span-12'>
                    <Label htmlFor='confirm-password'>Confirm Password</Label>
                    <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='confirm-password' {...field} error={Boolean(error)} type='password' autoComplete='confirm-password' />}
                        rules={{ required: true }} />
                </div>
                <input
                    type="text"
                    name="email"
                    value="text"
                    autoComplete="email username"
                    readOnly
                    style={{ display: 'none' }} />
                <div className='col-span-12 py-2 flex justify-end items-center'>
                    <Button ref={submitRef} type='submit' variant='default'>
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword