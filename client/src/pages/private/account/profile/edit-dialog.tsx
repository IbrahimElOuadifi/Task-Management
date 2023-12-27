import { useState, FC, useEffect } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@components/ui/select'
import { Separator } from '@components/ui/separator'
import { Controller, useForm } from 'react-hook-form'
// import {  usePOSTData } from 'hooks/index'
import {  } from 'api/auth'
import { User } from '@interfaces/User'

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
]

interface Props {
    user: User | undefined
}

const EditDialog: FC<Props> = ({ user }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { handleSubmit, control, setValue, reset } = useForm<User>({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            role: undefined,
        }
    })
    
    const onSubmit = (data: User) => {
        console.log(data)
    }
    
    const onError = (error: any) => {
        console.log(error)
    }

    const onOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    useEffect(() => {
        reset()
        if (user && user._id) {
            setValue('firstName', user.firstName)
            setValue('lastName', user.lastName)
            setValue('username', user.username)
            setValue('role', user.role)
        }
    }, [user])
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button type='button' variant='default'>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className='w-11/12 max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>
                    <DialogDescription className='text-sm'>
                        Edit your profile information.
                    </DialogDescription>
                </DialogHeader>
                {/* divider */}
                <Separator />
                <form className='container grid grid-cols-12 gap-4' onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className='col-span-12'>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Controller
                            name='firstName'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='firstName' {...field} error={Boolean(error)} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Controller
                            name='lastName'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='lastName' {...field} error={Boolean(error)} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='username'>Username</Label>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='username' {...field} error={Boolean(error)} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='role'>Role</Label>
                        <Controller
                            name='role'
                            control={control}
                            render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => (
                                <Select {...field} onValueChange={onChange}>
                                    {/* @ts-ignore */}
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
                    <div className='col-span-12'>
                        <Label htmlFor='confirm-password'>Confirm Your Password</Label>
                        <Controller
                            name='password'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='confirm-password' {...field} error={Boolean(error)} type='password' />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12 py-2 flex justify-end items-center'>
                        <Button type='button' variant='outline' className='mr-2' onClick={() => onOpenChange?.(false)}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='default'>
                            Update Profile
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog