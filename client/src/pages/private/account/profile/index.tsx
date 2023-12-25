import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@components/ui/select'
import { Separator } from '@components/ui/separator'
import { Controller, useForm } from 'react-hook-form'
import { useFetchData } from 'hooks/index'
import { checkSession } from 'api/auth'
import { User } from '@interfaces/User'

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
]

const Profile: FC = () => {

    const { handleSubmit, control, setValue } = useForm<User>({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            role: undefined,
        }
    })

    useFetchData(checkSession, {}, ({ data: { user } }: { data: { user: User } }) => {
        if(user) {
            setValue('firstName', user.firstName)
            setValue('lastName', user.lastName)
            setValue('username', user.username)
            setValue('role', user.role)
        }
    })

    const onSubmit = (data: User) => {
        console.log(data)
    }

    const onError = (error: any) => {
        console.log(error)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Profile</h1>
                <Button type='submit' className='my-4' variant='default'>Edit Profile</Button>
            </div>
            {/* divider */}
            <Separator className='my-4' />
            <div className='container max-w-4xl grid grid-cols-12 gap-6' >
                <div className='col-span-12 lg:col-span-6'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Controller
                        name='firstName'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='firstName' {...field} error={Boolean(error)} />}
                        rules={{ required: true }} />
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Controller
                        name='lastName'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='lastName' {...field} error={Boolean(error)} />}
                        rules={{ required: true }} />
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <Label htmlFor='username'>Username</Label>
                    <Controller
                        name='username'
                        control={control}
                        render={({ field, fieldState: { error } }) => <Input id='username' {...field} error={Boolean(error)} />}
                        rules={{ required: true }} />
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <Label htmlFor='role'>Role</Label>
                    <Controller
                        name='role'
                        control={control}
                        render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => (
                            <Select {...field} onValueChange={onChange}>
                                <SelectTrigger id='role' error={Boolean(error)} ref={ref}>
                                    <SelectValue placeholder='Select Role'>{roles.find(r => r.value === field.value)?.label || 'invalid'}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        roles.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        )}
                        rules={{ required: true }} />
                    
                </div>
            </div>
        </form>
    )
}

export default Profile